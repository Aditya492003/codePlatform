import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { User } from '../models/index.js';

const sanitizeUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas!');

    const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

    const result = await User.updateMany(
      {},
      {
        $set: {
          overallRating: 750,
          tier: 'Bronze',
          problemsSolved: 0,
          streak: 0,
          solvedQuestions: [],
          skillRatings: { JavaScript: 750, HTML: 750, CSS: 750 },
          difficultyProgress: {
            Beginner: { completed: 0, total: 20 },
            Medium: { completed: 0, total: 20 },
            Advanced: { completed: 0, total: 20 },
            Expert: { completed: 0, total: 20 },
          },
          ratingHistory: [{ date: todayStr, rating: 750 }],
        },
      }
    );

    console.log(`✅ Cleaned and sanitized ${result.modifiedCount} users in Atlas.`);
    process.exit(0);
  } catch (err) {
    console.error('Error sanitizing users:', err);
    process.exit(1);
  }
};

sanitizeUsers();
