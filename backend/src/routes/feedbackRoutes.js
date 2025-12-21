import express from 'express';
import { protect, admin } from '../middleware/authMiddleware.js';
import { 
  submitFeedback, 
  getFeedbackHistory, 
  getFeedbackStats 
} from '../controllers/feedbackController.js';

const router = express.Router();

// Submit feedback
router.post('/', protect, submitFeedback);

// Get user's feedback history
router.get('/history', protect, getFeedbackHistory);

// Get feedback statistics (admin only)
router.get('/stats', protect, admin, getFeedbackStats);

export default router;