import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { User, Question, Submission, Evaluation } from '../models/index.js';

const seedHtmlAndResetStats = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set in backend/.env');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to Atlas!');

    // 1. Reset all user stats
    console.log('🔄 Resetting user stats and clearing submissions/evaluations...');
    await Submission.deleteMany({});
    await Evaluation.deleteMany({});

    const defaultProgress = {
      JavaScript: {
        Beginner: { level: 1, completed: false, solvedQuestions: [] },
        Medium: { level: 1, completed: false, solvedQuestions: [] },
        Advanced: { level: 1, completed: false, solvedQuestions: [] },
        Expert: { level: 1, completed: false, solvedQuestions: [] },
      },
      HTML: {
        Beginner: { level: 1, completed: false, solvedQuestions: [] },
        Medium: { level: 1, completed: false, solvedQuestions: [] },
        Advanced: { level: 1, completed: false, solvedQuestions: [] },
        Expert: { level: 1, completed: false, solvedQuestions: [] },
      },
      CSS: {
        Beginner: { level: 1, completed: false, solvedQuestions: [] },
        Medium: { level: 1, completed: false, solvedQuestions: [] },
        Advanced: { level: 1, completed: false, solvedQuestions: [] },
        Expert: { level: 1, completed: false, solvedQuestions: [] },
      },
    };

    const resetUsersResult = await User.updateMany(
      {},
      {
        $set: {
          rating: 750,
          tier: 'BRONZE_I',
          questionsSolved: 0,
          totalAttempts: 0,
          currentStreak: 0,
          longestStreak: 0,
          progress: defaultProgress,
          ratingHistory: [{ rating: 750, timestamp: new Date(), change: 0, reason: 'Initial placement' }],
        },
      }
    );
    console.log(`✅ Reset stats for ${resetUsersResult.modifiedCount} users in Atlas.`);

    // 2. Read html-questions.json
    const jsonPath = path.join(__dirname, '..', '..', 'html-questions.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`html-questions.json not found at: ${jsonPath}`);
    }

    console.log(`📖 Reading questions from ${jsonPath}...`);
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const questions = JSON.parse(rawData);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('html-questions.json is empty or not an array');
    }

    console.log(`📦 Found ${questions.length} HTML questions to seed.`);

    // Remove old HTML questions to keep clean set
    const deleteOld = await Question.deleteMany({ technology: 'HTML' });
    console.log(`🗑️ Removed ${deleteOld.deletedCount} old HTML questions.`);

    // Bulk insert new HTML questions
    const operations = questions.map((q) => ({
      updateOne: {
        filter: { slug: q.slug || q.id },
        update: {
          $set: {
            slug: q.slug || q.id,
            technology: 'HTML',
            difficulty: q.difficulty || 'Beginner',
            level: Number(q.level) || 1,
            questionNumber: Number(q.questionNumber) || 1,
            type: q.type || 'BUILD',
            title: q.title,
            description: q.description,
            concepts: q.concepts || [],
            requirements: q.requirements || [],
            constraints: q.constraints || [],
            starterCode: q.starterCode || '',
            solutionCode: q.solutionCode || '',
            predictConfig: q.predictConfig || null,
            evaluationCriteria: q.evaluationCriteria || { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
            estimatedTime: Number(q.estimatedTime) || 5,
            points: Number(q.points) || 10,
          },
        },
        upsert: true,
      },
    }));

    const result = await Question.bulkWrite(operations);
    console.log(`🎉 Successfully seeded ${result.upsertedCount + result.modifiedCount} HTML questions into MongoDB Atlas!`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding HTML questions and resetting stats:', error);
    process.exit(1);
  }
};

seedHtmlAndResetStats();
