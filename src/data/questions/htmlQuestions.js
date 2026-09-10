export const htmlQuestions = [
  {
    id: "html-beg-l1-q01",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Build Semantic Accessible Registration Form",
    description: "Construct a semantic, accessible HTML5 user registration form with appropriate form controls, labels connected via `for`/`id`, input types, validation attributes, and fieldset grouping.",
    requirements: [
      "Use `<form>` with appropriate `novalidate` or standard HTML5 validation attributes",
      "Include inputs for Full Name (text, required), Email (email, required), Password (password, minlength 8), and Role selection (select dropdown)",
      "Connect all `<label>` tags to their respective inputs using matching `for` and `id` attributes",
      "Group account credentials inside a `<fieldset>` with a descriptive `<legend>`",
      "Include a `<button type=\"submit\">` for submission"
    ],
    constraints: [
      "Must be valid HTML5 syntax",
      "Do not use generic `<div>` elements where semantic elements like `<fieldset>`, `<legend>`, `<label>` are appropriate"
    ],
    examples: [
      {
        input: "<form action=\"/register\" method=\"POST\"> ... </form>",
        output: "Rendered accessible form with complete semantic hierarchy"
      }
    ],
    starterCode: `<!-- Build your accessible HTML5 registration form below -->
<form id="registration-form" method="POST">
  <fieldset>
    <legend>User Information</legend>

    <!-- Add form controls here -->

  </fieldset>
  
  <button type="submit">Create Account</button>
</form>
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 5
    },
    estimatedTime: 10
  },
  {
    id: "html-beg-l1-q02",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 2,
    type: "DEBUG",
    title: "Fix Broken Semantic Blog Article Structure",
    description: "The following HTML snippet for a blog post has severe accessibility and semantic errors, such as multiple unnested `<main>` tags, broken heading hierarchies (h1 jumping to h4), and missing alt attributes. Fix the HTML markup.",
    requirements: [
      "Ensure there is only one `<main>` landmark element on the page",
      "Fix heading hierarchy so `<h1>` is followed by `<h2>` and `<h3>` without skipping levels",
      "Add meaningful `alt` descriptions to `<img>` elements",
      "Use `<article>`, `<header>`, `<time>`, and `<footer>` elements properly"
    ],
    constraints: [
      "Preserve all original text content",
      "Ensure clean indentation and closing tags"
    ],
    examples: [
      {
        input: "<div><h1>Title</h1><h4>Subtitle</h4><img src='hero.jpg'></div>",
        output: "<article><header><h1>Title</h1><p>Subtitle</p></header><img src='hero.jpg' alt='Hero description'></article>"
      }
    ],
    starterCode: `<!-- Fix semantic hierarchy, single main landmark, alt text, and heading order -->
<main>
  <div class="post">
    <!-- BUG: Skipped heading levels -->
    <h1>Building Future Web Apps</h1>
    <h4>Published on May 12, 2026</h4>
    
    <!-- BUG: Missing alt text -->
    <img src="/assets/hero.jpg">
    
    <p>Modern web engineering requires semantic foundation...</p>
    
    <!-- BUG: Using div instead of footer/aside -->
    <div class="author-info">
      Written by Sarah Connor
    </div>
  </div>
</main>
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
  }
];

// Generate slots 3-20 for HTML
for (let i = 3; i <= 20; i++) {
  const types = ["BUILD", "DEBUG", "REFACTOR", "COMPLETE", "PREDICT", "OPTIMIZE", "FIND_THE_BUG"];
  const type = types[(i - 1) % types.length];
  htmlQuestions.push({
    id: `html-beg-l1-q${String(i).padStart(2, "0")}`,
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: i,
    type: type,
    title: `HTML Semantic Challenge ${String(i).padStart(2, "0")}: ${type === "DEBUG" ? "Fix Table Accessibility" : type === "PREDICT" ? "DOM Tree Structure" : "Accessible Dialog"}`,
    description: `Demonstrate mastery of modern semantic HTML5, ARIA attributes, landmarks, and responsive image syntax in challenge ${i}.`,
    requirements: [
      "Use valid HTML5 semantics",
      "Ensure proper landmark roles and labeling",
      "Support responsive image art direction with <picture> or <figure>"
    ],
    constraints: ["W3C compliant HTML5"],
    examples: [{ input: `<section id="sec-${i}"></section>`, output: "Valid accessible node" }],
    starterCode: `<!-- HTML Challenge ${i} -->\n<section class="challenge-${i}">\n  <h2>Topic ${i}</h2>\n  <p>Content implementation...</p>\n</section>\n`,
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
