import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { Question } from '../models/index.js';

const toArray = (val) => {
  if (!val) return [];
  if (Array.isArray(val)) return val.map((s) => (typeof s === 'string' ? s.trim() : String(s)));
  if (typeof val === 'string') return [val.trim()];
  return [];
};

const normalizePredictConfig = (config, starterCode) => {
  if (!config && !starterCode) return null;
  const cfg = config ? { ...config } : {};

  if (!cfg.snippet && starterCode) {
    cfg.snippet = starterCode;
  }

  if (Array.isArray(cfg.options)) {
    cfg.options = cfg.options.map((opt, index) => {
      if (typeof opt === 'string') {
        return {
          id: `opt-${index + 1}`,
          label: opt,
          isCorrect: cfg.correctAnswer ? opt.trim() === cfg.correctAnswer.trim() : false,
        };
      }
      return opt;
    });
  }

  return cfg;
};

const seedAllQuestions = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error('MONGODB_URI is not set in backend/.env');
    }

    console.log('🚀 Connecting to MongoDB Atlas...');
    await mongoose.connect(mongoUri);
    console.log('✅ Connected to Atlas!');

    const files = [
      { name: 'HTML', file: 'html-questions.json' },
      { name: 'CSS', file: 'css-questions.json' },
      { name: 'JavaScript', file: 'javascript-questions.json' },
    ];

    let totalSeeded = 0;

    for (const item of files) {
      const jsonPath = path.join(__dirname, '..', '..', item.file);
      if (!fs.existsSync(jsonPath)) {
        console.warn(`⚠️ Warning: ${item.file} not found at ${jsonPath}`);
        continue;
      }

      console.log(`📖 Reading questions from ${item.file}...`);
      const rawData = fs.readFileSync(jsonPath, 'utf-8');
      const questions = JSON.parse(rawData);

      if (!Array.isArray(questions) || questions.length === 0) {
        console.warn(`⚠️ Warning: ${item.file} is empty`);
        continue;
      }

      console.log(`📦 Found ${questions.length} ${item.name} questions.`);

      // Clean existing questions for this technology
      const deleteResult = await Question.deleteMany({ technology: item.name });
      console.log(`🗑️ Removed ${deleteResult.deletedCount} existing ${item.name} questions.`);

      const operations = questions.map((q) => {
        const slug = q.slug || q.id;
        const normalizedType = q.type || (q.predictConfig ? 'PREDICT' : 'BUILD');
        const predictConfig = normalizePredictConfig(q.predictConfig, q.starterCode);

        return {
          updateOne: {
            filter: { slug },
            update: {
              $set: {
                slug,
                technology: item.name,
                difficulty: q.difficulty || 'Beginner',
                level: Number(q.level) || 1,
                questionNumber: Number(q.questionNumber) || 1,
                type: normalizedType,
                title: q.title || 'Challenge',
                description: q.description || '',
                concepts: toArray(q.concepts),
                requirements: toArray(q.requirements),
                constraints: toArray(q.constraints),
                starterCode: q.starterCode || '',
                solutionCode: q.solutionCode || '',
                predictConfig,
                evaluationCriteria: q.evaluationCriteria || { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
                estimatedTime: Number(q.estimatedTime) || 5,
                points: Number(q.points) || 10,
              },
            },
            upsert: true,
          },
        };
      });

      const result = await Question.bulkWrite(operations);
      const count = result.upsertedCount + result.modifiedCount;
      console.log(`🎉 Successfully seeded ${count} ${item.name} questions!`);
      totalSeeded += count;
    }

    const htmlCount = await Question.countDocuments({ technology: 'HTML' });
    const cssCount = await Question.countDocuments({ technology: 'CSS' });
    const jsCount = await Question.countDocuments({ technology: 'JavaScript' });

    console.log(`\n========================================`);
    console.log(`📊 TOTAL QUESTIONS IN DATABASE:`);
    console.log(`   HTML:       ${htmlCount}`);
    console.log(`   CSS:        ${cssCount}`);
    console.log(`   JavaScript: ${jsCount}`);
    console.log(`   Grand Total: ${htmlCount + cssCount + jsCount}`);
    console.log(`========================================\n`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding questions:', error);
    process.exit(1);
  }
};

seedAllQuestions();
