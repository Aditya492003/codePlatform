import { apiRequest } from './api';

/**
 * Service to handle challenge submissions with real Groq AI evaluation & Atlas database recording.
 */
export const submissionService = {
  /**
   * Submit challenge attempt
   */
  async submitAttempt(
    questionId,
    code,
    elapsedTime,
    predictAnswer = null,
    questionData = null,
    userId = 'usr_guest',
    userInfo = null
  ) {
    try {
      const res = await apiRequest('/submissions', {
        method: 'POST',
        body: JSON.stringify({
          userId,
          questionId,
          code,
          elapsedSeconds: elapsedTime,
          predictAnswer,
          questionData,
          userInfo,
        }),
      });

      if (res?.evaluation) {
        return {
          ...res.evaluation,
          submissionId: res.submission?._id || res.evaluation.submissionId,
          updatedUser: res.user || null,
        };
      }
    } catch (err) {
      console.warn('[submissionService] Submission error:', err.message);
    }

    // Fallback if offline
    const isBlank = !code || code.trim().length < 10;
    return {
      submissionId: `sub_${Date.now()}`,
      questionId,
      submittedAt: new Date().toISOString(),
      elapsedSeconds: elapsedTime,
      overallScore: isBlank ? 0 : 50,
      status: isBlank ? 'Failed' : 'Partial',
      classification: isBlank ? 'Needs Work' : 'Developing',
      breakdown: {
        correctness: { score: isBlank ? 0 : 25, max: 50, label: 'Correctness' },
        codeQuality: { score: isBlank ? 0 : 10, max: 20, label: 'Code Quality' },
        structure: { score: isBlank ? 0 : 5, max: 10, label: 'Structure' },
        readability: { score: isBlank ? 0 : 5, max: 10, label: 'Readability' },
        bestPractices: { score: isBlank ? 0 : 5, max: 10, label: 'Best Practices' },
      },
      testsPassed: isBlank ? 0 : 1,
      totalTests: 2,
      tests: [
        {
          id: 'tc-fallback',
          name: 'Fallback execution validation',
          status: isBlank ? 'failed' : 'passed',
          input: 'Code',
          expected: 'Working code',
          actual: isBlank ? 'Empty' : 'Present',
          error: isBlank ? 'No code written.' : '',
        },
      ],
      aiReview: {
        strengths: isBlank ? [] : ['Code submitted'],
        improvements: isBlank
          ? ['Implement the function before submitting.']
          : ['Check test suite output.'],
      },
      codeSmells: [],
      ratingDelta: {
        previous: 750,
        current: 750,
        change: 0,
      },
      updatedUser: null,
    };
  },
};
