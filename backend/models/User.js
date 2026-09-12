import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    username: {
      type: String,
      trim: true,
      index: true,
    },
    fullName: {
      type: String,
      default: '',
      trim: true,
    },
    avatarUrl: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: 'Frontend Software Engineer',
    },
    bio: {
      type: String,
      default: '',
    },
    country: {
      type: String,
      default: 'Global',
    },
    overallRating: {
      type: Number,
      default: 750,
      index: true,
    },
    tier: {
      type: String,
      enum: ['Novice', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster'],
      default: 'Bronze',
    },
    problemsSolved: {
      type: Number,
      default: 0,
    },
    accuracy: {
      type: Number,
      default: 100.0,
    },
    averageCodeQuality: {
      type: Number,
      default: 85.0,
    },
    streak: {
      type: Number,
      default: 0,
    },
    lastActiveDate: {
      type: Date,
      default: Date.now,
    },
    skillRatings: {
      JavaScript: { type: Number, default: 750 },
      HTML: { type: Number, default: 750 },
      CSS: { type: Number, default: 750 },
    },
    difficultyProgress: {
      Beginner: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 20 },
      },
      Medium: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 20 },
      },
      Advanced: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 20 },
      },
      Expert: {
        completed: { type: Number, default: 0 },
        total: { type: Number, default: 20 },
      },
    },
    ratingHistory: [
      {
        date: { type: String, required: true },
        rating: { type: Number, required: true },
      },
    ],
    badges: [
      {
        id: { type: String },
        name: { type: String },
        icon: { type: String },
        description: { type: String },
        earnedAt: { type: Date, default: Date.now },
      },
    ],
    solvedQuestions: [
      {
        type: String,
        index: true,
      },
    ],
    socialLinks: {
      github: { type: String, default: '' },
      twitter: { type: String, default: '' },
      linkedin: { type: String, default: '' },
      website: { type: String, default: '' },
    },
  },
  {
    timestamps: true,
  }
);

// Helper method to compute user tier from rating
UserSchema.methods.calculateTier = function () {
  const r = this.overallRating;
  if (r >= 950) return 'Grandmaster';
  if (r >= 900) return 'Master';
  if (r >= 850) return 'Diamond';
  if (r >= 800) return 'Platinum';
  if (r >= 750) return 'Gold';
  if (r >= 650) return 'Silver';
  if (r >= 500) return 'Bronze';
  return 'Novice';
};

const User = mongoose.model('User', UserSchema);

export default User;
