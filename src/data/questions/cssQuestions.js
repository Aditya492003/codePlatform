export const cssQuestions = [
  {
    id: "css-beg-l1-q01",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Create Responsive Fluid Card Grid",
    description: "Write CSS using CSS Grid to create a responsive product card grid that automatically fits columns with `auto-fit`, a minimum column width of `280px`, and a 1fr maximum, with consistent gap and card elevation styling.",
    requirements: [
      "Use `display: grid` with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`",
      "Apply a `gap` of `1.5rem` between grid items",
      "Style individual `.card` items with clean borders, rounded corners (`8px`), and subtle hover box-shadow transition",
      "Ensure container has clean padding and does not cause horizontal overflow"
    ],
    constraints: [
      "No media queries required for column wrapping (rely on CSS Grid auto-fit)",
      "Use modern CSS properties and smooth transitions"
    ],
    examples: [
      {
        input: "<div class=\"grid-container\"><div class=\"card\">Item 1</div>...</div>",
        output: "Fluid multi-column layout adapting seamlessly from 320px to 1440px viewports"
      }
    ],
    starterCode: `/* Fluid Responsive Grid & Card Styling */
.grid-container {
  /* TODO: Apply modern CSS Grid auto-fit */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
}

.card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 5
    },
    estimatedTime: 8
  },
  {
    id: "css-beg-l1-q02",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 2,
    type: "DEBUG",
    title: "Fix Sticky Header Stacking & Overflow Bug",
    description: "The header is configured with `position: sticky; top: 0;` but it refuses to stick on scroll because an ancestor element has `overflow: hidden;` and missing z-index causes content below to bleed over it. Fix the CSS.",
    requirements: [
      "Remove clipping `overflow: hidden` on container that breaks sticky positioning",
      "Ensure `.header` has `position: sticky; top: 0; z-index: 50;`",
      "Add subtle backdrop-filter and border-bottom for clean separation"
    ],
    constraints: [
      "Must remain sticky at top of viewport during vertical page scrolling"
    ],
    examples: [
      {
        input: ".wrapper { overflow: hidden; } .header { position: sticky; }",
        output: ".wrapper { overflow: visible; } .header { position: sticky; top: 0; z-index: 50; }"
      }
    ],
    starterCode: `/* Fix Sticky Navigation Bug */
.page-container {
  /* BUG: overflow: hidden prevents sticky children from sticking */
  overflow: hidden;
  width: 100%;
}

.site-header {
  /* BUG: Missing top offset and z-index */
  position: sticky;
  background: #ffffff;
  padding: 1rem 2rem;
  border-bottom: 1px solid #eaeaea;
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 5
    },
    estimatedTime: 6
  }
];

// Generate slots 3-20 for CSS
for (let i = 3; i <= 20; i++) {
  const types = ["BUILD", "DEBUG", "REFACTOR", "COMPLETE", "PREDICT", "OPTIMIZE", "FIND_THE_BUG"];
  const type = types[(i - 1) % types.length];
  cssQuestions.push({
    id: `css-beg-l1-q${String(i).padStart(2, "0")}`,
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: i,
    type: type,
    title: `CSS Styling Challenge ${String(i).padStart(2, "0")}: ${type === "REFACTOR" ? "Modernize CSS Variables & Tokens" : type === "PREDICT" ? "Specificity & Cascade Resolution" : "Responsive Flexbox Layout"}`,
    description: `Write clean, performant, and responsive CSS conforming to modern layout and animation standards for challenge ${i}.`,
    requirements: [
      "Ensure cross-browser compatibility and maintainable selector structure",
      "Use modern CSS custom properties (--var) and layout techniques",
      "Avoid excessive selector specificity"
    ],
    constraints: ["Standard CSS3 compliant"],
    examples: [{ input: `.layout-${i} { display: flex; }`, output: "Aligned responsive layout" }],
    starterCode: `/* CSS Challenge ${i} */\n.challenge-${i} {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 10
  });
}
