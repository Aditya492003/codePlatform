import mongoose from 'mongoose';

const TestResultSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    passed: { type: Boolean, required: true },
    expected: { type: String, default: '' },
    actual: { type: String, default: '' },
    error: { type: String, default: '' },
  },
  { _id: false }
);

const SubmissionSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },
    questionId: {
      type: String,
      required: true,
      index: true,
    },
    questionTitle: {
      type: String,
      default: '',
    },
    technology: {
      type: String,
      enum: ['JavaScript', 'HTML', 'CSS'],
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Medium', 'Advanced', 'Expert'],
      default: 'Beginner',
    },
    level: {
      type: Number,
      default: 1,
    },
    code: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Accepted', 'Partial', 'Failed', 'Error'],
      default: 'Accepted',
      index: true,
    },
    score: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    classification: {
      type: String,
      enum: ['Needs Work', 'Developing', 'Proficient', 'Excellent', 'Perfect'],
      default: 'Proficient',
    },
    ratingChange: {
      type: Number,
      default: 0,
    },
    executionTimeMs: {
      type: Number,
      default: 0,
    },
    testResults: [TestResultSchema],
    feedbackSummary: {
      type: String,
      default: '',
    },
    submittedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

const Submission = mongoose.model('Submission', SubmissionSchema);

export default Submission;
