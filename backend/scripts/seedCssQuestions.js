import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { Question } from '../models/index.js';

const seedCssQuestions = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set in backend/.env');
    }

    console.log('Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('Connected to Atlas!');

    // Read css-questions.json
    const jsonPath = path.join(__dirname, '..', '..', 'css-questions.json');
    if (!fs.existsSync(jsonPath)) {
      throw new Error(`css-questions.json not found at: ${jsonPath}`);
    }

    console.log(`📖 Reading questions from ${jsonPath}...`);
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const questions = JSON.parse(rawData);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error('css-questions.json is empty or not an array');
    }

    console.log(`📦 Found ${questions.length} CSS questions to seed.`);

    // Remove old CSS questions to keep clean set
    const deleteOld = await Question.deleteMany({ technology: 'CSS' });
    console.log(`🗑️ Removed ${deleteOld.deletedCount} old CSS questions.`);

    // Bulk insert new CSS questions
    const operations = questions.map((q) => ({
      updateOne: {
        filter: { slug: q.slug || q.id },
        update: {
          $set: {
            slug: q.slug || q.id,
            technology: 'CSS',
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
    console.log(`🎉 Successfully seeded ${result.upsertedCount + result.modifiedCount} CSS questions into MongoDB Atlas!`);

    const totalCss = await Question.countDocuments({ technology: 'CSS' });
    const totalHtml = await Question.countDocuments({ technology: 'HTML' });
    console.log(`📊 Current DB Totals => HTML: ${totalHtml}, CSS: ${totalCss}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding CSS questions:', error);
    process.exit(1);
  }
};

seedCssQuestions();
