/**
 * Canonical CSS Challenge Blueprint Reference for AI Question Architecture
 */
export const cssQuestions = [
  {
    id: "css-beg-l1-q01",
    slug: "css-beg-l1-q01",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Center a Container with Flexbox",
    description: "Write CSS rules to center all children inside a `.container` horizontally and vertically using Flexbox.",
    concepts: ["flexbox", "justify-content", "align-items", "display"],
    requirements: [
      "Set `display: flex` on `.container`",
      "Center items horizontally with `justify-content: center`",
      "Center items vertically with `align-items: center`"
    ],
    constraints: ["Use modern CSS Flexbox properties"],
    examples: [
      {
        input: ".container { display: flex; justify-content: center; align-items: center; }",
        output: "Centered box in viewport",
        explanation: "Flexbox layout centering rules"
      }
    ],
    starterCode: `.container {
  /* Write your Flexbox centering rules here */
  
}`,
    solutionCode: `.container {
  display: flex;
  justify-content: center;
  align-items: center;
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
