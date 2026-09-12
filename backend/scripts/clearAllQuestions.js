import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import Question from '../models/Question.js';
import Submission from '../models/Submission.js';
import Evaluation from '../models/Evaluation.js';

const clearAllQuestions = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log(' Connected to Atlas!');

    const resQuestions = await Question.deleteMany({});
    console.log(` Cleared all ${resQuestions.deletedCount} questions from MongoDB Atlas.`);

    const resSubs = await Submission.deleteMany({});
    console.log(` Cleared all ${resSubs.deletedCount} submissions.`);

    const resEvals = await Evaluation.deleteMany({});
    console.log(` Cleared all ${resEvals.deletedCount} evaluations.`);

    console.log('✨ All questions and test data successfully wiped from MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('Error wiping database:', err);
    process.exit(1);
  }
};

clearAllQuestions();
