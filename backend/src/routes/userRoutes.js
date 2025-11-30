import express from 'express';
import { admin, protect } from '../middleware/authmiddleware.js';
import { getAllUsers, deleteUser, getUserById } from '../controllers/userController.js';

const router = express.Router();

// Get current logged-in user
router.get("/me", protect, (req, res) => {
    res.json({
        success: true,
        message: "User fetched successfully",
        user: req.user
    });
});

// Admin: Get all users
router.get('/getAllUsers', protect,admin, getAllUsers);

// Admin: Delete a user by ID
router.delete('/deleteUser/:userId',protect, admin, deleteUser);

// Admin: Get a single user by ID
router.get('/getUser/:userId', admin, getUserById);

export default router;
