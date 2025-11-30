import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Daily Meditation Session",
      required: true
    },

    zoomLink: {
      type: String,
      required: true
    },

    meetingDate: {
      type: String, // YYYY-MM-DD
      required: true
    },

    startTime: {
      type: String,
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    status: {
      type: String,
      enum: ["scheduled", "live", "completed"],
      default: "scheduled"
    },

    sendToWhatsApp: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

meetingSchema.index({ meetingDate: 1 }, { unique: true });

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;
