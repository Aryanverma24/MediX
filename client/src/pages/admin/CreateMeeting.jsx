import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiCalendar, FiClock, FiVideo, FiSave, FiX, FiLink } from 'react-icons/fi';
import API from '../../utils/api';

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    meetingLink: '',
    date: '',
    startTime: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Combine date & time → ISO datetime
      const scheduledDate = new Date(`${formData.date}T${formData.startTime}`);

      const payload = {
        title: formData.title,
        zoomLink: formData.meetingLink,
        scheduledDate,
        startTime : formData.startTime
      };

      await API.post('/meeting/create', payload);

      toast.success('Meeting created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error creating meeting:', error);
      toast.error(error.response?.data?.message || 'Failed to create meeting');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 min-h-screen ml-[16rem] bg-gradient-to-br from-purple-100 via-pink-100 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Create Daily Meeting</h1>
            <p className="text-gray-600">Add Zoom link & schedule today's meditation session</p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FiX className="mr-2" /> Cancel
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Meeting Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Meeting Title *
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleChange}
                placeholder="Morning Meditation Session"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Zoom Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiLink className="mr-2" /> Zoom Meeting Link *
              </label>
              <input
                type="url"
                name="meetingLink"
                required
                value={formData.meetingLink}
                onChange={handleChange}
                placeholder="https://zoom.us/j/xxxxxxx"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiCalendar className="mr-2" /> Date *
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

              {/* Start Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiClock className="mr-2" /> Start Time *
                </label>
                <input
                  type="time"
                  name="startTime"
                  required
                  value={formData.startTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
                />
              </div>

            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center px-6 py-3 rounded-lg text-white font-medium ${
                  loading
                    ? 'bg-purple-400 cursor-not-allowed'
                    : 'bg-purple-600 hover:bg-purple-700'
                }`}
              >
                {loading ? 'Creating...' : (
                  <>
                    <FiVideo className="mr-2" />
                    Create Meeting
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateMeeting;
