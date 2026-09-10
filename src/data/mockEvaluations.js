export const mockTestSuites = {
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
  overallScore: 86,
  classification: "Excellent",
  totalPossibleScore: 100,
  testsPassed: 8,
  totalTests: 8,
  breakdown: {
    correctness: { score: 46, max: 50, label: "Correctness" },
    codeQuality: { score: 16, max: 20, label: "Code Quality" },
    structure: { score: 9, max: 10, label: "Structure" },
    readability: { score: 8, max: 10, label: "Readability" },
    bestPractices: { score: 7, max: 10, label: "Best Practices" }
  },
  aiReview: {
    strengths: [
      "Clear function naming and intentional variable scope",
      "Proper defensive handling of empty and boundary inputs",
      "Appropriate use of array methods instead of imperative index mutations"
    ],
    improvements: [
      "Extract repeated tax rounding logic into a single dedicated helper function",
      "Improve edge-case handling for zero or negative item quantities",
      "Reduce unnecessary nesting inside loop accumulators"
    ]
  },
  ratingDelta: {
    previous: 784,
    current: 791,
    change: 7
  }
};
