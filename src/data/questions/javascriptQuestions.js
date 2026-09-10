export const javascriptQuestions = [
  {
    id: "js-med-l2-q01",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 1,
    type: "BUILD",
    title: "Implement Robust Deep Clone",
    description: "Write a function `deepClone(value)` that creates a true deep copy of any JavaScript object or array. It must handle nested objects, arrays, Date instances, RegExp instances, and primitives without retaining references to the original object.",
    requirements: [
      "Return a deep copy of nested plain objects and arrays",
      "Correctly duplicate Date instances with independent timestamps",
      "Correctly duplicate RegExp instances with same source and flags",
      "Preserve primitive values (numbers, strings, booleans, null, undefined)",
      "Do not use JSON.parse(JSON.stringify(obj)) to avoid losing Dates, RegExps, or undefined"
    ],
    constraints: [
      "Input depth will not exceed 20 levels",
      "Circular references will not be tested in Level 2",
      "Functions inside objects should be copied by reference"
    ],
    examples: [
      {
        input: "const original = { a: 1, b: { c: new Date('2025-01-01') }, d: [1, 2] };\nconst copy = deepClone(original);\ncopy.b.c.setFullYear(2026);",
        output: "original.b.c.getFullYear() === 2025 // original unchanged"
      }
    ],
    starterCode: `/**
 * Creates a deep copy of the given object or primitive.
 * @param {*} obj - The value to clone.
 * @returns {*} The deep cloned copy.
 */
function deepClone(obj) {
  // Write your solution here
  
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 12
  },
  {
    id: "js-med-l2-q02",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 2,
    type: "PREDICT",
    title: "Event Loop & Microtask Execution Order",
    description: "Analyze the code snippet below and predict the exact order of console output strings. Pay close attention to synchronous execution, Promise microtasks, `queueMicrotask`, and `setTimeout` macrotasks.",
    requirements: [
      "Determine the exact sequence of printed statements (1 to 6)",
      "Select the correct output sequence from the options",
      "Provide a concise explanation of how the microtask queue behaves before the next macrotask runs"
    ],
    constraints: [
      "Code is executed in a standard ECMAScript / Node.js 18+ environment",
      "Timers fire with default 0ms delay"
    ],
    examples: [
      {
        input: `console.log("1: start");

setTimeout(() => {
  console.log("2: timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3: promise 1");
}).then(() => {
  console.log("4: promise 2");
});

queueMicrotask(() => {
  console.log("5: microtask");
});

console.log("6: end");`,
        output: "Order: 1: start -> 6: end -> 3: promise 1 -> 5: microtask -> 4: promise 2 -> 2: timeout"
      }
    ],
    starterCode: `// PREDICT Question: Code is provided in the problem panel.
// Select your answer and provide your reasoning in the right panel.`,
    predictConfig: {
      snippet: `console.log("1: start");

setTimeout(() => {
  console.log("2: timeout");
}, 0);

Promise.resolve().then(() => {
  console.log("3: promise 1");
}).then(() => {
  console.log("4: promise 2");
});

queueMicrotask(() => {
  console.log("5: microtask");
});

console.log("6: end");`,
      answerType: "choice",
      options: [
        {
          id: "opt-a",
          label: "1: start → 6: end → 3: promise 1 → 5: microtask → 4: promise 2 → 2: timeout",
          isCorrect: true
        },
        {
          id: "opt-b",
          label: "1: start → 6: end → 2: timeout → 3: promise 1 → 5: microtask → 4: promise 2",
          isCorrect: false
        },
        {
          id: "opt-c",
          label: "1: start → 3: promise 1 → 4: promise 2 → 5: microtask → 6: end → 2: timeout",
          isCorrect: false
        },
        {
          id: "opt-d",
          label: "1: start → 6: end → 5: microtask → 3: promise 1 → 2: timeout → 4: promise 2",
          isCorrect: false
        }
      ],
      requireExplanation: true,
      explanationPrompt: "Explain the priority between synchronous calls, microtasks (Promise.then, queueMicrotask), and macrotasks (setTimeout)."
    },
    evaluationCriteria: {
      correctnessWeight: 60,
      qualityWeight: 10,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 8
  },
  {
    id: "js-med-l2-q03",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 3,
    type: "REFACTOR",
    title: "Refactor Nested Callback Chain to Async/Await",
    description: "The existing implementation uses outdated deeply nested callbacks to fetch user data, permissions, and settings sequentially with duplicated error handling. Refactor this to clean, modern `async/await` syntax with proper unified try/catch error propagation and parallel optimization where independent.",
    requirements: [
      "Convert the callback-based `loadUserProfile(userId, callback)` into a Promise-returning `async function loadUserProfile(userId)`",
      "Fetch user permissions and user settings concurrently with `Promise.all` after obtaining the user object",
      "Combine results into `{ user, permissions, settings }`",
      "Throw descriptive custom errors if `userId` is invalid or any fetch rejects"
    ],
    constraints: [
      "Assume helper functions `fetchUser(id)`, `fetchPermissions(role)`, and `fetchSettings(id)` return Promises",
      "Do not use nested callbacks",
      "Maintain exact return structure: `{ user, permissions, settings, loadedAt: string }`"
    ],
    examples: [
      {
        input: "const profile = await loadUserProfile('usr_448');",
        output: "{ user: { id: 'usr_448', role: 'admin' }, permissions: ['read', 'write'], settings: { theme: 'dark' }, loadedAt: '2026-09-10T...' }"
      }
    ],
    starterCode: `/**
 * REFACTOR THIS CODE:
 * Convert nested callback spaghetti to clean modern async/await with Promise.all.
 */

// Legacy mock helpers (already return Promises in runtime):
// const fetchUser = async (id) => ({ id, name: "Alex", role: "admin" });
// const fetchPermissions = async (role) => ["read", "write", "deploy"];
// const fetchSettings = async (id) => ({ theme: "system", emailNotifications: true });

async function loadUserProfile(userId) {
  if (!userId) {
    throw new Error("User ID is required");
  }

  // Refactor below to fetch user, then fetch permissions & settings in parallel:
  const user = await fetchUser(userId);
  
  // TODO: Run fetchPermissions(user.role) and fetchSettings(userId) concurrently
  const [permissions, settings] = await Promise.all([
    fetchPermissions(user.role),
    fetchSettings(userId)
  ]);

  return {
    user,
    permissions,
    settings,
    loadedAt: new Date().toISOString()
  };
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 40,
      qualityWeight: 25,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 10
  },
  {
    id: "js-med-l2-q04",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 4,
    type: "DEBUG",
    title: "Fix the Shopping Cart Calculator",
    description: "The following implementation should calculate the final price of a shopping cart, but it contains several critical bugs including off-by-one loops, improper discount logic, unhandled empty carts, and floating point tax precision. Fix the implementation while preserving the intended behavior.",
    requirements: [
      "Calculate subtotal as `(price * quantity) * (1 - (discount || 0))` for each item",
      "Handle empty or null cart inputs gracefully by returning `0.00`",
      "If discounted subtotal >= $50, shipping is free ($0), otherwise shipping is fixed at $7.50",
      "Calculate 8.5% sales tax on the discounted subtotal (tax = subtotal * 0.085)",
      "Return total = `subtotal + tax + shipping` formatted to 2 decimal places as a string (e.g. '54.25')"
    ],
    constraints: [
      "Each item: `{ price: number, quantity: number, discount?: number }`",
      "Discounts are fractions (e.g. 0.10 for 10% off)",
      "Must not throw when cart has 0 items or invalid properties"
    ],
    examples: [
      {
        input: "calculateCartTotal([{ price: 25, quantity: 2, discount: 0.1 }])",
        output: "\"56.33\" // subtotal: $45.00, tax: $3.83, shipping: $7.50, total: 56.33"
      },
      {
        input: "calculateCartTotal([])",
        output: "\"0.00\""
      }
    ],
    starterCode: `/**
 * FIX THE BUGS IN THIS FUNCTION:
 * Contains: Off-by-one loop index, discount subtraction bug, missing empty cart check,
 * shipping threshold logic error, and unrounded return value.
 */
function calculateCartTotal(cart) {
  // BUG 1: Missing guard for empty/null cart
  let subtotal = 0;
  
  // BUG 2: Off-by-one loop causes undefined error
  for (let i = 0; i <= cart.length; i++) {
    // BUG 3: Incorrect discount formula (subtracting fraction instead of percentage multiplier)
    const item = cart[i];
    const itemTotal = item.price * item.quantity - item.discount;
    subtotal += itemTotal;
  }

  // BUG 4: Free shipping should be >= 50, but checks <= 50
  const shipping = subtotal <= 50 ? 0 : 7.50;
  
  // Tax calculation
  const tax = subtotal * 0.085;
  
  // BUG 5: Returns raw float number instead of 2-decimal string
  return subtotal + tax + shipping;
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 12
  },
  {
    id: "js-med-l2-q05",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 5,
    type: "COMPLETE",
    title: "Complete the LRU Cache with O(1) Operations",
    description: "Fill in the missing implementation for a Least Recently Used (LRU) Cache class with specified capacity. Both `get` and `put` operations must execute in O(1) average time complexity.",
    requirements: [
      "Initialize LRUCache with positive `capacity`",
      "`get(key)` returns the value if key exists and marks it as most recently used; otherwise returns -1",
      "`put(key, value)` inserts or updates the key-value pair. If capacity is exceeded, evict the least recently used key before inserting"
    ],
    constraints: [
      "Capacity is between 1 and 1000",
      "Operations must run in O(1) time using a Map or Doubly Linked List"
    ],
    examples: [
      {
        input: "const cache = new LRUCache(2);\ncache.put(1, 1);\ncache.put(2, 2);\ncache.get(1); // returns 1\ncache.put(3, 3); // evicts key 2\ncache.get(2); // returns -1",
        output: "get(1) -> 1, get(2) -> -1"
      }
    ],
    starterCode: `class LRUCache {
  /**
   * @param {number} capacity
   */
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  /**
   * @param {number} key
   * @return {number}
   */
  get(key) {
    if (!this.cache.has(key)) return -1;
    
    // TODO: Refresh key order to mark as most recently used
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);
    return value;
  }

  /**
   * @param {number} key
   * @param {number} value
   * @return {void}
   */
  put(key, value) {
    // TODO: Complete put logic including eviction when capacity is exceeded
    if (this.cache.has(key)) {
      this.cache.delete(key);
    } else if (this.cache.size >= this.capacity) {
      // Evict least recently used (first item in Map keys)
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
    this.cache.set(key, value);
  }
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 45,
      qualityWeight: 20,
      structureWeight: 15,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 15
  },
  {
    id: "js-med-l2-q06",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 6,
    type: "OPTIMIZE",
    title: "Optimize Quadratic Two-Sum to Linear Time",
    description: "The current implementation finds two indices whose elements sum to `target` using a brute-force nested loop taking O(N^2) time. Optimize the algorithm to run in O(N) time and O(N) space using an efficient hash map lookup.",
    requirements: [
      "Return indices `[i, j]` of the two numbers such that `nums[i] + nums[j] === target`",
      "Each input has exactly one valid solution",
      "You may not use the same element twice",
      "Reduce time complexity from O(N^2) to O(N)"
    ],
    constraints: [
      "2 <= nums.length <= 10^5",
      "-10^9 <= nums[i] <= 10^9"
    ],
    examples: [
      {
        input: "twoSumOptimized([2, 7, 11, 15], 9)",
        output: "[0, 1]"
      }
    ],
    starterCode: `/**
 * OPTIMIZE THIS O(N^2) ALGORITHM TO O(N):
 */
function twoSumOptimized(nums, target) {
  // BRUTE FORCE O(N^2) - Replace with Map/Object lookup:
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 25,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 5
    },
    estimatedTime: 10
  },
  {
    id: "js-med-l2-q07",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 7,
    type: "FIND_THE_BUG",
    title: "Find Edge Case Bug in Time Range Overlap",
    description: "The function `areIntervalsOverlapping(rangeA, rangeB)` tests whether two time intervals overlap. It works on basic cases but fails on zero-length intervals and boundary inclusivity. Find and fix the subtle logic error.",
    requirements: [
      "Intervals overlap if they share any non-zero duration in common",
      "Adjacent intervals that only touch at boundaries (e.g. [10, 12] and [12, 14]) should NOT be considered overlapping",
      "Interval format: `{ start: number, end: number }` where `start < end`",
      "Return `true` if overlapping, `false` otherwise"
    ],
    constraints: [
      "Timestamps are non-negative numbers",
      "Return boolean"
    ],
    examples: [
      {
        input: "areIntervalsOverlapping({ start: 9, end: 11 }, { start: 11, end: 13 })",
        output: "false // Touching at 11 does not overlap"
      },
      {
        input: "areIntervalsOverlapping({ start: 9, end: 12 }, { start: 10, end: 14 })",
        output: "true"
      }
    ],
    starterCode: `/**
 * FIND AND FIX THE EDGE-CASE BUG:
 * Touching boundaries are incorrectly returning true.
 */
function areIntervalsOverlapping(rangeA, rangeB) {
  // Bug: uses '<=' instead of '<' for strict boundary comparison
  return rangeA.start < rangeB.end && rangeB.start < rangeA.end;
}
`,
    predictConfig: null,
    evaluationCriteria: {
      correctnessWeight: 55,
      qualityWeight: 15,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 8
  }
];

// Generate placeholder questions 08-20 for Level 2 JavaScript to fill the 20-slot system
for (let i = 8; i <= 20; i++) {
  const types = ["BUILD", "DEBUG", "REFACTOR", "COMPLETE", "PREDICT", "OPTIMIZE", "FIND_THE_BUG"];
  const type = types[(i - 1) % types.length];
  javascriptQuestions.push({
    id: `js-med-l2-q${String(i).padStart(2, "0")}`,
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: i,
    type: type,
    title: `JavaScript Challenge ${String(i).padStart(2, "0")}: ${type === "DEBUG" ? "Fix Async Generator" : type === "PREDICT" ? "Scope & Closure Execution" : type === "BUILD" ? "Custom EventEmitter" : "Data Pipeline"}`,
    description: `Evaluate JavaScript problem-solving skills with a focus on clean structure, error handling, and performance optimization for challenge ${i}.`,
    requirements: [
      "Implement the specified interface cleanly",
      "Write concise, idiomatic modern JavaScript",
      "Ensure proper handling of edge cases and invalid inputs"
    ],
    constraints: [
      "ES2022+ syntax supported",
      "Execution time limit: 2000ms"
    ],
    examples: [
      {
        input: `solution(${i})`,
        output: `true`
      }
    ],
    starterCode: `function solution(input) {\n  // Implement challenge ${i} solution\n  return true;\n}\n`,
    predictConfig: type === "PREDICT" ? {
      snippet: `let count = ${i};\nfunction step() { count++; return count; }\nconsole.log(step());`,
      answerType: "choice",
      options: [
        { id: "opt-1", label: `${i + 1}`, isCorrect: true },
        { id: "opt-2", label: `${i}`, isCorrect: false },
        { id: "opt-3", label: "undefined", isCorrect: false }
      ],
      requireExplanation: true,
      explanationPrompt: "Describe variable closure state preservation."
    } : null,
    evaluationCriteria: {
      correctnessWeight: 50,
      qualityWeight: 20,
      structureWeight: 10,
      readabilityWeight: 10,
      bestPracticesWeight: 10
    },
    estimatedTime: 12
  });
}
