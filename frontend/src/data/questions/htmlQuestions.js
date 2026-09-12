/**
 * Canonical HTML Challenge Blueprint Reference for AI Question Architecture
 */
export const htmlQuestions = [
  {
    id: "html-beg-l1-q01",
    slug: "html-beg-l1-q01",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Create a Semantic Article Header",
    description: "Write semantic HTML5 markup containing a header, an h1 title, and a paragraph with author info.",
    concepts: ["semantic HTML", "header", "h1", "article"],
    requirements: [
      "Use an `<article>` tag wrapping a `<header>`",
      "Include an `<h1>` element",
      "Include a `<p>` element with class `author`"
    ],
    constraints: ["Use valid HTML5 closing tags"],
    examples: [
      {
        input: "<article><header><h1>Title</h1><p class='author'>Author</p></header></article>",
        output: "Rendered semantic header",
        explanation: "Valid HTML5 structure"
      }
    ],
    starterCode: `<article>
  <!-- Construct your semantic header here -->
  
</article>`,
    solutionCode: `<article>
  <header>
    <h1>Title</h1>
    <p class="author">Author</p>
  </header>
</article>`,
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
