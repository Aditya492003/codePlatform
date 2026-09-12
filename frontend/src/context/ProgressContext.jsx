import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import { userService } from '../services/userService';
import { apiRequest } from '../services/api';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const { user: clerkUser, isLoaded } = useUser();

  const [selectedTech, setSelectedTech] = useState('JavaScript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Beginner');
  const [selectedLevel, setSelectedLevel] = useState(1);

  // Live User States synchronized with MongoDB Atlas
  const [userProfile, setUserProfile] = useState(null);
  const [userRating, setUserRating] = useState(750);
  const [solvedCount, setSolvedCount] = useState(0);
  const [submissions, setSubmissions] = useState([]);
  const [tier, setTier] = useState('Bronze');
  const [skillRatings, setSkillRatings] = useState({
    JavaScript: 750,
    HTML: 750,
    CSS: 750,
  });
  const [difficultyProgress, setDifficultyProgress] = useState({
    Beginner: { completed: 0, total: 20, percentage: 0 },
    Medium: { completed: 0, total: 20, percentage: 0 },
    Advanced: { completed: 0, total: 20, percentage: 0 },
    Expert: { completed: 0, total: 20, percentage: 0 },
  });
  const [ratingHistory, setRatingHistory] = useState([
    { date: 'Initial', rating: 750 },
  ]);

  // Map of question status: 'locked' | 'available' | 'in_progress' | 'submitted'
  const [questionStatuses, setQuestionStatuses] = useState(() => {
    const initialMap = {};
    for (let i = 1; i <= 20; i++) {
      const qId = `js-beg-l1-q${String(i).padStart(2, '0')}`;
      initialMap[qId] = i === 1 ? 'available' : 'locked';
    }
    return initialMap;
  });

  const [completedEvaluations, setCompletedEvaluations] = useState({});

  /**
   * Fetch live profile and user submissions from MongoDB Atlas
   */
  const refreshUserProfile = useCallback(async () => {
    const userId = clerkUser?.id || 'usr_guest';

    try {
      // 1. Sync Clerk user to Atlas if authenticated
      if (clerkUser) {
        await userService.syncUser({
          clerkId: clerkUser.id,
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
          fullName: clerkUser.fullName || '',
          avatarUrl: clerkUser.imageUrl || '',
          username: clerkUser.username || clerkUser.firstName || 'developer',
        });
      }

      // 2. Fetch live profile
      const profile = await userService.getUserProfile(userId);
      if (profile) {
        setUserProfile(profile);
        setUserRating(profile.overallRating || 750);
        setSolvedCount(profile.problemsSolved || 0);
        setTier(profile.tier || 'Bronze');
        if (profile.skillRatings) setSkillRatings(profile.skillRatings);
        if (profile.difficultyProgress) setDifficultyProgress(profile.difficultyProgress);
        if (profile.ratingHistory?.length) setRatingHistory(profile.ratingHistory);
      }

      // 3. Fetch user past submissions
      try {
        const subsRes = await apiRequest(`/submissions/user/${userId}`);
        if (subsRes?.data) {
          setSubmissions(subsRes.data);
        }
      } catch (err) {
        console.warn('Submissions fetch error:', err.message);
      }
    } catch (err) {
      console.warn('Refresh user profile error:', err.message);
    }
  }, [clerkUser]);

  useEffect(() => {
    if (isLoaded) {
      refreshUserProfile();
    }
  }, [isLoaded, clerkUser, refreshUserProfile]);

  /**
   * Unlock next question & sync state immediately when a solution is submitted
   */
  const handleQuestionSubmitted = (questionId, questionNumber, evaluation, updatedUser = null) => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      updated[questionId] = 'submitted';

      const nextNum = questionNumber + 1;
      if (nextNum <= 20) {
        const techPrefix = selectedTech === 'JavaScript' ? 'js' : selectedTech.toLowerCase();
        const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
        const nextId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q${String(nextNum).padStart(2, '0')}`;

        if (!updated[nextId] || updated[nextId] === 'locked') {
          updated[nextId] = 'available';
        }
      }
      return updated;
    });

    setCompletedEvaluations((prev) => ({
      ...prev,
      [questionId]: evaluation,
    }));

    // If updatedUser object is provided from Atlas, sync directly
    if (updatedUser) {
      setUserProfile(updatedUser);
      setUserRating(updatedUser.overallRating || userRating);
      setSolvedCount(updatedUser.problemsSolved || solvedCount);
      setTier(updatedUser.tier || tier);
      if (updatedUser.skillRatings) setSkillRatings(updatedUser.skillRatings);
      if (updatedUser.difficultyProgress) setDifficultyProgress(updatedUser.difficultyProgress);
      if (updatedUser.ratingHistory) setRatingHistory(updatedUser.ratingHistory);
    } else if (evaluation?.ratingDelta?.change) {
      setUserRating((prev) => prev + evaluation.ratingDelta.change);
      if (evaluation.status === 'Accepted') {
        setSolvedCount((prev) => prev + 1);
      }
    }

    if (evaluation) {
      setSubmissions((prev) => [
        {
          id: evaluation.submissionId || `sub_${Date.now()}`,
          questionId,
          questionTitle: evaluation.questionTitle || `Question ${String(questionNumber).padStart(2, '0')}`,
          technology: selectedTech,
          difficulty: selectedDifficulty,
          level: selectedLevel,
          score: evaluation.overallScore,
          classification: evaluation.classification,
          ratingChange: evaluation.ratingDelta?.change || 0,
          submittedAt: 'Just now',
        },
        ...prev,
      ]);
    }
  };

  const isQuestionAccessible = (qId) => {
    const status = questionStatuses[qId];
    return status === 'available' || status === 'in_progress' || status === 'submitted';
  };

  const getQuestionStatus = (qId, questionNum) => {
    return questionStatuses[qId] || (questionNum === 1 ? 'available' : 'locked');
  };

  return (
    <ProgressContext.Provider
      value={{
        selectedTech,
        setSelectedTech,
        selectedDifficulty,
        setSelectedDifficulty,
        selectedLevel,
        setSelectedLevel,
        userProfile,
        userRating,
        solvedCount,
        tier,
        skillRatings,
        difficultyProgress,
        ratingHistory,
        submissions,
        questionStatuses,
        completedEvaluations,
        isQuestionAccessible,
        getQuestionStatus,
        handleQuestionSubmitted,
        setQuestionStatuses,
        refreshUserProfile,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}
