import express from 'express';
import {
  syncClerkUser,
  getUserProfile,
  updateUserProfile,
  getLeaderboard,
} from '../controllers/userController.js';

const router = express.Router();

router.post('/sync', syncClerkUser);
router.get('/leaderboard', getLeaderboard);
router.get('/profile/:id', getUserProfile);
router.put('/profile/:id', updateUserProfile);

export default router;
