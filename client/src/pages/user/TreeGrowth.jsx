import React, { useState, useEffect } from 'react';
import { FiAward, FiTrendingUp, FiZap, FiClock, FiVideo } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Mock data - replace with actual API calls
const mockGrowthData = {
  level: 7,
  currentXp: 650,
  xpToNextLevel: 1000,
  totalXp: 3650,
  streak: 12,
  achievements: [
    { id: 1, name: 'Early Bird', description: 'Attend 5 morning meetings', earned: true },
    { id: 2, name: 'Perfect Week', description: 'Attend all meetings in a week', earned: true },
    { id: 3, name: 'Engagement Master', description: 'Maintain 90%+ engagement for 5 meetings', earned: true },
    { id: 4, name: 'Consistency King', description: 'Attend 20 meetings in a row', earned: false },
    { id: 5, name: 'Night Owl', description: 'Attend 5 evening meetings', earned: false },
  ],
  recentActivity: [
    { id: 1, type: 'meeting', title: 'Team Standup', xp: 50, date: '2025-11-22T10:00:00' },
    { id: 2, type: 'streak', title: '3-day streak!', xp: 30, date: '2025-11-21T09:00:00' },
    { id: 3, type: 'achievement', title: 'Early Bird', xp: 100, date: '2025-11-20T10:00:00' },
    { id: 4, type: 'meeting', title: 'Project Review', xp: 50, date: '2025-11-20T14:30:00' },
    { id: 5, type: 'meeting', title: 'Team Standup', xp: 50, date: '2025-11-19T10:00:00' },
  ],
};

// Tree growth stages based on level
const treeStages = [
  '🌱', // Level 1
  '🌿', // Level 2
  '🌳', // Level 3
  '🌲', // Level 4
  '🌴', // Level 5
  '🌳', // Level 6
  '🌲🌳', // Level 7
  '🌳🌴', // Level 8
  '🌲🌳🌴', // Level 9
  '🌳🌳🌳', // Level 10
];

const TreeGrowth = () => {
  const [growthData, setGrowthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('progress'); // 'progress' or 'achievements'

  useEffect(() => {
    // Simulate API call
    const fetchGrowthData = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this data from your API
        // const response = await API.get('/api/tree-growth');
        // setGrowthData(response.data);
        
        // Using mock data for now
        setGrowthData(mockGrowthData);
      } catch (error) {
        console.error('Error fetching growth data:', error);
        toast.error('Failed to load growth data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrowthData();
  }, []);

  const calculateProgress = () => {
    if (!growthData) return 0;
    return Math.round((growthData.currentXp / growthData.xpToNextLevel) * 100);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const options = { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  if (isLoading || !growthData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className='pt-[5rem] p-4  flex-1 min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Tree Growth</h1>
            <p className="text-gray-600">Watch your tree grow as you attend meetings and achieve goals</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <FiTrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Current Level
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {growthData.level}
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
                    <FiZap className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      XP to Next Level
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {growthData.xpToNextLevel - growthData.currentXp}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                    <FiAward className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total XP
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {growthData.totalXp}
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
                      Day Streak
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {growthData.streak} days
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="flex -mb-px">
                <button
                  onClick={() => setActiveTab('progress')}
                  className={`${
                    activeTab === 'progress'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Your Progress
                </button>
                <button
                  onClick={() => setActiveTab('achievements')}
                  className={`${
                    activeTab === 'achievements'
                      ? 'border-purple-500 text-purple-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm`}
                >
                  Achievements
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'progress' ? (
                <div className="text-center">
                  {/* Tree Display */}
                  <div className="mb-8">
                    <div className="text-8xl mb-4">
                      {treeStages[Math.min(growthData.level - 1, treeStages.length - 1)]}
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">Level {growthData.level} Tree</h3>
                    <p className="text-sm text-gray-500">
                      {growthData.currentXp} / {growthData.xpToNextLevel} XP to next level
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-8">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>Level {growthData.level}</span>
                      <span>Level {growthData.level + 1}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-purple-600 h-4 rounded-full transition-all duration-500 ease-in-out"
                        style={{ width: `${calculateProgress()}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="mt-10 text-left">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
                    <div className="space-y-4">
                      {growthData.recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                            {activity.type === 'meeting' ? (
                              <FiVideo className="h-5 w-5 text-purple-600" />
                            ) : activity.type === 'streak' ? (
                              <FiZap className="h-5 w-5 text-yellow-500" />
                            ) : (
                              <FiAward className="h-5 w-5 text-green-500" />
                            )}
                          </div>
                          <div className="ml-4">
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-500">
                              {formatDate(activity.date)}
                              <span className="ml-2 text-green-600 font-medium">+{activity.xp} XP</span>
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Your Achievements</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {growthData.achievements.map((achievement) => (
                      <div
                        key={achievement.id}
                        className={`p-4 rounded-lg border ${
                          achievement.earned
                            ? 'bg-green-50 border-green-200'
                            : 'bg-gray-50 border-gray-200 opacity-60'
                        }`}
                      >
                        <div className="flex items-start">
                          <div className="flex-shrink-0">
                            {achievement.earned ? (
                              <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center">
                                <FiAward className="h-5 w-5 text-green-600" />
                              </div>
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                                <FiAward className="h-5 w-5 text-gray-400" />
                              </div>
                            )}
                          </div>
                          <div className="ml-3">
                            <h4 className="text-sm font-medium text-gray-900">
                              {achievement.name}
                            </h4>
                            <p className="text-sm text-gray-500">{achievement.description}</p>
                            <p className="mt-1 text-xs font-medium">
                              {achievement.earned ? (
                                <span className="text-green-600">Earned</span>
                              ) : (
                                <span className="text-gray-500">Locked</span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Tips & Next Steps */}
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-6 py-5 border-b border-gray-200">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                How to Grow Your Tree Faster
              </h3>
            </div>
            <div className="px-6 py-5">
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-500">
                    <FiZap className="h-6 w-6" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Maintain your streak:</span> Log in and attend meetings daily to keep your streak alive.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-500">
                    <FiAward className="h-6 w-6" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Complete achievements:</span> Earn bonus XP by completing specific challenges.
                  </p>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 h-6 w-6 text-green-500">
                    <FiTrendingUp className="h-6 w-6" />
                  </div>
                  <p className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Be engaged:</span> Active participation in meetings gives you more XP.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TreeGrowth;
