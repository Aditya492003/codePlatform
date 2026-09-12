import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import mongoose from 'mongoose';
import Question from '../models/Question.js';
import User from '../models/User.js';

const testMongoData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Successfully connected to Atlas!');

    const questionCount = await Question.countDocuments();
    const userCount = await User.countDocuments();
    const jsQuestions = await Question.find({ technology: 'JavaScript' }).limit(3);
    const topUsers = await User.find().sort({ overallRating: -1 }).limit(3);

    console.log(`\n Database Statistics in MongoDB Atlas:`);
    console.log(`- Total Questions in DB: ${questionCount}`);
    console.log(`- Total Users in DB: ${userCount}`);

    console.log(`\n Sample Question fetched from MongoDB Atlas:`);
    console.log(`- Slug: ${jsQuestions[0]?.slug}`);
    console.log(`- Title: ${jsQuestions[0]?.title}`);
    console.log(`- Tech: ${jsQuestions[0]?.technology} (${jsQuestions[0]?.difficulty}, Level ${jsQuestions[0]?.level})`);

    console.log(`\n Top Leaderboard User fetched from MongoDB Atlas:`);
    console.log(`- Name: ${topUsers[0]?.fullName} (@${topUsers[0]?.username})`);
    console.log(`- Rating: ${topUsers[0]?.overallRating} [${topUsers[0]?.tier}]`);
    console.log(`- Solved: ${topUsers[0]?.problemsSolved}`);

    console.log('\n All Atlas Model Queries Verified Successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
};

testMongoData();
