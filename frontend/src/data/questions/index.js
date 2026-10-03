export const TECHNOLOGIES = ['HTML', 'CSS', 'JavaScript'];
export const DIFFICULTIES = ['Beginner', 'Medium', 'Advanced', 'Expert'];
export const LEVELS = [1, 2, 3, 4];
export const TOTAL_QUESTIONS_PER_LEVEL = 20;

/**
 * Question types supported by the platform
 */
export const QUESTION_TYPES = {
  BUILD: {
    label: 'BUILD',
    description: 'Write a solution from scratch',
    color: '#0284c7' // sky-600
  },
  CODING: {
    label: 'CODING',
    description: 'Write functional code implementation',
    color: '#0284c7' // sky-600
  },
  DEBUG: {
    label: 'DEBUG',
    description: 'Identify and fix broken implementation',
    color: '#dc2626' // red-600
  },
  FIX_CODE: {
    label: 'FIX CODE',
    description: 'Fix subtle syntax or logic issues',
    color: '#dc2626' // red-600
  },
  REFACTOR: {
    label: 'REFACTOR',
    description: 'Improve code structure while preserving behavior',
    color: '#d97706' // amber-600
  },
  COMPLETE: {
    label: 'COMPLETE',
    description: 'Fill in missing implementation parts',
    color: '#7c3aed' // violet-600
  },
  PREDICT: {
    label: 'PREDICT',
    description: 'Analyze code and predict execution output',
    color: '#059669' // emerald-600
  },
  PREDICT_OUTPUT: {
    label: 'PREDICT OUTPUT',
    description: 'Analyze execution and predict console output',
    color: '#059669' // emerald-600
  },
  MCQ: {
    label: 'MULTIPLE CHOICE',
    description: 'Select the single correct choice',
    color: '#4f46e5' // indigo-600
  },
  OPTIMIZE: {
    label: 'OPTIMIZE',
    description: 'Improve algorithmic time and space complexity',
    color: '#ea580c' // orange-600
  },
  FIND_THE_BUG: {
    label: 'FIND THE BUG',
    description: 'Identify subtle edge-case failure',
    color: '#e11d48' // rose-600
  }
};
