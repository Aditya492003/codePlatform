import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { User } from '../models/index.js';

const deleteGuestUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas!');

    const deleted = await User.deleteMany({
      $or: [
        { clerkId: 'usr_guest' },
        { username: 'usr_guest' },
        { fullName: 'Active Developer' },
      ],
    });
    console.log(`🗑️ Removed ${deleted.deletedCount} guest/dummy users from MongoDB Atlas.`);

    const remainingUsers = await User.find();
    console.log(`✅ Current Active Users in Atlas (${remainingUsers.length}):`);
    remainingUsers.forEach((u) => {
      console.log(`- ${u.fullName || u.username} (@${u.username}) | Rating: ${u.overallRating} | Solved: ${u.problemsSolved}`);
    });

    process.exit(0);
  } catch (err) {
    console.error('Error deleting guest user:', err);
    process.exit(1);
  }
};

deleteGuestUser();
