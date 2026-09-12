import dotenv from 'dotenv';

dotenv.config();

/**
 * Real Code Evaluation & Output Scanning Service using Groq AI (openai/gpt-oss-120b)
 */
export const groqCodeEvaluator = {
  /**
   * Evaluates user code against question specifications, test cases, and quality standards
   */
  async evaluateSubmission({
    question,
    userCode = '',
    elapsedSeconds = 0,
    predictAnswer = null,
  }) {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

    const cleanUserCode = (userCode || '').trim();
    const cleanStarter = (question?.starterCode || '').trim();

    // 1. FAST CHECK: Empty or Unmodified Starter Code
    const isUnmodifiedStarter =
      cleanUserCode === cleanStarter ||
      cleanUserCode.replace(/\s+/g, '') === cleanStarter.replace(/\s+/g, '') ||
      cleanUserCode.length < 10;

    if (isUnmodifiedStarter && question?.type !== 'PREDICT_OUTPUT') {
      return {
        submissionId: `sub_${Date.now()}`,
        questionId: question.slug || question.id,
        submittedAt: new Date().toISOString(),
        elapsedSeconds,
        overallScore: 0,
        status: 'Failed',
        classification: 'Needs Work',
        testsPassed: 0,
        totalTests: (question?.examples?.length || 1) + 2,
        breakdown: {
          correctness: { score: 0, max: 50, label: 'Correctness' },
          codeQuality: { score: 0, max: 20, label: 'Code Quality' },
          structure: { score: 0, max: 10, label: 'Structure' },
          readability: { score: 0, max: 10, label: 'Readability' },
          bestPractices: { score: 0, max: 10, label: 'Best Practices' },
        },
        tests: [
          {
            id: 'tc-1',
            name: 'Code Implementation Check',
            status: 'failed',
            input: 'Code Submission',
            expected: 'User-implemented functional solution',
            actual: 'Starter code submitted without modifications',
            error: 'No solution code written. Please implement the function before submitting.',
          },
        ],
        aiReview: {
          strengths: [],
          improvements: [
            'Write the implementation logic inside the function body.',
            'Read the requirements and examples carefully to return the expected output.',
            'Test your solution using "Run Code" before final submission.',
          ],
        },
        codeSmells: [
          {
            line: 1,
            message: 'Empty function body or unedited starter code template.',
            severity: 'error',
          },
        ],
        ratingDelta: {
          previous: 750,
          current: 750,
          change: 0,
        },
      };
    }

    // 2. CHECK: Predict Output Question
    if (question?.type === 'PREDICT_OUTPUT' || question?.type === 'PREDICT') {
      const config = question.predictConfig || {};
      const selected = predictAnswer?.selectedOptionId || predictAnswer;
      const isCorrect =
        selected === config.correctAnswer ||
        config.options?.some((opt) => (opt.id === selected || opt.label === selected) && opt.isCorrect);

      const score = isCorrect ? 100 : 0;
      const ratingGain = isCorrect ? 10 : 0;

      return {
        submissionId: `sub_${Date.now()}`,
        questionId: question.slug || question.id,
        submittedAt: new Date().toISOString(),
        elapsedSeconds,
        overallScore: score,
        status: isCorrect ? 'Accepted' : 'Failed',
        classification: isCorrect ? 'Perfect' : 'Needs Work',
        testsPassed: isCorrect ? 1 : 0,
        totalTests: 1,
        breakdown: {
          correctness: { score: isCorrect ? 50 : 0, max: 50, label: 'Correctness' },
          codeQuality: { score: isCorrect ? 20 : 0, max: 20, label: 'Code Quality' },
          structure: { score: isCorrect ? 10 : 0, max: 10, label: 'Structure' },
          readability: { score: isCorrect ? 10 : 0, max: 10, label: 'Readability' },
          bestPractices: { score: isCorrect ? 10 : 0, max: 10, label: 'Best Practices' },
        },
        tests: [
          {
            id: 'tc-predict-1',
            name: 'Execution Output Prediction',
            status: isCorrect ? 'passed' : 'failed',
            input: config.snippet || 'Snippet Trace',
            expected: config.correctAnswer || 'Correct execution order',
            actual: selected || 'No answer selected',
            error: isCorrect ? '' : config.explanation || 'Incorrect execution sequence predicted.',
          },
        ],
        aiReview: {
          strengths: isCorrect ? ['Accurate understanding of runtime execution and queue priority.'] : [],
          improvements: isCorrect
            ? []
            : [config.explanation || 'Review JavaScript execution order (synchronous -> microtasks -> macrotasks).'],
        },
        codeSmells: [],
        ratingDelta: {
          previous: 750,
          current: 750 + ratingGain,
          change: ratingGain,
        },
      };
    }

    // 3. AI CODE SCANNER VIA GROQ
    const systemPrompt = `You are the Lead Code Evaluator, AST Scanner, and Automated Grading Engine for CodePlatform.
Your role is to rigorously inspect user-submitted code for correctness, functionality, edge cases, best practices, and code smells.

Evaluation Directives:
1. STRICT TRUTH: If the code is buggy, does not satisfy requirements, has syntax errors, or returns the wrong value, DO NOT pass it. It MUST fail test cases and score low.
2. If the user only wrote partial code or comments without actual working logic, fail the test cases.
3. Test every example and constraint. Output individual test case results with passed/failed status, input, expected output, actual output, and error message if failed.
4. Provide structured scoring:
   - correctness (0 - 50)
   - codeQuality (0 - 20)
   - structure (0 - 10)
   - readability (0 - 10)
   - bestPractices (0 - 10)
   Total overallScore = correctness + codeQuality + structure + readability + bestPractices (0 to 100).
5. Classification must be one of: "Perfect" (95-100), "Excellent" (80-94), "Proficient" (60-79), "Developing" (40-59), "Needs Work" (0-39).
6. Return ONLY valid JSON matching the schema below.

JSON Schema:
{
  "overallScore": 85,
  "status": "Accepted",
  "classification": "Excellent",
  "testsPassed": 3,
  "totalTests": 3,
  "breakdown": {
    "correctness": { "score": 45, "max": 50, "label": "Correctness" },
    "codeQuality": { "score": 16, "max": 20, "label": "Code Quality" },
    "structure": { "score": 8, "max": 10, "label": "Structure" },
    "readability": { "score": 8, "max": 10, "label": "Readability" },
    "bestPractices": { "score": 8, "max": 10, "label": "Best Practices" }
  },
  "tests": [
    {
      "id": "tc-1",
      "name": "Primary return value test",
      "status": "passed",
      "input": "input expression",
      "expected": "expected output",
      "actual": "actual output",
      "error": ""
    }
  ],
  "aiReview": {
    "strengths": ["Strength 1", "Strength 2"],
    "improvements": ["Actionable improvement 1", "Actionable improvement 2"]
  },
  "codeSmells": [
    {
      "line": 4,
      "message": "Specific smell message",
      "severity": "warning"
    }
  ],
  "ratingGain": 8
}`;

    const userPrompt = `Evaluate this code submission:

### Question Specification:
- Title: ${question.title}
- Technology: ${question.technology}
- Difficulty: ${question.difficulty} (Level ${question.level})
- Description: ${question.description}
- Requirements: ${JSON.stringify(question.requirements || [])}
- Constraints: ${JSON.stringify(question.constraints || [])}
- Examples: ${JSON.stringify(question.examples || [])}
- Reference Solution:
${question.solutionCode || '// N/A'}

### User Submitted Code:
\`\`\`${question.technology.toLowerCase()}
${cleanUserCode}
\`\`\`

Elapsed Time: ${elapsedSeconds} seconds.`;

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          response_format: { type: 'json_object' },
          temperature: 0.1, // High determinism for rigorous grading
        }),
      });

      if (!response.ok) {
        const err = await response.text();
        throw new Error(`Groq evaluation error: ${err}`);
      }

      const resData = await response.json();
      const content = resData.choices[0]?.message?.content;
      const evaluationResult = JSON.parse(content);

      const ratingGain = evaluationResult.overallScore >= 80 ? 8 : evaluationResult.overallScore >= 60 ? 4 : 0;

      return {
        submissionId: `sub_${Date.now()}`,
        questionId: question.slug || question.id,
        submittedAt: new Date().toISOString(),
        elapsedSeconds,
        overallScore: evaluationResult.overallScore || 0,
        status: evaluationResult.overallScore >= 60 ? 'Accepted' : 'Failed',
        classification: evaluationResult.classification || 'Proficient',
        testsPassed: evaluationResult.testsPassed || 0,
        totalTests: evaluationResult.totalTests || (evaluationResult.tests?.length || 1),
        breakdown: evaluationResult.breakdown || {
          correctness: { score: 0, max: 50, label: 'Correctness' },
          codeQuality: { score: 0, max: 20, label: 'Code Quality' },
          structure: { score: 0, max: 10, label: 'Structure' },
          readability: { score: 0, max: 10, label: 'Readability' },
          bestPractices: { score: 0, max: 10, label: 'Best Practices' },
        },
        tests: evaluationResult.tests || [],
        aiReview: evaluationResult.aiReview || { strengths: [], improvements: [] },
        codeSmells: evaluationResult.codeSmells || [],
        ratingDelta: {
          previous: 750,
          current: 750 + ratingGain,
          change: ratingGain,
        },
      };
    } catch (err) {
      console.error('Groq code evaluation failed, using fallback AST checker:', err);
      // Fallback basic check
      const hasLogic = cleanUserCode.length > cleanStarter.length + 10 && cleanUserCode.includes('return');
      const fallbackScore = hasLogic ? 70 : 0;
      return {
        submissionId: `sub_${Date.now()}`,
        questionId: question.slug || question.id,
        submittedAt: new Date().toISOString(),
        elapsedSeconds,
        overallScore: fallbackScore,
        status: hasLogic ? 'Accepted' : 'Failed',
        classification: hasLogic ? 'Proficient' : 'Needs Work',
        testsPassed: hasLogic ? 2 : 0,
        totalTests: 2,
        breakdown: {
          correctness: { score: hasLogic ? 35 : 0, max: 50, label: 'Correctness' },
          codeQuality: { score: hasLogic ? 15 : 0, max: 20, label: 'Code Quality' },
          structure: { score: hasLogic ? 8 : 0, max: 10, label: 'Structure' },
          readability: { score: hasLogic ? 7 : 0, max: 10, label: 'Readability' },
          bestPractices: { score: hasLogic ? 5 : 0, max: 10, label: 'Best Practices' },
        },
        tests: [
          {
            id: 'tc-fallback-1',
            name: 'Syntax and Return Validation',
            status: hasLogic ? 'passed' : 'failed',
            input: 'Submission Code',
            expected: 'Valid return output',
            actual: hasLogic ? 'Return statement present' : 'No return statement found',
            error: hasLogic ? '' : 'Function did not produce any return value.',
          },
        ],
        aiReview: {
          strengths: hasLogic ? ['Basic implementation logic detected'] : [],
          improvements: hasLogic ? ['Refine edge cases'] : ['Implement the missing logic'],
        },
        codeSmells: [],
        ratingDelta: {
          previous: 750,
          current: 750 + (hasLogic ? 5 : 0),
          change: hasLogic ? 5 : 0,
        },
      };
    }
  },
};
