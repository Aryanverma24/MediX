import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// =====================
// AVATAR SCHEMA
// =====================
const avatarSchema = new mongoose.Schema({
  public_id: { type: String },
  url: { type: String },
});

// =====================
// USER SCHEMA
// =====================
const userSchema = new mongoose.Schema(
  {
    // =====================
    // BASIC USER INFO
    // =====================
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
      select: false,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },

    avatar: avatarSchema,

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    phone: {
      type: String,
      trim: true,
    },

    // =====================
    // ENGAGEMENT & STREAK SYSTEM
    // =====================
    lastMeetingDate: {
      type: Date,
      default: null,
    },

    totalMeetingsAttended: {
      type: Number,
      default: 0,
    },

    currentStreak: {
      type: Number,
      default: 0,
    },

    longestStreak: {
      type: Number,
      default: 0,
    },

    dailyEngagementLog: [
      {
        type: Date,
      },
    ],

    // =====================
    // 🌳 TREE GROWTH SYSTEM
    // =====================

    // Active Growing Tree
    currentTree: {
      treeId: {
        type: String,
        default: () => crypto.randomUUID(),
      },

      stage: {
        type: String,
        enum: ["seed", "sprout", "baby", "growing", "full"],
        default: "seed",
      },

      daysGrown: {
        type: Number,
        default: 0, // 0 - 5
      },

      lastWatered: {
        type: Date,
        default: null,
      },

      startedAt: {
        type: Date,
        default: Date.now,
      },
    },

    // Permanent Forest (Completed Trees)
    forest: [
      {
        treeId: String,
        completedAt: Date,
        totalDays: {
          type: Number,
          default: 5,
        },
        lifecycle: {
          type: String,
          default: "completed",
        },
      },
    ],

    // =====================
    // SOUL ANIMATION SYSTEM
    // =====================
    soulPeacePoints: {
      type: Number,
      default: 0,
    },

    lastSoulUpdate: {
      type: Date,
      default: null,
    },

    // =====================
    // SECURITY FIELDS
    // =====================
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

// =====================
// PASSWORD HASHING
// =====================
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// =====================
// COMPARE PASSWORD
// =====================
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// =====================
// RESET PASSWORD TOKEN
// =====================
userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

// =====================
// TREE STAGE HELPER (OPTIONAL)
// =====================
userSchema.methods.getTreeStage = function () {
  const stages = ["seed", "sprout", "baby", "growing", "full"];
  return stages[this.currentTree.daysGrown] || "seed";
};

const User = mongoose.model("User", userSchema);

export default User;
