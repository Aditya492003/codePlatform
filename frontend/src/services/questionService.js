import { allQuestions, javascriptQuestions, htmlQuestions, cssQuestions } from '../data/questions';
import { apiRequest } from './api';

/**
 * Service to fetch questions by technology, difficulty, level, or ID.
 * Connects directly to backend Express + MongoDB Atlas API with fallback.
 */
export const questionService = {
  /**
   * Get all questions
   */
  async getAllQuestions() {
    try {
      const res = await apiRequest('/questions?limit=200');
      if (res?.data && res.data.length > 0) {
        return res.data.map((q) => ({
          ...q,
          id: q.slug || q._id,
        }));
      }
    } catch (err) {
      console.warn('Backend questions unavailable, using local data fallback');
    }
    return Promise.resolve([...allQuestions]);
  },

  /**
   * Get question by ID / slug
   */
  async getQuestionById(id) {
    try {
      const res = await apiRequest(`/questions/${id}`);
      if (res?.data) {
        return {
          ...res.data,
          id: res.data.slug || res.data._id,
        };
      }
    } catch (err) {
      console.warn(`Backend question ${id} unavailable, using local fallback`);
    }

    const question = allQuestions.find((q) => q.id === id);
    if (!question) {
      return Promise.resolve(javascriptQuestions[0]);
    }
    return Promise.resolve(question);
  },

  /**
   * Get questions for a given technology, difficulty, and level
   */
  async getQuestionsByFilter(technology = 'JavaScript', difficulty = 'Medium', level = 2) {
    try {
      const res = await apiRequest(
        `/questions?technology=${encodeURIComponent(technology)}&difficulty=${encodeURIComponent(difficulty)}&level=${level}`
      );
      if (res?.data && res.data.length > 0) {
        return res.data.map((q) => ({
          ...q,
          id: q.slug || q._id,
        }));
      }
    } catch (err) {
      console.warn('Backend filtered questions unavailable, using local fallback');
    }

    let pool = javascriptQuestions;
    if (technology.toLowerCase() === 'html') pool = htmlQuestions;
    if (technology.toLowerCase() === 'css') pool = cssQuestions;

    const filtered = pool.filter(
      (q) =>
        q.technology.toLowerCase() === technology.toLowerCase() &&
        q.difficulty.toLowerCase() === difficulty.toLowerCase() &&
        Number(q.level) === Number(level)
    );

    if (filtered.length > 0) {
      return Promise.resolve(filtered);
    }

    return Promise.resolve(pool.slice(0, 20));
  },
};
