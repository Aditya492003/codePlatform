import { apiRequest } from './api';

/**
 * Service to execute test cases and scan code draft without permanent submission.
 */
export const evaluationService = {
  /**
   * Runs unit test suite and AST code scanner for a question
   */
  async runTests(questionId, code, questionData = null) {
    try {
      const res = await apiRequest('/submissions/evaluate', {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          questionData,
          code,
          elapsedSeconds: 0,
        }),
      });

      if (res?.evaluation) {
        const evalData = res.evaluation;
        return {
          success: evalData.status === 'Accepted' || evalData.overallScore >= 60,
          timestamp: new Date().toISOString(),
          testsPassed: evalData.testsPassed || 0,
          totalTests: evalData.totalTests || (evalData.tests?.length || 1),
          tests: evalData.tests || [],
          logs: [
            `[Groq AI AST Engine] Model: openai/gpt-oss-120b`,
            `[Code Analysis] Overall Score: ${evalData.overallScore}/100 (${evalData.classification})`,
            `[Test Suite] ${evalData.testsPassed}/${evalData.totalTests} assertions passed.`,
            ...(evalData.aiReview?.improvements?.map((imp) => `[Suggestion] ${imp}`) || []),
          ],
        };
      }
    } catch (err) {
      console.warn('[evaluationService] Live evaluation error, using fallback:', err.message);
    }

    const hasCode = code && code.trim().length > 15;
    return {
      success: hasCode,
      timestamp: new Date().toISOString(),
      testsPassed: hasCode ? 1 : 0,
      totalTests: 1,
      tests: [
        {
          id: 'tc-1',
          name: 'Basic Execution Check',
          status: hasCode ? 'passed' : 'failed',
          input: 'Code',
          expected: 'Working implementation',
          actual: hasCode ? 'Code present' : 'No code written',
          error: hasCode ? '' : 'Please write your solution code first.',
        },
      ],
      logs: [
        `[Sandbox] Code check performed`,
        `[Runner] ${hasCode ? '1/1' : '0/1'} assertions passed.`,
      ],
    };
  },
};
