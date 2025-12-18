import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FiVideo, FiUser, FiClock, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import API from '../../utils/api';
import { useAuth } from '../../hooks/useAuth';
import SavedVideos  from '../../components/SavedVideos'
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

// Add this effect to fetch session history
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

// Add these pagination handlers
const handlePrevPage = () => {
  if (pagination.page > 1) {
    setPagination(prev => ({ ...prev, page: prev.page - 1 }));
  }
};

const handleNextPage = () => {
  if (pagination.page < pagination.pages) {
    setPagination(prev => ({ ...prev, page: prev.page + 1 }));
  }
};

  // Fetch today's session
  useEffect(() => {
    const fetchTodaySession = async () => {
      try {
        const res = await API.get('/meetings/today');
        if (res.data?.meeting) {
          setMeeting(res.data.meeting);
          setSession(res.data.meeting.session);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        toast.error('Failed to load session details');
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
      // Join the session
      const joinRes = await API.post('/meetings/join',{ userName: userName });
      
      // Open Zoom link in new tab
      if (joinRes.data?.redirect) {
        const meetingWindow = window.open(joinRes.data.redirect, '_blank');
        setIsInSession(true);
        toast.success('Joining session...');

        // Set up cleanup when window is closed
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
        await API.post(`/meetings/leave/${session._id}`);
      }
      setIsInSession(false);
      setJoining(false);
    } catch (error) {
      console.error('Error leaving session:', error);
    }
  };

  // Handle page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (isInSession && session?._id) {
        // Use sendBeacon for more reliable cleanup
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (!meeting || !session) {
    return (
      <div className="min-h-screen  flex items-center justify-center bg-gray-50">
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

  const sessionTime = new Date(session.startTime || `${new Date().toISOString().split('T')[0]}T${meeting.defaultTime}`);
  const isSessionLive = session.status === 'live' || session.status === 'scheduled';


const now = new Date();

const diffMs = sessionTime - now; // milliseconds difference
let MinDiff = 0;

if (diffMs <= 0) {
  console.log("Session already started or passed");
} else {
  const totalSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  MinDiff = hours * 60 + minutes
  console.log(
    `Session starts in ${hours}h ${minutes}m ${seconds}s`
  );
}

if(MinDiff > 15) {
  return (
   <SavedVideos 
   videos={meditationVideos}
   onBack={() => navigate('/dashboard')}
  /> )
}


  return (
    <div className="min-h-screen pt-12 bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            {meeting.title}
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            {session.status === 'completed' ? 'Session Completed' : 
             session.status === 'live' ? 'Session in Progress' : 'Upcoming Session'}
          </p>
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
                        {sessionTime.toLocaleTimeString('en-US', {
                          hour: '2-digit',
                          minute: '2-digit',
                          timeZone: meeting.timezone
                        })}
                      </p>
                    </div>
                  </div>
                </div>

                {session.status === 'completed' && (
                  <div className="mt-6 p-4 bg-green-50 rounded-md">
                    <p className="text-sm text-green-700">
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

                    <button
                      type="button"
                      onClick={handleJoin}
                      disabled={joining || !isSessionLive}
                      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${
                        !isSessionLive
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
                      }`}
                    >
                      {joining ? 'Joining...' : 'Join Session'}
                      <FiArrowRight className="ml-2 h-4 w-4" />
                    </button>

                    {!isSessionLive && (
                      <p className="mt-2 text-sm text-gray-500">
                        This session is not currently active.
                      </p>
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
                    </span>
                    <span className="mx-1">·</span>
                    <span>{duration} minutes</span>
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
                onClick={handlePrevPage}
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
                onClick={handleNextPage}
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