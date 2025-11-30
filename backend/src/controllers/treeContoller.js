import User from "../models/user.model.js";
import Attendance from "../models/Attendance.model.js";
import crypto from "crypto";

// =======================
// GET CURRENT TREE STATUS
// =======================
export const getTreeStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "currentTree forest currentStreak longestStreak soulPeacePoints"
    );

    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      data: {
        currentTree: user.currentTree,
        forest: user.forest,
        streak: {
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
        },
        soulPeacePoints: user.soulPeacePoints,
      },
    });
  } catch (error) {
    console.error("Error getting tree status:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// WATER TREE / MARK DAILY ATTENDANCE
// =======================
export const waterTree = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already watered today
    const lastWatered = user.currentTree.lastWatered
      ? new Date(user.currentTree.lastWatered)
      : null;

    if (lastWatered && lastWatered.getTime() === today.getTime()) {
      return res
        .status(400)
        .json({ success: false, message: "Tree already watered today" });
    }

    // =======================
    // ATTENDANCE LOGIC
    // =======================
    let attendance = await Attendance.findOne({ user: user._id, date: today.toISOString().split("T")[0] });

    if (!attendance) {
      attendance = new Attendance({
        user: user._id,
        date: today.toISOString().split("T")[0],
        joinTime: today,
      });
      await attendance.save();
    }

    // =======================
    // TREE GROWTH LOGIC
    // =======================
    user.currentTree.daysGrown += 1;
    user.currentTree.lastWatered = today;

    const stageMap = ["seed", "sprout", "baby", "growing", "full"];
    user.currentTree.stage =
      stageMap[user.currentTree.daysGrown - 1] || "full";

    // If tree fully grown, move to forest and reset currentTree
    if (user.currentTree.daysGrown >= 5) {
      user.forest.push({
        treeId: user.currentTree.treeId,
        completedAt: today,
        totalDays: user.currentTree.daysGrown,
        lifecycle: "completed",
      });

      user.currentTree = {
        treeId: crypto.randomUUID(),
        stage: "seed",
        daysGrown: 0,
        lastWatered: null,
        startedAt: today,
      };

      // Bonus soul points
      user.soulPeacePoints = Math.min(100, (user.soulPeacePoints || 0) + 20);
    }

    // =======================
    // STREAK LOGIC
    // =======================
    const lastMeetingDate = user.lastMeetingDate
      ? new Date(user.lastMeetingDate)
      : null;
    if (lastMeetingDate) lastMeetingDate.setHours(0, 0, 0, 0);

    if (!lastMeetingDate) {
      user.currentStreak = 1;
    } else {
      const diffDays = Math.floor((today - lastMeetingDate) / (1000 * 60 * 60 * 24));
      if (diffDays === 1) user.currentStreak += 1;
      else if (diffDays > 1) user.currentStreak = 1;
    }

    if (user.currentStreak > user.longestStreak)
      user.longestStreak = user.currentStreak;

    user.lastMeetingDate = today;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Tree watered and attendance marked",
      data: {
        currentTree: user.currentTree,
        forest: user.forest,
        streak: {
          currentStreak: user.currentStreak,
          longestStreak: user.longestStreak,
        },
        soulPeacePoints: user.soulPeacePoints,
      },
    });
  } catch (error) {
    console.error("Error watering tree:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// GET USER STREAK
// =======================
export const getStreak = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      "currentStreak longestStreak lastMeetingDate"
    );
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    res.status(200).json({
      success: true,
      data: {
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        lastMeetingDate: user.lastMeetingDate,
      },
    });
  } catch (error) {
    console.error("Error getting streak:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// =======================
// UPDATE SOUL PEACE POINTS MANUALLY
// =======================
export const updateSoulPoints = async (req, res) => {
  try {
    const { points, action = "add" } = req.body;
    if (!points || typeof points !== "number")
      return res.status(400).json({ success: false, message: "Invalid points" });

    const user = await User.findById(req.user._id);
    if (!user)
      return res.status(404).json({ success: false, message: "User not found" });

    if (action === "add") user.soulPeacePoints = (user.soulPeacePoints || 0) + points;
    else if (action === "subtract") {
      if ((user.soulPeacePoints || 0) < points)
        return res.status(400).json({ success: false, message: "Not enough points" });
      user.soulPeacePoints -= points;
    } else
      return res.status(400).json({ success: false, message: 'Action must be "add" or "subtract"' });

    await user.save();
    res.status(200).json({
      success: true,
      message: "Soul points updated",
      data: { soulPeacePoints: user.soulPeacePoints },
    });
  } catch (error) {
    console.error("Error updating soul points:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
