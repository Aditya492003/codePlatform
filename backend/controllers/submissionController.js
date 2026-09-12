import Submission from '../models/Submission.js';
import User from '../models/User.js';
import Question from '../models/Question.js';
import Evaluation from '../models/Evaluation.js';
import { groqCodeEvaluator } from '../services/groqEvaluationService.js';

/**
 * Perform real-time AI code scanning, syntax, and test evaluation
 * POST /api/submissions/evaluate
 */
export const evaluateCodeSubmission = async (req, res) => {
  try {
    const { questionId, questionData, code, elapsedSeconds = 0, predictAnswer = null } = req.body;

    let question = questionData;
    if (!question && questionId) {
      question = await Question.findOne({ slug: questionId });
      if (!question && questionId.match(/^[0-9a-fA-F]{24}$/)) {
        question = await Question.findById(questionId);
      }
    }

    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question specification not found for evaluation',
      });
    }

    console.log(`🔍 Scanning & Evaluating code for "${question.title}" (${question.slug || questionId}) via Groq AI...`);

    const evaluationResult = await groqCodeEvaluator.evaluateSubmission({
      question,
      userCode: code,
      elapsedSeconds,
      predictAnswer,
    });

    res.status(200).json({
      success: true,
      evaluation: evaluationResult,
    });
  } catch (error) {
    console.error('Error during code evaluation:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to evaluate code',
      error: error.message,
    });
  }
};

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
      elapsedSeconds = 0,
      predictAnswer = null,
      questionData = null,
    } = req.body;

    if (!userId || !questionId) {
      return res.status(400).json({ success: false, message: 'userId and questionId are required' });
    }

    let question = questionData;
    if (!question && questionId) {
      question = await Question.findOne({ slug: questionId });
      if (!question && questionId.match(/^[0-9a-fA-F]{24}$/)) {
        question = await Question.findById(questionId);
      }
    }

    // 1. Run real Groq AI evaluation
    const evalResult = await groqCodeEvaluator.evaluateSubmission({
      question: question || {
        slug: questionId,
        title: questionTitle,
        technology,
        difficulty,
        level,
      },
      userCode: code,
      elapsedSeconds,
      predictAnswer,
    });

    const isAccepted = evalResult.status === 'Accepted';
    const ratingChange = evalResult.ratingDelta?.change || 0;

    // 2. Create Submission Document
    const submission = await Submission.create({
      userId,
      questionId,
      questionTitle: questionTitle || question?.title || '',
      technology: technology || question?.technology || 'JavaScript',
      difficulty: difficulty || question?.difficulty || 'Beginner',
      level: Number(level) || question?.level || 1,
      code: code || '',
      status: evalResult.status,
      score: evalResult.overallScore,
      classification: evalResult.classification,
      ratingChange,
      executionTimeMs: Math.round(elapsedSeconds * 1000),
      testResults: (evalResult.tests || []).map((t) => ({
        name: t.name,
        passed: t.status === 'passed',
        expected: t.expected || '',
        actual: t.actual || '',
        error: t.error || '',
      })),
      feedbackSummary: evalResult.aiReview?.improvements?.join('; ') || '',
    });

    // 3. Create Evaluation Document
    const savedEvaluation = await Evaluation.create({
      submissionId: submission._id,
      userId,
      questionId,
      overallScore: evalResult.overallScore,
      classification: evalResult.classification,
      criteriaScores: {
        correctness: evalResult.breakdown?.correctness?.score || 0,
        codeQuality: evalResult.breakdown?.codeQuality?.score || 0,
        structure: evalResult.breakdown?.structure?.score || 0,
        readability: evalResult.breakdown?.readability?.score || 0,
        bestPractices: evalResult.breakdown?.bestPractices?.score || 0,
      },
      aiFeedback: evalResult.aiReview?.improvements?.join('. ') || '',
      strengths: evalResult.aiReview?.strengths || [],
      improvements: evalResult.aiReview?.improvements || [],
      codeSmells: evalResult.codeSmells || [],
      ratingDelta: ratingChange,
    });

    // 4. Update User Stats & Progress if status is Accepted
    const user = await User.findOne({ clerkId: userId });
    if (user) {
      const isFirstSolve = !user.solvedQuestions.includes(questionId);
      if (isAccepted && isFirstSolve) {
        user.solvedQuestions.push(questionId);
        user.problemsSolved += 1;

        if (difficulty && user.difficultyProgress[difficulty]) {
          user.difficultyProgress[difficulty].completed = Math.min(
            user.difficultyProgress[difficulty].total,
            user.difficultyProgress[difficulty].completed + 1
          );
        }
      }

      if (technology && user.skillRatings && user.skillRatings[technology] !== undefined) {
        user.skillRatings[technology] += ratingChange;
      }
      user.overallRating = Math.max(100, user.overallRating + ratingChange);
      user.tier = user.calculateTier();
      user.lastActiveDate = new Date();

      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      const lastHistory = user.ratingHistory[user.ratingHistory.length - 1];
      if (!lastHistory || lastHistory.date !== todayStr) {
        user.ratingHistory.push({ date: todayStr, rating: user.overallRating });
      } else {
        lastHistory.rating = user.overallRating;
      }

      await user.save();
    }

    // 5. Update Question stats
    if (question) {
      await Question.findOneAndUpdate(
        { slug: questionId },
        {
          $inc: {
            totalSubmissions: 1,
            totalAccepted: isAccepted ? 1 : 0,
          },
        }
      );
    }

    res.status(201).json({
      success: true,
      submission,
      evaluation: evalResult,
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
