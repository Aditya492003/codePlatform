import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { Question } from '../models/index.js';

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to Atlas!');

    const deleted = await Question.deleteMany({ technology: { $ne: 'HTML' } });
    console.log(`🗑️ Removed ${deleted.deletedCount} non-HTML questions.`);

    const total = await Question.countDocuments({ technology: 'HTML' });
    console.log(`✅ Exact total HTML questions active in Atlas: ${total}`);

    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
};

run();
