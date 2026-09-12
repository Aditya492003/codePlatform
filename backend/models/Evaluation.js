import mongoose from 'mongoose';

const CodeSmellSchema = new mongoose.Schema(
  {
    line: { type: Number, default: 1 },
    message: { type: String, required: true },
    severity: { type: String, enum: ['info', 'warning', 'error'], default: 'info' },
  },
  { _id: false }
);

const EvaluationSchema = new mongoose.Schema(
  {
    submissionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Submission',
      index: true,
    },
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
    overallScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    classification: {
      type: String,
      enum: ['Needs Work', 'Developing', 'Proficient', 'Excellent', 'Perfect'],
      default: 'Proficient',
    },
    criteriaScores: {
      correctness: { type: Number, default: 0 },
      codeQuality: { type: Number, default: 0 },
      structure: { type: Number, default: 0 },
      readability: { type: Number, default: 0 },
      bestPractices: { type: Number, default: 0 },
    },
    aiFeedback: {
      type: String,
      default: '',
    },
    strengths: [{ type: String }],
    improvements: [{ type: String }],
    codeSmells: [CodeSmellSchema],
    ratingDelta: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Evaluation = mongoose.model('Evaluation', EvaluationSchema);

export default Evaluation;
