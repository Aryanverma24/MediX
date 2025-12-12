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
};

export const LastThreeMonthAttendances =  async (req,res) =>{
  try {
    const now = new Date();

    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 2); // including current month → last 3 months
    threeMonthsAgo.setDate(1); // Start from first day
    threeMonthsAgo.setHours(0, 0, 0, 0);

    const endDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

    const data = await Meeting.aggregate([
      {
        $unwind : "$sessions"
      },{
        $match : {
          "sessions.joinTime" : {
            $gte : threeMonthsAgo,
            $lte : endDate
          }
        }
      },
      {
        $project : {
          month : {$month :  "$sessions.joinTime"},
          year : {$year :  "$sessions.joinTime"},
          date : {
            $dateToString  : {
              format : "%Y-%m-%d",
              date : "$sessions.joinTime"
            }
          },
          attendees : {
            $size : "$sessions.attendees"
          }
        }
      },{
        $group :{
          _id : {year : "$year" , month : "$month"},
          totalMonthlyAttendees : { $sum : "$attendees"},
          dailyDate : {
            $push : {
              date : "$date",
              count : "$attendees"
            }
          }
        }
      },
      {
        $sort : {
          "_id.year" : 1,"_id.month" : 1
        }
      }
    ])

    return res.status(200).json({
      success : true,
      message : "Last Three Month Attendees",
      data
    })
  } catch (error) {
    console.log("Internal server error ", error);
    return res.status(500).json({message : "Internal server Error"})
  }
}