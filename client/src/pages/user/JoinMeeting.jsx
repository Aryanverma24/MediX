import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiVideo, FiClock, FiCalendar, FiArrowRight, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import API from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import SavedVideos from '../../components/SavedVideos';
import { meditationVideos } from '../../data/meditationVideos';

const JoinMeeting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  const [meeting, setMeeting] = useState(null);
  const [session, setSession] = useState(null);
  const [userName, setUserName] = useState(user?.name || '');
  const [isInSession, setIsInSession] = useState(false);
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 5,
    total: 0,
    pages: 1
  });
  const [loadingHistory, setLoadingHistory] = useState(false);

  const FEEDBACK_PENDING_KEY = 'meeting_feedback_pending';

  // Fetch session history
  useEffect(() => {
    const fetchSessionHistory = async () => {
      try {
        setLoadingHistory(true);
        const res = await API.get(`/meetings/history?page=${pagination.page}&limit=${pagination.limit}`);
        setHistory(res.data.data);
        setPagination(prev => ({
          ...prev,
          total: res.data.pagination.total,
          pages: res.data.pagination.pages
        }));
      } catch (error) {
        console.error('Error fetching session history:', error);
        toast.error('Failed to load session history');
      } finally {
        setLoadingHistory(false);
      }
    };

    fetchSessionHistory();
  }, [pagination.page]);

  // Fetch today's session
  useEffect(() => {
    const fetchTodaySession = async () => {
      try {
        const res = await API.get('/meetings/today');
        if (res.data?.meeting) {
          setMeeting(res.data.meeting);
          setSession(res.data.meeting.session);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        toast.error('Failed to load session details');
      } finally {
        setLoading(false);
      }
    };

    fetchTodaySession();
  }, []);

  const handleJoin = async () => {
    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }

    setJoining(true);
    try {
      const joinRes = await API.post('/meetings/join', { userName });
      
      if (joinRes.data?.redirect) {
        if (session?._id) {
          localStorage.setItem(
            FEEDBACK_PENDING_KEY,
            JSON.stringify({
              sessionId: session._id,
              meetingId: meeting?._id,
              userName,
              startedAt: Date.now()
            })
          );
        }

        const meetingWindow = window.open(joinRes.data.redirect, '_blank');
        if (!meetingWindow) {
          toast.error('Popup blocked. Please allow popups and try again.');
          setJoining(false);
          return;
        }
        setIsInSession(true);
        toast.success('Joining session...');

        const checkWindow = setInterval(() => {
          if (meetingWindow.closed) {
            clearInterval(checkWindow);
            handleLeave();
          }
        }, 1000);
      }
    } catch (error) {
      console.error('Error joining session:', error);
      toast.error(error.response?.data?.message || 'Failed to join session');
      setJoining(false);
    }
  };

  const handleLeave = async () => {
    try {
      if (session?._id) {
        localStorage.setItem(
          FEEDBACK_PENDING_KEY,
          JSON.stringify({
            sessionId: session._id,
            meetingId: meeting?._id,
            userName,
            startedAt: Date.now()
          })
        );
      }

      if (session?._id) {
        await API.post(`/meetings/leave/${session._id}`);
      }
      setIsInSession(false);
      setJoining(false);

      window.dispatchEvent(new Event('feedback:pending'));
    } catch (error) {
      console.error('Error leaving session:', error);
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isInSession && session?._id) {
        const data = new FormData();
        data.append('sessionId', session._id);
        navigator.sendBeacon(`/api/meetings/leave/${session._id}`, data);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isInSession, session]);

  // Calculate time until session
  const sessionTime = new Date(session?.startTime || new Date().toISOString().split('T')[0]);
  if (meeting?.defaultTime) {
    const [hours, minutes] = meeting.defaultTime.split(':');
    sessionTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
  }

  const now = new Date();
  const diffMs = sessionTime - now;
  let MinDiff = diffMs > 0 ? Math.floor(diffMs / (1000 * 60)) : 0;

  // if (MinDiff > 15) {
  //   return <SavedVideos videos={meditationVideos} onBack={() => navigate('/dashboard')} />;
  // }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!meeting || !session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 max-w-md">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <FiCalendar className="h-6 w-6 text-red-600" />
          </div>
          <h3 className="mt-2 text-lg font-medium text-gray-900">No session today</h3>
          <p className="mt-1 text-sm text-gray-500">
            There are no meditation sessions scheduled for today.
          </p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const isSessionLive = session.status === 'live';
  const isSessionScheduled = session.status === 'scheduled';
  const isSessionCompleted = session.status === 'completed';

  return (
    <div className="min-h-screen pt-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Session Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              {meeting.title}
            </h1>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
              isSessionScheduled ? 'bg-blue-100 text-blue-800' :
              isSessionLive ? 'bg-green-100 text-green-800' :
              'bg-gray-100 text-gray-800'
            }`}>
              {session.status.charAt(0).toUpperCase() + session.status.slice(1)}
            </span>
          </div>
          
          {isSessionScheduled && (
            <p className="text-lg text-blue-600">
              Session starts at {meeting.defaultTime} ({meeting.timezone})
            </p>
          )}
          {isSessionLive && (
            <p className="text-lg text-green-600">
              Session is Live! Join now
            </p>
          )}
          {isSessionCompleted && (
            <p className="text-lg text-gray-600">
              This session has ended. Check back tomorrow for the next one!
            </p>
          )}
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* Session Info */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Session Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-purple-500">
                      <FiCalendar className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Date</p>
                      <p className="text-sm text-gray-900">
                        {new Date(sessionTime).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-6 w-6 text-purple-500">
                      <FiClock className="h-6 w-6" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">Time</p>
                      <p className="text-sm text-gray-900">
                        {meeting.defaultTime} ({meeting.timezone})
                      </p>
                    </div>
                  </div>

                  {isSessionScheduled && (
                      <Link 
                      to={"/meditation-videos"}
                      className="p-4 border-2 border-dashed border-blue-400 bg-blue-50 text-center  hover:bg-blue-400 text-blue-700 hover:text-white rounded-3xl w-72">
                        <button className="text-sm mt-4  w-48 md:w-72">
                         Check Saved Videos
                        </button>
                      </Link>
                    )}


                  {isSessionCompleted && session.endTime && (
                    <div className="flex items-start">
                      <div className="flex-shrink-0 h-6 w-6 text-purple-500">
                        <FiClock className="h-6 w-6" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-500">Ended At</p>
                        <p className="text-sm text-gray-900">
                          {new Date(session.endTime).toLocaleTimeString('en-US', {
                            hour: '2-digit',
                            minute: '2-digit',
                            timeZone: meeting.timezone
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {isSessionCompleted && (
                  <div className="mt-6 p-4 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      This session has ended. Check back tomorrow for the next one!
                    </p>
                  </div>
                )}
              </div>

              {/* Join Form */}
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-4">Join Session</h2>
                
                {!isInSession ? (
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                        placeholder="Enter your name"
                      />
                    </div>

                    {isSessionScheduled && (
                      <div className="p-4 bg-blue-50 rounded-md">
                        <p className="text-sm text-blue-700">
                          Session will start at {meeting.defaultTime}. Please check back then!
                        </p>
                      </div>
                    )}

                    {isSessionLive && (
                      <button
                        type="button"
                        onClick={handleJoin}
                        disabled={joining}
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                      >
                        {joining ? 'Joining...' : 'Join Session'}
                        <FiArrowRight className="ml-2 h-4 w-4" />
                      </button>
                    )}

                    {isSessionCompleted && (
                      <div className="p-4 bg-gray-100 rounded-md">
                        <p className="text-sm text-gray-700">
                          This session has ended. Check back tomorrow for the next one!
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center p-6 bg-gray-50 rounded-lg">
                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                      <FiVideo className="h-6 w-6 text-green-600" />
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">You're in the session</h3>
                    <p className="mt-1 text-sm text-gray-500">
                      The meeting should have opened in a new tab.
                    </p>
                    <div className="mt-6">
                      <button
                        type="button"
                        onClick={handleLeave}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                      >
                        Leave Session
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Session History */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Your Session History</h2>
            <button
              onClick={() => navigate('/me/history')}
              className="text-sm font-medium text-purple-600 hover:text-purple-500"
            >
              View all history →
            </button>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {loadingHistory ? (
              <div className="flex justify-center p-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
              </div>
            ) : history.length === 0 ? (
              <div className="text-center p-8 text-gray-500">
                No session history found
              </div>
            ) : (
              <>
                <ul className="divide-y divide-gray-200">
                  {history.map((item) => {
                    const sessionDate = new Date(item.session.startTime);
                    const duration = item.session.attendees?.duration || 0;
                    const isCompleted = item.session.status === 'completed';
                    
                    return (
                      <li key={item.session._id} className="px-6 py-4 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-purple-600 truncate">
                            {item.title}
                          </p>
                          <div className="ml-2 flex-shrink-0 flex">
                            <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              isCompleted 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {isCompleted ? 'Completed' : 'Incomplete'}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex justify-between items-center">
                          <div className="flex text-sm text-gray-500">
                            <span>
                              {sessionDate.toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                              })}
                              {isCompleted && duration > 0 && (
                                <span className="ml-2">• {Math.floor(duration / 60)} min</span>
                              )}
                            </span>
                          </div>
                          <div className="flex-shrink-0">
                            <div className={`h-5 w-5 rounded-full flex items-center justify-center ${
                              isCompleted ? 'bg-green-400' : 'bg-yellow-400'
                            }`}>
                              {isCompleted && (
                                <svg className="h-3.5 w-3.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                                  <path d="M10.28 2.28L3.987 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                                </svg>
                              )}
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                
                {/* Pagination */}
                {pagination.pages > 1 && (
                  <div className="bg-gray-50 px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                    <div className="flex-1 flex justify-between sm:justify-end">
                      <button
                        onClick={() => setPagination(prev => ({ ...prev, page: Math.max(1, prev.page - 1) }))}
                        disabled={pagination.page === 1}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          pagination.page === 1 
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <FiChevronLeft className="h-5 w-5" />
                        Previous
                      </button>
                      <div className="flex items-center mx-4">
                        <span className="text-sm text-gray-700">
                          Page {pagination.page} of {pagination.pages}
                        </span>
                      </div>
                      <button
                        onClick={() => setPagination(prev => ({ ...prev, page: Math.min(prev.pages, prev.page + 1) }))}
                        disabled={pagination.page >= pagination.pages}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                          pagination.page >= pagination.pages
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                            : 'bg-white text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        Next
                        <FiChevronRight className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinMeeting;