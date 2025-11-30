import Attendance from "../models/Attendance.model.js";
import User from '../models/user.model.js'

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", role } = req.query;

    // Build query
    const query = {};

    if (search) {
      // Case-insensitive search by name or email
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) {
      query.role = role;
    }

    // Count total documents for pagination
    const total = await User.countDocuments(query);

    // Pagination
    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password"); // exclude password

    if (users.length === 0)
      return res.status(200).json({ message: "No users are available", data: [], total });

    return res.status(200).json({
      message: "Users fetched successfully",
      data: users,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error (getting all users)" });
  }
};

export const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const isDeleted = await User.findByIdAndDelete(userId);
        if (!isDeleted) return res.status(400).json({ message: "User not found to be deleted" });
        return res.status(200).json({ message: "User is deleted" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to delete user" });
    }
}

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.userId;
        if (!userId) return res.status(404).json({ message: "Missing user id" });

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        return res.status(200).json({ message: "User found", user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Unable to fetch user" });
    }
}
