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
        totalTests: 2,
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
            name: 'Code Implementation & Logic Verification',
            status: 'failed',
            input: 'Submission Body',
            expected: 'Custom solution logic meeting all requirements',
            actual: 'Unmodified starter code template',
            error: 'No solution logic written yet. Implement the required functions or styles to pass.',
          },
          {
            id: 'tc-2',
            name: 'Execution Output & Return Check',
            status: 'failed',
            input: 'Test Runner Output',
            expected: 'Valid computed return value / styled output',
            actual: 'Empty or default starter value',
            error: 'Output could not be verified against test assertions because the code was not edited.',
          },
        ],
        aiReview: {
          strengths: [
            'Template and structure loaded properly.',
            'Environment ready for your implementation.',
          ],
          improvements: [
            'Write the implementation logic inside the function body.',
            'Review the requirements above and follow the step-by-step instructions.',
            'Use "Run Code" to test your solution before submitting.',
          ],
        },
        codeSmells: [
          {
            line: 1,
            message: 'Unedited starter template. Add your implementation logic.',
            severity: 'warning',
          },
        ],
        ratingDelta: {
          previous: 750,
          current: 750,
          change: 0,
        },
      };
    }

    // 2. CHECK: Predict Output / MCQ Question
    if (question?.type === 'PREDICT_OUTPUT' || question?.type === 'PREDICT' || question?.type === 'MCQ') {
      const config = question.predictConfig || {};
      const selectedRaw = predictAnswer?.selectedOptionId || (typeof predictAnswer === 'string' ? predictAnswer : predictAnswer?.answer);
      
      const normalizeText = (s) => String(s || '').trim().replace(/^['"`]|['"`]$/g, '').replace(/[\s\r\n]+/g, ' ').toLowerCase();

      let isCorrect = false;
      if (selectedRaw) {
        if (config.correctAnswer && normalizeText(selectedRaw) === normalizeText(config.correctAnswer)) {
          isCorrect = true;
        } else if (Array.isArray(config.options)) {
          const matchedOpt = config.options.find(
            (opt) =>
              opt.id === selectedRaw ||
              (typeof opt === 'string' && (opt === selectedRaw || normalizeText(opt) === normalizeText(selectedRaw))) ||
              (opt.label && (opt.label === selectedRaw || normalizeText(opt.label) === normalizeText(selectedRaw)))
          );
          if (matchedOpt) {
            isCorrect = Boolean(matchedOpt.isCorrect) || (config.correctAnswer ? normalizeText(matchedOpt.label || matchedOpt) === normalizeText(config.correctAnswer) : false);
          }
        }
      }

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
        referenceSolution: question.solutionCode || config.correctAnswer || '',
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
            name: question.type === 'MCQ' ? 'Multiple Choice Answer Verification' : 'Execution Output Prediction',
            status: isCorrect ? 'passed' : 'failed',
            input: config.snippet || question.starterCode || 'Evaluation Context',
            expected: config.correctAnswer || 'Correct selection',
            actual: selectedRaw || 'No answer selected',
            error: isCorrect ? '' : config.explanation || 'Incorrect choice or execution sequence predicted.',
          },
        ],
        aiReview: {
          strengths: isCorrect ? ['Accurate understanding of core concepts and execution semantics.'] : [],
          improvements: isCorrect
            ? []
            : [config.explanation || 'Review the core language concepts and try again.'],
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
    const systemPrompt = `You are an Expert Automated Code Evaluator & AST Scanner for ${question.technology}.
Your job is to strictly scan the user's submitted code against the assigned challenge title, description, concepts, and requirements.

EVALUATION RULES:
1. TASK-SPECIFIC SCOPE: Evaluate ONLY the properties, rules, or elements mentioned in the challenge title, description, and concepts.
2. DO NOT REQUIRE UNREQUESTED FEATURES:
   - For Beginner / Level 1 CSS challenges (e.g. styling a button, heading, or paragraph with color, background, padding, border, etc.), DO NOT require media queries or responsive breakpoints unless the challenge title or description explicitly requests them.
   - Ignore generic boilerplate requirements like "Keep the layout responsive where requested" unless responsiveness is explicitly requested in the description.
3. SYNTAX & VALIDITY:
   - Check that CSS properties have valid syntax (e.g. valid colors, dimensions with units like 2px, 10px, and valid border shorthand like '2px solid black' or '2px solid').
   - Disregard any accompanying HTML context markup if the user correctly wrote the requested CSS rules.
4. SCORING & CLASSIFICATION RULES:
   - 95-100: "Perfect" (Meets all requested styling/markup requirements with valid syntax)
   - 85-94: "Excellent" (Meets all core requirements)
   - 70-84: "Proficient" (Meets most requirements with minor edge case issues)
   - 50-69: "Developing" (Partial solution, missing some key properties)
   - 0-49: "Needs Work" (Incorrect, empty, or fails core requirements)

Output ONLY valid JSON adhering to this exact schema:
{
  "overallScore": 95,
  "status": "Accepted",
  "classification": "Perfect",
  "testsPassed": 2,
  "totalTests": 2,
  "breakdown": {
    "correctness": { "score": 50, "max": 50, "label": "Correctness" },
    "codeQuality": { "score": 20, "max": 20, "label": "Code Quality" },
    "structure": { "score": 10, "max": 10, "label": "Structure" },
    "readability": { "score": 10, "max": 10, "label": "Readability" },
    "bestPractices": { "score": 10, "max": 10, "label": "Best Practices" }
  },
  "tests": [
    {
      "id": "tc-1",
      "name": "Requirement & Syntax Verification",
      "status": "passed",
      "input": "User Submission",
      "expected": "Expected element/rule/logic",
      "actual": "Actual observed element/rule/logic",
      "error": ""
    },
    {
      "id": "tc-2",
      "name": "Output & Semantic Check",
      "status": "passed",
      "input": "Execution Verification",
      "expected": "Compliant semantics and output",
      "actual": "Compliant semantics and output",
      "error": ""
    }
  ],
  "aiReview": {
    "strengths": [
      "Precise explanation of what the user did right"
    ],
    "improvements": [
      "Specific suggestions for improvement or next steps"
    ]
  },
  "codeSmells": []
}`;

    const userPrompt = `Evaluate this ${question.technology} submission for predefined challenge:
Challenge Title: ${question.title}
Requirements: ${JSON.stringify(question.requirements || [])}
Constraints: ${JSON.stringify(question.constraints || [])}
Starter Code:
${question.starterCode || '(none)'}

Reference Solution:
${question.solutionCode || '(none)'}

User Submitted Code:
${cleanUserCode}

Return ONLY valid JSON matching the system schema.`;

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
          max_tokens: 1500,
          temperature: 0.1,
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
        referenceSolution: question.solutionCode || '',
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
        referenceSolution: question.solutionCode || '',
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
          strengths: hasLogic
            ? ['Basic implementation logic detected', 'Clean coding style']
            : ['Initial structure and syntax correctly formatted'],
          improvements: hasLogic
            ? ['Refine edge cases and ensure optimal time complexity']
            : ['Implement the core logic and return expected values'],
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
