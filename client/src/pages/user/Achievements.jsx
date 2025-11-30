import React, { useState, useEffect } from 'react';
import { FiAward, FiCheckCircle, FiLock, FiStar, FiTrendingUp, FiZap } from 'react-icons/fi';
import { toast } from 'react-hot-toast';

// Mock data - replace with actual API calls
const mockAchievements = [
  {
    id: 1,
    name: 'Early Bird',
    description: 'Attend 5 morning meetings',
    icon: <FiAward className="h-8 w-8 text-yellow-500" />,
    points: 50,
    earned: true,
    progress: 5,
    target: 5,
    dateEarned: '2025-11-20T10:00:00'
  },
  {
    id: 2,
    name: 'Perfect Week',
    description: 'Attend all meetings in a week',
    icon: <FiStar className="h-8 w-8 text-blue-500" />,
    points: 100,
    earned: true,
    progress: 1,
    target: 1,
    dateEarned: '2025-11-15T10:00:00'
  },
  {
    id: 3,
    name: 'Engagement Master',
    description: 'Maintain 90%+ engagement for 5 meetings',
    icon: <FiTrendingUp className="h-8 w-8 text-purple-500" />,
    points: 75,
    earned: true,
    progress: 5,
    target: 5,
    dateEarned: '2025-11-18T14:30:00'
  },
  {
    id: 4,
    name: 'Consistency King',
    description: 'Attend 20 meetings in a row',
    icon: <FiZap className="h-8 w-8 text-green-500" />,
    points: 200,
    earned: false,
    progress: 12,
    target: 20
  },
  {
    id: 5,
    name: 'Night Owl',
    description: 'Attend 5 evening meetings',
    icon: <FiAward className="h-8 w-8 text-indigo-500" />,
    points: 50,
    earned: false,
    progress: 2,
    target: 5
  },
  {
    id: 6,
    name: 'Team Player',
    description: 'Collaborate in 10 meetings',
    icon: <FiAward className="h-8 w-8 text-pink-500" />,
    points: 75,
    earned: false,
    progress: 3,
    target: 10
  }
];

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'earned', 'in-progress'

  useEffect(() => {
    // Simulate API call
    const fetchAchievements = async () => {
      try {
        setIsLoading(true);
        // In a real app, you would fetch this data from your API
        // const response = await API.get('/api/achievements');
        // setAchievements(response.data);
        
        // Using mock data for now
        setAchievements(mockAchievements);
      } catch (error) {
        console.error('Error fetching achievements:', error);
        toast.error('Failed to load achievements');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter(achievement => {
    if (activeTab === 'earned') return achievement.earned;
    if (activeTab === 'in-progress') return !achievement.earned;
    return true; // 'all' tab
  });

  const earnedAchievements = achievements.filter(a => a.earned).length;
  const totalPoints = achievements
    .filter(a => a.earned)
    .reduce((sum, a) => sum + a.points, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className='pt-[5rem] p-4 flex-1 min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white'>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-800">Achievements</h1>
            <p className="text-gray-600">Track your progress and earn rewards</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-5 mb-8 sm:grid-cols-3">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-purple-500 rounded-md p-3">
                    <FiAward className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Achievements
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {achievements.length}
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
                      Earned
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {earnedAchievements}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                        {Math.round((earnedAchievements / achievements.length) * 100)}%
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
                    <FiStar className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dt className="text-sm font-medium text-gray-500 truncate">
                      Total Points
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {totalPoints}
                      </div>
                    </dd>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex -mb-px space-x-8">
              <button
                onClick={() => setActiveTab('all')}
                className={`${
                  activeTab === 'all'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                All Achievements
              </button>
              <button
                onClick={() => setActiveTab('earned')}
                className={`${
                  activeTab === 'earned'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                Earned
              </button>
              <button
                onClick={() => setActiveTab('in-progress')}
                className={`${
                  activeTab === 'in-progress'
                    ? 'border-purple-500 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
              >
                In Progress
              </button>
            </nav>
          </div>

          {/* Achievements Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.length > 0 ? (
              filteredAchievements.map((achievement) => (
                <div
                  key={achievement.id}
                  className={`bg-white overflow-hidden shadow rounded-lg ${
                    !achievement.earned ? 'opacity-75' : ''
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        {achievement.earned ? (
                          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                            {achievement.icon}
                          </div>
                        ) : (
                          <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                            <FiLock className="h-6 w-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-medium text-gray-900">
                            {achievement.name}
                          </h3>
                          <span className="text-sm font-medium text-yellow-600">
                            {achievement.points} pts
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {achievement.description}
                        </p>
                        {!achievement.earned && (
                          <div className="mt-2">
                            <div className="flex justify-between text-sm text-gray-500 mb-1">
                              <span>Progress</span>
                              <span>
                                {achievement.progress} / {achievement.target}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-purple-600 h-2 rounded-full"
                                style={{
                                  width: `${(achievement.progress / achievement.target) * 100}%`,
                                }}
                              ></div>
                            </div>
                          </div>
                        )}
                        {achievement.earned && achievement.dateEarned && (
                          <p className="mt-2 text-xs text-gray-500">
                            Earned on {new Date(achievement.dateEarned).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-10">
                <div className="flex flex-col items-center justify-center">
                  <FiAward className="h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900">No achievements found</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {activeTab === 'earned'
                      ? "You haven't earned any achievements yet."
                      : activeTab === 'in-progress'
                      ? "No achievements in progress. Keep attending meetings to earn more!"
                      : "No achievements available."}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;
