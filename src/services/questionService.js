import { allQuestions, javascriptQuestions, htmlQuestions, cssQuestions } from '../data/questions';

/**
 * Service to fetch questions by technology, difficulty, level, or ID.
 * Backend-ready: can be swapped to `fetch('/api/questions/...')` in future.
 */
export const questionService = {
  /**
   * Get all questions
   */
  async getAllQuestions() {
    return Promise.resolve([...allQuestions]);
  },

  /**
   * Get question by ID
   */
  async getQuestionById(id) {
    const question = allQuestions.find((q) => q.id === id);
    if (!question) {
      // Fallback to first available JavaScript question
      return Promise.resolve(javascriptQuestions[0]);
    }
    return Promise.resolve(question);
  },

  /**
   * Get 20 questions for a given technology, difficulty, and level
   */
  async getQuestionsByFilter(technology = 'JavaScript', difficulty = 'Medium', level = 2) {
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

    // Return the default 20 questions for this technology
    return Promise.resolve(pool.slice(0, 20));
  }
};
