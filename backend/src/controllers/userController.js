import User from '../models/user.model.js';

// =====================
// GET ALL USERS (with pagination & search)
// =====================
export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", role } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    if (role) query.role = role;

    const total = await User.countDocuments(query);

    const users = await User.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select("-password");

    res.status(200).json({
      message: users.length ? "Users fetched successfully" : "No users found",
      data: users,
      total,
      page: Number(page),
      limit: Number(limit),
    });
  } catch (error) {
    console.error("Get All Users Error:", error);
    res.status(500).json({ message: "Internal server error (getting all users)" });
  }
};

// =====================
// GET USER BY ID
// =====================
export const getUserById = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) return res.status(400).json({ message: "Missing user id" });

    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Get User By ID Error:", error);
    res.status(500).json({ message: "Internal server error (getting user)" });
  }
};

// =====================
// DELETE USER
// =====================
export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Delete User Error:", error);
    res.status(500).json({ message: "Internal server error (delete user)" });
  }
};


export const updateSubscription = async (req, res) => {
  try {
    const { plan, autoRenew } = req.body;
    const user = await User.findById(req.user._id);

    user.subscription.plan = plan || user.subscription.plan;
    user.subscription.autoRenew = autoRenew !== undefined ? autoRenew : user.subscription.autoRenew;

    // set new endDate if plan changed
    if(plan && plan !== 'trial'){
      user.subscription.startDate = new Date();
      const end = new Date();
      if(plan === 'monthly') end.setMonth(end.getMonth()+1);
      if(plan === 'quarterly') end.setMonth(end.getMonth()+3);
      if(plan === 'annual') end.setFullYear(end.getFullYear()+1);
      user.subscription.endDate = end;
    }

    await user.save();
    res.status(200).json({ message: "Subscription updated", subscription: user.subscription });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to update subscription" });
  }
};


export const getStreakAndTree = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json({
      currentStreak: user.currentStreak,
      longestStreak: user.longestStreak,
      currentTree: user.currentTree,
      forest: user.forest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Unable to fetch streak/tree info" });
  }
};


export const getUsers = async (req,res) => {
  try {
    const users = await User.find({}).select("-Password");
    if(users) return res.status(200).json({message : "users fetched successfully ", users}) 
    return res.status(404).json({message : "users are not found!"})  
  } catch (error) {
    console.log(error);
    res.status(500).json({message : "unable to fetch the count of users"})
  }
}