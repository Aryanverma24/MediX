import crypto from "crypto";

export const updateStreak = (user, todayDate) => {
  const today = new Date(todayDate);
  today.setHours(0, 0, 0, 0);

  const lastDate = user.lastMeetingDate
    ? new Date(user.lastMeetingDate)
    : null;

  if (lastDate) lastDate.setHours(0, 0, 0, 0);

  // =========================
  // STREAK LOGIC
  // =========================

  let skippedDay = false;

  if (!lastDate) {
    user.currentStreak = 1;
  } else {
    const diffInDays = Math.floor(
      (today - lastDate) / (1000 * 60 * 60 * 24)
    );

    if (diffInDays === 1) {
      user.currentStreak += 1;
    } else if (diffInDays > 1) {
      user.currentStreak = 1;
      skippedDay = true;

      // RESET CURRENT TREE
      user.currentTree = {
        treeId: crypto.randomUUID(),
        stage: "Seedling",
        daysGrown: 0,
        lastWatered: null,
        startedAt: new Date()
      };
    } 
  }

  // =========================
  // LONGEST STREAK
  // =========================
  if (user.currentStreak > user.longestStreak) {
    user.longestStreak = user.currentStreak;
  }

  // =========================
  // TREE GROWTH LOGIC
  // =========================

  const lastTreeWatered = user.currentTree.lastWatered
    ? new Date(user.currentTree.lastWatered)
    : null;

  if (lastTreeWatered) lastTreeWatered.setHours(0,0,0,0);

  const stageMap = ["Seedling", "Sprout", "Baby Plant", "Plant", "Tree"];

  // Prevent growth if just reset
  if (!skippedDay) {

    const alreadyWateredToday =
      lastTreeWatered &&
      today.getTime() === lastTreeWatered.getTime();

    if (!alreadyWateredToday) {
      user.currentTree.daysGrown += 1;
      user.currentTree.lastWatered = today;
      user.currentTree.stage =
        stageMap[user.currentTree.daysGrown - 1] || "Tree";
    }
  }

  // ✅ TREE LIFE CYCLE COMPLETE
  if (user.currentTree.daysGrown >= 5) {

    user.forest.push({
      treeId: user.currentTree.treeId,
      completedAt: new Date(),
      totalDays: 5,
      lifecycle: "Tree"
    });

    user.currentTree = {
      treeId: crypto.randomUUID(),
      stage: "Seedling",
      daysGrown: 0,
      lastWatered: null,
      startedAt: new Date()
    };
  }

  // =========================
  // SOUL SYSTEM
  // =========================
  user.soulPeacePoints = Math.min(100, user.soulPeacePoints + 5);
  user.lastSoulUpdate = today;

  // =========================
  // FINAL
  // =========================
  user.lastMeetingDate = today;

  return user;
};
