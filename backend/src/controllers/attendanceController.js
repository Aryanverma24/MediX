import Attendance from "../models/Attendance.model.js";
import User from "../models/user.model.js";
import { updateStreak } from "../util/streakEngine.js";

export const markAttendance = async (req, res) => {
  try {
    const userId = req.user._id;
    const { meetingId } = req.body;

    if (!meetingId) {
      return res.status(400).json({ message: "Meeting ID is required" });
    }

    const now = new Date();
    const todayStr = now.toISOString().split("T")[0];

    // ✅ Find attendance for this user + meeting + today
    let attendance = await Attendance.findOne({
      user: userId,
      meeting: meetingId,
      date: todayStr
    });

    // ✅ If not found → CREATE NEW
    if (!attendance) {
      attendance = await Attendance.create({
        user: userId,
        meeting: meetingId,
        date: todayStr,
        joinTime: new Date(),
      });
    } 
    // ✅ If exists but joinTime missing → Update joinTime
    else if (!attendance.joinTime) {
      attendance.joinTime = new Date();
      await attendance.save();
    }

    // === USER UPDATE ===
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    updateStreak(user, now);

    // ✅ Safe increment (once per meeting)
    if (!attendance.counted) {
      user.totalMeetingsAttended += 1;
      attendance.counted = true;
      await attendance.save();
    }

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Attendance marked successfully",
      attendanceId: attendance._id,
      userProgress: {
        currentStreak: user.currentStreak,
        lastMeetingDate: user.lastMeetingDate,
        currentTree: user.currentTree,
        forestCount: user.totalTrees,
        soulPeacePoints: user.soulPeacePoints,
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Unable to mark attendance"
    });
  }
};
export const markLeave = async (req, res) => {
  try {
    const { attendanceId } = req.params;

    const attendance = await Attendance.findById(attendanceId);

    if (!attendance) {
      return res.status(404).json({ message: "Attendance not found" });
    }

    if (!attendance.leaveTime) {
      attendance.leaveTime = new Date();
      attendance.durationSeconds = Math.floor(
        (attendance.leaveTime - attendance.joinTime) / 1000
      );
      await attendance.save();
    }

    res.status(200).json({
      success: true,
      message: "Leave recorded successfully",
      attendance
    });

  } catch (error) {
    res.status(500).json({ message: "Error updating leave time" });
  }
};

export const getAttendanceByUserId = async (req,res) => {
  try {
    const userId = req.user._id;
    if(!userId) return res.status(404).json({message : "user id id missing"})
    const attendance = await Attendance.find({user:userId});
     if(!attendance) return res.status(404).json({message : "attendance not found"})
      return res.status(200).json({
    message : "Attendance found",
    success : true,
  attendance
}
  )
  } catch (error) {
    console.error(error)
    return res.status(500).json({message : "Internal server Error While getting attendance od a user"})
  }
}