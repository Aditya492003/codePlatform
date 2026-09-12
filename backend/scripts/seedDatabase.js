import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env from backend/.env
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { User, Question, Submission, Evaluation } from '../models/index.js';
import { javascriptQuestions } from '../../frontend/src/data/questions/javascriptQuestions.js';
import { htmlQuestions } from '../../frontend/src/data/questions/htmlQuestions.js';
import { cssQuestions } from '../../frontend/src/data/questions/cssQuestions.js';
import { mockLeaderboard } from '../../frontend/src/data/mockLeaderboard.js';
import { mockUser } from '../../frontend/src/data/mockUser.js';

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set in environment!');
    }

    console.log(' Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log(' Connected to Atlas!');

    // 1. Seed Questions
    console.log('📦 Seeding Questions...');
    const allQuestions = [...javascriptQuestions, ...htmlQuestions, ...cssQuestions];
    
    console.log(`Found ${allQuestions.length} total questions across JS, HTML, and CSS.`);

    for (const q of allQuestions) {
      await Question.findOneAndUpdate(
        { slug: q.id },
        {
          $set: {
            slug: q.id,
            technology: q.technology,
            difficulty: q.difficulty,
            level: q.level || 1,
            questionNumber: q.questionNumber || 1,
            type: q.type || 'BUILD',
            title: q.title,
            description: q.description,
            concepts: q.concepts || [],
            requirements: q.requirements || [],
            constraints: q.constraints || [],
            examples: q.examples || [],
            starterCode: q.starterCode || '',
            solutionCode: q.solutionCode || '',
            predictConfig: q.predictConfig || null,
            evaluationCriteria: q.evaluationCriteria || {},
            estimatedTime: q.estimatedTime || 15,
            points: q.points || 10,
          },
        },
        { upsert: true, new: true }
      );
    }
    console.log(` Successfully seeded ${allQuestions.length} questions into MongoDB Atlas!`);

    // 2. Seed Mock Users & Leaderboard
    console.log('👤 Seeding Users & Leaderboard entries...');
    
    // Seed primary mock user
    await User.findOneAndUpdate(
      { clerkId: mockUser.id },
      {
        $set: {
          clerkId: mockUser.id,
          username: mockUser.username,
          fullName: mockUser.fullName,
          title: mockUser.title,
          avatarUrl: mockUser.avatarUrl,
          overallRating: mockUser.overallRating,
          problemsSolved: mockUser.problemsSolved,
          accuracy: mockUser.accuracy,
          averageCodeQuality: mockUser.averageCodeQuality,
          skillRatings: mockUser.skillRatings,
          difficultyProgress: mockUser.difficultyProgress,
          ratingHistory: mockUser.ratingHistory,
          tier: 'Gold',
        },
      },
      { upsert: true }
    );

    // Seed leaderboard users
    for (const entry of mockLeaderboard) {
      await User.findOneAndUpdate(
        { clerkId: entry.id },
        {
          $set: {
            clerkId: entry.id,
            username: entry.username,
            fullName: entry.name,
            avatarUrl: entry.avatarUrl,
            overallRating: entry.rating,
            tier: entry.tier,
            problemsSolved: entry.solved,
            accuracy: entry.accuracy,
            country: entry.country,
            streak: entry.streak,
            skillRatings: {
              JavaScript: entry.primaryTech === 'JavaScript' ? entry.rating : 750,
              HTML: entry.primaryTech === 'HTML' ? entry.rating : 750,
              CSS: entry.primaryTech === 'CSS' ? entry.rating : 750,
            },
          },
        },
        { upsert: true }
      );
    }
    console.log(` Successfully seeded ${mockLeaderboard.length + 1} users into MongoDB Atlas!`);

    console.log('🎉 Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
