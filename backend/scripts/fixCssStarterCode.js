import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { Question } from '../models/index.js';

const fixCssStarterCode = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas!');

    const jsonPath = path.join(__dirname, '..', '..', 'css-questions.json');
    const rawData = fs.readFileSync(jsonPath, 'utf-8');
    const questions = JSON.parse(rawData);

    // Update starterCode in JSON
    const cleanedQuestions = questions.map((q) => {
      let cleanStarter = q.starterCode || '';
      if (cleanStarter.includes('<div') || cleanStarter.includes('<!--')) {
        cleanStarter = `/* Write your CSS rules below */\n\n`;
      }
      return {
        ...q,
        starterCode: cleanStarter,
      };
    });

    fs.writeFileSync(jsonPath, JSON.stringify(cleanedQuestions, null, 2), 'utf-8');
    console.log(`💾 Cleaned starterCode in ${jsonPath}`);

    // Update in MongoDB Atlas
    const updateResult = await Question.updateMany(
      { technology: 'CSS' },
      {
        $set: {
          starterCode: `/* Write your CSS rules below */\n\n`,
        },
      }
    );
    console.log(`✅ Updated ${updateResult.modifiedCount} CSS questions in Atlas with clean CSS starterCode.`);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

fixCssStarterCode();
