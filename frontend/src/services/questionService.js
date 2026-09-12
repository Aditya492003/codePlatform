import { apiRequest } from './api';

/**
 * Unescapes and formats code strings so newlines and indentation render across multiple lines
 */
export const cleanCodeString = (code) => {
  if (!code || typeof code !== 'string') return '';
  let cleaned = code;
  // Handle escaped newlines
  if (cleaned.includes('\\n')) {
    cleaned = cleaned.replace(/\\n/g, '\n');
  }
  // Handle escaped tabs
  if (cleaned.includes('\\t')) {
    cleaned = cleaned.replace(/\\t/g, '  ');
  }
  // Handle escaped quotes
  if (cleaned.includes('\\"')) {
    cleaned = cleaned.replace(/\\"/g, '"');
  }
  return cleaned.trim();
};

const sanitizeQuestion = (q) => {
  if (!q) return q;
  return {
    ...q,
    id: q.slug || q._id || q.id,
    starterCode: cleanCodeString(q.starterCode),
    solutionCode: cleanCodeString(q.solutionCode),
    predictConfig: q.predictConfig
      ? {
          ...q.predictConfig,
          snippet: cleanCodeString(q.predictConfig.snippet),
        }
      : null,
  };
};

/**
 * Creates technology-accurate fallbacks
 */
const createTechFallback = (technology = 'JavaScript', difficulty = 'Beginner', level = 1, questionNumber = 1, slug = '') => {
  const tech = (technology || '').toUpperCase();
  if (tech === 'CSS' || slug.startsWith('cs-') || slug.startsWith('css-')) {
    return sanitizeQuestion({
      id: slug || `cs-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      slug: slug || `cs-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      technology: 'CSS',
      difficulty,
      level: Number(level),
      questionNumber: Number(questionNumber),
      type: 'BUILD',
      title: 'Style a Responsive Action Button',
      description: 'Write CSS rules for `.primary-button` with a blue background, white text, 12px 24px padding, and 8px border-radius.',
      concepts: ['button styling', 'padding', 'border-radius', 'color'],
      requirements: [
        'Set background-color to #2563eb',
        'Set text color to #ffffff',
        'Set padding to 12px 24px and border-radius to 8px',
        'Set border to none',
      ],
      constraints: ['Use valid CSS syntax'],
      starterCode: `/* Write your CSS rules for .primary-button here */\n.primary-button {\n  \n}\n`,
      solutionCode: `.primary-button {\n  background-color: #2563eb;\n  color: #ffffff;\n  padding: 12px 24px;\n  border-radius: 8px;\n  border: none;\n}\n`,
      predictConfig: null,
      evaluationCriteria: { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
      estimatedTime: 4,
      points: 10,
    });
  }

  if (tech === 'HTML' || slug.startsWith('ht-') || slug.startsWith('html-')) {
    return sanitizeQuestion({
      id: slug || `ht-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      slug: slug || `ht-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      technology: 'HTML',
      difficulty,
      level: Number(level),
      questionNumber: Number(questionNumber),
      type: 'BUILD',
      title: 'Build a Semantic Article Card',
      description: 'Write semantic HTML5 markup for an article card containing an <article> tag, a <header> with an <h2> title, and a <p> element.',
      concepts: ['semantic HTML', 'article', 'header', 'h2'],
      requirements: [
        'Wrap content inside an <article> with class="card"',
        'Include a <header> with an <h2> title',
        'Include a <p> description paragraph',
      ],
      constraints: ['Valid HTML5 tags'],
      starterCode: `<!-- Construct your semantic HTML card here -->\n<article class="card">\n  \n</article>\n`,
      solutionCode: `<article class="card">\n  <header>\n    <h2>Title</h2>\n  </header>\n  <p>Content</p>\n</article>\n`,
      predictConfig: null,
      evaluationCriteria: { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
      estimatedTime: 4,
      points: 10,
    });
  }

  return sanitizeQuestion({
    id: slug || `js-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
    slug: slug || `js-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
    technology: 'JavaScript',
    difficulty,
    level: Number(level),
    questionNumber: Number(questionNumber),
    type: 'BUILD',
    title: 'Declare and Return a Greeting',
    description: 'Write a function `getGreeting()` that returns the exact string "Hello, World!".',
    concepts: ['functions', 'strings', 'return'],
    requirements: ['Define function getGreeting', 'Return "Hello, World!"'],
    constraints: ['Exact casing'],
    starterCode: `/**\n * Returns greeting message.\n * @returns {string}\n */\nfunction getGreeting() {\n  // Write your solution here\n  \n}\n`,
    solutionCode: `function getGreeting() {\n  return "Hello, World!";\n}`,
    predictConfig: null,
    evaluationCriteria: { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
    estimatedTime: 3,
    points: 10,
  });
};

export const questionService = {
  /**
   * Get single question by ID or slug from backend / Atlas
   */
  async getQuestionById(id) {
    try {
      const res = await apiRequest(`/questions/${id}`);
      if (res?.data) {
        return sanitizeQuestion({
          ...res.data,
          id: res.data.slug || res.data._id || id,
        });
      }
    } catch (err) {
      console.warn(`[questionService] Failed to load question ${id}, falling back:`, err.message);
    }
    const inferredTech = id?.startsWith('cs-') ? 'CSS' : id?.startsWith('js-') ? 'JavaScript' : 'HTML';
    return createTechFallback(inferredTech, 'Beginner', 1, 1, id);
  },

  /**
   * Fetch predefined question based on user progression
   */
  async getAdaptiveNextQuestion({
    technology = 'HTML',
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
        return sanitizeQuestion({
          ...res.data,
          id: res.data.slug || res.data._id,
        });
      }
    } catch (err) {
      console.warn('[questionService] Question fetch fallback:', err.message);
    }

    return createTechFallback(technology, difficulty, level, questionNumber);
  },

  /**
   * Get questions for a given track filter
   */
  async getQuestionsByFilter(technology = 'HTML', difficulty = 'Beginner', level = 1) {
    try {
      const res = await apiRequest(
        `/questions?technology=${encodeURIComponent(technology)}&difficulty=${encodeURIComponent(difficulty)}&level=${level}&limit=20`
      );
      if (res?.data && res.data.length > 0) {
        return res.data.map((q) =>
          sanitizeQuestion({
            ...q,
            id: q.slug || q._id,
          })
        );
      }
    } catch (err) {
      console.warn('[questionService] Fetch filtered questions fallback:', err.message);
    }

    return [createTechFallback(technology, difficulty, level, 1)];
  },
};
