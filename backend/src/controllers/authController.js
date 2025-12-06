import User from "../models/user.model.js";
import { generateToken } from "../util/generateToken.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";

// =====================
// REGISTER USER
// =====================
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, gender, phone } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email is already registered" });

    const newUser = await User.create({
      name,
      email,
      password,
      gender,
      phone,
      avatar: { url: "default-avatar.png", public_id: "default" },
    });

    const token = generateToken(newUser._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    res.status(201).json({
      success : true,
      message: "User registered successfully",
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        gender: newUser.gender,
        phone: newUser.phone,
        avatar: newUser.avatar,
        subscription: newUser.subscription,
        role: newUser.role,
      },
      token,
    });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Internal Server Error (unable to register user)" });
  }
};

// =====================
// LOGIN USER
// =====================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and Password are required" });

    let user = await User.findOne({ email }).select("+password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched)
      return res.status(401).json({ message: "Invalid credentials" });

    if (!user.hasActiveSubscription())
      return res.status(403).json({ message: "Subscription expired. Please renew." });

    // Update streak & tree
    await user.updateStreak();
    await user.updateTreeGrowth();

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    });

    // Refresh user data after updates
    user = await User.findById(user._id);

    res.status(200).json({
      message: "User logged in successfully",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        avatar: user.avatar,
        subscription: user.subscription,
        role: user.role,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        currentTree: user.currentTree,
        forest: user.forest,
        soulPeacePoints: user.soulPeacePoints,
      },
      token,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Internal Server Error (unable to login user)" });
  }
};

// =====================
// LOGOUT USER
// =====================
export const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal Server Error (unable to logout user)" });
  }
};

// =====================
// FORGOT PASSWORD
// =====================
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    // TODO: Send resetToken via email
    res.status(200).json({
      message: "Password reset token generated",
      resetToken, // remove in production
    });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal Server Error (forgot password)" });
  }
};

// =====================
// RESET PASSWORD
// =====================
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    if (!token || !password)
      return res.status(400).json({ message: "Token and new password are required" });

    const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal Server Error (reset password)" });
  }
};

// =====================
// GET PROFILE
// =====================
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        gender: user.gender,
        phone: user.phone,
        avatar: user.avatar,
        subscription: user.subscription,
        role: user.role,
        currentStreak: user.currentStreak,
        longestStreak: user.longestStreak,
        currentTree: user.currentTree,
        forest: user.forest,
        soulPeacePoints: user.soulPeacePoints,
      },
    });
  } catch (error) {
    console.error("Get Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error (get profile)" });
  }
};

// =====================
// UPDATE PROFILE
// =====================
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    const { name, phone, gender, avatar } = req.body;
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (gender) user.gender = gender;
    if (avatar) user.avatar = avatar;

    await user.save();

    res.status(200).json({ message: "Profile updated successfully", user });
  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Internal Server Error (update profile)" });
  }
};

export const waterTree = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    // This will increment consecutiveDays and update the tree stage
    await user.updateTreeGrowth();
    
    // Refresh the user data
    const updatedUser = await User.findById(user._id);
    
    res.status(200).json({ 
      message: "Tree watered & growth updated", 
      currentTree: updatedUser.currentTree,
      soulPeacePoints: updatedUser.soulPeacePoints
    });
  } catch (error) {
    console.error("Water Tree Error:", error);
    res.status(500).json({ 
      message: "Internal Server Error (water tree)",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
