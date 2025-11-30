import User from "../models/user.model.js";
import Attendance from "../models/Attendance.model.js";
import { Types } from "mongoose";

// @desc    Get admin dashboard stats
// @route   GET /api/dashboard/admin
// @access  Private/Admin
export const getAdminDashboard = async (req, res) => {
  try {
    // Get total users count
    const totalUsers = await User.countDocuments();
    
    // Get new users this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const newUsersThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth }
    });

    // Get active users (active in last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeUsers = await User.countDocuments({
      lastActive: { $gte: thirtyDaysAgo }
    });

    // Get attendance stats
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const todaysAttendance = await Attendance.countDocuments({
      date: { $gte: today }
    });

    // Get user growth data for the last 6 months
    const monthlyUserGrowth = await User.aggregate([
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 6 }
    ]);

    res.json({
      totalUsers,
      newUsersThisMonth,
      activeUsers,
      todaysAttendance,
      monthlyUserGrowth
    });

  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).json({ message: 'Error fetching dashboard data' });
  }
};

// @desc    Get user dashboard stats
// @route   GET /api/dashboard/user
// @access  Private
export const getUserDashboard = async (req, res) => {
  try {
    const userId = req.user._id;
    
    // Get user's attendance stats
    const attendanceStats = await Attendance.aggregate([
      { $match: { user: new Types.ObjectId(userId) } },
      {
        $group: {
          _id: null,
          totalSessions: { $sum: 1 },
          totalMinutes: { $sum: "$duration" },
          lastSession: { $max: "$date" }
        }
      }
    ]);

    // Get user's streak and tree growth
    const user = await User.findById(userId)
      .select('streak treeGrowth.totalMinutes treeGrowth.stage')
      .lean();

    // Get recent activity
    const recentActivity = await Attendance.find({ user: userId })
      .sort({ date: -1 })
      .limit(5)
      .select('date duration')
      .lean();

    res.json({
      stats: attendanceStats[0] || { totalSessions: 0, totalMinutes: 0 },
      streak: user.streak || 0,
      treeStage: user.treeGrowth?.stage || 'seed',
      recentActivity
    });

  } catch (error) {
    console.error('User Dashboard Error:', error);
    res.status(500).json({ message: 'Error fetching user dashboard data' });
  }
};

// @desc    Get system status
// @route   GET /api/dashboard/status
// @access  Private/Admin
export const getSystemStatus = async (req, res) => {
  try {
    // Check database connection
    const dbStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
    
    // Get memory usage
    const memoryUsage = process.memoryUsage();
    
    // Get uptime
    const uptime = process.uptime();
    
    res.json({
      status: 'operational',
      database: dbStatus,
      memory: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`
      },
      uptime: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m`,
      environment: process.env.NODE_ENV || 'development'
    });
  } catch (error) {
    console.error('Status Check Error:', error);
    res.status(500).json({ message: 'Error checking system status' });
  }
};