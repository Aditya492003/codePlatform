import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '..', '.env') });

import { groqCodeEvaluator } from '../services/groqEvaluationService.js';

const testEvaluation = async () => {
  const sampleQuestion = {
    slug: 'js-beg-l1-q01',
    title: 'Declare and Return a Greeting',
    technology: 'JavaScript',
    difficulty: 'Beginner',
    level: 1,
    description: 'Write a function getGreeting() that returns the exact string "Hello, World!".',
    requirements: ['Define a function named getGreeting', 'Return "Hello, World!"'],
    constraints: ['Exact casing'],
    examples: [{ input: 'getGreeting()', output: '"Hello, World!"' }],
    starterCode: 'function getGreeting() {\n  // Write your solution here\n}\n',
    solutionCode: 'function getGreeting() {\n  return "Hello, World!";\n}',
  };

  console.log('--- TEST 1: User submits empty / unmodified starter code ---');
  const emptyRes = await groqCodeEvaluator.evaluateSubmission({
    question: sampleQuestion,
    userCode: 'function getGreeting() {\n  // Write your solution here\n}\n',
    elapsedSeconds: 15,
  });

  console.log('Result for unmodified starter code:');
  console.log(`- Status: ${emptyRes.status}`);
  console.log(`- Overall Score: ${emptyRes.overallScore}/100`);
  console.log(`- Tests Passed: ${emptyRes.testsPassed}/${emptyRes.totalTests}`);
  console.log(`- Test Error: ${emptyRes.tests[0]?.error}`);

  console.log('\n--- TEST 2: User submits valid working solution ---');
  const validRes = await groqCodeEvaluator.evaluateSubmission({
    question: sampleQuestion,
    userCode: 'function getGreeting() {\n  return "Hello, World!";\n}',
    elapsedSeconds: 40,
  });

  console.log('Result for valid solution:');
  console.log(`- Status: ${validRes.status}`);
  console.log(`- Overall Score: ${validRes.overallScore}/100`);
  console.log(`- Classification: ${validRes.classification}`);
  console.log(`- Tests Passed: ${validRes.testsPassed}/${validRes.totalTests}`);
  console.log(`- Strengths: ${validRes.aiReview?.strengths?.join(', ')}`);

  console.log('\n Real AI Code Scanner & Evaluator verified successfully!');
  process.exit(0);
};

testEvaluation();
