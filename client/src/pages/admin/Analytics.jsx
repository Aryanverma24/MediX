import React, { useState, useEffect } from 'react';
import { 
  FiUsers, 
  FiCalendar, 
  FiClock, 
  FiTrendingUp, 
  FiFilter, 
  FiDownload,
  FiBarChart2,
  FiPieChart,
  FiActivity
} from 'react-icons/fi';
import { BsGraphUp, BsPeopleFill, BsCalendarCheck } from 'react-icons/bs';
import { toast } from 'react-hot-toast';
import API from '../../utils/api';

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30days');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock data - replace with actual API calls
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: {
      total: 0,
      newUsers: 0,
      growthRate: 0,
      trend: 'up',
    },
    meetingStats: {
      totalMeetings: 0,
      avgParticipants: 0,
      avgDuration: 0,
      completionRate: 0,
    },
    engagement: {
      activeUsers: 0,
      avgSessionDuration: 0,
      returnUsers: 0,
    },
    // Add more data structures as needed
  });

  useEffect(() => {
    fetchAnalyticsData();
  }, [timeRange]);

  const fetchAnalyticsData = async () => {
    try {
      setLoading(true);
      // Replace with actual API endpoint
      // const response = await API.get(`/admin/analytics?range=${timeRange}`);
      // setAnalyticsData(response.data);
      
      // Mock data
      setAnalyticsData({
        userGrowth: {
          total: 2453,
          newUsers: 342,
          growthRate: 12.5,
          trend: 'up',
        },
        meetingStats: {
          totalMeetings: 128,
          avgParticipants: 24,
          avgDuration: 42,
          completionRate: 78,
        },
        engagement: {
          activeUsers: 1245,
          avgSessionDuration: 32,
          returnUsers: 78,
        },
      });
    } catch (error) {
      console.error('Error fetching analytics data:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  const handleExport = (format = 'csv') => {
    // Implement export functionality
    toast.success(`Exporting analytics data as ${format.toUpperCase()}`);
  };

  const renderMetricCard = (icon, title, value, change = null, isCurrency = false) => (
    <div className="bg-white rounded-xl shadow-sm p-6 h-full">
      <div className="flex items-center">
        <div className="p-3 rounded-lg bg-purple-100 text-purple-600">
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <div className="flex items-baseline">
            <p className="text-2xl font-semibold text-gray-900">
              {isCurrency && '$'}{value.toLocaleString()}
            </p>
            {change && (
              <span className={`ml-2 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {change >= 0 ? '↑' : '↓'} {Math.abs(change)}%
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 min-h-screen ml-[16rem] bg-gradient-to-br from-blue-50 via-purple-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h1>
            <p className="text-gray-600">Gain insights into platform performance and user behavior</p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-3">
            <div className="relative">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg pl-4 pr-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="7days">Last 7 days</option>
                <option value="30days">Last 30 days</option>
                <option value="90days">Last 90 days</option>
                <option value="all">All time</option>
              </select>
              <FiFilter className="absolute right-3 top-2.5 text-gray-400" />
            </div>
            <button
              onClick={() => handleExport('pdf')}
              className="flex items-center px-4 py-2 text-sm text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
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
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`${
                activeTab === 'users'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              User Analytics
            </button>
            <button
              onClick={() => setActiveTab('meetings')}
              className={`${
                activeTab === 'meetings'
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Meeting Analytics
            </button>
          </nav>
        </div>

        {loading ? (
          <div className="flex justify-center items-center p-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {renderMetricCard(
                <FiUsers className="text-xl" />,
                'Total Users',
                analyticsData.userGrowth.total
              )}
              {renderMetricCard(
                <FiTrendingUp className="text-xl" />,
                'New Users (30d)',
                analyticsData.userGrowth.newUsers,
                analyticsData.userGrowth.growthRate
              )}
              {renderMetricCard(
                <BsCalendarCheck className="text-xl" />,
                'Total Meetings',
                analyticsData.meetingStats.totalMeetings
              )}
              {renderMetricCard(
                <FiActivity className="text-xl" />,
                'Active Users',
                analyticsData.engagement.activeUsers
              )}
            </div>

            {/* Main Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">User Growth</h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-sm rounded-lg bg-purple-50 text-purple-600">Daily</button>
                    <button className="px-3 py-1 text-sm rounded-lg text-gray-500 hover:bg-gray-50">Weekly</button>
                    <button className="px-3 py-1 text-sm rounded-lg text-gray-500 hover:bg-gray-50">Monthly</button>
                  </div>
                </div>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <BsGraphUp className="text-4xl text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">User growth chart will be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1">(Integration with chart library needed)</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">User Distribution</h3>
                <div className="h-80 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <FiPieChart className="text-4xl text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Pie chart will be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1">(Integration with chart library needed)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Meeting Statistics</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500">Average Participants</p>
                    <p className="text-xl font-semibold">{analyticsData.meetingStats.avgParticipants}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Average Duration</p>
                    <p className="text-xl font-semibold">{analyticsData.meetingStats.avgDuration} min</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Completion Rate</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                      <div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        style={{ width: `${analyticsData.meetingStats.completionRate}%` }}
                      ></div>
                    </div>
                    <p className="text-right text-sm text-gray-500 mt-1">
                      {analyticsData.meetingStats.completionRate}%
                    </p>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Timeline</h3>
                <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                  <div className="text-center p-4">
                    <FiBarChart2 className="text-4xl text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500">Activity timeline will be displayed here</p>
                    <p className="text-xs text-gray-400 mt-1">(Integration with chart library needed)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Analytics;
