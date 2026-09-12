import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import mongoose from 'mongoose';
import { groqQuestionGenerator } from '../services/groqService.js';

const testAdaptive = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Connected to MongoDB Atlas');

    console.log('\n--- TEST CASE 1: User struggled on basic question (High elapsed time: 240s, Score: 50) ---');
    const struggleQuestion = await groqQuestionGenerator.generateAdaptiveQuestion({
      technology: 'JavaScript',
      difficulty: 'Beginner',
      level: 1,
      questionNumber: 2,
      userId: 'test_user_1',
      performanceContext: {
        previousTimeSeconds: 240,
        previousScore: 50,
        previousQuestionTitle: 'Declare Variables and Math Operators',
        consecutiveStruggles: 1,
      },
    });

    console.log(' Generated Confidence-Boosting Question:');
    console.log(`- Title: ${struggleQuestion.title}`);
    console.log(`- Type: ${struggleQuestion.type}`);
    console.log(`- Description: ${struggleQuestion.description}`);
    console.log(`- Concepts: ${struggleQuestion.concepts?.join(', ')}`);
    console.log(`- Starter Code preview:\n${struggleQuestion.starterCode.slice(0, 120)}...`);

    console.log('\n--- TEST CASE 2: User solved rapidly (Time: 35s, Score: 100) ---');
    const fastQuestion = await groqQuestionGenerator.generateAdaptiveQuestion({
      technology: 'JavaScript',
      difficulty: 'Medium',
      level: 2,
      questionNumber: 3,
      userId: 'test_user_2',
      performanceContext: {
        previousTimeSeconds: 35,
        previousScore: 100,
        previousQuestionTitle: 'Array Map & Filter Chaining',
      },
    });

    console.log(' Generated Accelerated Question:');
    console.log(`- Title: ${fastQuestion.title}`);
    console.log(`- Type: ${fastQuestion.type}`);
    console.log(`- Description: ${fastQuestion.description}`);

    console.log('\n Both Adaptive Groq AI generation scenarios succeeded!');
    process.exit(0);
  } catch (err) {
    console.error('Test error:', err);
    process.exit(1);
  }
};

testAdaptive();
