import mongoose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { User } from '../models/index.js';

const listUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const users = await User.find();
    console.log('ALL USERS IN ATLAS:');
    users.forEach((u) => {
      console.log(`- ID: ${u._id} | clerkId: "${u.clerkId}" | username: "${u.username}" | fullName: "${u.fullName}" | rating: ${u.overallRating} | solved: ${u.problemsSolved}`);
    });
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

listUsers();
