import Question from '../models/Question.js';
import { groqQuestionGenerator } from '../services/groqService.js';

/**
 * Get all questions with flexible filtering
 * GET /api/questions?technology=JavaScript&difficulty=Medium&level=2&limit=20
 */
export const getQuestions = async (req, res) => {
  try {
    const { technology, difficulty, level, type, limit = 50, skip = 0 } = req.query;

    const query = {};
    if (technology) query.technology = new RegExp(`^${technology}$`, 'i');
    if (difficulty) query.difficulty = new RegExp(`^${difficulty}$`, 'i');
    if (level) query.level = Number(level);
    if (type) query.type = type.toUpperCase();

    const questions = await Question.find(query)
      .sort({ level: 1, questionNumber: 1 })
      .limit(Number(limit))
      .skip(Number(skip));

    const total = await Question.countDocuments(query);

    res.status(200).json({
      success: true,
      count: questions.length,
      total,
      data: questions,
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ success: false, message: 'Server error fetching questions', error: error.message });
  }
};

/**
 * Get single question by slug or ID, or dynamically generate on-demand if not found
 * GET /api/questions/:id
 */
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    let question = await Question.findOne({ slug: id });
    if (!question && id.match(/^[0-9a-fA-F]{24}$/)) {
      question = await Question.findById(id);
    }

    if (!question) {
      // If it looks like a structured slug like "js-beg-l1-q01", attempt on-demand AI generation
      const parts = id.split('-');
      if (parts.length >= 4) {
        const techMap = { js: 'JavaScript', ht: 'HTML', html: 'HTML', cs: 'CSS', css: 'CSS' };
        const diffMap = { beg: 'Beginner', med: 'Medium', adv: 'Advanced', exp: 'Expert' };
        const tech = techMap[parts[0].toLowerCase()] || 'JavaScript';
        const diff = diffMap[parts[1].toLowerCase()] || 'Beginner';
        const lvl = parseInt(parts[2].replace('l', ''), 10) || 1;
        const qNum = parseInt(parts[3].replace('q', ''), 10) || 1;

        console.log(`🤖 Question ${id} not found in DB. Triggering on-demand Groq AI generation for ${tech} ${diff} L${lvl}...`);
        question = await groqQuestionGenerator.generateAdaptiveQuestion({
          technology: tech,
          difficulty: diff,
          level: lvl,
          questionNumber: qNum,
        });
      }
    }

    if (!question) {
      return res.status(404).json({ success: false, message: 'Question not found' });
    }

    res.status(200).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ success: false, message: 'Server error fetching question', error: error.message });
  }
};

/**
 * Dynamically generate an adaptive AI question using Groq openai/gpt-oss-120b
 * POST /api/questions/generate
 */
export const generateAdaptiveQuestion = async (req, res) => {
  try {
    const {
      technology = 'JavaScript',
      difficulty = 'Beginner',
      level = 1,
      questionNumber = 1,
      userId = 'usr_guest',
      performanceContext = {},
    } = req.body;

    console.log(`🧠 Generating adaptive question with Groq AI for User: ${userId} (${technology}, ${difficulty}, L${level}, Q${questionNumber})`);
    if (performanceContext.previousTimeSeconds) {
      console.log(`⏱️ User's previous solve time: ${performanceContext.previousTimeSeconds}s, score: ${performanceContext.previousScore}`);
    }

    const question = await groqQuestionGenerator.generateAdaptiveQuestion({
      technology,
      difficulty,
      level: Number(level),
      questionNumber: Number(questionNumber),
      userId,
      performanceContext,
    });

    res.status(200).json({
      success: true,
      message: 'Adaptive question generated successfully via Groq AI',
      data: question,
    });
  } catch (error) {
    console.error('Failed to generate adaptive question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate question with AI',
      error: error.message,
    });
  }
};

/**
 * Create a new question
 * POST /api/questions
 */
export const createQuestion = async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json({
      success: true,
      data: question,
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(400).json({ success: false, message: 'Error creating question', error: error.message });
  }
};

/**
 * Batch insert or upsert questions
 * POST /api/questions/bulk
 */
export const bulkUpsertQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    if (!Array.isArray(questions)) {
      return res.status(400).json({ success: false, message: 'Expected questions array' });
    }

    const operations = questions.map((q) => ({
      updateOne: {
        filter: { slug: q.id || q.slug },
        update: {
          $set: {
            slug: q.id || q.slug,
            technology: q.technology,
            difficulty: q.difficulty,
            level: q.level || 1,
            questionNumber: q.questionNumber || 1,
            type: q.type || 'BUILD',
            title: q.title,
            description: q.description,
            concepts: q.concepts || [],
            requirements: q.requirements || [],
            constraints: q.constraints || [],
            examples: q.examples || [],
            starterCode: q.starterCode || '',
            solutionCode: q.solutionCode || '',
            predictConfig: q.predictConfig || null,
            evaluationCriteria: q.evaluationCriteria || {},
            estimatedTime: q.estimatedTime || 15,
            points: q.points || 10,
          },
        },
        upsert: true,
      },
    }));

    const result = await Question.bulkWrite(operations);
    res.status(200).json({
      success: true,
      message: 'Questions bulk upserted successfully',
      result,
    });
  } catch (error) {
    console.error('Error bulk updating questions:', error);
    res.status(500).json({ success: false, message: 'Bulk upsert failed', error: error.message });
  }
};
