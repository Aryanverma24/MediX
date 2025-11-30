import Meeting from "../models/MeetingModel.js";
import Attendance from "../models/Attendance.model.js";
import User from "../models/user.model.js";

import { updateStreak } from "../util/streakEngine.js";

export const createOrUpdateMeeting = async (req,res) => {
   try {
     const {zoomLink , startTime , title , meetingDate} = req.body;
    console.log(zoomLink)
    console.log(startTime)
    console.log(title)
    if(!zoomLink) return res.status(404).json({message : "Meeting link required"});

    const date = meetingDate || new Date().toISOString().split("T")[0];

    const meeting = await Meeting.findOneAndUpdate(
        {meetingDate : date},
        {
            zoomLink,
            title,
            startTime : startTime || null,
            createdBy : req.user._id,
            status : "scheduled",
            sendToWhatsApp : true
        },
        {upsert : true , new : true , setDefaultsOnInsert : true}
    );

    res.status(200).json({
        success : true , meeting
    });
   } catch (error) {
      console.error("createOrUpdateMeeting:", err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Meeting for this date already exists" });
    }
    res.status(500).json({ message: "Failed to create meeting" });
   }
}



/**
 * Get today's meeting for authenticated user
 */

export const getTodayMeeting = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const meeting = await Meeting.findOne({ meetingDate: today }).lean();

    if (!meeting) return res.status(404).json({ message: "No meeting scheduled today" });

    res.json({ success: true, meeting });
  } catch (err) {
    console.error("getTodayMeeting:", err);
    res.status(500).json({ message: "Failed to get today's meeting" });
  }
};


/**
 * Join meeting: marks attendance (idempotent), updates streak/tree, returns redirect URL
 */
export const joinMeeting = async (req, res) => {
  try {
    const { meetingId } = req.body;
    const userId = req.user._id;
    const today = new Date().toISOString().split("T")[0];

    const meeting = await Meeting.findById(meetingId);
    if (!meeting) return res.status(404).json({ message: "Meeting not found" });

    let attendance = await Attendance.findOne({ user: userId, meeting: meetingId, date: today });

    if (!attendance) {
      attendance = await Attendance.create({
        user: userId,
        meeting: meetingId,
        date: today,
        joinTime: new Date()
      });

      const user = await User.findById(userId);
      updateStreak(user, new Date());
      user.totalMeetingsAttended++;
      await user.save();
    }

    res.json({
      success: true,
      redirect: meeting.zoomLink,
      attendanceId: attendance._id
    });

  } catch (error) {
    res.status(500).json({ message: "Join failed" });
  }
};

export const leaveMeeting = async (req, res) => {
  try {
    const { attendanceId } = req.params;
    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) return res.status(404).json({ message: "Attendance not found" });

    if (!attendance.leaveTime) {
      attendance.leaveTime = new Date();
      attendance.durationSeconds = Math.floor(
        (attendance.leaveTime - attendance.joinTime) / 1000
      );
      await attendance.save();
    }

    res.json({ success: true, message: "Leave recorded" });
  } catch (error) {
    res.status(500).json({ message: "Leave failed" });
  }
};