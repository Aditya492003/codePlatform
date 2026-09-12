import Submission from '../models/Submission.js';
import User from '../models/User.js';
import Question from '../models/Question.js';
import Evaluation from '../models/Evaluation.js';

/**
 * Submit code solution & record results
 * POST /api/submissions
 */
export const createSubmission = async (req, res) => {
  try {
    const {
      userId,
      questionId,
      questionTitle,
      technology,
      difficulty,
      level,
      code,
      status = 'Accepted',
      score = 85,
      classification = 'Excellent',
      ratingChange = 8,
      executionTimeMs = 45,
      testResults = [],
      feedbackSummary = '',
      evaluationData = null,
    } = req.body;

    if (!userId || !questionId || !code) {
      return res.status(400).json({ success: false, message: 'userId, questionId, and code are required' });
    }

    // 1. Create Submission Document
    const submission = await Submission.create({
      userId,
      questionId,
      questionTitle,
      technology,
      difficulty,
      level: Number(level) || 1,
      code,
      status,
      score,
      classification,
      ratingChange,
      executionTimeMs,
      testResults,
      feedbackSummary,
    });

    // 2. Optionally Create Evaluation Document
    let savedEvaluation = null;
    if (evaluationData) {
      savedEvaluation = await Evaluation.create({
        submissionId: submission._id,
        userId,
        questionId,
        overallScore: evaluationData.overallScore || score,
        classification: evaluationData.classification || classification,
        criteriaScores: evaluationData.criteriaScores || {},
        aiFeedback: evaluationData.aiFeedback || feedbackSummary,
        strengths: evaluationData.strengths || [],
        improvements: evaluationData.improvements || [],
        codeSmells: evaluationData.codeSmells || [],
        ratingDelta: ratingChange,
      });
    }

    // 3. Update User Stats & Progress if status is Accepted
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      const isFirstSolve = !user.solvedQuestions.includes(questionId);
      if (status === 'Accepted' && isFirstSolve) {
        user.solvedQuestions.push(questionId);
        user.problemsSolved += 1;

        // Update difficulty progress
        if (difficulty && user.difficultyProgress[difficulty]) {
          user.difficultyProgress[difficulty].completed = Math.min(
            user.difficultyProgress[difficulty].total,
            user.difficultyProgress[difficulty].completed + 1
          );
        }
      }

      // Update skill and overall ratings
      if (technology && user.skillRatings && user.skillRatings[technology] !== undefined) {
        user.skillRatings[technology] += ratingChange;
      }
      user.overallRating = Math.max(100, user.overallRating + ratingChange);
      user.tier = user.calculateTier();
      user.lastActiveDate = new Date();

      // Add to rating history if date changed
      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const lastHistory = user.ratingHistory[user.ratingHistory.length - 1];
      if (!lastHistory || lastHistory.date !== todayStr) {
        user.ratingHistory.push({ date: todayStr, rating: user.overallRating });
      } else {
        lastHistory.rating = user.overallRating;
      }

      await user.save();
    }

    // 4. Update Question stats
    await Question.findOneAndUpdate(
      { slug: questionId },
      {
        $inc: {
          totalSubmissions: 1,
          totalAccepted: status === 'Accepted' ? 1 : 0,
        },
      }
    );

    res.status(201).json({
      success: true,
      submission,
      evaluation: savedEvaluation,
    });
  } catch (error) {
    console.error('Error recording submission:', error);
    res.status(500).json({ success: false, message: 'Failed to record submission', error: error.message });
  }
};

/**
 * Get all submissions by user
 * GET /api/submissions/user/:userId
 */
export const getUserSubmissions = async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20, skip = 0 } = req.query;

    const submissions = await Submission.find({ userId })
      .sort({ submittedAt: -1 })
      .limit(Number(limit))
      .skip(Number(skip));

    res.status(200).json({
      success: true,
      count: submissions.length,
      data: submissions,
    });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch submissions', error: error.message });
  }
};

/**
 * Get single submission with evaluation
 * GET /api/submissions/:id
 */
export const getSubmissionById = async (req, res) => {
  try {
    const { id } = req.params;

    const submission = await Submission.findById(id);
    if (!submission) {
      return res.status(404).json({ success: false, message: 'Submission not found' });
    }

    const evaluation = await Evaluation.findOne({ submissionId: id });

    res.status(200).json({
      success: true,
      submission,
      evaluation,
    });
  } catch (error) {
    console.error('Error fetching submission:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch submission', error: error.message });
  }
};
