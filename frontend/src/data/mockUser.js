export const mockUser = {
  id: "usr_alex_dev",
  username: "alex_chen",
  fullName: "Alex Chen",
  title: "Frontend Software Engineer",
  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  overallRating: 784,
  problemsSolved: 42,
  accuracy: 91.4,
  averageCodeQuality: 88.5,
  joinedDate: "January 2026",
  skillRatings: {
    JavaScript: 841,
    HTML: 720,
    CSS: 691
  },
  difficultyProgress: {
    Beginner: { completed: 20, total: 20, percentage: 100 },
    Medium: { completed: 14, total: 20, percentage: 70 },
    Advanced: { completed: 6, total: 20, percentage: 30 },
    Expert: { completed: 2, total: 20, percentage: 10 }
  },
  ratingHistory: [
    { date: "Aug 10", rating: 650 },
    { date: "Aug 16", rating: 672 },
    { date: "Aug 22", rating: 705 },
    { date: "Aug 28", rating: 730 },
    { date: "Sep 02", rating: 760 },
    { date: "Sep 06", rating: 778 },
    { date: "Sep 10", rating: 784 }
  ],
  recentSubmissions: [
    {
      id: "sub_101",
      questionId: "js-med-l2-q03",
      questionTitle: "Refactor Nested Callback Chain to Async/Await",
      technology: "JavaScript",
      difficulty: "Medium",
      level: 2,
      score: 92,
      classification: "Excellent",
      ratingChange: 8,
      submittedAt: "2 hours ago"
    },
    {
      id: "sub_102",
      questionId: "js-med-l2-q02",
      questionTitle: "Event Loop & Microtask Execution Order",
      technology: "JavaScript",
      difficulty: "Medium",
      level: 2,
      score: 100,
      classification: "Perfect",
      ratingChange: 12,
      submittedAt: "Yesterday"
    },
    {
      id: "sub_103",
      questionId: "js-med-l2-q01",
      questionTitle: "Implement Robust Deep Clone",
      technology: "JavaScript",
      difficulty: "Medium",
      level: 2,
      score: 86,
      classification: "Excellent",
      ratingChange: 7,
      submittedAt: "2 days ago"
    },
    {
      id: "sub_104",
      questionId: "css-beg-l1-q02",
      questionTitle: "Fix Sticky Header Stacking & Overflow Bug",
      technology: "CSS",
      difficulty: "Beginner",
      level: 1,
      score: 95,
      classification: "Excellent",
      ratingChange: 9,
      submittedAt: "3 days ago"
    }
  ]
};
