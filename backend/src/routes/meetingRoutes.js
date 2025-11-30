// routes/meetingRoutes.js
import express from "express";
import { protect, admin } from "../middleware/authmiddleware.js";
import {
  createOrUpdateMeeting,
  getTodayMeeting,
  joinMeeting,
  leaveMeeting
} from "../controllers/meetingController.js";

const router = express.Router();

router.post("/create", protect, admin, createOrUpdateMeeting);
router.get("/today", protect, getTodayMeeting);
router.post("/join", protect, joinMeeting);
router.post("/leave/:attendanceId", protect, leaveMeeting);

export default router;
