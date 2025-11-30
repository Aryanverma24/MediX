import React, { useState, useEffect } from 'react';
import { FiCalendar, FiClock, FiCheckCircle, FiXCircle, FiClock as FiClockIcon } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Mock data - replace with actual API calls
const mockAttendanceData = [
  {
    id: 1,
    title: 'Team Standup Meeting',
    date: '2025-11-20T10:00:00',
    duration: '45 mins',
    status: 'present',
    joinedAt: '2025-11-20T09:58:23',
    leftAt: '2025-11-20T10:42:15',
    attendedDuration: '43 mins 52 secs',
    engagementScore: 92,
  },
  {
    id: 2,
    title: 'Project Review',
    date: '2025-11-18T14:30:00',
    duration: '1 hour',
    status: 'late',
    joinedAt: '2025-11-18T14:42:11',
    leftAt: '2025-11-18T15:28:37',
    attendedDuration: '46 mins 26 secs',
    engagementScore: 88,
  },
  {
    id: 3,
    title: 'Client Demo',
    date: '2025-11-15T11:00:00',
    duration: '30 mins',
    status: 'absent',
    joinedAt: null,
    leftAt: null,
    attendedDuration: '0 mins',
    engagementScore: 0,
  },
  {
    id: 4,
    title: 'Sprint Planning',
    date: '2025-11-10T13:00:00',
    duration: '1 hour 30 mins',
    status: 'present',
    joinedAt: '2025-11-10T12:58:45',
    leftAt: '2025-11-10T14:27:12',
    attendedDuration: '1 hour 28 mins 27 secs',
    engagementScore: 95,
  },
];

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'all'
  const [stats, setStats] = useState({
    totalMeetings: 0,
    attendanceRate: 0,
    averageEngagement: 0,
  });

  useEffect(() => {
    // Simulate API call
    const fetchAttendance = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this data from your API
        // const response = await API.get(`/api/attendance?range=${timeRange}`);
        // setAttendance(response.data);
        
        // Using mock data for now
        setAttendance(mockAttendanceData);
        calculateStats(mockAttendanceData);
      } catch (error) {
        console.error('Error fetching attendance:', error);
        toast.error('Failed to load attendance data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAttendance();
  }, [timeRange]);

  const calculateStats = (data) => {
    if (!data.length) {
      setStats({
        totalMeetings: 0,
        attendanceRate: 0,
        averageEngagement: 0,
      });
      return;
    }

    const totalMeetings = data.length;
    const presentCount = data.filter(item => item.status !== 'absent').length;
    const attendanceRate = Math.round((presentCount / totalMeetings) * 100);
    const totalEngagement = data.reduce((sum, item) => sum + item.engagementScore, 0);
    const averageEngagement = Math.round(totalEngagement / totalMeetings);

    setStats({
      totalMeetings,
      attendanceRate,
      averageEngagement,
    });
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'present':
        return (
          <span className={`${baseClasses} bg-green-100 text-green-800`}>
            <FiCheckCircle className="mr-1" /> Present
          </span>
        );
      case 'late':
        return (
          <span className={`${baseClasses} bg-yellow-100 text-yellow-800`}>
            <FiClockIcon className="mr-1" /> Late
          </span>
        );
      case 'absent':
        return (
          <span className={`${baseClasses} bg-red-100 text-red-800`}>
            <FiXCircle className="mr-1" /> Absent
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className='pt-[5rem] min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">My Attendance</h1>
              <p className="text-gray-600">View your meeting attendance history and statistics</p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="inline-flex rounded-md shadow-sm">
                <button
                  onClick={() => setTimeRange('week')}
                  className={`px-4 py-2 text-sm font-medium rounded-l-md ${
                    timeRange === 'week'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  This Week
                </button>
                <button
                  onClick={() => setTimeRange('month')}
                  className={`px-4 py-2 text-sm font-medium -ml-px ${
                    timeRange === 'month'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  This Month
                </button>
                <button
                  onClick={() => setTimeRange('all')}
                  className={`px-4 py-2 text-sm font-medium rounded-r-md -ml-px ${
                    timeRange === 'all'
                      ? 'bg-purple-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  All Time
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <FiCalendar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Meetings
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.totalMeetings}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                    <FiCheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Attendance Rate
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.attendanceRate}%
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <FiClock className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Avg. Engagement
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {stats.averageEngagement}%
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance List */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Attendance History
              </h3>
              <p className="mt-1 max-w-2xl text-sm text-gray-500">
                Details about your meeting attendance and participation.
              </p>
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center p-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : attendance.length === 0 ? (
              <div className="text-center py-12">
                <FiCalendar className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No attendance records</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Your meeting attendance will appear here.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {attendance.map((meeting) => (
                  <li key={meeting.id}>
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-purple-600 truncate">
                          {meeting.title}
                        </p>
                        <div className="ml-2 flex-shrink-0 flex">
                          {getStatusBadge(meeting.status)}
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {formatDate(meeting.date)}
                          </p>
                          <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6">
                            <FiClock className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            {meeting.duration}
                          </p>
                        </div>
                        {meeting.status !== 'absent' && (
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {meeting.attendedDuration}
                            </span>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {meeting.engagementScore}% Engaged
                            </span>
                          </div>
                        )}
                      </div>
                      {meeting.status !== 'absent' && (
                        <div className="mt-2 text-xs text-gray-500">
                          <p>Joined: {formatDate(meeting.joinedAt)}</p>
                          <p>Left: {formatDate(meeting.leftAt)}</p>
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
