import express from 'express';
import {
  getQuestions,
  getQuestionById,
  createQuestion,
  bulkUpsertQuestions,
} from '../controllers/questionController.js';

const router = express.Router();

router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.post('/', createQuestion);
router.post('/bulk', bulkUpsertQuestions);

export default router;
