/**
 * Default clean initial user state for new / unauthenticated users.
 * Live user state is fetched from Clerk and MongoDB Atlas backend.
 */
export const mockUser = {
  id: "usr_guest",
  username: "developer",
  fullName: "New Developer",
  title: "Frontend Engineer",
  avatarUrl: "",
  overallRating: 750,
  problemsSolved: 0,
  accuracy: 100.0,
  averageCodeQuality: 85.0,
  joinedDate: "Recently",
  skillRatings: {
    JavaScript: 750,
    HTML: 750,
    CSS: 750,
  },
  difficultyProgress: {
    Beginner: { completed: 0, total: 20, percentage: 0 },
    Medium: { completed: 0, total: 20, percentage: 0 },
    Advanced: { completed: 0, total: 20, percentage: 0 },
    Expert: { completed: 0, total: 20, percentage: 0 },
  },
  ratingHistory: [
    { date: "Day 1", rating: 750 }
  ],
  recentSubmissions: []
};
