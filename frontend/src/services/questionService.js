import { apiRequest } from './api';
import { QUESTION_SCHEMA_BLUEPRINT, PREDICT_OUTPUT_SCHEMA_BLUEPRINT } from '../data/questionFormat';

/**
 * Clean fallback challenge when offline or before AI loads
 */
const DEFAULT_FALLBACK_QUESTION = {
  ...QUESTION_SCHEMA_BLUEPRINT,
  id: 'js-beg-l1-q01',
  slug: 'js-beg-l1-q01',
  technology: 'JavaScript',
  difficulty: 'Beginner',
  level: 1,
  questionNumber: 1,
  type: 'BUILD',
  title: 'Declare and Return a Greeting',
  description: 'Write a function `getGreeting()` that returns the exact string "Hello, World!".',
  starterCode: '/**\n * Returns greeting message.\n * @returns {string}\n */\nfunction getGreeting() {\n  // Write your solution here\n  \n}\n',
  solutionCode: 'function getGreeting() {\n  return "Hello, World!";\n}',
  examples: [{ input: 'getGreeting()', output: '"Hello, World!"' }],
  requirements: ['Define function getGreeting', 'Return "Hello, World!"'],
  constraints: ['Exact casing'],
};

export const questionService = {
  /**
   * Get single question by ID or slug from backend / Atlas
   */
  async getQuestionById(id) {
    try {
      const res = await apiRequest(`/questions/${id}`);
      if (res?.data) {
        return {
          ...res.data,
          id: res.data.slug || res.data._id || id,
        };
      }
    } catch (err) {
      console.warn(`[questionService] Failed to load question ${id}, falling back:`, err.message);
    }
    return { ...DEFAULT_FALLBACK_QUESTION, id, slug: id };
  },

  /**
   * Generate an adaptive question using Groq AI (openai/gpt-oss-120b)
   * tailored to the user's IQ, time taken, and accuracy.
   */
  async getAdaptiveNextQuestion({
    technology = 'JavaScript',
    difficulty = 'Beginner',
    level = 1,
    questionNumber = 1,
    userId = 'usr_guest',
    performanceContext = {},
  }) {
    try {
      const res = await apiRequest('/questions/generate', {
        method: 'POST',
        body: JSON.stringify({
          technology,
          difficulty,
          level,
          questionNumber,
          userId,
          performanceContext,
        }),
      });

      if (res?.data) {
        return {
          ...res.data,
          id: res.data.slug || res.data._id,
        };
      }
    } catch (err) {
      console.warn('[questionService] Groq AI generation fallback:', err.message);
    }

    return {
      ...DEFAULT_FALLBACK_QUESTION,
      id: `${technology.toLowerCase().slice(0, 2)}-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      slug: `${technology.toLowerCase().slice(0, 2)}-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      technology,
      difficulty,
      level,
      questionNumber,
    };
  },

  /**
   * Get questions for a given track filter
   */
  async getQuestionsByFilter(technology = 'JavaScript', difficulty = 'Beginner', level = 1) {
    try {
      const res = await apiRequest(
        `/questions?technology=${encodeURIComponent(technology)}&difficulty=${encodeURIComponent(difficulty)}&level=${level}&limit=20`
      );
      if (res?.data && res.data.length > 0) {
        return res.data.map((q) => ({
          ...q,
          id: q.slug || q._id,
        }));
      }
    } catch (err) {
      console.warn('[questionService] Fetch filtered questions fallback:', err.message);
    }

    return [DEFAULT_FALLBACK_QUESTION];
  },
};
