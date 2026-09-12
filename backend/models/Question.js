import mongoose from 'mongoose';

const ExampleSchema = new mongoose.Schema(
  {
    input: { type: String, default: '' },
    output: { type: String, default: '' },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const PredictOptionSchema = new mongoose.Schema(
  {
    id: { type: String },
    label: { type: String },
    isCorrect: { type: Boolean, default: false },
  },
  { _id: false }
);

const PredictConfigSchema = new mongoose.Schema(
  {
    snippet: { type: String, default: '' },
    options: [mongoose.Schema.Types.Mixed],
    correctAnswer: { type: String, default: '' },
    explanation: { type: String, default: '' },
  },
  { _id: false }
);

const EvaluationCriteriaSchema = new mongoose.Schema(
  {
    correctnessWeight: { type: Number, default: 70 },
    qualityWeight: { type: Number, default: 15 },
    structureWeight: { type: Number, default: 15 },
    readabilityWeight: { type: Number, default: 0 },
    bestPracticesWeight: { type: Number, default: 0 },
  },
  { _id: false }
);

const QuestionSchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      index: true,
      trim: true,
    },
    technology: {
      type: String,
      required: true,
      enum: ['JavaScript', 'HTML', 'CSS'],
      index: true,
    },
    difficulty: {
      type: String,
      required: true,
      enum: ['Beginner', 'Medium', 'Advanced', 'Expert'],
      index: true,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
      index: true,
    },
    questionNumber: {
      type: Number,
      default: 1,
    },
    type: {
      type: String,
      enum: ['BUILD', 'PREDICT_OUTPUT', 'DEBUG'],
      default: 'BUILD',
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    concepts: [{ type: String }],
    requirements: [{ type: String }],
    constraints: [{ type: String }],
    examples: [ExampleSchema],
    starterCode: {
      type: String,
      default: '',
    },
    solutionCode: {
      type: String,
      default: '',
    },
    predictConfig: {
      type: PredictConfigSchema,
      default: null,
    },
    evaluationCriteria: {
      type: EvaluationCriteriaSchema,
      default: () => ({}),
    },
    estimatedTime: {
      type: Number,
      default: 15, // in minutes
    },
    points: {
      type: Number,
      default: 10,
    },
    tags: [{ type: String }],
    totalSubmissions: {
      type: Number,
      default: 0,
    },
    totalAccepted: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Virtual for acceptance rate
QuestionSchema.virtual('acceptanceRate').get(function () {
  if (!this.totalSubmissions || this.totalSubmissions === 0) return 0;
  return Number(((this.totalAccepted / this.totalSubmissions) * 100).toFixed(1));
});

QuestionSchema.set('toJSON', { virtuals: true });
QuestionSchema.set('toObject', { virtuals: true });

const Question = mongoose.model('Question', QuestionSchema);

export default Question;
