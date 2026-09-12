import { mockTestSuites } from '../data/mockEvaluations';

/**
 * Service to execute test cases on code draft without submitting or updating rating.
 * Backend-ready: can be redirected to Sandbox Runner API in future.
 */
export const evaluationService = {
  /**
   * Runs unit test suite for a question
   */
  async runTests(questionId, code) {
    // Simulate brief runner latency (350ms)
    await new Promise((resolve) => setTimeout(resolve, 350));

    // Get specific test suite if available, or generate generic test suite
    const suite = mockTestSuites[questionId] || [
      {
        id: "tc-1",
        name: "Validates primary function return signature",
        status: "passed",
        duration: "1.1ms",
        input: "solution(defaultInput)",
        expected: "valid",
        actual: "valid"
      },
      {
        id: "tc-2",
        name: "Handles boundary inputs and empty arguments safely",
        status: "passed",
        duration: "0.7ms",
        input: "solution(null)",
        expected: "graceful",
        actual: "graceful"
      },
      {
        id: "tc-3",
        name: "Maintains optimal time and memory constraints",
        status: "passed",
        duration: "1.5ms",
        input: "benchmark(1000 items)",
        expected: "< 15ms",
        actual: "2.1ms"
      }
    ];

    const passedCount = suite.filter((t) => t.status === "passed").length;

    return {
      success: true,
      timestamp: new Date().toISOString(),
      testsPassed: passedCount,
      totalTests: suite.length,
      tests: suite,
      logs: [
        `[Sandbox] Environment: V8 Engine 12.4 / Node.js 20 LTS`,
        `[Sandbox] Memory allocated: 32MB / Execution time: 14.8ms`,
        `[Runner] All ${passedCount}/${suite.length} test assertions evaluated successfully.`
      ]
    };
  }
};
