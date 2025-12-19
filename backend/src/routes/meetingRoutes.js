// routes/meetingRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrUpdateMeeting,
  getTodaySession,
  joinMeeting,
  leaveMeeting,
  getUserSessionHistory,
  getAllSessions,
  getMonthlyAttendees,
  LastThreeMonthAttendances,
  getTodaysAttendance,
  getInactiveUsers,
  markSessionAsCompleted,
  markSessionAsLive,
  getSessionsList,
  markSessionAsScheduled
} from "../controllers/meetingController.js";

const router = express.Router();

// Admin routes
router.route("/").post(protect, admin, createOrUpdateMeeting) // Create/update meeting settings

// Session management
router.route("/today")
  .get(protect, getTodaySession); // Get today's session

router.route("/join")
  .post(protect, joinMeeting); // Join today's session

router.route("/leave/:sessionId")
  .post(protect, leaveMeeting); // Leave a session

// User history
router.route("/history").get(protect, getUserSessionHistory); // Get user's session history

router.route("/getAllSessions").get(protect, admin, getAllSessions);

// Get monthly attendees
router.route("/monthly-attendees").get(protect, admin, getMonthlyAttendees); 

router.route("/last-Three-month-attendees").get(protect,admin,LastThreeMonthAttendances)

router.route("/todays-attendance").get(protect,admin,getTodaysAttendance)

router.route("/inactive-users").get(protect,admin,getInactiveUsers)

router.route("/sessions/:sessionId/live").post(protect,admin,markSessionAsLive);

router.route("/sessions/:sessionId/completed").post(protect,admin,markSessionAsCompleted)
router.route("/sessions/:sessionId/scheduled")
  .post(protect, admin, markSessionAsScheduled);
router.route("/sessions").get(protect,admin,getSessionsList)

export default router;