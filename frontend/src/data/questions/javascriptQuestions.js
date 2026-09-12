/**
 * Canonical JavaScript Challenge Blueprint Reference for AI Question Architecture
 */
export const javascriptQuestions = [
  {
    id: "js-beg-l1-q01",
    slug: "js-beg-l1-q01",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Declare and Return a Greeting",
    description: "Write a function `getGreeting()` that returns the exact string 'Hello, World!'. This introduces functions and return values in JavaScript.",
    concepts: ["function", "return", "strings"],
    requirements: [
      "Define a function named `getGreeting`",
      "Return the string `'Hello, World!'`"
    ],
    constraints: ["Return exact casing and punctuation"],
    examples: [
      {
        input: "getGreeting()",
        output: "'Hello, World!'",
        explanation: "Calling getGreeting() returns the greeting string"
      }
    ],
    starterCode: `/**
 * Returns a simple greeting message.
 * @returns {string} 'Hello, World!'
 */
function getGreeting() {
  // Write your solution here
  
}
`,
    solutionCode: `function getGreeting() {
  return 'Hello, World!';
}`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 70,
      qualityWeight: 15,
      structureWeight: 15,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 3,
    points: 10
  }
];
