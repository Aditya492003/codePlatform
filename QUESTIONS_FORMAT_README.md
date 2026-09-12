# 📋 Predefined Questions Format & AI Evaluator Guide

This document defines the standard schema for **predefined questions** across JavaScript, HTML, and CSS tracks. In this architecture, questions are predefined to guarantee curriculum accuracy, while the AI model is dedicated exclusively to **scanning submitted code, evaluating execution output, classifying performance, generating constructive code reviews, and updating user rating scores.**

---

## 🏗️ Architecture: Predefined Questions + AI Output Scanner

```
┌─────────────────────────┐       ┌─────────────────────────┐       ┌─────────────────────────┐
│   Predefined Question   │ ───>  │     User Code & Time    │ ───>  │   AI Code Evaluator     │
│  (DB / Pre-seeded JSON) │       │    (Monaco IDE Editor)  │       │  (Groq GPT-OSS-120B)    │
└─────────────────────────┘       └─────────────────────────┘       └───────────┬─────────────┘
                                                                                │
                                     ┌──────────────────────────────────────────┴───────────────┐
                                     ▼                                                          ▼
                    ┌─────────────────────────────────┐                       ┌─────────────────────────────────┐
                    │ 📊 Score & Classification        │                       │ 🔍 AI Output Scan & Review       │
                    │ • Overall Score (0-100)         │                       │ • Assertions (Pass/Fail)        │
                    │ • Class: Needs Work / Excellent │                       │ • What You Did Well (Strengths) │
                    │ • Platform Rating (+Δ Rating)   │                       │ • What Could Improve            │
                    └─────────────────────────────────┘                       └─────────────────────────────────┘
```

---

## 📐 Question Schema & Fields

| Field | Type | Allowed Values / Format | Description |
| :--- | :--- | :--- | :--- |
| `slug` | `String` | Unique string (e.g., `js-beg-l1-q01`, `cs-med-l2-q03`) | Unique question key in DB |
| `technology` | `String` | `"JavaScript"`, `"HTML"`, `"CSS"` | Programming track |
| `difficulty` | `String` | `"Beginner"`, `"Medium"`, `"Advanced"`, `"Expert"` | Difficulty bracket |
| `level` | `Number` | `1`, `2`, `3`, `4` | Progression level |
| `questionNumber` | `Number` | `1` to `10` | Order within the level |
| `type` | `String` | `"BUILD"`, `"PREDICT_OUTPUT"`, `"DEBUG"` | Challenge type |
| `title` | `String` | Text | Short, clear problem title |
| `description` | `String` | Text | High-level explanation of the problem |
| `concepts` | `Array<String>` | `["flexbox", "centering"]` | Tags displayed on challenge header |
| `requirements` | `Array<String>` | List of strings | Specific criteria the user's code must meet |
| `constraints` | `Array<String>` | List of strings | Execution rules, syntax constraints, or bounds |
| `starterCode` | `String` | Multi-line code string with `\n` | Initial code shown in the editor |
| `solutionCode` | `String` | Multi-line code string with `\n` | Reference solution used by AI scanner |
| `predictConfig` | `Object \| null` | `{ snippet, options, correctAnswer, explanation }` | Required only for `PREDICT_OUTPUT` |
| `evaluationCriteria` | `Object` | `{ correctnessWeight: 70, qualityWeight: 15, structureWeight: 15 }` | Scoring weights |
| `estimatedTime` | `Number` | Minutes (e.g., `4`, `5`, `10`) | Estimated completion time |
| `points` | `Number` | Points (e.g., `10`, `15`, `25`) | Max platform rating points awarded |

---

## 📑 Complete Question Examples

### 1. JavaScript (BUILD)
```json
{
  "slug": "js-beg-l1-q01",
  "technology": "JavaScript",
  "difficulty": "Beginner",
  "level": 1,
  "questionNumber": 1,
  "type": "BUILD",
  "title": "Calculate Discounted Price",
  "description": "Write a function `calculateDiscount(price, discountPercent)` that calculates and returns the final price after discount.",
  "concepts": ["functions", "arithmetic", "return"],
  "requirements": [
    "Define a function named `calculateDiscount(price, discountPercent)`",
    "Return the discounted price using formula: price - (price * discountPercent / 100)"
  ],
  "constraints": [
    "Must handle positive numeric inputs",
    "Return numeric output"
  ],
  "starterCode": "/**\n * Calculates discounted price\n * @param {number} price\n * @param {number} discountPercent\n * @returns {number}\n */\nfunction calculateDiscount(price, discountPercent) {\n  // Write your code here\n  \n}\n",
  "solutionCode": "function calculateDiscount(price, discountPercent) {\n  return price - (price * discountPercent / 100);\n}",
  "predictConfig": null,
  "evaluationCriteria": {
    "correctnessWeight": 70,
    "qualityWeight": 15,
    "structureWeight": 15
  },
  "estimatedTime": 4,
  "points": 10
}
```

---

### 2. CSS (BUILD)
```json
{
  "slug": "cs-beg-l1-q01",
  "technology": "CSS",
  "difficulty": "Beginner",
  "level": 1,
  "questionNumber": 1,
  "type": "BUILD",
  "title": "Style a Primary Action Button",
  "description": "Write CSS rules to style a `.primary-button` with a vibrant blue background, white text, padding, and smooth rounded corners.",
  "concepts": ["button styling", "padding", "border-radius", "colors"],
  "requirements": [
    "Target the selector `.primary-button`",
    "Set `background-color` to `#2563eb`",
    "Set `color` to `#ffffff` and `font-weight` to `600`",
    "Set `padding` to `12px 24px` and `border-radius` to `8px`",
    "Set `border` to `none`"
  ],
  "constraints": [
    "Use standard CSS syntax"
  ],
  "starterCode": "/* Style the .primary-button class below */\n.primary-button {\n  \n}\n",
  "solutionCode": ".primary-button {\n  background-color: #2563eb;\n  color: #ffffff;\n  font-weight: 600;\n  padding: 12px 24px;\n  border-radius: 8px;\n  border: none;\n  cursor: pointer;\n}",
  "predictConfig": null,
  "evaluationCriteria": {
    "correctnessWeight": 70,
    "qualityWeight": 15,
    "structureWeight": 15
  },
  "estimatedTime": 4,
  "points": 10
}
```

---

### 3. HTML (BUILD)
```json
{
  "slug": "ht-beg-l1-q01",
  "technology": "HTML",
  "difficulty": "Beginner",
  "level": 1,
  "questionNumber": 1,
  "type": "BUILD",
  "title": "Build a Semantic Profile Card",
  "description": "Construct semantic HTML5 markup for a user profile card with an article container, header, heading, and description.",
  "concepts": ["semantic HTML", "article", "header", "h2", "p"],
  "requirements": [
    "Use an `<article>` element with `class=\"profile-card\"` as root",
    "Inside `<article>`, include a `<header>` containing an `<h2>` heading",
    "Include a `<p>` paragraph for user bio description"
  ],
  "constraints": [
    "Use valid HTML5 tags"
  ],
  "starterCode": "<!-- Write your semantic profile card markup below -->\n<article class=\"profile-card\">\n  \n</article>\n",
  "solutionCode": "<article class=\"profile-card\">\n  <header>\n    <h2>Jane Doe</h2>\n  </header>\n  <p>Software Engineer and UI Architect.</p>\n</article>",
  "predictConfig": null,
  "evaluationCriteria": {
    "correctnessWeight": 70,
    "qualityWeight": 15,
    "structureWeight": 15
  },
  "estimatedTime": 4,
  "points": 10
}
```

---

### 4. PREDICT_OUTPUT Challenge
```json
{
  "slug": "js-med-l2-q01",
  "technology": "JavaScript",
  "difficulty": "Medium",
  "level": 2,
  "questionNumber": 1,
  "type": "PREDICT_OUTPUT",
  "title": "Microtask Queue Execution Sequence",
  "description": "Examine the JavaScript code snippet and determine the exact order in which logs appear in the console.",
  "concepts": ["event loop", "microtasks", "macrotasks", "Promise"],
  "requirements": [
    "Select the exact sequential console output"
  ],
  "constraints": [
    "Standard ECMAScript runtime environment"
  ],
  "starterCode": "",
  "solutionCode": "",
  "predictConfig": {
    "snippet": "console.log('A');\nsetTimeout(() => console.log('B'), 0);\nPromise.resolve().then(() => console.log('C'));\nconsole.log('D');",
    "options": [
      { "id": "opt-1", "label": "A, D, C, B", "isCorrect": true },
      { "id": "opt-2", "label": "A, B, C, D", "isCorrect": false },
      { "id": "opt-3", "label": "A, D, B, C", "isCorrect": false },
      { "id": "opt-4", "label": "C, A, D, B", "isCorrect": false }
    ],
    "correctAnswer": "A, D, C, B",
    "explanation": "Synchronous statements ('A', 'D') execute first. Then microtasks (`Promise.then` -> 'C') run before macrotasks (`setTimeout` -> 'B')."
  },
  "evaluationCriteria": {
    "correctnessWeight": 100,
    "qualityWeight": 0,
    "structureWeight": 0
  },
  "estimatedTime": 3,
  "points": 15
}
```

---

## 🤖 What the AI Evaluator Scans & Returns

When the user submits their code or output prediction, the backend sends the **predefined requirements**, **solution code**, and **user code** to the AI model. The AI scans the output and returns this structure:

```json
{
  "overallScore": 92,
  "classification": "Excellent",
  "status": "Accepted",
  "testsPassed": 2,
  "totalTests": 2,
  "breakdown": {
    "correctness": { "score": 48, "max": 50, "label": "Correctness" },
    "codeQuality": { "score": 18, "max": 20, "label": "Code Quality" },
    "structure": { "score": 9, "max": 10, "label": "Structure" },
    "readability": { "score": 9, "max": 10, "label": "Readability" },
    "bestPractices": { "score": 8, "max": 10, "label": "Best Practices" }
  },
  "tests": [
    {
      "id": "tc-1",
      "name": "Requirement & Return Check",
      "status": "passed",
      "input": "calculateDiscount(100, 20)",
      "expected": "80",
      "actual": "80",
      "error": ""
    }
  ],
  "aiReview": {
    "strengths": [
      "Accurate arithmetic implementation.",
      "Clean function signature matching requirements."
    ],
    "improvements": [
      "Consider adding defensive input validation for negative numbers."
    ]
  },
  "ratingDelta": {
    "previous": 750,
    "current": 758,
    "change": 8
  }
}
```

### Classification Scoring Thresholds
- **Score ≥ 90**: `"Perfect"` / `"Excellent"` (+8 Rating)
- **Score ≥ 70**: `"Proficient"` (+4 to +6 Rating)
- **Score ≥ 50**: `"Developing"` (+2 Rating)
- **Score < 50**: `"Needs Work"` (+0 Rating)
