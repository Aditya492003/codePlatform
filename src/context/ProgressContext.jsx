import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUser } from '../data/mockUser';
import { questionService } from '../services/questionService';

const ProgressContext = createContext(null);

export function ProgressProvider({ children }) {
  const [selectedTech, setSelectedTech] = useState('JavaScript');
  const [selectedDifficulty, setSelectedDifficulty] = useState('Medium');
  const [selectedLevel, setSelectedLevel] = useState(2);
  const [userRating, setUserRating] = useState(mockUser.overallRating);
  const [submissions, setSubmissions] = useState(mockUser.recentSubmissions);
  const [solvedCount, setSolvedCount] = useState(mockUser.problemsSolved);

  // Map of question status: 'locked' | 'available' | 'in_progress' | 'submitted'
  // Question 01 is available by default; 02-20 are locked
  const [questionStatuses, setQuestionStatuses] = useState(() => {
    const initialMap = {};
    for (let i = 1; i <= 20; i++) {
      const qId = `js-med-l2-q${String(i).padStart(2, '0')}`;
      if (i === 1) {
        initialMap[qId] = 'available';
      } else {
        initialMap[qId] = 'locked';
      }
    }
    return initialMap;
  });

  // Stored evaluation results per question ID
  const [completedEvaluations, setCompletedEvaluations] = useState({});

  /**
   * Unlock next question when a question is submitted
   */
  const handleQuestionSubmitted = (questionId, questionNumber, evaluation) => {
    setQuestionStatuses((prev) => {
      const updated = { ...prev };
      updated[questionId] = 'submitted';

      // Unlock next question if it exists
      const nextNum = questionNumber + 1;
      if (nextNum <= 20) {
        // Construct next question id
        const techPrefix = selectedTech === 'JavaScript' ? 'js' : selectedTech.toLowerCase();
        const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
        const nextId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q${String(nextNum).padStart(2, '0')}`;
        
        if (!updated[nextId] || updated[nextId] === 'locked') {
          updated[nextId] = 'available';
        }
      }
      return updated;
    });

    // Save evaluation
    setCompletedEvaluations((prev) => ({
      ...prev,
      [questionId]: evaluation
    }));

    // Update rating & stats
    if (evaluation?.ratingDelta?.change) {
      setUserRating((prev) => prev + evaluation.ratingDelta.change);
    }
    setSolvedCount((prev) => prev + 1);

    // Add to submissions history
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
          ratingChange: evaluation.ratingDelta?.change || 7,
          submittedAt: 'Just now'
        },
        ...prev
      ]);
    }
  };

  /**
   * Check if a specific question is accessible (submitted or available)
   */
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
        userRating,
        solvedCount,
        submissions,
        questionStatuses,
        completedEvaluations,
        isQuestionAccessible,
        getQuestionStatus,
        handleQuestionSubmitted,
        setQuestionStatuses
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
