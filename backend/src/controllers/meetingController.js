import Meeting from "../models/MeetingModel.js";
import User from "../models/user.model.js";

/**
 * Create or update the single meeting (admin only)
 */
export const createOrUpdateMeeting = async (req, res) => {
  try {
    const { zoomLink, defaultTime, title, timezone, settings } = req.body;
    
    console.log(req.body)


    if (!zoomLink) {
      return res.status(400).json({ message: "Zoom link is required" });
    }

    // Find active meeting or create new one
    let meeting = await Meeting.findOne({ isActive: true });

    if (meeting) {
      // Update existing meeting
      meeting.zoomLink = zoomLink;
      meeting.title = title || meeting.title;
      meeting.defaultTime = defaultTime || meeting.defaultTime;
      meeting.timezone = timezone || meeting.timezone;
      if (settings) {
        meeting.settings = { ...meeting.settings, ...settings };
      }
    } else {
      // Create new meeting
      meeting = new Meeting({
        title: title || "Daily Meditation Session",
        zoomLink,
        defaultTime: defaultTime || "19:00",
        timezone: timezone || "Asia/Kolkata",
        host: req.user._id,
        settings: {
          minAttendanceDuration: 10, // minutes
          sendReminders: true,
          recurringDays: [0, 1, 2, 3, 4, 5, 6], // Every day
          ...settings
        }
      });
    }

    await meeting.save();
    res.status(200).json({ success: true, meeting });

  } catch (error) {
    console.error("createOrUpdateMeeting error:", error);
    res.status(500).json({ message: "Failed to update meeting" });
  }
};

/**
 * Get today's session
 */
export const getTodaySession = async (req, res) => {
  try {
    const meeting = await Meeting.getOrCreateToday();

    const today = new Date().toLocaleDateString('en-CA', { 
        timeZone: meeting.timezone 
    });
    const session = meeting.sessions.find(s => s.date === today) || {};
if (!session) {
         return res.status(200).json({ 
       success: true, 
       message: "No session scheduled for today.",
       meeting: { 
                _id: meeting._id, 
                title: meeting.title, 
                zoomLink: meeting.zoomLink 
            }
 }); }
    

   res.json({
 success: true,
 meeting: {
 _id: meeting._id,
 title: meeting.title,
zoomLink: meeting.zoomLink,
defaultTime: meeting.defaultTime, 
timezone: meeting.timezone,
session: session.toObject() 
}
    });
  } catch (error) {
    console.error("getTodaySession error:", error);
    res.status(500).json({ message: "Failed to get today's session" });
  }
};

/**
 * Join meeting session
 */
export const joinMeeting = async (req, res) => {
  try {
    const userId = req.user._id;
    const meeting = await Meeting.getOrCreateToday();
     const today = new Date().toLocaleDateString('en-CA', { 
        timeZone: meeting.timezone 
    });
    
    const session = meeting.sessions.find(s => s.date === today);

    console.log(session)
    if (!session) {
      return res.status(404).json({ message: "Today's session not found" });
    }

    // Add/update attendee
    await session.addAttendee(userId)
    
    // Update user's streak and tree growth
    const user = await User.findById(userId);
    await user.updateStreak();
    await user.updateTreeGrowth();

    res.json({
      success: true,
      redirect: meeting.zoomLink,
      sessionId: session._id,
      message: "Joined session successfully"
    });

  } catch (error) {
    console.error("joinMeeting error:", error);
    res.status(500).json({ message: "Failed to join session" });
  }
};

/**
 * Leave meeting session
 */
export const leaveMeeting = async (req, res) => {
  try {
    const { sessionId } = req.params;
    const userId = req.user._id;
    
    const meeting = await Meeting.findOne({
      "sessions._id": sessionId
    });

    if (!meeting) {
      return res.status(404).json({ message: "Session not found" });
    }

    const session = meeting.sessions.id(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Record leave time
    await session.recordLeave(userId);
    
    // Check if session should be marked as completed
    if (session.status === 'scheduled') {
      await session.markAsLive();
    }

    // Update user's tree growth
    const user = await User.findById(userId);
    const attendee = session.attendees.find(a => a.user.equals(userId));
    
    if (attendee?.duration >= meeting.settings.minAttendanceDuration) {
      await user.updateTreeGrowth();
    }

    res.json({ 
      success: true, 
      message: "Left session successfully",
      duration: attendee?.duration
    });

  } catch (error) {
    console.error("leaveMeeting error:", error);
    res.status(500).json({ message: "Failed to leave session" });
  }
};
export const getUserSessionHistory = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // Find all meetings where the user is an attendee
    const meetings = await Meeting.aggregate([
      { $unwind: "$sessions" },
      { $unwind: "$sessions.attendees" },
      { $match: { "sessions.attendees.user": req.user._id } },
      { $sort: { "sessions.startTime": -1 } },
      { $skip: skip },
      { $limit: limit },
      { 
        $project: {
          _id: 1,
          title: 1,
          "session": "$sessions"
        }
      }
    ]);

    // Get total count for pagination
    const total = await Meeting.countDocuments({
      "sessions.attendees.user": req.user._id
    });

    res.json({
      success: true,
      data: meetings,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / limit),
        limit
      }
    });
  } catch (error) {
    console.error("Error fetching session history:", error);
    res.status(500).json({ message: "Failed to fetch session history" });
  }
};

export const getAllSessions = async (req,res) => {
  try {
    const meetings = await Meeting.find({isActive : true})
    if(!meetings){
      return res.status(400).send({success : false , message : 'No Active Meetings Found'})
    }
    return res.status(200).send({success : true ,meetings})
  } catch (error) {
    console.log("unable to get sessions. Internal server error")
    return res.status(500).send({message : "Internal server Error While Getting all Sessions"})
  }
}

/**
 * Get monthly session attendees count
 * Query params: year (required), month (0-11, optional - defaults to current month)
 */
export const getMonthlyAttendees = async (req, res) => {
    try {
        const { year, month } = req.query;
        
        if (!year) {
            return res.status(400).json({ 
                success: false,
                message: "Year is required" 
            });
        }

        const yearNum = parseInt(year);
        const monthNum = month !== undefined ? parseInt(month) : new Date().getMonth();
        
        if (isNaN(yearNum) || isNaN(monthNum) || monthNum < 0 || monthNum > 11) {
            return res.status(400).json({
                success: false,
                message: "Invalid year or month. Month should be 0-11"
            });
        }

        // Create start and end dates for the month
        const startDate = new Date(yearNum, monthNum, 1);
        const endDate = new Date(yearNum, monthNum + 1, 0, 23, 59, 59, 999);

        // Aggregate to get session attendees count for the month
        const result = await Meeting.aggregate([
            // Unwind the sessions array
            { $unwind: "$sessions" },
            // Match sessions within the date range
            {
                $match: {
                    "sessions.date": {
                        $gte: startDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
                        $lte: endDate.toISOString().split('T')[0]
                    },
                    "sessions.attendees": { $exists: true, $ne: [] } // Only include sessions with attendees
                }
            },
            // Project only needed fields
            {
                $project: {
                    date: "$sessions.date",
                    attendeesCount: { $size: { $ifNull: ["$sessions.attendees", []] } }
                }
            },
            // Group by date and sum attendees
            {
                $group: {
                    _id: "$date",
                    date: { $first: "$date" },
                    attendeesCount: { $sum: "$attendeesCount" }
                }
            },
            // Sort by date
            { $sort: { date: 1 } }
        ]);

        // Calculate total attendees for the month
        const totalAttendees = result.reduce((sum, day) => sum + day.attendeesCount, 0);

        res.status(200).json({
            success: true,
            data: {
                year: yearNum,
                month: monthNum,
                totalAttendees,
                dailyData: result
            }
        });

    } catch (error) {
        console.error("Error fetching monthly attendees:", error);
        res.status(500).json({ 
            success: false, 
            message: "Internal server error while fetching monthly attendees",
            error: error.message
        });
    }
};export const LastThreeMonthAttendances = async (req, res) => {
  try {
    const now = new Date();

    // Start of the range → 2 months back (including current → 3 total)
    const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1, 0, 0, 0);

    // End of range → 1st day of next month
    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const data = await Meeting.aggregate([
      { $unwind: "$sessions" },

      // Convert joinTime (string) → Date for comparison
      {
        $addFields: {
          joinTimeDate: { $toDate: "$sessions.joinTime" }
        }
      },

      // Filter last 3 months
      {
        $match: {
          joinTimeDate: {
            $gte: threeMonthsAgo,
            $lt: endDate
          }
        }
      },

      // Extract date components
      {
        $project: {
          year: { $year: "$joinTimeDate" },
          month: { $month: "$joinTimeDate" },
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$joinTimeDate"
            }
          },
          attendees: { $size: "$sessions.attendees" }
        }
      },

      // Group by year + month
      {
        $group: {
          _id: { year: "$year", month: "$month" },
          totalMonthlyAttendees: { $sum: "$attendees" },
          daily: {
            $push: {
              date: "$date",
              count: "$attendees"
            }
          }
        }
      },

      // Sort by year + month
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
        }
      }
    ]);

    return res.status(200).json({
      success: true,
      message: "Last Three Month Attendees",
      data
    });

  } catch (error) {
    console.log("Internal server error ", error);
    return res.status(500).json({ message: "Internal server Error" });
  }
};

// today meeting joined attendees list 
export const getTodaysAttendance = async (req, res) => {
  try {
    const { date = new Date().toISOString().split('T')[0] } = req.query;
    
    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);
    
    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const sessions = await Meeting.aggregate([
      { $unwind: "$sessions" },
      {
        $match: {
          "sessions.date": {
            $gte: startDate.toISOString().split('T')[0],
            $lte: endDate.toISOString().split('T')[0]
          }
        }
      },
      { $unwind: "$sessions.attendees" },
      {
        $lookup: {
          from: "users",
          localField: "sessions.attendees.user",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" },
      {
        $project: {
          name: "$user.name",
          email: "$user.email",
          joinTime: "$sessions.attendees.joinTime",
          duration: "$sessions.attendees.duration",
          status: { 
            $cond: [
              { $gt: ["$sessions.attendees.duration", 0] }, 
              "present", 
              "absent"
            ] 
          }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          present: { 
            $sum: { 
              $cond: [{ $gt: ["$duration", 0] }, 1, 0] 
            } 
          },
          totalDuration: { $sum: "$duration" },
          attendees: { $push: "$$ROOT" }
        }
      },
      {
        $project: {
          _id: 0,
          total: 1,
          present: 1,
          absent: { $subtract: ["$total", "$present"] },
          averageDuration: { 
            $cond: [
              { $gt: ["$present", 0] }, 
              { $divide: ["$totalDuration", "$present"] }, 
              0
            ] 
          },
          attendees: 1
        }
      }
    ]);

    const result = sessions[0] || {
      total: 0,
      present: 0,
      absent: 0,
      averageDuration: 0,
      attendees: []
    };

    res.status(200).json({
      success: true,
      data: result
    });

  } catch (error) {
    console.error('Error fetching today\'s attendance:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching attendance data',
      error: error.message
    });
  }
};



// Fetched Inactive user 
// who do not joined the sessions last 7 Days 
export const getInactiveUsers = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // First, find all users who have been active in the last 7 days by checking the meetings they've attended
    const activeUsers = await Meeting.aggregate([
      // Unwind the sessions array
      { $unwind: "$sessions" },
      // Unwind the attendees array
      { $unwind: "$sessions.attendees" },
      // Only include sessions from the last 7 days
      {
        $match: {
          "sessions.attendees.joinTime": { $gte: sevenDaysAgo }
        }
      },
      // Group by user to get unique active users
      {
        $group: {
          _id: "$sessions.attendees.user"
        }
      }
    ]);

    // Extract just the user IDs
    const activeUserIds = activeUsers.map(user => user._id);

    // Now find all users who are NOT in the active users list
    const inactiveUsers = await User.aggregate([
      {
        $match: {
          _id: { $nin: activeUserIds }
        }
      },
      // Lookup to get their last session info
      {
        $lookup: {
          from: "meetings",
          let: { userId: "$_id" },
          pipeline: [
            { $unwind: "$sessions" },
            { $unwind: "$sessions.attendees" },
            {
              $match: {
                $expr: { $eq: ["$sessions.attendees.user", "$$userId"] }
              }
            },
            {
              $sort: { "sessions.attendees.joinTime": -1 }
            },
            {
              $limit: 1
            },
            {
              $project: {
                lastActive: "$sessions.attendees.joinTime",
                sessionDate: "$sessions.date"
              }
            }
          ],
          as: "lastSession"
        }
      },
      // Add fields for easier access to the data
      {
        $addFields: {
          lastActive: { $arrayElemAt: ["$lastSession.lastActive", 0] },
          lastSessionDate: { $arrayElemAt: ["$lastSession.sessionDate", 0] }
        }
      },
      // Count total sessions for each user
      {
        $lookup: {
          from: "meetings",
          let: { userId: "$_id" },
          pipeline: [
            { $unwind: "$sessions" },
            { $unwind: "$sessions.attendees" },
            {
              $match: {
                $expr: { $eq: ["$sessions.attendees.user", "$$userId"] }
              }
            },
            { $count: "totalSessions" }
          ],
          as: "sessionsCount"
        }
      },
      // Format the output
      {
        $project: {
          name: 1,
          email: 1,
          lastActive: 1,
          lastSessionDate: 1,
          totalSessions: { $ifNull: [{ $arrayElemAt: ["$sessionsCount.totalSessions", 0] }, 0] }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      count: inactiveUsers.length,
      data: inactiveUsers
    });

  } catch (error) {
    console.error("Error in getInactiveUsers:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching inactive users"
    });
  }
};

export const markSessionAsLive = async(req,res) => {
  try {
    const meeting = await Meeting.findOne({"sessions._id" : req.params.sessionId})
    if(!meeting){
      return res.status(404).json({message : "Session not found"})
    }
    const session = meeting.sessions.id(req.params.sessionId)
    if(!session){
      return res.status(404).json({message : "Session not found"})
    }
    session.status = "live"
    session.startTime = new Date()
    await meeting.save()
    res.status(200).json({
      success : true,
      message : "Session marked as live",
      session : session.toObject()
    })
  } catch (error) {
    console.log(error, "Internal Server Error")
    return res.status(500).json({ message : "Internal Server Error"})
  }
}
// In meetingController.js
export const markSessionAsCompleted = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ "sessions._id": req.params.sessionId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    const session = meeting.sessions.id(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Add validation to ensure session is live
    if (session.status !== 'live') {
      return res.status(400).json({ 
        message: `Cannot complete session. Current status is ${session.status}` 
      });
    }

    // Update both status and endTime
    session.status = 'completed';
    session.endTime = new Date();
    
    // Mark the session as modified
    meeting.markModified('sessions');
    
    await meeting.save();

    res.json({ 
      success: true, 
      message: "Session marked as completed",
      session: session.toObject()
    });

  } catch (error) {
    console.error("markSessionAsCompleted error:", error);
    res.status(500).json({ 
      message: "Failed to update session status",
      error: error.message
    });
  }
};


// In meetingController.js
export const markSessionAsScheduled = async (req, res) => {
  try {
    const meeting = await Meeting.findOne({ "sessions._id": req.params.sessionId });
    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    const session = meeting.sessions.id(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Only allow changing from 'completed' to 'scheduled'
    if (session.status !== 'completed') {
      return res.status(400).json({ 
        message: `Cannot reschedule session. Current status is ${session.status}` 
      });
    }

    session.status = 'scheduled';
    session.endTime = undefined; // Clear end time when rescheduling
    
    meeting.markModified('sessions');
    await meeting.save();

    res.json({ 
      success: true, 
      message: "Session rescheduled successfully",
      session: session.toObject()
    });

  } catch (error) {
    console.error("markSessionAsScheduled error:", error);
    res.status(500).json({ 
      message: "Failed to reschedule session",
      error: error.message
    });
  }
};


/**
 * Get all sessions (admin only)
 */
export const getSessionsList = async (req, res) => {
  try {
    const meetings = await Meeting.find({ isActive: true })
      .populate('sessions.attendees.user', 'name email');
    
    const allSessions = meetings.flatMap(meeting => 
      meeting.sessions.map(session => ({
        ...session.toObject(),
        meetingTitle: meeting.title
      }))
    );
    
    // Sort by start time (newest first)
    allSessions.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
    
    res.json({ success: true, sessions: allSessions });
  } catch (error) {
    console.error("getSessions error:", error);
    res.status(500).json({ message: "Failed to fetch sessions" });
  }
};

