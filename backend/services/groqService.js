import dotenv from 'dotenv';
import Question from '../models/Question.js';

dotenv.config();

/**
 * Unescapes and cleans up multi-line code formatting
 */
export const formatCodeString = (code) => {
  if (!code || typeof code !== 'string') return '';
  let formatted = code;
  if (formatted.includes('\\n')) {
    formatted = formatted.replace(/\\n/g, '\n');
  }
  if (formatted.includes('\\t')) {
    formatted = formatted.replace(/\\t/g, '  ');
  }
  if (formatted.includes('\\"')) {
    formatted = formatted.replace(/\\"/g, '"');
  }
  return formatted.trim();
};

/**
 * Creates a technology-accurate fallback question if external API is unreachable
 */
const getStaticFallback = (technology, difficulty, level, questionNumber, slug) => {
  const tech = technology.toUpperCase();
  if (tech === 'CSS') {
    return {
      slug: slug || `cs-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      technology: 'CSS',
      difficulty,
      level: Number(level),
      questionNumber: Number(questionNumber),
      type: 'BUILD',
      title: 'Style a Centered Responsive Button',
      description: 'Write CSS rules to style a `.primary-button` with a blue background, white text, 12px 24px padding, and 8px border-radius.',
      concepts: ['flexbox', 'button styling', 'padding', 'border-radius'],
      requirements: [
        'Set background-color to #2563eb',
        'Set color to #ffffff and font-weight to 600',
        'Set padding to 12px 24px and border-radius to 8px',
        'Remove default border with border: none',
      ],
      constraints: ['Use valid CSS syntax'],
      starterCode: `/* Write your CSS rules for .primary-button here */\n.primary-button {\n  background-color: #2563eb;\n  color: #ffffff;\n}\n`,
      solutionCode: `.primary-button {\n  background-color: #2563eb;\n  color: #ffffff;\n  font-weight: 600;\n  padding: 12px 24px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n}\n`,
      predictConfig: null,
      evaluationCriteria: { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
      estimatedTime: 4,
      points: 10,
    };
  }

  if (tech === 'HTML') {
    return {
      slug: slug || `ht-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
      technology: 'HTML',
      difficulty,
      level: Number(level),
      questionNumber: Number(questionNumber),
      type: 'BUILD',
      title: 'Build a Semantic Article Card',
      description: 'Construct a semantic HTML5 structure for an article card containing an article tag, a header with an h2 title, and a paragraph tag.',
      concepts: ['semantic HTML', 'article', 'header', 'h2'],
      requirements: [
        'Use an <article> wrapper with class "card"',
        'Include a <header> with an <h2> title',
        'Include a <p> description element',
      ],
      constraints: ['Use valid HTML5 tags'],
      starterCode: `<!-- Construct your semantic HTML card here -->\n<article class="card">\n  <header>\n    <h2>Card Title</h2>\n  </header>\n  <p>Card content</p>\n</article>\n`,
      solutionCode: `<article class="card">\n  <header>\n    <h2>Card Title</h2>\n  </header>\n  <p>Card content description.</p>\n</article>\n`,
      predictConfig: null,
      evaluationCriteria: { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
      estimatedTime: 4,
      points: 10,
    };
  }

  return {
    slug: slug || `js-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}`,
    technology: 'JavaScript',
    difficulty,
    level: Number(level),
    questionNumber: Number(questionNumber),
    type: 'BUILD',
    title: 'Calculate Discounted Price',
    description: 'Write a function calculateDiscount(price, discountPercent) that returns the final price after applying the discount percentage.',
    concepts: ['functions', 'arithmetic operators', 'parameters'],
    requirements: [
      'Define function calculateDiscount(price, discountPercent)',
      'Return price - (price * discountPercent / 100)',
    ],
    constraints: ['Return numeric value rounded to 2 decimal places if needed'],
    starterCode: `/**\n * Calculates discounted price\n * @param {number} price\n * @param {number} discountPercent\n * @returns {number}\n */\nfunction calculateDiscount(price, discountPercent) {\n  // Write your solution here\n  \n}\n`,
    solutionCode: `function calculateDiscount(price, discountPercent) {\n  return price - (price * discountPercent / 100);\n}`,
    predictConfig: null,
    evaluationCriteria: { correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 },
    estimatedTime: 4,
    points: 10,
  };
};

/**
 * Robust Adaptive Question Generation Service using Groq & openai/gpt-oss-120b
 */
export const groqQuestionGenerator = {
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

    const normalizedTech =
      technology.toLowerCase() === 'css'
        ? 'CSS'
        : technology.toLowerCase() === 'html'
        ? 'HTML'
        : 'JavaScript';

    const slugPrefix =
      normalizedTech === 'CSS' ? 'cs' : normalizedTech === 'HTML' ? 'ht' : 'js';

    const targetSlug = `${slugPrefix}-${difficulty.toLowerCase().slice(0, 3)}-l${level}-q${String(questionNumber).padStart(2, '0')}-${Date.now().toString().slice(-4)}`;

    if (!apiKey) {
      console.warn('⚠️ GROQ_API_KEY not found, using technology fallback');
      const fallback = getStaticFallback(normalizedTech, difficulty, level, questionNumber, targetSlug);
      const saved = await Question.findOneAndUpdate(
        { slug: fallback.slug },
        { $set: fallback },
        { upsert: true, new: true }
      );
      return saved.toObject ? saved.toObject() : saved;
    }

    const {
      previousTimeSeconds = 0,
      previousScore = null,
      consecutiveStruggles = 0,
    } = performanceContext;

    const isStruggling =
      (previousTimeSeconds > 180 && difficulty === 'Beginner') ||
      previousTimeSeconds > 300 ||
      (previousScore !== null && previousScore < 70) ||
      consecutiveStruggles > 0;

    const isExcelling =
      previousScore !== null &&
      previousScore >= 90 &&
      previousTimeSeconds > 0 &&
      previousTimeSeconds < 60;

    let adaptiveGuide = 'Standard progression';
    if (isStruggling) {
      adaptiveGuide = 'CONFIDENCE-BOOST: User took extra time. Create a clear, scaffolded reinforcement challenge with helpful starterCode comments. Focus on one core concept.';
    } else if (isExcelling) {
      adaptiveGuide = 'ACCELERATED: User solved rapidly. Create an engaging problem with real-world edge cases.';
    }

    const systemPrompt = `You are a Frontend Challenge Designer.
Generate a coding challenge exclusively for technology: ${normalizedTech}.
Directive: ${adaptiveGuide}
Target: Technology: ${normalizedTech} | Difficulty: ${difficulty} | Level: ${level} | Question #${questionNumber}.

CRITICAL FORMATTING INSTRUCTION:
- Write starterCode and solutionCode formatted across MULTIPLE indented lines with real newline breaks, not condensed on a single line.

Return ONLY valid JSON matching this exact schema:
{
  "slug": "${targetSlug}",
  "technology": "${normalizedTech}",
  "difficulty": "${difficulty}",
  "level": ${level},
  "questionNumber": ${questionNumber},
  "type": "BUILD",
  "title": "Title for ${normalizedTech} challenge",
  "description": "Clear explanation of what to create.",
  "concepts": ["${normalizedTech.toLowerCase()}-concept"],
  "requirements": ["Requirement 1", "Requirement 2"],
  "constraints": ["Constraint 1"],
  "starterCode": "/* Multi-line indented starter code in ${normalizedTech} */",
  "solutionCode": "/* Multi-line reference solution in ${normalizedTech} */",
  "predictConfig": null,
  "evaluationCriteria": {"correctnessWeight": 70, "qualityWeight": 15, "structureWeight": 15},
  "estimatedTime": 4,
  "points": 10
}`;

    const userPrompt = `Create a ${normalizedTech} (${difficulty}, Level ${level}) challenge now. Format code neatly across multiple lines. Return valid JSON only.`;

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
          max_tokens: 1200,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        const errBody = await response.text();
        throw new Error(`Groq error (${response.status}): ${errBody}`);
      }

      const responseData = await response.json();
      const content = responseData.choices[0]?.message?.content;
      if (!content) {
        throw new Error('Empty response from Groq API');
      }

      const parsedQuestion = JSON.parse(content);

      parsedQuestion.technology = normalizedTech;
      parsedQuestion.difficulty = difficulty;
      parsedQuestion.level = Number(level);
      parsedQuestion.questionNumber = Number(questionNumber);
      if (!parsedQuestion.slug) {
        parsedQuestion.slug = targetSlug;
      }

      // Format code strings so newlines and tabs render across multiple lines properly
      parsedQuestion.starterCode = formatCodeString(parsedQuestion.starterCode);
      parsedQuestion.solutionCode = formatCodeString(parsedQuestion.solutionCode);

      const saved = await Question.findOneAndUpdate(
        { slug: parsedQuestion.slug },
        { $set: parsedQuestion },
        { upsert: true, new: true }
      );

      console.log(`✨ Generated ${normalizedTech} question: "${parsedQuestion.title}" [${parsedQuestion.slug}]`);
      return saved.toObject ? saved.toObject() : saved;
    } catch (error) {
      console.warn('❌ Groq generation error, providing technology fallback:', error.message);
      const fallback = getStaticFallback(normalizedTech, difficulty, level, questionNumber, targetSlug);
      const saved = await Question.findOneAndUpdate(
        { slug: fallback.slug },
        { $set: fallback },
        { upsert: true, new: true }
      );
      return saved.toObject ? saved.toObject() : saved;
    }
  },
};
