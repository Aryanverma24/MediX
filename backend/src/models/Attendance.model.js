// models/Attendance.model.js
import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meeting: { type: mongoose.Schema.Types.ObjectId, ref: "Meeting", required: true },
  date: { type: String, required: true },
  joinTime: { type: Date, default: null },
  leaveTime: { type: Date, default: null },
  durationSeconds: { type: Number, default: 0 },
  counted: { type: Boolean, default: false }
}, { timestamps: true });

attendanceSchema.index({ user: 1, meeting: 1, date: 1 }, { unique: true });

export default mongoose.model("Attendance", attendanceSchema);
