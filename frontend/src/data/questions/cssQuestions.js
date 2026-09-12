export const cssQuestions = [
  // ==========================================
  // CSS BEGINNER -> LEVEL 1 (Questions 01 to 20)
  // Progressive, confidence-building difficulty
  // ==========================================

  // --- Questions 01 - 05: Absolute Fundamentals ---
  {
    id: "css-beg-l1-q01",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Basic Text Color",
    description: "Apply a text color to the heading and paragraph elements using the `color` CSS property.",
    concepts: ["color", "element selectors"],
    requirements: [
      "Set the text color of `h1` to `royalblue` or `#2563eb`",
      "Set the text color of `p` to `#475569` (slate gray)"
    ],
    constraints: ["Use valid CSS color values (named, hex, or rgb)"],
    examples: [
      {
        input: "h1 { color: #2563eb; }",
        output: "Heading rendered in bright royal blue text."
      }
    ],
    starterCode: `/* Apply text colors to h1 and p */
h1 {

}

p {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 70,
      qualityWeight: 15,
      structureWeight: 15,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 2
  },
  {
    id: "css-beg-l1-q02",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 2,
    type: "BUILD",
    title: "Background Color",
    description: "Set a subtle background color for the page card container using the `background-color` property.",
    concepts: ["background-color", "class selector"],
    requirements: [
      "Select `.card` and set its `background-color` to `#f8fafc`",
      "Set the text color inside `.card` to `#0f172a`"
    ],
    constraints: ["Target the class `.card` directly"],
    examples: [
      {
        input: ".card { background-color: #f8fafc; color: #0f172a; }",
        output: "Card with light off-white surface and dark text."
      }
    ],
    starterCode: `/* Set the card background and text color */
.card {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 70,
      qualityWeight: 15,
      structureWeight: 15,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 2
  },
  {
    id: "css-beg-l1-q03",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 3,
    type: "BUILD",
    title: "Font Size and Line Height",
    description: "Control text scale and vertical rhythm using `font-size` and `line-height`.",
    concepts: ["font-size", "line-height"],
    requirements: [
      "Set `h1` font size to `32px`",
      "Set `p` font size to `16px` with a line height of `1.6`"
    ],
    constraints: ["Use px or rem units as specified"],
    examples: [
      {
        input: "h1 { font-size: 32px; }\np { font-size: 16px; line-height: 1.6; }",
        output: "Proportionately scaled heading with readable paragraph line spacing."
      }
    ],
    starterCode: `/* Set font size and line height */
h1 {

}

p {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 2
  },
  {
    id: "css-beg-l1-q04",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 4,
    type: "BUILD",
    title: "Text Alignment",
    description: "Center-align a header title and right-align a subtitle using the `text-align` property.",
    concepts: ["text-align"],
    requirements: [
      "Set `text-align: center` on the `.banner-title`",
      "Set `text-align: right` on the `.date-badge`"
    ],
    constraints: ["Use valid text-align values: left, right, center, or justify"],
    examples: [
      {
        input: ".banner-title { text-align: center; }",
        output: "Title centered horizontally across the banner."
      }
    ],
    starterCode: `/* Align text horizontally */
.banner-title {

}

.date-badge {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 2
  },
  {
    id: "css-beg-l1-q05",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 5,
    type: "BUILD",
    title: "Outer Spacing with Margin",
    description: "Add outer spacing around elements using `margin` and `margin-bottom`.",
    concepts: ["margin", "margin-bottom", "margin-top"],
    requirements: [
      "Add `margin-bottom: 24px` to `h1` to separate it from the content below",
      "Add `margin: 16px` to `.section` to give it breathing room on all sides"
    ],
    constraints: ["Use px or rem units"],
    examples: [
      {
        input: "h1 { margin-bottom: 24px; }\n.section { margin: 16px; }",
        output: "Well-spaced layout with clean margins."
      }
    ],
    starterCode: `/* Apply outer margin spacing */
h1 {

}

.section {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },

  // --- Questions 06 - 10: Box Model & Sizing ---
  {
    id: "css-beg-l1-q06",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 6,
    type: "BUILD",
    title: "Inner Spacing with Padding",
    description: "Add inner breathing room inside a button and a container box using `padding`.",
    concepts: ["padding", "shorthand padding"],
    requirements: [
      "Set `padding: 12px 24px` on `.btn` (12px top/bottom, 24px left/right)",
      "Set `padding: 20px` on `.content-box` on all 4 sides"
    ],
    constraints: ["Do not use negative padding values"],
    examples: [
      {
        input: ".btn { padding: 12px 24px; }",
        output: "Padded button with generous clickable surface."
      }
    ],
    starterCode: `/* Apply padding to button and box */
.btn {

}

.content-box {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "css-beg-l1-q07",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 7,
    type: "BUILD",
    title: "Borders and Rounded Corners",
    description: "Style a card with a subtle border outline and smooth rounded corners using `border` and `border-radius`.",
    concepts: ["border", "border-radius"],
    requirements: [
      "Add a `1px solid #e2e8f0` border to `.card`",
      "Add `border-radius: 8px` to `.card` for smooth corners"
    ],
    constraints: ["Specify border-width, border-style, and border-color"],
    examples: [
      {
        input: ".card { border: 1px solid #e2e8f0; border-radius: 8px; }",
        output: "Clean bordered container with rounded edges."
      }
    ],
    starterCode: `/* Style card border and corner radius */
.card {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "css-beg-l1-q08",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 8,
    type: "BUILD",
    title: "Width and Max-Width",
    description: "Set explicit dimensions on a container using `width`, `max-width`, and `margin: 0 auto` for horizontal centering.",
    concepts: ["width", "max-width", "margin auto"],
    requirements: [
      "Set `max-width: 600px` on `.container`",
      "Set `width: 100%` on `.container` so it scales down on narrow viewports",
      "Set `margin: 0 auto` to center the container horizontally"
    ],
    constraints: ["Ensure container does not overflow viewport width"],
    examples: [
      {
        input: ".container { width: 100%; max-width: 600px; margin: 0 auto; }",
        output: "Centered responsive container bounded at 600px."
      }
    ],
    starterCode: `/* Make container responsive and horizontally centered */
.container {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "css-beg-l1-q09",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 9,
    type: "BUILD",
    title: "Font Weight and Text Transform",
    description: "Style a badge tag with bold weight and uppercase letter styling.",
    concepts: ["font-weight", "text-transform", "letter-spacing"],
    requirements: [
      "Set `font-weight: 700` (or `bold`) on `.badge`",
      "Set `text-transform: uppercase` on `.badge`",
      "Set `letter-spacing: 0.05em` for crisp readability"
    ],
    constraints: ["Use valid text-transform and letter-spacing values"],
    examples: [
      {
        input: ".badge { font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }",
        output: "Uppercase bold badge text."
      }
    ],
    starterCode: `/* Style badge typography */
.badge {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 3
  },
  {
    id: "css-beg-l1-q10",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 10,
    type: "BUILD",
    title: "The CSS Box Model (box-sizing)",
    description: "Apply universal `box-sizing: border-box` so padding and borders are calculated inside width and height rather than expanding elements.",
    concepts: ["box-sizing: border-box", "universal selector *"],
    requirements: [
      "Use the universal selector `*` to set `box-sizing: border-box`",
      "Set `width: 300px`, `padding: 20px`, and `border: 2px solid #333` on `.box`",
      "Verify the total rendered width stays exactly 300px"
    ],
    constraints: ["Apply box-sizing globally or on the component"],
    examples: [
      {
        input: "* { box-sizing: border-box; }\n.box { width: 300px; padding: 20px; border: 2px solid #333; }",
        output: "Box elements adhere to exact specified widths including padding."
      }
    ],
    starterCode: `/* Apply border-box sizing */
* {

}

.box {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },

  // --- Questions 11 - 15: Display & Basic Flexbox ---
  {
    id: "css-beg-l1-q11",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 11,
    type: "BUILD",
    title: "Block vs Inline-Block Elements",
    description: "Change default inline anchor links into `inline-block` elements so they can accept width, padding, and vertical margins.",
    concepts: ["display: inline-block", "display: block"],
    requirements: [
      "Set `display: inline-block` on `.nav-link`",
      "Add `padding: 8px 16px` to `.nav-link`",
      "Set `display: block` on `.sidebar-item` to make each item span the full row"
    ],
    constraints: ["Do not use float or position"],
    examples: [
      {
        input: ".nav-link { display: inline-block; padding: 8px 16px; }",
        output: "Anchor tags accept custom padding and sit side by side."
      }
    ],
    starterCode: `/* Configure display modes */
.nav-link {

}

.sidebar-item {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 25,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "css-beg-l1-q12",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 12,
    type: "BUILD",
    title: "Interactive Button with :hover",
    description: "Create an interactive button that changes its background color and cursor when hovered.",
    concepts: [":hover pseudo-class", "cursor: pointer", "transition"],
    requirements: [
      "Style `.btn-primary` with `background-color: #2563eb`, `color: white`, and `cursor: pointer`",
      "Add a `:hover` state changing `background-color` to `#1d4ed8`",
      "Add `transition: background-color 0.2s ease` on `.btn-primary` for smooth color change"
    ],
    constraints: ["Target `.btn-primary:hover` for the hover pseudo-class"],
    examples: [
      {
        input: ".btn-primary { background-color: #2563eb; transition: background-color 0.2s; }\n.btn-primary:hover { background-color: #1d4ed8; }",
        output: "Interactive button darkening smoothly on hover."
      }
    ],
    starterCode: `/* Style primary button and hover transition */
.btn-primary {

}

.btn-primary:hover {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "css-beg-l1-q13",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 13,
    type: "BUILD",
    title: "Intro to Flexbox: Horizontal Row and Gap",
    description: "Arrange a list of tags horizontally using `display: flex` and add spacing with the `gap` property.",
    concepts: ["display: flex", "gap"],
    requirements: [
      "Set `display: flex` on `.tag-list`",
      "Add `gap: 8px` between items inside `.tag-list`",
      "Ensure items sit horizontally in a single row without floats"
    ],
    constraints: ["Use modern `gap` property instead of margin hacks"],
    examples: [
      {
        input: ".tag-list { display: flex; gap: 8px; }",
        output: "Tags aligned horizontally with uniform 8px separation."
      }
    ],
    starterCode: `/* Create a flex row with gap spacing */
.tag-list {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "css-beg-l1-q14",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 14,
    type: "BUILD",
    title: "Flexbox Alignment (justify-content & align-items)",
    description: "Align items in a navigation bar with brand on the left, links on the right, and vertically centered.",
    concepts: ["justify-content: space-between", "align-items: center"],
    requirements: [
      "Set `display: flex` on `.navbar`",
      "Set `justify-content: space-between` to push child elements to opposite ends",
      "Set `align-items: center` for vertical centering"
    ],
    constraints: ["Do not use absolute positioning or floats"],
    examples: [
      {
        input: ".navbar { display: flex; justify-content: space-between; align-items: center; }",
        output: "Clean navigation bar with brand on left and menu on right."
      }
    ],
    starterCode: `/* Align navbar items */
.navbar {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },
  {
    id: "css-beg-l1-q15",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 15,
    type: "BUILD",
    title: "Flex Direction and Flex Wrap",
    description: "Stack form fields vertically using `flex-direction: column` with consistent gap spacing.",
    concepts: ["flex-direction: column", "gap"],
    requirements: [
      "Set `display: flex` on `.form-stack`",
      "Set `flex-direction: column` so children stack top-to-bottom",
      "Set `gap: 16px` between form fields"
    ],
    constraints: ["Apply flexbox properties directly to `.form-stack`"],
    examples: [
      {
        input: ".form-stack { display: flex; flex-direction: column; gap: 16px; }",
        output: "Vertical stack with uniform 16px gaps."
      }
    ],
    starterCode: `/* Create vertical flex stack */
.form-stack {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 4
  },

  // --- Questions 16 - 20: Debugging, Refactoring & Capstone ---
  {
    id: "css-beg-l1-q16",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 16,
    type: "DEBUG",
    title: "Fix Unexpected Horizontal Overflow",
    description: "A `.content-card` is overflowing its parent container because `width: 100%` is combined with large padding and margins without `box-sizing: border-box`. Fix the styling.",
    concepts: ["box-sizing: border-box", "overflow", "padding"],
    requirements: [
      "Add `box-sizing: border-box` to `.content-card`",
      "Ensure `.content-card` fits cleanly within 100% parent width without horizontal scrollbars",
      "Preserve `padding: 24px` and `border: 2px solid #cbd5e1`"
    ],
    constraints: ["Do not remove padding or border"],
    examples: [
      {
        input: ".content-card { width: 100%; padding: 24px; box-sizing: border-box; }",
        output: "Card sits flush with parent container without causing horizontal scroll."
      }
    ],
    starterCode: `/* FIX THE OVERFLOW BUG
Current code causes horizontal scroll on mobile viewports: */
.content-card {
  width: 100%;
  padding: 24px;
  border: 2px solid #cbd5e1;
  background-color: #ffffff;
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },
  {
    id: "css-beg-l1-q17",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 17,
    type: "DEBUG",
    title: "Fix Specificity and Cascade Conflict",
    description: "The alert button is intended to appear red, but a generic ID selector is overriding its class styling. Fix the selector priority cleanly without using `!important`.",
    concepts: ["CSS Specificity", "Class vs ID", "Avoiding !important"],
    requirements: [
      "Make `.btn-danger` display with `background-color: #ef4444` and `color: white`",
      "Do NOT use `!important`",
      "Refactor selector specificity so class modifier rules take precedence"
    ],
    constraints: ["No `!important` declarations allowed"],
    examples: [
      {
        input: ".btn-danger { background-color: #ef4444; color: #ffffff; }",
        output: "Danger button renders in clean red."
      }
    ],
    starterCode: `/* FIX SPECIFICITY CONFLICT WITHOUT USING !IMPORTANT */
/* Problem: Overly specific rule blocks class overrides */
#actions-bar .btn {
  background-color: #e2e8f0;
  color: #1e293b;
}

/* Fix this rule so .btn-danger correctly turns red: */
.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 20,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 5
  },
  {
    id: "css-beg-l1-q18",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 18,
    type: "REFACTOR",
    title: "Consolidate Duplicated Button Styles",
    description: "The CSS has three different button classes with copy-pasted padding, border-radius, font, and cursor properties. Refactor into a base `.btn` class with specific color modifiers.",
    concepts: ["Base classes", "Modifier classes", "DRY CSS"],
    requirements: [
      "Create a shared `.btn` class with `display: inline-block`, `padding: 10px 20px`, `border-radius: 6px`, `font-weight: 600`, and `cursor: pointer`",
      "Create `.btn-primary` with `background-color: #2563eb; color: #ffffff;`",
      "Create `.btn-secondary` with `background-color: #f1f5f9; color: #334155;`"
    ],
    constraints: ["Eliminate duplicated padding and border-radius declarations"],
    examples: [
      {
        input: ".btn { padding: 10px 20px; ... }\n.btn-primary { background: #2563eb; color: #fff; }",
        output: "Clean, DRY modular button styles."
      }
    ],
    starterCode: `/* REFACTOR DUPLICATED STYLES INTO BASE + MODIFIER CLASSES */

/* Duplicated messy code to clean up: */
.btn-save {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  background-color: #2563eb;
  color: #ffffff;
}

.btn-cancel {
  display: inline-block;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  background-color: #f1f5f9;
  color: #334155;
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 30,
      structureWeight: 20,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },
  {
    id: "css-beg-l1-q19",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 19,
    type: "COMPLETE",
    title: "Complete the User Profile Card Styling",
    description: "Fill in missing CSS rules for a user profile card: avatar circular border-radius, vertical flex alignment, and subtle hover card shadow.",
    concepts: ["border-radius: 50%", "box-shadow", "flexbox", ":hover"],
    requirements: [
      "Set `border-radius: 50%` on `.avatar` to make the photo circular",
      "Set `display: flex`, `flex-direction: column`, and `align-items: center` on `.profile-card`",
      "Add `box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)` on `.profile-card:hover`"
    ],
    constraints: ["Fill in where `/* TODO */` comments are located"],
    examples: [
      {
        input: ".avatar { border-radius: 50%; }",
        output: "Circular avatar with centered card content."
      }
    ],
    starterCode: `.profile-card {
  width: 100%;
  max-width: 320px;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 24px;
  text-align: center;
  transition: box-shadow 0.2s ease;
  
  /* TODO 1: Add flex column centering */
  
}

.profile-card:hover {
  /* TODO 2: Add subtle box shadow */
  
}

.avatar {
  width: 80px;
  height: 80px;
  object-fit: cover;
  /* TODO 3: Make image circular */
  
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 25,
      structureWeight: 25,
      readabilityWeight: 0,
      bestPracticesWeight: 0
    },
    estimatedTime: 6
  },
  {
    id: "css-beg-l1-q20",
    technology: "CSS",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 20,
    type: "BUILD",
    title: "Level 1 Capstone: Build a Clean Product Card Layout",
    description: "Combine all fundamental CSS concepts learned in Level 1 (colors, box model, typography, flexbox alignment, and interactive hover effects) to style a complete product card component.",
    concepts: ["Box Model", "Flexbox", "Typography", "Borders", ":hover", "Transitions"],
    requirements: [
      "Style `.product-card` with `background-color: #ffffff`, `border: 1px solid #e2e8f0`, `border-radius: 10px`, `padding: 20px`, and `max-width: 340px`",
      "Style `.card-header` using flexbox to place title and price badge side by side (`justify-content: space-between`, `align-items: center`)",
      "Style `.price` with bold font weight (`700`) and emerald green color (`#059669`)",
      "Style `.buy-btn` with `display: block`, `width: 100%`, `text-align: center`, `padding: 12px`, `background-color: #2563eb`, `color: #ffffff`, and `border-radius: 6px`",
      "Add `.buy-btn:hover` with `background-color: #1d4ed8`"
    ],
    constraints: [
      "No complex CSS Grid required",
      "Ensure all text is crisp and accessible"
    ],
    examples: [
      {
        input: ".product-card { ... }\n.buy-btn { ... }",
        output: "Polished, interactive product card component."
      }
    ],
    starterCode: `/* LEVEL 1 CSS CAPSTONE PROJECT
Style a complete, responsive product card combining typography,
box model, flexbox layout, and button hover states. */

.product-card {

}

.card-header {

}

.price {

}

.buy-btn {

}

.buy-btn:hover {

}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 45,
      qualityWeight: 25,
      structureWeight: 20,
      readabilityWeight: 10,
      bestPracticesWeight: 0
    },
    estimatedTime: 10
  },

  // ==========================================
  // CSS BEGINNER -> LEVEL 3 / MEDIUM (Advanced Topics like Fluid Grid)
  // ==========================================
  {
    id: "css-beg-l3-q01",
    technology: "CSS",
    difficulty: "Beginner",
    level: 3,
    questionNumber: 1,
    type: "BUILD",
    title: "Create Responsive Fluid Card Grid",
    description: "Write CSS using CSS Grid to create a responsive product card grid that automatically fits columns with `auto-fit`, a minimum column width of `280px`, and a 1fr maximum, with consistent gap and card elevation styling.",
    concepts: ["CSS Grid", "repeat(auto-fit, minmax())", "gap", "box-shadow"],
    requirements: [
      "Use `display: grid` with `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))`",
      "Apply a `gap` of `1.5rem` between grid items",
      "Style individual `.card` items with clean borders, rounded corners (`8px`), and subtle hover box-shadow transition"
    ],
    constraints: [
      "No media queries required for column wrapping (rely on CSS Grid auto-fit)",
      "Use modern CSS properties and smooth transitions"
    ],
    examples: [
      {
        input: ".grid-container { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }",
        output: "Fluid multi-column layout adapting seamlessly across screen sizes."
      }
    ],
    starterCode: `/* Fluid Responsive Grid & Card Styling */
.grid-container {
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
  }
];
