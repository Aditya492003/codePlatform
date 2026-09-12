import { defaultMockEvaluation } from '../data/mockEvaluations';
import { mockUser } from '../data/mockUser';

/**
 * Service to handle challenge submissions.
 * Computes deterministic score + static quality + AI review.
 * Backend-ready: will invoke POST /api/submissions in production.
 */
export const submissionService = {
  /**
   * Submit challenge attempt
   */
  async submitAttempt(questionId, code, elapsedTime, predictAnswer = null) {
    // Simulate server evaluation latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Dynamic rating delta calculation
    const currentRating = mockUser.overallRating;
    const ratingGain = 7;
    const newRating = currentRating + ratingGain;

    // Create tailored AI review points
    const evaluation = {
      ...defaultMockEvaluation,
      submissionId: `sub_${Date.now()}`,
      questionId,
      submittedAt: new Date().toISOString(),
      elapsedSeconds: elapsedTime,
      overallScore: 86,
      classification: "Excellent",
      breakdown: {
        correctness: { score: 46, max: 50, label: "Correctness" },
        codeQuality: { score: 16, max: 20, label: "Code Quality" },
        structure: { score: 9, max: 10, label: "Structure" },
        readability: { score: 8, max: 10, label: "Readability" },
        bestPractices: { score: 7, max: 10, label: "Best Practices" }
      },
      testsPassed: 8,
      totalTests: 8,
      aiReview: {
        strengths: [
          "Clear function naming and intentional variable scope",
          "Proper defensive handling of empty and boundary inputs",
          "Appropriate use of array methods instead of imperative index mutations"
        ],
        improvements: [
          "Extract repeated tax rounding logic into a single dedicated helper function",
          "Improve edge-case handling for zero or negative item quantities",
          "Reduce unnecessary nesting inside loop accumulators"
        ]
      },
      ratingDelta: {
        previous: currentRating,
        current: newRating,
        change: ratingGain
      }
    };

    return evaluation;
  }
};
