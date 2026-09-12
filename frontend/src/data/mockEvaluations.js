export const mockTestSuites = {
  "html-beg-l1-q01": [
    {
      id: "tc-1",
      name: "Contains top-level <h1> element with heading text",
      status: "passed",
      duration: "0.4ms",
      input: "document.querySelector('h1')?.textContent",
      expected: "\"Welcome to My Website\"",
      actual: "\"Welcome to My Website\""
    },
    {
      id: "tc-2",
      name: "Contains <p> element with paragraph description",
      status: "passed",
      duration: "0.3ms",
      input: "document.querySelectorAll('p').length >= 1",
      expected: "true",
      actual: "true"
    },
    {
      id: "tc-3",
      name: "Valid HTML tag pairing without unclosed tags",
      status: "passed",
      duration: "0.2ms",
      input: "validateHTMLStructure(code)",
      expected: "valid",
      actual: "valid"
    }
  ],
  "html-beg-l1-q02": [
    {
      id: "tc-1",
      name: "Contains <h1> for document title",
      status: "passed",
      duration: "0.3ms",
      input: "document.querySelector('h1')?.textContent",
      expected: "\"Learning Web Development\"",
      actual: "\"Learning Web Development\""
    },
    {
      id: "tc-2",
      name: "Contains <h2> subheading without skipped levels",
      status: "passed",
      duration: "0.3ms",
      input: "document.querySelector('h2')?.textContent",
      expected: "\"Why HTML Matters\"",
      actual: "\"Why HTML Matters\""
    },
    {
      id: "tc-3",
      name: "Includes paragraphs under both heading tiers",
      status: "passed",
      duration: "0.4ms",
      input: "document.querySelectorAll('p').length >= 2",
      expected: "true",
      actual: "true"
    }
  ],
  "html-beg-l1-q03": [
    {
      id: "tc-1",
      name: "Contains <h2> heading 'My Skills'",
      status: "passed",
      duration: "0.3ms",
      input: "document.querySelector('h2')?.textContent",
      expected: "\"My Skills\"",
      actual: "\"My Skills\""
    },
    {
      id: "tc-2",
      name: "Uses unordered list <ul> with at least 3 <li> items",
      status: "passed",
      duration: "0.4ms",
      input: "document.querySelectorAll('ul > li').length >= 3",
      expected: "true",
      actual: "true"
    }
  ],
  "css-beg-l1-q01": [
    {
      id: "tc-1",
      name: "h1 element receives specified text color rule",
      status: "passed",
      duration: "0.4ms",
      input: "getComputedStyle(h1).color",
      expected: "rgb(37, 99, 235)",
      actual: "rgb(37, 99, 235)"
    },
    {
      id: "tc-2",
      name: "p paragraph receives slate text color rule",
      status: "passed",
      duration: "0.3ms",
      input: "getComputedStyle(p).color",
      expected: "rgb(71, 85, 105)",
      actual: "rgb(71, 85, 105)"
    }
  ],
  "js-beg-l1-q01": [
    {
      id: "tc-1",
      name: "getGreeting() returns 'Hello, World!'",
      status: "passed",
      duration: "0.3ms",
      input: "getGreeting()",
      expected: "\"Hello, World!\"",
      actual: "\"Hello, World!\""
    }
  ],
  "js-med-l2-q04": [
    {
      id: "tc-1",
      name: "Calculates single item without discount",
      status: "passed",
      duration: "1.2ms",
      input: "calculateCartTotal([{ price: 20, quantity: 2 }])",
      expected: "\"50.90\"",
      actual: "\"50.90\""
    },
    {
      id: "tc-2",
      name: "Applies item percentage discount correctly",
      status: "passed",
      duration: "0.8ms",
      input: "calculateCartTotal([{ price: 25, quantity: 2, discount: 0.1 }])",
      expected: "\"56.33\"",
      actual: "\"56.33\""
    },
    {
      id: "tc-3",
      name: "Awards free shipping for discounted subtotal >= $50",
      status: "passed",
      duration: "1.0ms",
      input: "calculateCartTotal([{ price: 30, quantity: 2 }])",
      expected: "\"65.10\"",
      actual: "\"65.10\""
    },
    {
      id: "tc-4",
      name: "Handles empty cart safely returning '0.00'",
      status: "passed",
      duration: "0.4ms",
      input: "calculateCartTotal([])",
      expected: "\"0.00\"",
      actual: "\"0.00\""
    },
    {
      id: "tc-5",
      name: "Handles multiple items with mixed discounts",
      status: "passed",
      duration: "1.4ms",
      input: "calculateCartTotal([{ price: 10, quantity: 1 }, { price: 40, quantity: 1, discount: 0.25 }])",
      expected: "\"50.90\"",
      actual: "\"50.90\""
    },
    {
      id: "tc-6",
      name: "Precision floating point check with repeating decimals",
      status: "passed",
      duration: "0.9ms",
      input: "calculateCartTotal([{ price: 19.99, quantity: 3, discount: 0.15 }])",
      expected: "\"62.77\"",
      actual: "\"62.77\""
    }
  ]
};

export const defaultMockEvaluation = {
  overallScore: 92,
  classification: "Excellent",
  totalPossibleScore: 100,
  testsPassed: 4,
  totalTests: 4,
  breakdown: {
    correctness: { score: 50, max: 50, label: "Correctness" },
    codeQuality: { score: 18, max: 20, label: "Code Quality" },
    structure: { score: 9, max: 10, label: "Structure" },
    readability: { score: 9, max: 10, label: "Readability" },
    bestPractices: { score: 6, max: 10, label: "Best Practices" }
  },
  aiReview: {
    strengths: [
      "Clean tag closing and semantic element hierarchy",
      "Proper indentation and readable document structure",
      "Accurate attribute placement"
    ],
    improvements: [
      "Continue practicing sequential heading level progression",
      "Ensure all non-text elements include descriptive labels or alt text"
    ]
  },
  ratingDelta: {
    previous: 784,
    current: 791,
    change: 7
  }
};
