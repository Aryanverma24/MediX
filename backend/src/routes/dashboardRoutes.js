import express from 'express';
import { 
  getAdminDashboard, 
  getUserDashboard,
  getSystemStatus
} from '../controllers/dashboardController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/admin', protect, admin, getAdminDashboard);
router.get('/user', protect, getUserDashboard);
router.get('/status', protect, admin, getSystemStatus);

export default router;