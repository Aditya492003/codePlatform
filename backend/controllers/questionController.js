import Question from '../models/Question.js';

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
 * Get single question by slug or ID
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
 * Batch insert or upsert questions (for seeder or bulk imports)
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
