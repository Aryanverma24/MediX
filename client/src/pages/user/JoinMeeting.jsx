// src/pages/JoinMeeting.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiVideo,
  FiArrowRight,
  FiUser,
  FiLock,
  FiCalendar,
  FiYoutube,
} from "react-icons/fi";
import { toast } from "react-hot-toast";
import API from "../../utils/api";
import SavedVideos from "../../components/SavedVideos";
import { useAuth } from "../../hooks/useAuth";
import CountdownTimer from "../../components/CountdownTimer";

const JoinMeeting = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [meetingId, setMeetingId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState(user?.name || "");
  const [isJoining, setIsJoining] = useState(false);
  const [todayMeeting, setTodayMeeting] = useState(null);
  const [meetingStartTime, setMeetingStartTime] = useState(null);

  const [savedVideos] = useState([
    {
      id: 1,
      title: "Morning Meditation for Positive Energy",
      duration: "10:30",
      url: "https://www.youtube.com/watch?v=inpok4MKVLM",
      description: "Start your day with positive energy and clear your mind.",
      thumbnail: "https://img.youtube.com/vi/inpok4MKVLM/hqdefault.jpg",
    },
    {
      id: 2,
      title: "Deep Breathing Exercise for Stress",
      duration: "5:15",
      url: "https://www.youtube.com/watch?v=tF7YLG4e5k0",
      description: "Calm your mind with this simple breathing exercise.",
      thumbnail: "https://img.youtube.com/vi/tF7YLG4e5k0/hqdefault.jpg",
    },
    {
      id: 3,
      title: "Guided Sleep Meditation",
      duration: "15:00",
      url: "https://www.youtube.com/watch?v=1ZYbU82GVz4",
      description: "Fall asleep faster with this relaxing meditation.",
      thumbnail: "https://img.youtube.com/vi/1ZYbU82GVz4/hqdefault.jpg",
    },
    {
      id: 4,
      title: "Anxiety Relief Meditation",
      duration: "12:45",
      url: "https://www.youtube.com/watch?v=O-6f5wQXSu8",
      description: "Reduce anxiety and find your calm.",
      thumbnail: "https://img.youtube.com/vi/O-6f5wQXSu8/hqdefault.jpg",
    },
    // ... keep rest
  ]);

  // Check meeting time: show meditation if meeting coming up
  const checkMeetingTime = useCallback((meeting) => {
    if (!meeting || !meeting.startTime) return false;
    const now = new Date();
    const today = now.toISOString().split("T")[0];
    const [hours, minutes] = meeting.startTime.split(":").map(Number);
    const meetingTime = new Date(today);
    meetingTime.setHours(hours, minutes, 0, 0);

    const timeUntilMeeting = meetingTime - now;
    const oneHourInMs = 60 * 60 * 1000;

    if (timeUntilMeeting > 0 && timeUntilMeeting <= oneHourInMs) {
      setMeetingStartTime(meetingTime);
      return true;
    } else if (timeUntilMeeting > oneHourInMs) {
      // meeting scheduled later today
      setMeetingStartTime(meetingTime);
      return true;
    }
    return false;
  }, []);

  // Fetch today's meeting
  useEffect(() => {
    const fetchTodaysMeeting = async () => {
      try {
        const { data } = await API.get("/meeting/today");
        // protected route
        if (data && data.meeting) {
          setTodayMeeting(data.meeting);
          if (!meetingId && data.meeting._id) setMeetingId(data.meeting._id);
          checkMeetingTime(data.meeting);
        } else {
          setTodayMeeting(null);
        }
      } catch (err) {
        console.error("Error fetching today's meeting:", err);
        // Only show toast if it's an actual error (not expected 404)
        toast.error("Failed to fetch today's meeting");
      }
    };

    fetchTodaysMeeting();
  }, [
    checkMeetingTime,
     meetingId]);

  // Resilient leave call: try attendance leave by attendanceId, fallback to meeting/leave by meetingId
  const callLeaveEndpoint = async () => {
    // Try attendance leave by attendance id first
    try {
      const attendanceId = sessionStorage.getItem('attendanceId')
      if(!attendanceId) return
      if (attendanceId) {
        await API.post(`/attendance/leave/${attendanceId}`);
        return true;
      }
    } catch (err) {
      // ignore and try fallback
      console.warn("attendance/leave failed, trying meeting/leave:", err?.response?.data || err);
    }

    return false;
  };

  // Join meeting: POST /meeting/join with {meetingId}
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!meetingId?.trim()) {
      toast.error("Please enter a meeting ID");
      return;
    }
    if (!name?.trim()) {
      toast.error("Please enter your name");
      return;
    }

    // if meeting is scheduled in future and you want to prevent early join
    if (meetingStartTime && new Date() < meetingStartTime) {
      const minutesLeft = Math.ceil((meetingStartTime - new Date()) / (60 * 1000));
      if (minutesLeft > 60) {
        toast.error(`Meeting will start in ${Math.floor(minutesLeft / 60)} hours`);
        return;
      }
      toast.error(`Meeting will start in ${minutesLeft} minutes`);
      return;
    }

    setIsJoining(true);

    try {
      // server expects { meetingId } in body
      const res = await API.post("/meeting/join", { meetingId });
      if (!res?.data?.success) {
        toast.error(res?.data?.message || "Failed to join meeting");
        setIsJoining(false);
        return;
      }

      const { redirect, attendanceId } = res.data;
      // store attendance id to clean up & update leave
      if (attendanceId) sessionStorage.setItem("attendanceId", attendanceId);

      // open meeting link
      if (redirect) {
        const meetingWindow = window.open(redirect, "_blank");
        toast.success("Joining meeting...");

        window.addEventListener("beforeunload", callLeaveEndpoint);
        document.addEventListener("visibilitychange",() => {
          if(document.visibilityState==="hidden")callLeaveEndpoint()
        });

        // Poll for meeting window closed
        const interval = setInterval(async () => {
          try {
            if (!meetingWindow || meetingWindow.closed) {
              clearInterval(interval);
              callLeaveEndpoint();
            }
          } catch (err) {
            console.error("poll window closed err", err);
          }
        }, 1000);
      } else {
        toast.error("Meeting link not available");
      }
    } catch (err) {
      console.error("joinMeeting error:", err);
      toast.error(err?.response?.data?.message || "Failed to join meeting");
    } finally {
      setIsJoining(false);
    }
  };

  // component unmount cleanup: try to send leave if still present
  useEffect(() => {
    return () => {
      const attendanceId = sessionStorage.getItem("attendanceId");
      if (attendanceId) {
        // best-effort (no await in cleanup)
        callLeaveEndpoint().finally(() => {
          sessionStorage.removeItem("attendanceId");
        });
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  return (
    <div className="pt-[5rem] min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-white">
      <div className="p-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero */}
          <div className="mb-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl shadow-lg overflow-hidden">
            <div className="p-8 text-white">
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{todayMeeting?.title || "Daily Meditation Session"}</h2>
                  <div className="flex items-center text-purple-100">
                    <FiCalendar className="mr-2" />
                    {todayMeeting?.startTime ? (
                      <div className="flex items-center">
                        <span className="mr-2">Today • {todayMeeting.startTime}</span>
                        <CountdownTimer targetTime={meetingStartTime} onComplete={() => setShowMeditation(false)} />
                      </div>
                    ) : (
                      <span>No meeting scheduled for today</span>
                    )}
                  </div>
                  {todayMeeting?.description && <p className="mt-3 text-purple-100 max-w-2xl">{todayMeeting.description}</p>}
                </div>

                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => todayMeeting?.zoomLink && window.open(todayMeeting.zoomLink, "_blank")}
                    className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg shadow-md hover:bg-purple-50 transition-colors flex items-center justify-center"
                    disabled={!todayMeeting?.zoomLink}
                  >
                    <FiVideo className="mr-2" />
                    {todayMeeting?.zoomLink ? "Join Live Now" : "No Meeting Scheduled"}
                  </button>

                  {todayMeeting?.materials && (
                    <a href={todayMeeting.materials} target="_blank" rel="noreferrer" className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition-colors text-center">
                      View Meeting Materials
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Form + Extras */}
          <div className="grid grid-cols-1 px-25 mb-4">
            <div className="md:col-span-2">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-purple-100 mb-4">
                  <FiVideo className="h-8 w-8 text-purple-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Join a Meeting</h1>
                <p className="text-gray-600">Enter the meeting ID and your name to join</p>
              </div>

              <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
                <form onSubmit={handleSubmit} className="p-6">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="meetingId" className="block text-sm font-medium text-gray-700 mb-1">Meeting ID</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiVideo className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="meetingId"
                          value={meetingId}
                          onChange={(e) => setMeetingId(e.target.value)}
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                          placeholder="Enter meeting ID"
                          autoComplete="off"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                          placeholder="Enter your name"
                          autoComplete="name"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password (if required)</label>
                        <span className="text-xs text-gray-500">Optional</span>
                      </div>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiLock className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="password"
                          id="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="focus:ring-purple-500 focus:border-purple-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-3"
                          placeholder="Enter password"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isJoining}
                        className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 transition-colors duration-200 ${isJoining ? "opacity-70 cursor-not-allowed" : ""}`}
                      >
                        {isJoining ? "Joining..." : (<><span>Join Meeting</span><FiArrowRight className="ml-2 h-4 w-4" /></>)}
                      </button>
                    </div>
                  </div>
                </form>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">Don't have a meeting ID? Ask the meeting organizer for it.</p>
              </div>
            </div>
          </div>
        </div>

        <SavedVideos
        videos={savedVideos}
        onBack={() => setShowMeditation(false)}
         />
      </div>
    </div>
  );
};

export default JoinMeeting;
