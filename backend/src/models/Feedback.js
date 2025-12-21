import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  mood: {
    type: String,
    required: true,
    enum: ['relaxed', 'focused', 'energized', 'neutral']
  },
  recommend: {
    type: Boolean,
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  chips: [{
    type: String
  }],
  sessionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.models.Feedback || mongoose.model('Feedback', feedbackSchema);
