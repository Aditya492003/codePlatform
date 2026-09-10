export const htmlQuestions = [
  // ==========================================
  // HTML BEGINNER -> LEVEL 1 (Questions 01 to 20)
  // Progressive, confidence-building difficulty
  // ==========================================

  // --- Questions 01 - 05: Absolute Fundamentals ---
  {
    id: "html-beg-l1-q01",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Basic Heading and Paragraph",
    description: "Create a simple introduction containing a main heading and a paragraph. This challenge will get you comfortable with fundamental HTML tags.",
    concepts: ["<h1>", "<p>"],
    requirements: [
      "Include a top-level `<h1>` heading with the text 'Welcome to My Website'",
      "Include a `<p>` paragraph below the heading with a short welcome sentence"
    ],
    constraints: [
      "Use valid HTML syntax",
      "Do not include styling or advanced attributes"
    ],
    examples: [
      {
        input: "<h1>Welcome to My Website</h1>\n<p>This is my very first web page.</p>",
        output: "Rendered page displaying a large title and regular paragraph text."
      }
    ],
    starterCode: `<!-- Write your solution below -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 2
  },
  {
    id: "html-beg-l1-q02",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 2,
    type: "BUILD",
    title: "Heading Hierarchy",
    description: "Create a simple article with a main heading, section heading, and paragraphs to practice proper document structure without jumping heading levels.",
    concepts: ["<h1>", "<h2>", "<p>"],
    requirements: [
      "Include an `<h1>` heading for the main title: 'Learning Web Development'",
      "Add a `<p>` paragraph introducing the topic",
      "Include an `<h2>` subheading: 'Why HTML Matters'",
      "Add a second `<p>` paragraph under the subheading"
    ],
    constraints: [
      "Do not skip heading levels (e.g. do not jump from h1 directly to h3)",
      "Ensure all tags are properly closed"
    ],
    examples: [
      {
        input: "<h1>Learning Web Development</h1>\n<p>Starting with the basics.</p>\n<h2>Why HTML Matters</h2>\n<p>It provides the structure.</p>",
        output: "Clean document hierarchy with primary and secondary heading levels."
      }
    ],
    starterCode: `<!-- Create an article structure using h1, h2, and p tags -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "html-beg-l1-q03",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 3,
    type: "BUILD",
    title: "Basic Unordered Lists",
    description: "Create a 'My Skills' section containing an unordered list of skills using standard list tags.",
    concepts: ["<h2>", "<ul>", "<li>"],
    requirements: [
      "Include an `<h2>` heading with the text 'My Skills'",
      "Create an unordered list `<ul>`",
      "Add at least three `<li>` list items (e.g. 'HTML', 'CSS', 'JavaScript')"
    ],
    constraints: [
      "List items must be enclosed directly within `<ul>`",
      "Do not use forms, tables, or complex styling"
    ],
    examples: [
      {
        input: "<h2>My Skills</h2>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>",
        output: "Rendered bulleted list of three items under a section heading."
      }
    ],
    starterCode: `<!-- Create your skills list with h2, ul, and li -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "html-beg-l1-q04",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 4,
    type: "BUILD",
    title: "Hyperlinks with href",
    description: "Create a small 'Useful Links' section containing links to websites. This is your introduction to HTML attributes.",
    concepts: ["<a>", "href", "<h2>", "<p>"],
    requirements: [
      "Include an `<h2>` heading with the text 'Useful Links'",
      "Create an anchor tag `<a>` with `href=\"https://developer.mozilla.org\"` and text 'MDN Web Docs'",
      "Create a second anchor tag `<a>` with `href=\"https://www.w3.org\"` and text 'W3C'",
      "Wrap each link in a `<p>` tag or place them on separate lines"
    ],
    constraints: [
      "All `<a>` tags must have valid `href` attributes",
      "Link text should be clearly readable"
    ],
    examples: [
      {
        input: "<h2>Useful Links</h2>\n<p><a href=\"https://developer.mozilla.org\">MDN Web Docs</a></p>\n<p><a href=\"https://www.w3.org\">W3C</a></p>",
        output: "Clickable hyperlinks navigating to the specified URLs."
      }
    ],
    starterCode: `<!-- Create links using anchor tags with href attributes -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "html-beg-l1-q05",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 5,
    type: "BUILD",
    title: "Images with src and alt",
    description: "Create a simple profile section containing an image with a source URL and an accessible alternative text description.",
    concepts: ["<img>", "src", "alt", "<h2>", "<p>"],
    requirements: [
      "Include an `<h2>` heading with the text 'Profile Photo'",
      "Add an `<img>` tag with `src=\"/assets/avatar.jpg\"`",
      "Add an `alt` attribute describing the image (e.g. `alt=\"Developer profile portrait\"`)",
      "Include a short `<p>` description below the image"
    ],
    constraints: [
      "`<img>` is a self-closing element; do not use `</img>`",
      "`alt` attribute is required for accessibility"
    ],
    examples: [
      {
        input: "<h2>Profile Photo</h2>\n<img src=\"/assets/avatar.jpg\" alt=\"Developer avatar\">\n<p>Frontend engineer based in Seattle.</p>",
        output: "Rendered image with fallback alternative text and caption."
      }
    ],
    starterCode: `<!-- Embed an image with src and alt attributes -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },

  // --- Questions 06 - 10: Combining Learned Concepts ---
  {
    id: "html-beg-l1-q06",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 6,
    type: "BUILD",
    title: "Text Formatting with strong, em, and br",
    description: "Format an event announcement using `<strong>` for high importance, `<em>` for emphasized stress, and `<br>` for a manual line break.",
    concepts: ["<strong>", "<em>", "<br>", "<p>"],
    requirements: [
      "Create a paragraph containing the text: 'Important: The workshop starts at 10 AM'",
      "Wrap the word 'Important:' in a `<strong>` tag",
      "Wrap '10 AM' in an `<em>` tag",
      "Use a `<br>` tag to separate the address onto a new line inside the paragraph"
    ],
    constraints: ["Keep elements properly nested within the paragraph"],
    examples: [
      {
        input: "<p><strong>Important:</strong> The workshop starts at <em>10 AM</em>.<br>Location: Room 402</p>",
        output: "Bold notice with italicized time and broken second line."
      }
    ],
    starterCode: `<!-- Format text using strong, em, and br tags inside a paragraph -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "html-beg-l1-q07",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 7,
    type: "BUILD",
    title: "List of Useful Links",
    description: "Combine list tags and anchor tags to create a structured directory of resources.",
    concepts: ["<ul>", "<li>", "<a>", "href"],
    requirements: [
      "Include an `<h2>` heading 'Developer Resources'",
      "Create an unordered list `<ul>`",
      "Add 3 `<li>` items, each containing an `<a>` link with valid `href` and clear link text"
    ],
    constraints: ["Anchor tags `<a>` should be inside the `<li>` items"],
    examples: [
      {
        input: "<h2>Developer Resources</h2>\n<ul>\n  <li><a href=\"https://github.com\">GitHub</a></li>\n  <li><a href=\"https://stackoverflow.com\">Stack Overflow</a></li>\n</ul>",
        output: "Bulleted list of clickable resource links."
      }
    ],
    starterCode: `<!-- Create an unordered list with anchor tags inside each list item -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "html-beg-l1-q08",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 8,
    type: "BUILD",
    title: "Ordered Step-by-Step Guide",
    description: "Create a numbered sequence list using `<ol>` and `<li>` to explain how to set up a new project.",
    concepts: ["<ol>", "<li>", "<h2>", "<strong>"],
    requirements: [
      "Include an `<h2>` heading 'Getting Started Steps'",
      "Create an ordered list `<ol>`",
      "Add 3 ordered steps in `<li>` tags",
      "Use `<strong>` on the first word of each step (e.g. '<strong>Step 1:</strong> Clone the repo')"
    ],
    constraints: ["Use `<ol>` rather than `<ul>` for numbered sequential order"],
    examples: [
      {
        input: "<h2>Getting Started Steps</h2>\n<ol>\n  <li><strong>Step 1:</strong> Install dependencies</li>\n  <li><strong>Step 2:</strong> Run tests</li>\n</ol>",
        output: "Numbered sequence list with bold step headers."
      }
    ],
    starterCode: `<!-- Create an ordered list ol with strong step labels -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "html-beg-l1-q09",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 9,
    type: "BUILD",
    title: "Clickable Image Card",
    description: "Wrap an image and text inside a link to create an interactive product teaser.",
    concepts: ["<a>", "<img>", "<h3>", "<p>"],
    requirements: [
      "Create a container `<a>` tag with `href=\"/products/camera\"`",
      "Place an `<img>` inside with `src=\"/camera.jpg\"` and `alt=\"Vintage Camera\"`",
      "Include an `<h3>` title 'Vintage 35mm Camera' inside the link",
      "Include a `<p>` with price '$149.00'"
    ],
    constraints: ["All card elements must be enclosed within the `<a>` element"],
    examples: [
      {
        input: "<a href=\"/products/camera\">\n  <img src=\"/camera.jpg\" alt=\"Vintage Camera\">\n  <h3>Vintage 35mm Camera</h3>\n  <p>$149.00</p>\n</a>",
        output: "Clickable card element containing image, heading, and text."
      }
    ],
    starterCode: `<!-- Create a link container wrapping an image, heading, and paragraph -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },
  {
    id: "html-beg-l1-q10",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 10,
    type: "BUILD",
    title: "Mini Portfolio Bio Section",
    description: "Combine all fundamental elements learned so far: headings, an avatar image, a bio paragraph, and a list of social links.",
    concepts: ["<h1>", "<h2>", "<img>", "<p>", "<ul>", "<li>", "<a>"],
    requirements: [
      "Include an `<h1>` with your name",
      "Include an `<img>` with `src` and `alt`",
      "Add a `<p>` bio paragraph",
      "Include an `<h2>` for 'Connect With Me'",
      "Add an unordered list `<ul>` with at least 2 linked social media items in `<li>` tags"
    ],
    constraints: ["Ensure clean indentation and valid tag closure"],
    examples: [
      {
        input: "<h1>Jane Doe</h1>\n<img src=\"avatar.png\" alt=\"Jane Doe\">\n<p>Web Designer</p>\n<h2>Connect With Me</h2>\n<ul>\n  <li><a href=\"#\">Twitter</a></li>\n</ul>",
        output: "Structured personal bio section."
      }
    ],
    starterCode: `<!-- Build a complete bio section combining headings, image, paragraph, and links -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 25,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },

  // --- Questions 11 - 15: Introduction to Basic Semantic HTML ---
  {
    id: "html-beg-l1-q11",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 11,
    type: "BUILD",
    title: "Page Shell with Header, Main, and Footer",
    description: "Structure a basic webpage layout using the core semantic landmark elements: `<header>`, `<main>`, and `<footer>`.",
    concepts: ["<header>", "<main>", "<footer>", "<h1>", "<p>"],
    requirements: [
      "Use `<header>` at the top containing an `<h1>` website title",
      "Use `<main>` in the center containing a `<p>` with page content",
      "Use `<footer>` at the bottom containing a `<p>` with copyright text"
    ],
    constraints: [
      "There should only be one `<main>` landmark element on the page",
      "Landmarks should be sibling elements, not nested within one another"
    ],
    examples: [
      {
        input: "<header>\n  <h1>Tech Journal</h1>\n</header>\n<main>\n  <p>Welcome to our tech news feed.</p>\n</main>\n<footer>\n  <p>&copy; 2026 Tech Journal</p>\n</footer>",
        output: "Semantic 3-tier document structure with header, main, and footer."
      }
    ],
    starterCode: `<!-- Create a page structure using header, main, and footer landmarks -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },
  {
    id: "html-beg-l1-q12",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 12,
    type: "BUILD",
    title: "Semantic Navigation Bar",
    description: "Construct a primary site navigation using the semantic `<nav>` element containing an unordered list of links inside a `<header>`.",
    concepts: ["<header>", "<nav>", "<ul>", "<li>", "<a>"],
    requirements: [
      "Create a `<header>` element",
      "Inside `<header>`, include an `<h1>` site brand",
      "Add a `<nav>` element containing a `<ul>` list",
      "Include 3 navigation links inside `<li>` items ('Home', 'Articles', 'Contact')"
    ],
    constraints: ["Always wrap primary navigational links in `<nav>`"],
    examples: [
      {
        input: "<header>\n  <h1>DevPortal</h1>\n  <nav>\n    <ul>\n      <li><a href=\"/\">Home</a></li>\n      <li><a href=\"/docs\">Docs</a></li>\n    </ul>\n  </nav>\n</header>",
        output: "Accessible header with semantic navigation container."
      }
    ],
    starterCode: `<!-- Build a semantic navigation bar inside a header -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },
  {
    id: "html-beg-l1-q13",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 13,
    type: "BUILD",
    title: "Structured Article with Sections",
    description: "Use `<article>` to represent a self-contained blog post divided into distinct `<section>` blocks.",
    concepts: ["<article>", "<section>", "<h2>", "<h3>", "<p>"],
    requirements: [
      "Wrap the entire piece in an `<article>` tag",
      "Include an `<h2>` article title at the top",
      "Create a `<section>` for 'Introduction' with an `<h3>` and a `<p>`",
      "Create a second `<section>` for 'Key Takeaways' with an `<h3>` and a `<p>`"
    ],
    constraints: ["Each `<section>` should have its own heading element"],
    examples: [
      {
        input: "<article>\n  <h2>Guide to CSS Grid</h2>\n  <section>\n    <h3>Introduction</h3>\n    <p>CSS Grid is two-dimensional...</p>\n  </section>\n</article>",
        output: "Self-contained article with labeled topical sections."
      }
    ],
    starterCode: `<!-- Structure an article using article, section, and headings -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },
  {
    id: "html-beg-l1-q14",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 14,
    type: "BUILD",
    title: "Semantic Blog Post Card",
    description: "Create a blog article card with header metadata, publication timestamp in `<time>`, article body, and author in `<footer>`.",
    concepts: ["<article>", "<header>", "<time>", "<footer>", "<p>"],
    requirements: [
      "Use `<article>` as the outer container",
      "Inside `<article>`, create a `<header>` containing an `<h2>` title and a `<time datetime=\"2026-09-10\">` element",
      "Add a `<p>` paragraph with the article excerpt",
      "Create a `<footer>` inside `<article>` containing author credit in a `<p>`"
    ],
    constraints: ["`<time>` tag must include the `datetime` attribute"],
    examples: [
      {
        input: "<article>\n  <header>\n    <h2>Modern Web Standards</h2>\n    <time datetime=\"2026-09-10\">Sept 10, 2026</time>\n  </header>\n  <p>Overview of new specifications...</p>\n  <footer>\n    <p>Written by Alex</p>\n  </footer>\n</article>",
        output: "Complete semantic blog card."
      }
    ],
    starterCode: `<!-- Create a blog post card using article, header, time, and footer -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },
  {
    id: "html-beg-l1-q15",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 15,
    type: "DEBUG",
    title: "Debug Semantic Landmark Nesting",
    description: "The provided markup incorrectly duplicates `<main>` tags and places landmark headers inside paragraph elements. Fix the semantic markup.",
    concepts: ["<header>", "<main>", "<footer>", "Debugging"],
    requirements: [
      "Ensure there is exactly one `<main>` element on the page",
      "Do not nest `<header>` or `<footer>` inside `<p>` tags",
      "Preserve all original text content while fixing the element structure"
    ],
    constraints: ["Valid HTML5 landmark structure"],
    examples: [
      {
        input: "<p><header><h1>Title</h1></header></p>\n<main>Content 1</main>\n<main>Content 2</main>",
        output: "<header><h1>Title</h1></header>\n<main>\n  <p>Content 1</p>\n  <p>Content 2</p>\n</main>"
      }
    ],
    starterCode: `<!-- FIX THE SEMANTIC ERRORS BELOW:
Contains: duplicate main elements, invalid header inside p tag -->
<p>
  <header>
    <h1>Weekly Roundup</h1>
  </header>
</p>

<main>
  <p>First news update of the week.</p>
</main>

<main>
  <p>Second news update of the week.</p>
</main>

<p>
  <footer>
    <p>Copyright 2026</p>
  </footer>
</p>
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },

  // --- Questions 16 - 20: Debugging, Nesting & Mini-Capstone ---
  {
    id: "html-beg-l1-q16",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 16,
    type: "DEBUG",
    title: "Fix Unclosed Tags and Broken List Nesting",
    description: "The markup has several syntax errors including unclosed `<li>` elements, an inverted `<a>` tag, and a missing `alt` attribute on an image. Correct the syntax errors.",
    concepts: ["Unclosed tags", "Nesting rules", "<img> alt"],
    requirements: [
      "Properly close all `<li>` and `<ul>` elements",
      "Ensure `<a>` wraps link text properly and does not overlap with `<li>`",
      "Add a descriptive `alt` attribute to the `<img>` element"
    ],
    constraints: ["Preserve all original links and list text"],
    examples: [
      {
        input: "<ul><li>Item 1<li>Item 2</ul>",
        output: "<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>"
      }
    ],
    starterCode: `<!-- FIX UNCLOSED TAGS AND BROKEN NESTING -->
<h2>Featured Courses</h2>
<ul>
  <li><a href="/html">HTML Fundamentals
  <li>CSS Mastery</a>
  <li>JavaScript Basics
</ul>

<img src="/banner.png">
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },
  {
    id: "html-beg-l1-q17",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 17,
    type: "DEBUG",
    title: "Fix Broken Heading Hierarchy",
    description: "The following document outline jumps erratically from `<h1>` to `<h4>` and back to `<h2>`. Fix the headings so they follow proper sequential hierarchical order.",
    concepts: ["<h1>", "<h2>", "<h3>", "Document Outline"],
    requirements: [
      "Keep the main document title as `<h1>`",
      "Change section headings to `<h2>`",
      "Change sub-topic headings under sections to `<h3>` (do not skip from h1 directly to h4)"
    ],
    constraints: ["Preserve all original text strings"],
    examples: [
      {
        input: "<h1>Title</h1>\n<h4>Subtitle</h4>\n<h5>Section</h5>",
        output: "<h1>Title</h1>\n<h2>Subtitle</h2>\n<h3>Section</h3>"
      }
    ],
    starterCode: `<!-- FIX THE HEADING LEVEL SKIPS -->
<h1>Web Development Guide</h1>
<p>An introduction for beginners.</p>

<!-- BUG: Skipped to h4 -->
<h4>Frontend Basics</h4>
<p>Building the user interface.</p>

<!-- BUG: Skipped to h6 -->
<h6>HTML and CSS</h6>
<p>Structure and styling.</p>

<!-- BUG: Jumped back to h2 -->
<h2>Backend Basics</h2>
<p>Servers and databases.</p>
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },
  {
    id: "html-beg-l1-q18",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 18,
    type: "REFACTOR",
    title: "Refactor Div Soup to Semantic Elements",
    description: "The provided layout was built entirely with generic `<div>` tags. Refactor the structure to clean HTML5 semantic elements (`<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<footer>`).",
    concepts: ["Semantic HTML5", "Refactoring", "Clean Structure"],
    requirements: [
      "Replace `<div class=\"site-header\">` with `<header>`",
      "Replace `<div class=\"navigation\">` with `<nav>`",
      "Replace `<div class=\"main-content\">` with `<main>`",
      "Replace `<div class=\"post\">` with `<article>`",
      "Replace `<div class=\"site-footer\">` with `<footer>`"
    ],
    constraints: ["Preserve classes and text content"],
    examples: [
      {
        input: "<div class=\"header\">...</div>",
        output: "<header class=\"header\">...</header>"
      }
    ],
    starterCode: `<!-- REFACTOR GENERIC DIVS INTO SEMANTIC HTML5 TAGS -->
<div class="site-header">
  <h1>My Coding Blog</h1>
  <div class="navigation">
    <ul>
      <li><a href="/">Home</a></li>
      <li><a href="/about">About</a></li>
    </ul>
  </div>
</div>

<div class="main-content">
  <div class="post">
    <h2>Why Semantic HTML Matters</h2>
    <p>Semantic tags improve accessibility and SEO.</p>
  </div>
</div>

<div class="site-footer">
  <p>&copy; 2026 My Coding Blog</p>
</div>
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 25,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },
  {
    id: "html-beg-l1-q19",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 19,
    type: "COMPLETE",
    title: "Complete the Product Detail Showcase",
    description: "Fill in the missing semantic HTML tags for a product preview card. Complete the image element, specifications list, and action link.",
    concepts: ["<article>", "<img>", "<ul>", "<li>", "<a>", "<strong>"],
    requirements: [
      "Complete the `<img>` element with `src=\"/laptop.png\"` and `alt=\"Modern Ultrabook\"`",
      "Add a `<ul>` list with 3 specification items ('16GB RAM', '512GB SSD', 'Retina Display')",
      "Add an anchor `<a>` with `href=\"/buy/ultrabook\"` and text 'Purchase Now'"
    ],
    constraints: ["Fill in code where the `<!-- TODO -->` comments indicate"],
    examples: [
      {
        input: "<article class=\"product-card\"> ... </article>",
        output: "Rendered product showcase with photo, specs list, and purchase link."
      }
    ],
    starterCode: `<article class="product-card">
  <h2>UltraBook Pro 15</h2>
  <p class="tagline">Lightweight, blazing-fast performance.</p>

  <!-- TODO 1: Add product image with src and alt -->
  

  <h3>Key Specifications</h3>
  <!-- TODO 2: Add an unordered list with 3 spec items -->
  

  <!-- TODO 3: Add purchase link -->
  
</article>
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
  },
  {
    id: "html-beg-l1-q20",
    technology: "HTML",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 20,
    type: "BUILD",
    title: "Level 1 Capstone: Full Semantic Developer Page",
    description: "Synthesize all concepts learned throughout Level 1 (landmarks, headings, navigation, images, lists, formatted text, and links) to build a complete personal landing page.",
    concepts: ["<header>", "<nav>", "<main>", "<section>", "<footer>", "<h1>", "<h2>", "<img>", "<ul>", "<li>", "<a>"],
    requirements: [
      "Include a `<header>` with an `<h1>` page title and a `<nav>` containing 3 links",
      "Include a single `<main>` landmark with two distinct `<section>` elements",
      "Section 1 ('About Me'): Contains an `<h2>`, an `<img>` with `src` and `alt`, and a `<p>` description with `<strong>` or `<em>` emphasis",
      "Section 2 ('Projects'): Contains an `<h2>` and a `<ul>` list with at least 2 linked project items",
      "Include a `<footer>` with copyright and contact text"
    ],
    constraints: [
      "Use valid HTML5 semantics throughout",
      "Maintain clean heading hierarchy (h1 -> h2)",
      "Do not use forms, tables, or complex scripts"
    ],
    examples: [
      {
        input: "<header>...</header>\n<main>\n  <section>...</section>\n  <section>...</section>\n</main>\n<footer>...</footer>",
        output: "Complete, semantic, accessible single-page developer profile."
      }
    ],
    starterCode: `<!-- LEVEL 1 CAPSTONE PROJECT
Build a complete semantic personal developer landing page.
Combine header, nav, main, sections, image, lists, links, and footer. -->

`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 45,
      qualityWeight: 25,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 5
    },
    estimatedTime: 10
  },

  // ==========================================
  // HTML BEGINNER -> LEVEL 3 & 4 (Advanced Topics like Forms)
  // Moved the complex registration form here
  // ==========================================
  {
    id: "html-beg-l3-q01",
    technology: "HTML",
    difficulty: "Beginner",
    level: 3,
    questionNumber: 1,
    type: "BUILD",
    title: "Build Semantic Accessible Registration Form",
    description: "Construct a semantic, accessible HTML5 user registration form with appropriate form controls, labels connected via `for`/`id`, input types, validation attributes, and fieldset grouping.",
    concepts: ["<form>", "<fieldset>", "<legend>", "<label>", "<input>", "<select>", "validation", "accessibility"],
    requirements: [
      "Use `<form>` with appropriate standard HTML5 validation attributes",
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
        input: "<form action=\"/register\" method=\"POST\">\n  <fieldset>\n    <legend>User Info</legend>\n    <label for=\"name\">Name</label>\n    <input id=\"name\" type=\"text\" required>\n  </fieldset>\n  <button type=\"submit\">Submit</button>\n</form>",
        output: "Rendered accessible form with complete semantic hierarchy."
      }
    ],
    starterCode: `<!-- Build your accessible HTML5 registration form below -->
<form id="registration-form" method="POST">
  <fieldset>
    <legend>User Information</legend>

    <!-- Add form controls here with connected labels, input types, and required validation -->

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
    estimatedTime: 12
  }
];
