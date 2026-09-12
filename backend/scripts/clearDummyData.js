import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { User, Submission, Evaluation } from '../models/index.js';

const clearDummyData = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to Atlas!');

    // Clear fake users (only delete users that were mock seeded or clear all dummy users)
    const mockUserIds = [
      'usr_alex_dev',
      'usr_elena_v',
      'usr_marcus_k',
      'usr_sophia_l',
      'usr_david_k',
      'usr_ananya_p',
      'usr_lucas_m',
      'usr_chloe_d',
      'usr_tariq_a',
      'usr_olivia_w',
      'usr_kenji_s',
    ];

    const deletedUsers = await User.deleteMany({ clerkId: { $in: mockUserIds } });
    console.log(` Cleared ${deletedUsers.deletedCount} dummy users from MongoDB Atlas.`);

    const deletedSubmissions = await Submission.deleteMany({ userId: { $in: mockUserIds } });
    console.log(` Cleared ${deletedSubmissions.deletedCount} dummy submissions.`);

    const deletedEvaluations = await Evaluation.deleteMany({ userId: { $in: mockUserIds } });
    console.log(` Cleared ${deletedEvaluations.deletedCount} dummy evaluations.`);

    console.log('✨ All dummy leaderboard and user data successfully cleared from Atlas!');
    process.exit(0);
  } catch (error) {
    console.error('Error clearing dummy data:', error);
    process.exit(1);
  }
};

clearDummyData();
