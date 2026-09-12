import express from 'express';
import {
  createSubmission,
  getUserSubmissions,
  getSubmissionById,
} from '../controllers/submissionController.js';

const router = express.Router();

router.post('/', createSubmission);
router.get('/user/:userId', getUserSubmissions);
router.get('/:id', getSubmissionById);

export default router;
