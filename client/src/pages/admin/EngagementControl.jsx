import React, { useState, useEffect } from 'react';
import { FiUsers, FiActivity, FiClock, FiTrendingUp, FiFilter, FiDownload } from 'react-icons/fi';
import { BsGraphUp, BsPeopleFill } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';

const EngagementControl = () => {
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeUsers: 0,
    avgSessionDuration: 0,
    completionRate: 0,
    dailyActiveUsers: 0,
  });
  
  const [timeRange, setTimeRange] = useState('7days');
  const [loading, setLoading] = useState(true);
  const [userActivity, setUserActivity] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data for charts (replace with actual API calls)
  const engagementData = {
    dailyActiveUsers: [65, 59, 80, 81, 56, 55, 40],
    sessionDuration: [30, 45, 25, 60, 50, 40, 55],
    completionRates: [75, 82, 68, 90, 78, 85, 80],
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  };

  useEffect(() => {
    fetchEngagementMetrics();
    fetchUserActivity();
  }, [timeRange]);

  const fetchEngagementMetrics = async () => {
    try {
      setLoading(true);
      // Replace with actual API endpoint
      // const response = await API.get(`/admin/engagement-metrics?range=${timeRange}`);
      // setMetrics(response.data);
      
      // Mock data for now
      setMetrics({
        totalUsers: 1245,
        activeUsers: 876,
        avgSessionDuration: 42,
        completionRate: 78,
        dailyActiveUsers: 324,
      });
    } catch (error) {
      console.error('Error fetching engagement metrics:', error);
      toast.error('Failed to load engagement metrics');
    } finally {
      setLoading(false);
    }
  };

  const fetchUserActivity = async () => {
    try {
      // Replace with actual API endpoint
      // const response = await API.get(`/admin/user-activity?range=${timeRange}`);
      // setUserActivity(response.data);
      
      // Mock data for now
      setUserActivity([
        { id: 1, name: 'John Doe', email: 'john@example.com', lastActive: '2 hours ago', sessions: 5, status: 'active' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com', lastActive: '5 hours ago', sessions: 3, status: 'idle' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com', lastActive: '1 day ago', sessions: 7, status: 'active' },
        { id: 4, name: 'Alice Williams', email: 'alice@example.com', lastActive: '3 days ago', sessions: 2, status: 'inactive' },
        { id: 5, name: 'Charlie Brown', email: 'charlie@example.com', lastActive: '1 hour ago', sessions: 4, status: 'active' },
      ]);
    } catch (error) {
      console.error('Error fetching user activity:', error);
      toast.error('Failed to load user activity');
    }
  };

  const handleExport = (format = 'csv') => {
    // Implement export functionality
    toast.success(`Exporting engagement data as ${format.toUpperCase()}`);
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      active: 'bg-green-100 text-green-700',
      idle: 'bg-amber-100 text-amber-700',
      inactive: 'bg-gray-100 text-gray-600',
    };
    
    return (
      <span className={`px-3 py-1 text-xs font-medium rounded-full ${statusClasses[status] || 'bg-gray-100'}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="admin-scroll p-6 min-h-screen md:ml-[18rem] bg-gradient-to-br from-green-50 via-cream-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Engagement Control</h1>
            <p className="text-gray-600">Monitor and analyze user engagement metrics</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-green-200 rounded-xl pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-300 focus:border-green-300 transition-all"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="all">All time</option>
              </select>
              <FiFilter className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={() => handleExport('csv')}
              className="flex items-center px-4 py-2 text-sm text-white bg-green-500 rounded-xl hover:bg-green-600 transition-all shadow-sm hover:shadow-md"
            >
              <FiDownload className="mr-2" /> Export
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`${
                activeTab === 'overview'
                  ? 'border-green-500 text-green-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-200'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-green-500 text-green-600 font-medium'
                  : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-200'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              User Activity
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
          </div>
        ) : activeTab === 'overview' ? (
          <>
            {/* Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 hover:border-green-100 transition-all">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-green-50 text-green-500">
                    <FiUsers className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Total Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.totalUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 hover:border-green-100 transition-all">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-green-50 text-green-500">
                    <BsPeopleFill className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Active Users</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.activeUsers.toLocaleString()}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 hover:border-green-100 transition-all">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-blue-50 text-blue-500">
                    <FiClock className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Avg. Session</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.avgSessionDuration} min</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6 border border-green-50 hover:border-green-100 transition-all">
                <div className="flex items-center">
                  <div className="p-3 rounded-xl bg-amber-50 text-amber-500">
                    <FiTrendingUp className="text-xl" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-500">Completion Rate</p>
                    <p className="text-2xl font-semibold text-gray-900">{metrics.completionRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Active Users</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <BsGraphUp className="text-4xl text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Chart will be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1">(Integration with chart library needed)</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Session Duration</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <BsGraphUp className="text-4xl text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Chart will be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1">(Integration with chart library needed)</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          /* User Activity Tab */
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sessions</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {userActivity.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                            {user.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.lastActive}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.sessions}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(user.status)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="bg-white px-6 py-3 flex items-center justify-between border-t border-gray-200">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
                    <span className="font-medium">20</span> results
                  </p>
                </div>
                <div>
                  <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Previous</span>
                      <FiChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      aria-current="page"
                      className="z-10 bg-purple-50 border-purple-500 text-purple-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                    >
                      1
                    </button>
                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      2
                    </button>
                    <button className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium">
                      3
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                      <span className="sr-only">Next</span>
                      <FiChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EngagementControl;
