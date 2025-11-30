import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiCalendar, 
  FiLock, FiEdit2, FiSave, FiX, 
  FiCamera, FiTrash2, FiUserCheck, 
  FiTrendingUp, FiAward, FiClock as FiClockIcon, FiActivity
} from 'react-icons/fi';
import { GiTreeGrowth, GiMeditation, GiSoulVessel } from 'react-icons/gi';
import API from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 20,
    },
  },
  hover: { scale: 1.02, transition: { type: 'spring', stiffness: 400, damping: 20 } },
  tap: { scale: 0.98 },
};

const buttonVariants = {
  hover: { 
    scale: 1.05,
    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    transition: { type: 'spring', stiffness: 600, damping: 20 }
  },
  tap: { 
    scale: 0.98,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  },
  initial: { scale: 1 }
};

const Profile = () => {
  const { user, updateLocalUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(user?.profilePicture || '');
  const [activeTab, setActiveTab] = useState('profile');
  const [attendance, setAttendance] = useState([]);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [avgSeconds, setAvgSeconds] = useState(0);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      bio: user?.bio || '',
      location: user?.location || '',
      website: user?.website || '',
      occupation: user?.occupation || '',
      company: user?.company || '',
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    reset();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setPreviewUrl(fileUrl);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewUrl('');
  };

  const onSubmit = async (data) => {
    try {
      setIsUpdating(true);
      const formData = new FormData();
      
      // Add profile picture if changed
      if (previewUrl && previewUrl !== user?.profilePicture) {
        const response = await fetch(previewUrl);
        const blob = await response.blob();
        const file = new File([blob], 'profile.jpg', { type: 'image/jpeg' });
        formData.append('profilePicture', file);
      } else if (!previewUrl && user?.profilePicture) {
        // If removing profile picture
        formData.append('removeProfilePicture', 'true');
      }
      
      // Add other user data
      formData.append('name', data.name);
      formData.append('phone', data.phone);
      formData.append('bio', data.bio);
      formData.append('location', data.location);
      formData.append('website', data.website);
      formData.append('occupation', data.occupation);
      formData.append('company', data.company);

      const res = await API.put('/user/me', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        toast.success('Profile updated successfully');
        setIsEditing(false);
        // Update the user data in the auth context
        updateLocalUser(res.data.user);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not available';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Calculate tree age
  const getTreeAge = () => {
    if (!user?.currentTree?.startedAt) return 'Newly planted';
    const started = new Date(user.currentTree.startedAt);
    const now = new Date();
    const diffTime = Math.abs(now - started);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return `${diffDays} day${diffDays !== 1 ? 's' : ''} old`;
  };

  // Get tree stage display name
  const getTreeStageName = (stage) => {
    const stages = {
      'seed': 'Seedling',
      'sprout': 'Sprout',
      'sapling': 'Sapling',
      'tree': 'Mature Tree',
      'ancient': 'Ancient Tree'
    };
    return stages[stage] || 'Seedling';
  };


 const getTotalandAvgMeditationTime = (attends) => {
  if (!attends || attends.length === 0) {
    return { totalSeconds: 0, avgSeconds: 0 };
  }

  const totalSeconds = attends.reduce(
    (total, attend) => total + attend.durationSeconds,
    0
  );

  const avgSeconds = totalSeconds / attends.length;
  setTotalSeconds(totalSeconds)
  setAvgSeconds(avgSeconds);
};


  useEffect(()=> {
    const getAttendance = async() => {
      const res = await API.get("/attendance/getAttendances");
      const data = res?.data?.attendance;
      setAttendance(data);
      getTotalandAvgMeditationTime(data);
    }
    if(user) {getAttendance()};
  },[user])

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className='min-h-screen pt-[5rem] bg-gradient-to-br from-gray-50 via-white to-gray-50/80 px-4 sm:px-6 lg:px-8 py-8'
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div 
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-indigo-50">
                <FiUserCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  My Profile
                </h1>
                <p className="text-sm sm:text-base text-gray-500 mt-0.5">Manage your personal information and account settings</p>
              </div>
            </div>
          </motion.div>
          <motion.div variants={itemVariants} className="mt-4 md:mt-0">
            {!isEditing ? (
              <motion.button
                whileHover="hover"
                whileTap="tap"
                variants={buttonVariants}
                onClick={handleEditClick}
                className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
              >
                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                <FiEdit2 className="mr-2" />
                <span className="relative">Edit Profile</span>
              </motion.button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  onClick={handleCancelEdit}
                  className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden rounded-lg bg-white border border-gray-300 text-gray-700 shadow hover:bg-gray-50"
                >
                  <FiX className="mr-2" />
                  <span className="relative">Cancel</span>
                </motion.button>
                <motion.button
                  whileHover="hover"
                  whileTap="tap"
                  variants={buttonVariants}
                  type="submit"
                  form="profile-form"
                  disabled={isUpdating}
                  className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="relative">Saving...</span>
                    </>
                  ) : (
                    <>
                      <FiSave className="mr-2" />
                      <span className="relative">Save Changes</span>
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.div>
        </motion.div>

        <motion.div 
          className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/70 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ delay: 0.2 }}
        >
          <form id="profile-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
              <motion.h3 
                className="text-lg font-semibold text-gray-800"
                variants={itemVariants}
              >
                Profile Information
              </motion.h3>
            </div>
            
            <div className="px-6 py-6 space-y-8">
              {/* Profile Photo */}
              <motion.div 
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-8"
                variants={itemVariants}
              >
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Profile Photo</h4>
                  <p className="mt-1 text-sm text-gray-500">This will be displayed on your profile.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt="Profile"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                          {user?.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt="Profile"
                              className="h-full w-full object-cover"
                            />
                          ) : user?.name ? (
                            <div className="h-full w-full flex items-center justify-center bg-purple-500 text-white text-2xl font-semibold">
                              {user.name.charAt(0).toUpperCase()}
                            </div>
                          ) : (
                            <FiUser className="h-12 w-12 text-gray-400" />
                          )}
                        </div>
                      )}
                    </div>
                    {isEditing && (
                      <motion.div 
                        className="absolute -bottom-2 -right-2"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <label className="flex items-center justify-center h-10 w-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white cursor-pointer shadow-md hover:shadow-lg transition-all duration-200">
                          <FiCamera className="h-4 w-4" />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                        </label>
                      </motion.div>
                    )}
                  </div>
                  <AnimatePresence>
                    {isEditing && previewUrl && (
                      <motion.button
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        type="button"
                        onClick={handleRemovePhoto}
                        className="flex items-center text-sm font-medium text-red-600 hover:text-red-500 transition-colors"
                      >
                        <FiX className="mr-1" /> Remove
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Personal Information */}
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                {/* Name Field */}
                <motion.div 
                  className="bg-gray-50/80 hover:bg-gray-100/50 rounded-xl p-5 transition-colors duration-200 border border-gray-200/70"
                  variants={itemVariants}
                  whileHover={{ y: -2, transition: { duration: 0.15 } }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="p-2.5 rounded-lg bg-indigo-50 text-indigo-600">
                      <FiUser className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1.5">
                        Full Name
                      </label>
                      {isEditing ? (
                        <motion.div 
                          className="mt-1"
                          initial={{ opacity: 0, y: 5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          <input
                            type="text"
                            id="name"
                            {...register('name', { required: 'Name is required' })}
                            className={`px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                              errors.name ? 'border-red-300 focus:ring-red-200' : 'focus:ring-purple-200'
                            }`}
                            disabled={!isEditing}
                          />
                          {errors.name && (
                            <motion.p 
                              className="mt-1.5 text-sm text-red-600 flex items-center"
                              initial={{ opacity: 0, y: -5 }}
                              animate={{ opacity: 1, y: 0 }}
                            >
                              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                              </svg>
                              {errors.name.message}
                            </motion.p>
                          )}
                        </motion.div>
                      ) : (
                        <p className="mt-1 text-base text-gray-800 font-medium">{user?.name || 'Not provided'}</p>
                      )}
                    </div>
                  </div>
                </motion.div>

                {/* Email */}
                <motion.div 
                  className="sm:col-span-4"
                  variants={itemVariants}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email address
                  </label>
                  {isEditing ? (
                    <motion.div 
                      className="mt-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <input
                        id="email"
                        type="email"
                        {...register('email', {
                          required: 'Email is required',
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Please enter a valid email address',
                          },
                        })}
                        className={`px-4 py-2.5 w-full rounded-lg border border-gray-300 bg-gray-50 text-gray-600 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                          errors.email ? 'border-red-300 focus:ring-red-200' : 'focus:ring-purple-200'
                        }`}
                        disabled={true} // Email is typically not editable
                        readOnly
                      />
                      {errors.email && (
                        <motion.p 
                          className="mt-1.5 text-sm text-red-600 flex items-center"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.email.message}
                        </motion.p>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <FiMail className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="text-base text-gray-800 font-medium">{user?.email || 'Not provided'}</p>
                      </div>
                    </div>
                  )}
                </motion.div>

                {/* Phone */}
                <motion.div 
                  className="sm:col-span-4"
                  variants={itemVariants}
                >
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone number
                  </label>
                  {isEditing ? (
                    <motion.div 
                      className="mt-1"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <input
                        type="tel"
                        id="phone"
                        {...register('phone', {
                          pattern: {
                            value: /^[0-9+\-\s()]*$/,
                            message: 'Please enter a valid phone number',
                          },
                        })}
                        className={`px-4 py-2.5 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${
                          errors.phone ? 'border-red-300 focus:ring-red-200' : 'focus:ring-purple-200'
                        }`}
                        disabled={!isEditing}
                        placeholder="+1 (555) 123-4567"
                      />
                      {errors.phone && (
                        <motion.p 
                          className="mt-1.5 text-sm text-red-600 flex items-center"
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                        >
                          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.phone.message}
                        </motion.p>
                      )}
                    </motion.div>
                  ) : (
                    <div className="flex items-center">
                      <div className="p-2 bg-purple-100 rounded-lg mr-3">
                        <FiPhone className="text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="text-base text-gray-800 font-medium">{user?.phone || 'Not provided'}</p>
                      </div>
                    </div>
                  )}
                </motion.div>


              </motion.div>
            </div>
          </form>
        </motion.div>

        {/* Tree Growth & Stats Section */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
            <GiTreeGrowth className="mr-2 text-green-600" />
            Your Tree Growth
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
            {/* Forest Count */}
            <motion.div 
              className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 border border-emerald-100 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-emerald-100 text-emerald-600 mr-4">
                  <GiTreeGrowth className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Forest</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.forest?.length || 0} tree{user?.forest?.length !== 1 ? 's' : ''} grown
                  </p>
                </div>
              </div>
            </motion.div>

                  {/* */}
                  {/* Meeting Statistics Card */}
<motion.div 
  className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-5 border border-indigo-100 shadow-sm"
  variants={itemVariants}
  whileHover="hover"
>
  <div className="flex items-center">
    <div className="p-3 rounded-lg bg-indigo-100 text-indigo-600 mr-4">
      <FiCalendar className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500">Meeting Stats</p>
      <p className="text-lg font-semibold text-gray-800">
        {user?.totalMeetingsAttended || 0} total
      </p>
      <p className="text-xs text-indigo-600 mt-1">
        {user?.lastMeetingDate ? `Last: ${formatDate(user.lastMeetingDate)}` : 'No meetings yet'}
      </p>
    </div>
  </div>
</motion.div>

{/* Session Duration Card */}
<motion.div 
  className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-xl p-5 border border-cyan-100 shadow-sm"
  variants={itemVariants}
  whileHover="hover"
>
  <div className="flex items-center">
    <div className="p-3 rounded-lg bg-cyan-100 text-cyan-600 mr-4">
      <FiClockIcon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm text-gray-500">Avg. Meditation</p>
      <p className="text-lg mt-2 font-semibold text-gray-800">
        {avgSeconds ? `${Math.floor(avgSeconds/ 60)} min` : 'N/A'}
      </p>
    </div>
  </div>
</motion.div>
         
            {/* Meditation Time */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-5 border border-purple-100 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                  <GiMeditation className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Meditation</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {totalSeconds ? `${Math.floor(totalSeconds / 3600)}h ${Math.floor((totalSeconds % 3600) / 60)}m` : '0m'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tree Stage */}
            <motion.div 
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-100 text-green-600 mr-4">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Stage</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {getTreeStageName(user?.currentTree?.stage || 'seed')}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Current Streak */}
            <motion.div 
              className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-100 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-amber-100 text-amber-600 mr-4">
                  <FiTrendingUp className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Current Streak</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.currentStreak || 0} day{user?.currentStreak !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Longest Streak */}
            <motion.div 
              className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-5 border border-purple-100 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-100 text-purple-600 mr-4">
                  <FiAward className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Longest Streak</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.longestStreak || 0} day{user?.longestStreak !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Soul Peace Points */}
            <motion.div 
              className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-100 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 text-blue-600 mr-4">
                  <GiSoulVessel className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Soul Peace Points</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {user?.soulPeacePoints || 0} points
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Tree Age */}
            <motion.div 
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-gray-100 text-gray-600 mr-4">
                  <FiClockIcon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tree Age</p>
                  <p className="text-base font-medium text-gray-800">
                    {getTreeAge()}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Planted on {user?.currentTree?.startedAt ? formatDate(user.currentTree.startedAt) : 'N/A'}
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Last Watered */}
            <motion.div 
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 text-blue-500 mr-4">
                  <GiMeditation className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Last Session</p>
                  <p className="text-base font-medium text-gray-800">
                    {formatDate(user?.lastSoulUpdate)}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {user?.daysGrown || 0} day{user?.daysGrown !== 1 ? 's' : ''} of growth
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Meetings Attended */}
            <motion.div 
              className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm"
              variants={itemVariants}
              whileHover="hover"
            >
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-50 text-purple-500 mr-4">
                  <FiActivity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Meetings Attended</p>
                  <p className="text-base font-medium text-gray-800">
                    {user?.totalMeetingsAttended || 0} session{user?.totalMeetingsAttended !== 1 ? 's' : ''}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Last: {user?.lastMeetingDate ? formatDate(user.lastMeetingDate) : 'Never'}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Change Password Section */}
        <motion.div 
          className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200/70 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ delay: 0.3 }}
        >
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
            <motion.h3 
              className="text-lg font-semibold text-gray-800"
              variants={itemVariants}
            >
              Security
            </motion.h3>
          </div>
          <div className="px-6 py-6">
            <motion.div 
              className="space-y-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <p className="text-sm text-gray-500 mb-4">
                  Ensure your account is using a long, random password to stay secure.
                </p>
                <motion.button
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  }}
                  whileTap={{ 
                    scale: 0.98,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                  }}
                  type="button"
                  className="group relative inline-flex items-center px-5 py-2.5 overflow-hidden rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md"
                  onClick={() => toast.success('Password change functionality coming soon!')}
                >
                  <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                  <FiLock className="mr-2" />
                  <span className="relative">Change Password</span>
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>

        {/* Delete Account Section */}
        <motion.div 
          className="mt-8 bg-white rounded-xl shadow-lg overflow-hidden border border-red-200/70 backdrop-blur-sm"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          transition={{ delay: 0.4 }}
        >
          <div className="px-6 py-5 border-b border-red-200 bg-red-50/80">
            <motion.h3 
              className="text-lg font-semibold text-red-700"
              variants={itemVariants}
            >
              Danger Zone
            </motion.h3>
          </div>
          <div className="px-6 py-6">
            <motion.div 
              className="space-y-4"
              variants={containerVariants}
            >
              <motion.p className="text-sm text-red-600">
                Once you delete your account, there is no going back. Please be certain.
              </motion.p>
              <motion.button
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.1), 0 4px 6px -2px rgba(239, 68, 68, 0.05)'
                }}
                whileTap={{ 
                  scale: 0.98,
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                }}
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
                    toast.error('Account deletion is disabled in demo mode');
                  }
                }}
              >
                <FiTrash2 className="mr-2 h-4 w-4" />
                Delete Account
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;