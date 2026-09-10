// ==========================================
// JAVASCRIPT BEGINNER -> LEVEL 1 (20 Questions)
// Gentle, confidence-building difficulty progression
// ==========================================
export const jsBeginnerLevel1Questions = [
  {
    id: "js-beg-l1-q01",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 1,
    type: "BUILD",
    title: "Declare and Return a Greeting",
    description: "Write a function `getGreeting()` that returns the exact string 'Hello, World!'. This introduces functions and return values in JavaScript.",
    concepts: ["function", "return", "strings"],
    requirements: [
      "Define a function named `getGreeting`",
      "Return the string `'Hello, World!'`"
    ],
    constraints: ["Return exact casing and punctuation"],
    examples: [
      {
        input: "getGreeting()",
        output: "'Hello, World!'"
      }
    ],
    starterCode: `/**
 * Returns a simple greeting message.
 * @returns {string} 'Hello, World!'
 */
function getGreeting() {
  // Write your solution here
  
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
    id: "js-beg-l1-q02",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 2,
    type: "BUILD",
    title: "Personalized Greeting with Template Literals",
    description: "Write a function `greetUser(name)` that takes a person's name as a parameter and returns a personalized greeting in the format `Hello, [name]!`.",
    concepts: ["function parameters", "template literals", "string interpolation"],
    requirements: [
      "Take a single string parameter `name`",
      "Return `'Hello, ' + name + '!'` or use template literals `` `Hello, ${name}!` ``"
    ],
    constraints: ["`name` is guaranteed to be a non-empty string"],
    examples: [
      {
        input: "greetUser('Alex')",
        output: "'Hello, Alex!'"
      }
    ],
    starterCode: `/**
 * Returns a personalized greeting for the given user.
 * @param {string} name
 * @returns {string}
 */
function greetUser(name) {
  // Write your solution here
  
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
    id: "js-beg-l1-q03",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 3,
    type: "BUILD",
    title: "Basic Addition of Two Numbers",
    description: "Write a function `addNumbers(a, b)` that takes two numeric arguments and returns their mathematical sum.",
    concepts: ["numbers", "addition operator (+)", "arithmetic"],
    requirements: [
      "Accept two number parameters `a` and `b`",
      "Return the sum `a + b`"
    ],
    constraints: ["Inputs are valid finite numbers"],
    examples: [
      {
        input: "addNumbers(5, 7)",
        output: "12"
      }
    ],
    starterCode: `/**
 * Adds two numbers together.
 * @param {number} a
 * @param {number} b
 * @returns {number}
 */
function addNumbers(a, b) {
  // Write your solution here
  
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
    id: "js-beg-l1-q04",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 4,
    type: "BUILD",
    title: "Check Even or Odd with Remainder Operator",
    description: "Write a function `isEven(num)` that returns `true` if a number is even, and `false` if it is odd, using the modulo `%` operator.",
    concepts: ["modulo operator (%)", "booleans", "equality (===)"],
    requirements: [
      "Return `true` if `num % 2 === 0`",
      "Return `false` otherwise"
    ],
    constraints: ["`num` is an integer"],
    examples: [
      {
        input: "isEven(4)",
        output: "true"
      },
      {
        input: "isEven(7)",
        output: "false"
      }
    ],
    starterCode: `/**
 * Checks if a number is even.
 * @param {number} num
 * @returns {boolean}
 */
function isEven(num) {
  // Write your solution here
  
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
    id: "js-beg-l1-q05",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 5,
    type: "BUILD",
    title: "Simple if Condition: Age Verification",
    description: "Write a function `isAdult(age)` that checks if a person is 18 years or older.",
    concepts: ["if condition", "comparison operator (>=)"],
    requirements: [
      "Return `true` if `age` is 18 or greater",
      "Return `false` if `age` is under 18"
    ],
    constraints: ["`age` is a non-negative number"],
    examples: [
      {
        input: "isAdult(20)",
        output: "true"
      },
      {
        input: "isAdult(16)",
        output: "false"
      }
    ],
    starterCode: `/**
 * Checks if the given age is 18 or older.
 * @param {number} age
 * @returns {boolean}
 */
function isAdult(age) {
  // Write your solution here
  
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
    id: "js-beg-l1-q06",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 6,
    type: "BUILD",
    title: "if...else Decision: Pass or Fail",
    description: "Write a function `getExamResult(score)` that returns `'PASS'` if `score` is 50 or above, and `'FAIL'` otherwise.",
    concepts: ["if...else", "string return values"],
    requirements: [
      "Return `'PASS'` if `score >= 50`",
      "Return `'FAIL'` if `score < 50`"
    ],
    constraints: ["`score` is a number between 0 and 100"],
    examples: [
      {
        input: "getExamResult(75)",
        output: "'PASS'"
      },
      {
        input: "getExamResult(42)",
        output: "'FAIL'"
      }
    ],
    starterCode: `/**
 * Evaluates pass or fail based on exam score.
 * @param {number} score
 * @returns {string} 'PASS' or 'FAIL'
 */
function getExamResult(score) {
  // Write your solution here
  
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
    id: "js-beg-l1-q07",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 7,
    type: "BUILD",
    title: "Strict Equality vs Loose Comparison",
    description: "Write a function `isStrictlyEqual(a, b)` that checks if two values are equal in both value and type using the strict equality operator `===`.",
    concepts: ["strict equality (===)", "type comparison"],
    requirements: [
      "Use `===` to compare `a` and `b`",
      "Return `true` if both type and value match, `false` otherwise"
    ],
    constraints: ["Do not use `==`"],
    examples: [
      {
        input: "isStrictlyEqual(5, '5')",
        output: "false // number vs string"
      },
      {
        input: "isStrictlyEqual(5, 5)",
        output: "true"
      }
    ],
    starterCode: `/**
 * Checks strict equality between two values.
 * @param {*} a
 * @param {*} b
 * @returns {boolean}
 */
function isStrictlyEqual(a, b) {
  // Write your solution here
  
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
    id: "js-beg-l1-q08",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 8,
    type: "BUILD",
    title: "Calculate Rectangle Area",
    description: "Write a function `calculateArea(width, height)` that computes and returns the area of a rectangle (`width * height`). If either dimension is 0 or negative, return 0.",
    concepts: ["multiplication", "guard clauses", "logical OR (||)"],
    requirements: [
      "Return `width * height`",
      "If `width <= 0` or `height <= 0`, return `0`"
    ],
    constraints: ["Inputs are numbers"],
    examples: [
      {
        input: "calculateArea(5, 10)",
        output: "50"
      },
      {
        input: "calculateArea(-3, 10)",
        output: "0"
      }
    ],
    starterCode: `/**
 * Calculates rectangle area with positive dimension guard.
 * @param {number} width
 * @param {number} height
 * @returns {number}
 */
function calculateArea(width, height) {
  // Write your solution here
  
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
    id: "js-beg-l1-q09",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 9,
    type: "BUILD",
    title: "Array Indexing: First and Last Elements",
    description: "Write a function `getFirstAndLast(arr)` that returns a new array containing only the first element and the last element of the input array.",
    concepts: ["arrays", "indexing [0]", "array.length - 1"],
    requirements: [
      "Access the first element using `arr[0]`",
      "Access the last element using `arr[arr.length - 1]`",
      "Return `[first, last]`",
      "If `arr` has only 1 element, return `[item, item]`"
    ],
    constraints: ["`arr` contains at least 1 element"],
    examples: [
      {
        input: "getFirstAndLast([10, 20, 30, 40])",
        output: "[10, 40]"
      }
    ],
    starterCode: `/**
 * Returns an array containing the first and last elements.
 * @param {Array} arr
 * @returns {Array} [first, last]
 */
function getFirstAndLast(arr) {
  // Write your solution here
  
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
    id: "js-beg-l1-q10",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 10,
    type: "BUILD",
    title: "Basic for Loop: Summing Array Numbers",
    description: "Write a function `sumArray(numbers)` that calculates the sum of all numbers in an array using a standard `for` loop.",
    concepts: ["for loop", "accumulator variable", "array iteration"],
    requirements: [
      "Initialize an accumulator variable `let total = 0`",
      "Loop through the array with `for (let i = 0; i < numbers.length; i++)`",
      "Return the accumulated sum",
      "Return `0` if `numbers` is empty"
    ],
    constraints: ["Do not use external libraries"],
    examples: [
      {
        input: "sumArray([1, 2, 3, 4, 5])",
        output: "15"
      },
      {
        input: "sumArray([])",
        output: "0"
      }
    ],
    starterCode: `/**
 * Sums all numbers in the given array using a loop.
 * @param {number[]} numbers
 * @returns {number}
 */
function sumArray(numbers) {
  // Write your solution here
  
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
    id: "js-beg-l1-q11",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 11,
    type: "BUILD",
    title: "Array Mutation: push and pop",
    description: "Write a function `manageQueue(queue, newGuest)` that adds `newGuest` to the end of the array using `push`, and removes the first guest using `shift`. Return the name of the removed guest.",
    concepts: ["array.push()", "array.shift()"],
    requirements: [
      "Add `newGuest` to the end of `queue`",
      "Remove the first guest at the front of `queue`",
      "Return the removed guest's name"
    ],
    constraints: ["`queue` has at least 1 existing guest"],
    examples: [
      {
        input: "manageQueue(['Alice', 'Bob'], 'Charlie')",
        output: "'Alice' // Alice removed, queue is now ['Bob', 'Charlie']"
      }
    ],
    starterCode: `/**
 * Adds newGuest to end and returns the removed first guest.
 * @param {string[]} queue
 * @param {string} newGuest
 * @returns {string} The removed guest
 */
function manageQueue(queue, newGuest) {
  // Write your solution here
  
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
    id: "js-beg-l1-q12",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 12,
    type: "BUILD",
    title: "Count Positive Numbers in an Array",
    description: "Write a function `countPositives(nums)` that counts and returns how many numbers in the array are strictly greater than 0.",
    concepts: ["loop", "conditional counting", "nums[i] > 0"],
    requirements: [
      "Iterate over `nums`",
      "Increment a count for each number where `num > 0`",
      "Return the total count"
    ],
    constraints: ["Array can contain positive, negative, and zero values"],
    examples: [
      {
        input: "countPositives([-2, 0, 5, 8, -1, 3])",
        output: "3 // (5, 8, 3)"
      }
    ],
    starterCode: `/**
 * Counts how many numbers are strictly positive (> 0).
 * @param {number[]} nums
 * @returns {number}
 */
function countPositives(nums) {
  // Write your solution here
  
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
    id: "js-beg-l1-q13",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 13,
    type: "BUILD",
    title: "Object Property Access",
    description: "Write a function `getUserSummary(user)` that reads an object with properties `{ name, age, city }` and returns a formatted string: `'[name] is [age] years old and lives in [city].'`",
    concepts: ["objects", "property access (.prop)", "string templates"],
    requirements: [
      "Access `user.name`, `user.age`, and `user.city`",
      "Return the exact sentence format: `'[name] is [age] years old and lives in [city].'`"
    ],
    constraints: ["`user` object contains name, age, and city"],
    examples: [
      {
        input: "getUserSummary({ name: 'Sarah', age: 28, city: 'Boston' })",
        output: "'Sarah is 28 years old and lives in Boston.'"
      }
    ],
    starterCode: `/**
 * Formats a user summary string from an object.
 * @param {{ name: string, age: number, city: string }} user
 * @returns {string}
 */
function getUserSummary(user) {
  // Write your solution here
  
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
    id: "js-beg-l1-q14",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 14,
    type: "BUILD",
    title: "Object Property Modification",
    description: "Write a function `addOnlineStatus(user, isOnline)` that adds an `isOnline` boolean property to the given user object and updates their `lastSeen` timestamp to `'now'`. Return the modified object.",
    concepts: ["object mutation", "adding properties", "return object"],
    requirements: [
      "Set `user.isOnline = isOnline`",
      "Set `user.lastSeen = 'now'`",
      "Return the updated `user` object"
    ],
    constraints: ["Mutates or copies the input user object"],
    examples: [
      {
        input: "addOnlineStatus({ id: 'u1', name: 'Alex' }, true)",
        output: "{ id: 'u1', name: 'Alex', isOnline: true, lastSeen: 'now' }"
      }
    ],
    starterCode: `/**
 * Adds isOnline and lastSeen properties to user object.
 * @param {object} user
 * @param {boolean} isOnline
 * @returns {object}
 */
function addOnlineStatus(user, isOnline) {
  // Write your solution here
  
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
    id: "js-beg-l1-q15",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 15,
    type: "BUILD",
    title: "String Methods: Clean and Format Username",
    description: "Write a function `cleanUsername(rawInput)` that trims leading/trailing whitespace and converts the username to lowercase.",
    concepts: ["string.trim()", "string.toLowerCase()"],
    requirements: [
      "Use `.trim()` to remove excess spaces from both ends",
      "Use `.toLowerCase()` to make the string lowercase",
      "Return the cleaned username string"
    ],
    constraints: ["`rawInput` is a string"],
    examples: [
      {
        input: "cleanUsername('   AlexDev99   ')",
        output: "'alexdev99'"
      }
    ],
    starterCode: `/**
 * Trims whitespace and lowercases the username.
 * @param {string} rawInput
 * @returns {string}
 */
function cleanUsername(rawInput) {
  // Write your solution here
  
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
    id: "js-beg-l1-q16",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 16,
    type: "DEBUG",
    title: "Fix Off-by-One Loop Bug",
    description: "The function `calculateAverage(numbers)` fails on array loops with an `undefined` error because the loop index uses `<= numbers.length`. Fix the off-by-one boundary error.",
    concepts: ["off-by-one bug", "loop condition (i < length)", "array bounds"],
    requirements: [
      "Fix loop condition to `i < numbers.length`",
      "Calculate and return the correct arithmetic average",
      "Handle empty array input by returning 0"
    ],
    constraints: ["Preserve all other function logic"],
    examples: [
      {
        input: "calculateAverage([10, 20, 30])",
        output: "20"
      }
    ],
    starterCode: `/**
 * FIX THE OFF-BY-ONE LOOP BUG:
 */
function calculateAverage(numbers) {
  if (numbers.length === 0) return 0;

  let total = 0;
  // BUG: '<=' causes accessing numbers[numbers.length] which is undefined
  for (let i = 0; i <= numbers.length; i++) {
    total += numbers[i];
  }

  return total / numbers.length;
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
    id: "js-beg-l1-q17",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 17,
    type: "DEBUG",
    title: "Fix Undefined Variable Scope Bug",
    description: "The function `formatScore(points)` tries to return a variable `message` that was declared inside a block scope. Fix the variable scope so `message` is accessible to the return statement.",
    concepts: ["variable scope (let / const)", "block scope"],
    requirements: [
      "Declare `message` in the function scope",
      "Assign appropriate string based on score threshold",
      "Return the formatted message"
    ],
    constraints: ["Do not use `var`"],
    examples: [
      {
        input: "formatScore(85)",
        output: "'Great job!'"
      }
    ],
    starterCode: `/**
 * FIX THE SCOPING ERROR:
 * 'message' is not defined outside the if block.
 */
function formatScore(points) {
  if (points >= 80) {
    let message = "Great job!";
  } else {
    let message = "Keep practicing!";
  }

  // BUG: ReferenceError: message is not defined
  return message;
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
    id: "js-beg-l1-q18",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 18,
    type: "COMPLETE",
    title: "Complete Find Maximum Number Function",
    description: "Fill in the missing loop body to find and return the largest number in an array.",
    concepts: ["find max algorithm", "comparison in loop"],
    requirements: [
      "Initialize `max` with `numbers[0]`",
      "Loop through numbers and update `max` if `numbers[i] > max`",
      "Return the largest number"
    ],
    constraints: ["`numbers` has at least 1 element"],
    examples: [
      {
        input: "findMax([3, 7, 2, 9, 4])",
        output: "9"
      }
    ],
    starterCode: `function findMax(numbers) {
  let max = numbers[0];

  // TODO: Loop through array and update max whenever a larger number is found
  for (let i = 1; i < numbers.length; i++) {
    
  }

  return max;
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
    id: "js-beg-l1-q19",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 19,
    type: "REFACTOR",
    title: "Refactor Nested Conditions to Clean Switch or Lookup",
    description: "The function `getDiscountRate(tier)` uses deeply nested `if/else` statements for simple string matching. Refactor to a clean `switch` statement or lookup object.",
    concepts: ["switch statement", "lookup table", "code readability"],
    requirements: [
      "Return `0.20` for `'gold'` tier",
      "Return `0.10` for `'silver'` tier",
      "Return `0.05` for `'bronze'` tier",
      "Return `0` for any other tier"
    ],
    constraints: ["Preserve exact return decimal rates"],
    examples: [
      {
        input: "getDiscountRate('gold')",
        output: "0.2"
      }
    ],
    starterCode: `/**
 * REFACTOR THIS NESTED MESS TO A CLEAN SWITCH OR LOOKUP TABLE:
 */
function getDiscountRate(tier) {
  if (tier === "gold") {
    return 0.20;
  } else {
    if (tier === "silver") {
      return 0.10;
    } else {
      if (tier === "bronze") {
        return 0.05;
      } else {
        return 0;
      }
    }
  }
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
    estimatedTime: 5
  },
  {
    id: "js-beg-l1-q20",
    technology: "JavaScript",
    difficulty: "Beginner",
    level: 1,
    questionNumber: 20,
    type: "BUILD",
    title: "Level 1 Capstone: Shopping Cart Simple Sum",
    description: "Synthesize all Level 1 concepts (functions, arrays, objects, loops, arithmetic, guard checks) to calculate the subtotal of items in a shopping cart.",
    concepts: ["arrays of objects", "for loop", "arithmetic multiplication", "guard clauses"],
    requirements: [
      "Each item in `cart` is an object `{ price: number, quantity: number }`",
      "Calculate item total as `item.price * item.quantity`",
      "Sum all item totals and return the final total number",
      "If `cart` is empty or invalid, return `0`"
    ],
    constraints: ["All prices and quantities are positive numbers"],
    examples: [
      {
        input: "calculateSubtotal([{ price: 10, quantity: 2 }, { price: 25, quantity: 1 }])",
        output: "45 // (10*2) + (25*1)"
      }
    ],
    starterCode: `/**
 * LEVEL 1 JAVASCRIPT CAPSTONE:
 * Calculates total cost of items in cart.
 * @param {Array<{ price: number, quantity: number }>} cart
 * @returns {number}
 */
function calculateSubtotal(cart) {
  // Write your solution here
  
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

// ==========================================
// JAVASCRIPT MEDIUM -> LEVEL 2 (Advanced Topics: Closures, Event Loop, Async/Await, etc.)
// ==========================================
export const jsMediumLevel2Questions = [
  {
    id: "js-med-l2-q01",
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: 1,
    type: "BUILD",
    title: "Implement Robust Deep Clone",
    description: "Write a function `deepClone(value)` that creates a true deep copy of any JavaScript object or array. It must handle nested objects, arrays, Date instances, RegExp instances, and primitives without retaining references to the original object.",
    concepts: ["deep copy", "recursion", "type checking", "Date/RegExp cloning"],
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
    concepts: ["event loop", "microtasks vs macrotasks", "Promise.then", "queueMicrotask", "setTimeout"],
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
    concepts: ["async/await", "Promise.all", "error handling", "refactoring callbacks"],
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
    concepts: ["defensive programming", "loop indexing", "percentage arithmetic", "precision rounding"],
    requirements: [
      "Calculate subtotal as `(price * quantity) * (1 - (discount || 0))` for each item",
      "Handle empty or null cart inputs gracefully by returning `\"0.00\"`",
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
    concepts: ["LRU Cache", "Map iteration order", "O(1) data structures", "eviction strategy"],
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
    concepts: ["hash map lookup", "O(N) time complexity", "algorithm optimization"],
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
    concepts: ["interval arithmetic", "boundary conditions", "strict inequalities (< vs <=)"],
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

// Generate slots 8-20 for JavaScript Medium Level 2
for (let i = 8; i <= 20; i++) {
  const types = ["BUILD", "DEBUG", "REFACTOR", "COMPLETE", "PREDICT", "OPTIMIZE", "FIND_THE_BUG"];
  const type = types[(i - 1) % types.length];
  jsMediumLevel2Questions.push({
    id: `js-med-l2-q${String(i).padStart(2, "0")}`,
    technology: "JavaScript",
    difficulty: "Medium",
    level: 2,
    questionNumber: i,
    type: type,
    title: `JavaScript Challenge ${String(i).padStart(2, "0")}: ${type === "DEBUG" ? "Fix Async Generator" : type === "PREDICT" ? "Scope & Closure Execution" : type === "BUILD" ? "Custom EventEmitter" : "Data Pipeline"}`,
    description: `Evaluate JavaScript problem-solving skills with a focus on clean structure, error handling, and performance optimization for challenge ${i}.`,
    concepts: ["ES6+", "data structures", "async processing", "closures"],
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

export const javascriptQuestions = [
  ...jsBeginnerLevel1Questions,
  ...jsMediumLevel2Questions
];
