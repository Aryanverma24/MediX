import Feedback from '../models/Feedback.js';

// @desc    Submit feedback
// @route   POST /api/feedback
// @access  Private
export const submitFeedback = async (req, res) => {
  const { rating, mood, recommend, message, chips, sessionId } = req.body;
  const user = req.user._id;

  const feedback = await Feedback.create({
    user,
    rating,
    mood,
    recommend,
    message,
    chips,
    sessionId
  });

  res.status(201).json({
    success: true,
    data: feedback
  });
};

// @desc    Get user's feedback history
// @route   GET /api/feedback/history
// @access  Private
export const getFeedbackHistory = async (req, res) => {
  const feedbacks = await Feedback.find({ user: req.user._id })
    .sort({ createdAt: -1 })
    .populate('sessionId', 'title startTime');

  res.json({
    success: true,
    count: feedbacks.length,
    data: feedbacks
  });
};

// @desc    Get feedback statistics (admin only)
// @route   GET /api/feedback/stats
// @access  Private/Admin
export const getFeedbackStats = async (req, res) => {
  const stats = await Feedback.aggregate([
    {
      $group: {
        _id: null,
        averageRating: { $avg: '$rating' },
        totalFeedback: { $sum: 1 },
        recommendCount: {
          $sum: { $cond: [{ $eq: ['$recommend', true] }, 1, 0] }
        },
        moodStats: { $push: '$mood' }
      }
    },
    {
      $project: {
        _id: 0,
        averageRating: { $round: ['$averageRating', 1] },
        totalFeedback: 1,
        recommendPercentage: {
          $multiply: [
            { $divide: ['$recommendCount', '$totalFeedback'] },
            100
          ]
        },
        moodDistribution: {
          $reduce: {
            input: ['relaxed', 'focused', 'energized', 'neutral'],
            initialValue: {},
            in: {
              $mergeObjects: [
                '$$value',
                {
                  $arrayToObject: [
                    [
                      {
                        k: '$$this',
                        v: {
                          $size: {
                            $filter: {
                              input: '$moodStats',
                              as: 'mood',
                              cond: { $eq: ['$$mood', '$$this'] }
                            }
                          }
                        }
                      }
                    ]
                  ]
                }
              ]
            }
          }
        }
      }
    }
  ]);

  // Get recent feedback with user details
  const recentFeedback = await Feedback.find()
    .sort({ createdAt: -1 })
    .limit(5)
    .populate('user', 'name email')
    .populate('sessionId', 'title');

  res.json({
    success: true,
    data: {
      ...stats[0],
      recentFeedback
    }
  });
};