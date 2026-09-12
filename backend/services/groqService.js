import dotenv from 'dotenv';
import Question from '../models/Question.js';

dotenv.config();

/**
 * Service to generate dynamic, adaptive frontend questions using Groq and openai/gpt-oss-120b
 */
export const groqQuestionGenerator = {
  /**
   * Generates a tailored question based on user IQ level, solve speed, and past performance.
   */
  async generateAdaptiveQuestion({
    technology = 'JavaScript',
    difficulty = 'Beginner',
    level = 1,
    questionNumber = 1,
    userId = 'usr_guest',
    performanceContext = {},
  }) {
    const apiKey = process.env.GROQ_API_KEY;
    const model = process.env.GROQ_MODEL || 'openai/gpt-oss-120b';

    if (!apiKey) {
      throw new Error('GROQ_API_KEY is not configured in backend/.env');
    }

    const {
      previousTimeSeconds = 0,
      previousScore = null,
      previousQuestionTitle = '',
      consecutiveStruggles = 0,
      userRating = 750,
      struggledConcept = '',
    } = performanceContext;

    // Determine pedagogical adaptation strategy based on speed & score
    let adaptationDirective = '';
    const isStruggling =
      (previousTimeSeconds > 180 && difficulty === 'Beginner') ||
      (previousTimeSeconds > 300) ||
      (previousScore !== null && previousScore < 70) ||
      consecutiveStruggles > 0;

    const isExcelling =
      previousScore !== null &&
      previousScore >= 90 &&
      previousTimeSeconds > 0 &&
      previousTimeSeconds < 60;

    if (isStruggling) {
      adaptationDirective = `
CRITICAL ADAPTIVE INSTRUCTION (CONFIDENCE-BOOSTING MODE):
- The user struggled or took considerable time (${previousTimeSeconds}s, score: ${previousScore ?? 'N/A'}) on previous task${previousQuestionTitle ? ` ("${previousQuestionTitle}")` : ''}.
- DO NOT increase difficulty or introduce complex syntax.
- GENERATE A CONFIDENCE-BOOSTING, STEP-BY-STEP REINFORCEMENT QUESTION.
- Provide generous scaffolded comments in starterCode to guide their thinking.
- Keep the problem focused on ONE fundamental concept with clear expected output.
- Make the requirements easy to understand and achievable to rebuild their momentum.
`;
    } else if (isExcelling) {
      adaptationDirective = `
CRITICAL ADAPTIVE INSTRUCTION (ACCELERATION MODE):
- The user solved the previous challenge quickly (${previousTimeSeconds}s) with high accuracy (${previousScore}%).
- Generate an engaging problem that builds on the concept with an interesting real-world edge case.
- Provide a clean, minimal starterCode that challenges them to write idiomatic code.
`;
    } else {
      adaptationDirective = `
CRITICAL ADAPTIVE INSTRUCTION (STANDARD PROGRESSION MODE):
- Generate a balanced Level ${level} ${difficulty} challenge for ${technology}.
- Ensure high pedagogical clarity, practical real-world frontend relevance, and clear test cases.
`;
    }

    const systemPrompt = `You are a World-Class Frontend Engineering Curriculum Architect & Adaptive Learning AI for CodePlatform.
Your goal is to dynamically generate interactive coding challenges tailored specifically to the developer's cognitive pace and performance.

${adaptationDirective}

Strict Requirements:
1. Return ONLY valid JSON matching the exact schema below with NO extra markdown wrap or explanations.
2. The question must be for technology: "${technology}", target difficulty: "${difficulty}", level: ${level}, questionNumber: ${questionNumber}.
3. 'type' can be "BUILD" (write code), "DEBUG" (fix buggy starter code), or "PREDICT_OUTPUT" (MCQ output tracing).
4. All code in starterCode and solutionCode MUST be clean, valid, and properly escaped.

Expected JSON Schema:
{
  "slug": "${technology.toLowerCase().slice(0, 2)}-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}-${Date.now().toString().slice(-4)}",
  "technology": "${technology}",
  "difficulty": "${difficulty}",
  "level": ${level},
  "questionNumber": ${questionNumber},
  "type": "BUILD",
  "title": "Clear Action-Oriented Title",
  "description": "Comprehensive explanation of what to build and why it matters in real frontend apps.",
  "concepts": ["concept1", "concept2"],
  "requirements": ["Requirement 1", "Requirement 2"],
  "constraints": ["Constraint 1"],
  "examples": [
    {
      "input": "functionCall(arg)",
      "output": "expectedResult",
      "explanation": "Why this output is produced"
    }
  ],
  "starterCode": "function solution() {\\n  // Your code here\\n}\\n",
  "solutionCode": "function solution() {\\n  return true;\\n}\\n",
  "predictConfig": null,
  "evaluationCriteria": {
    "correctnessWeight": 70,
    "qualityWeight": 15,
    "structureWeight": 15,
    "readabilityWeight": 0,
    "bestPracticesWeight": 0
  },
  "estimatedTime": 5,
  "points": 10,
  "tags": ["frontend", "${technology.toLowerCase()}"]
}`;

    const userPrompt = `Generate a new adaptive ${technology} challenge.
Target: Difficulty = ${difficulty}, Level = ${level}, Question #${questionNumber}.
User context: Rating = ${userRating}, Last Elapsed Time = ${previousTimeSeconds}s, Last Score = ${previousScore ?? 'New'}.`;

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
          temperature: 0.4,
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Groq API error (${response.status}): ${errBody}`);
      }

      const responseData = await response.json();
      const content = responseData.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from Groq API');
      }

      const parsedQuestion = JSON.parse(content);

      // Ensure slug and required fields exist
      if (!parsedQuestion.slug) {
        parsedQuestion.slug = `${technology.toLowerCase().slice(0, 2)}-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}-${Date.now().toString().slice(-4)}`;
      }
      parsedQuestion.technology = technology;
      parsedQuestion.difficulty = difficulty;
      parsedQuestion.level = Number(level);
      parsedQuestion.questionNumber = Number(questionNumber);

      // Save to MongoDB Atlas for persistence and fast caching
      const saved = await Question.findOneAndUpdate(
        { slug: parsedQuestion.slug },
        { $set: parsedQuestion },
        { upsert: true, new: true }
      );

      console.log(`✨ Adaptive AI Question Generated & Cached in Atlas: "${parsedQuestion.title}" [${parsedQuestion.slug}]`);

      return saved.toObject ? saved.toObject() : saved;
    } catch (error) {
      console.error('❌ Error generating question with Groq:', error.message);
      throw error;
    }
  },
};
