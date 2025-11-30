// routes/attendanceRoutes.js
import express from "express";
import { protect } from "../middleware/authmiddleware.js";
import { markAttendance, markLeave , getAttendanceByUserId } from "../controllers/attendanceController.js";

const router = express.Router();

router.post("/mark", protect, markAttendance);
router.post("/leave/:attendanceId", protect, markLeave);
router.get("/getAttendances",protect,getAttendanceByUserId);

export default router;
