import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
  date: {
    type: String, // YYYY-MM-DD
    required: true
    // REMOVED unique: true to allow multiple different Meetings to have sessions on the same day
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: Date,
  status: {
    type: String,
    enum: ["scheduled", "live", "completed", "cancelled"],
    default: "scheduled"
  },
  attendees: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    joinTime: Date,
    leaveTime: Date,
    duration: {
      type: Number, // in minutes
      default: 0
    }
  }]
}, { _id: true }); // Keep _id for sessions to easily find them

const meetingSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Daily Meditation Session",
    required: true
  },
  zoomLink: {
    type: String,
    required: true
  },
  defaultTime: {
    type: String,
    required: true,
    match: /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
  },
  timezone: {
    type: String,
    default: "Asia/Kolkata"
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  sessions: [sessionSchema],
  isActive: {
    type: Boolean,
    default: true
  },
  settings: {
    minAttendanceDuration: { type: Number, default: 10, min: 1 },
    sendReminders: { type: Boolean, default: true },
    recurringDays: {
      type: [Number],
      default: [0, 1, 2, 3, 4, 5, 6],
      validate: {
        validator: function(days) {
          return days.every(day => day >= 0 && day <= 6);
        },
        message: "Invalid day of week (0-6)"
      }
    }
  }
}, {
  timestamps: true,
  statics: {
    async getOrCreateToday() {
      // 1. Find the active meeting first
      let meeting = await this.findOne({ isActive: true });
      if (!meeting) throw new Error('No active meeting found');

      // 2. Get "Today" based on the MEETING'S timezone, not Server time
      // This returns "2023-10-25" based on Asia/Kolkata time
      const today = new Date().toLocaleDateString('en-CA', { 
        timeZone: meeting.timezone 
      }); 

      // 3. Check if today's session exists
      const sessionExists = meeting.sessions.some(s => s.date === today);
      
      if (!sessionExists) {
        // Parse default time
        const [hours, minutes] = meeting.defaultTime.split(':').map(Number);
        
        // Create date object for startTime (keeping timezone in mind is complex, 
        // but creating a generic date object here is usually safe for storage)
        const sessionTime = new Date(`${today}T${meeting.defaultTime}:00`);
        sessionTime.setHours(hours, minutes, 0, 0);
        
        const localTime = new Date(today);
        localTime.setHours(hours, minutes, 0, 0);

        const dayOfWeek = localTime.getDay();

        if (!meeting.settings.recurringDays.includes(dayOfWeek)) {
      return meeting; 
  }

        meeting.sessions.push({
          date: today,

          startTime: localTime,
          status: 'scheduled'
        });
        
        await meeting.save();
      }

      return meeting;
    }
  }
});

// --- FIXED SUB-DOCUMENT METHODS ---

sessionSchema.methods.markAsLive = function() {
  this.status = 'live';
  // Use parent() to save the main document
  return this.parent().save();
};

sessionSchema.methods.markAsCompleted = function() {
  this.status = 'completed';
  this.endTime = new Date();
  return this.parent().save();
};

sessionSchema.methods.addAttendee = async function(userId) {
  // Convert string ID to ObjectId for comparison if necessary, or rely on .equals
  const existing = this.attendees.find(a => a.user.toString() === userId.toString());
  
  if (existing) {
    existing.joinTime = new Date();
    // Reset leave time if they are re-joining
    existing.leaveTime = null; 
  } else {
    this.attendees.push({
      user: userId,
      joinTime: new Date()
    });
  }
  
  await this.parent().save();
  return this;
};

sessionSchema.methods.recordLeave = async function(userId) {
  const attendee = this.attendees.find(a => a.user.toString() === userId.toString());
  
  if (attendee) {
    attendee.leaveTime = new Date();
    
    // Calculate duration in minutes
    if (attendee.joinTime) {
        const durationMs = attendee.leaveTime - attendee.joinTime;
        // Add to existing duration (in case they joined/left multiple times)
        const newMinutes = Math.floor(durationMs / (1000 * 60));
        attendee.duration = (attendee.duration || 0) + newMinutes;
    }
    
    await this.parent().save();
  }
  
  return this;
};

// Indexes
meetingSchema.index({ isActive: 1 });
meetingSchema.index({ "sessions.date": 1 }); 
meetingSchema.index({ host: 1 });

const Meeting = mongoose.model("Meeting", meetingSchema);
export default Meeting;