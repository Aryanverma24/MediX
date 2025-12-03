// routes/meetingRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  createOrUpdateMeeting,
  getTodaySession,
  joinMeeting,
  leaveMeeting,
  getUserSessionHistory
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
router.route("/history")
  .get(protect, getUserSessionHistory); // Get user's session history

export default router;