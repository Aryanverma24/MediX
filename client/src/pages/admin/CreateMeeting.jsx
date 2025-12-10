import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiCalendar, FiClock, FiVideo, FiSave, FiX, FiLink, FiSettings } from 'react-icons/fi';
import API from '../../utils/api';

const CreateMeeting = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [meeting, setMeeting] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    zoomLink: '',
    defaultTime: '19:00',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    settings: {
      minAttendanceDuration: 10,
      sendReminders: true,
      recurringDays: [0, 1, 2, 3, 4, 5, 6] // Sun-Sat
    }
  });

  // Fetch existing meeting on mount
  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await API.get('meetings/today');
        console.log(res)
        if (res.data?.meeting) {
          setMeeting(res.data.meeting);
          setFormData(prev => ({
            ...prev,
            title: res.data.meeting.title,
            zoomLink: res.data.meeting.zoomLink,
            defaultTime: res.data.meeting.defaultTime,
            timezone: res.data.meeting.timezone,
            settings: res.data.meeting.settings
          }));
        }
      } catch (error) {
        console.error('Error fetching meeting:', error);
      }
    };
    fetchMeeting();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.startsWith('settings.')) {
      const settingKey = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        settings: {
          ...prev.settings,
          [settingKey]: type === 'checkbox' ? checked : value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  const handleDayToggle = (day) => {
    setFormData(prev => {
      const recurringDaysArray = prev?.settings?.recurringDays || [];
      const days = [...recurringDaysArray];
      const dayIndex = days.indexOf(day);
      
      if (dayIndex === -1) {
        days.push(day);
      } else {
        days.splice(dayIndex, 1);
      }
      
      return {
        ...prev,
        settings: {
          ...prev.settings,
          recurringDays: days.sort()
        }
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log(formData)
      await API.post('/meetings', formData);
      toast.success(meeting ? 'Meeting updated successfully!' : 'Meeting created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error saving meeting:', error);
      toast.error(error.response?.data?.message || 'Failed to save meeting');
    } finally {
      setLoading(false);
    }
  };

  const days = [
    { value: 0, label: 'Sun' },
    { value: 1, label: 'Mon' },
    { value: 2, label: 'Tue' },
    { value: 3, label: 'Wed' },
    { value: 4, label: 'Thu' },
    { value: 5, label: 'Fri' },
    { value: 6, label: 'Sat' }
  ];

  return  (
  <div className="p-4 md:p-6 min-h-screen md:ml-[18rem] bg-gradient-to-br from-green-50 via-cream-50 to-white">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {meeting ? 'Update Meeting' : 'Create Daily Meeting'}
            </h1>
            <p className="text-gray-600">
              {meeting ? 'Update the meeting settings' : 'Configure your daily meditation session'}
            </p>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="flex items-center px-4 py-2 text-sm text-gray-600 bg-white border border-green-200 rounded-lg hover:bg-green-50 transition-colors"
          >
            <FiX className="mr-2" /> Cancel
          </button>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-6 border border-green-100">
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
                className="w-full px-4 py-2.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
              />
            </div>

            {/* Zoom Link */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                <FiLink className="mr-2" /> Zoom Meeting Link *
              </label>
              <input
                type="url"
                name="zoomLink"
                required
                value={formData.zoomLink}
                onChange={handleChange}
                placeholder="https://zoom.us/j/xxxxxxx"
                className="w-full px-4 py-2.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Default Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiClock className="mr-2" /> Default Time *
                </label>
                <input
                  type="time"
                  name="defaultTime"
                  required
                  value={formData.defaultTime}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                />
              </div>

              {/* Timezone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                  <FiSettings className="mr-2" /> Timezone
                </label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-green-200 rounded-xl focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
                >
                  <option value="Asia/Kolkata">India (Kolkata, GMT+5:30)</option>
                  <option value="UTC">UTC</option>
                  {/* Add more timezones as needed */}
                </select>
              </div>
            </div>

            {/* Recurring Days */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Recurring Days *
              </label>
              <div className="flex flex-wrap gap-2">
                {days?.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => handleDayToggle(day.value)}
                    className={`flex items-center justify-center w-10 h-10 rounded-full transition-colors ${formData.settings?.recurringDays?.includes(day.value) ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-gray-50 text-gray-500 border border-gray-200'}`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Minimum Attendance Duration */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Minimum Attendance Duration (minutes) *
              </label>
              <input
                type="number"
                name="settings.minAttendanceDuration"
                min="1"
                value={formData?.settings?.minAttendanceDuration}
                onChange={handleChange}
                className="w-24 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              />
            </div>

            {/* Send Reminders */}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="settings.sendReminders"
                id="sendReminders"
                checked={formData?.settings?.sendReminders}
                onChange={handleChange}
                className="w-4 h-4 text-green-500 border-green-300 rounded focus:ring-green-300"
              />
              <label htmlFor="sendReminders" className="ml-2 block text-sm text-gray-700">
                Send WhatsApp reminders
              </label>
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
                {loading ? (
                  'Saving...'
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    {meeting ? 'Update Meeting' : 'Create Meeting'}
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