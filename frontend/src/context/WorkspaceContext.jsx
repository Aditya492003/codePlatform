import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/clerk-react';
import { questionService, cleanCodeString } from '../services/questionService';
import { evaluationService } from '../services/evaluationService';
import { submissionService } from '../services/submissionService';
import { useProgress } from './ProgressContext';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const { user: clerkUser } = useUser();
  const {
    selectedTech,
    selectedDifficulty,
    selectedLevel,
    getQuestionStatus,
    handleQuestionSubmitted,
    completedEvaluations,
  } = useProgress();

  // Current question data
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);

  // In-memory code drafts per question ID
  const [codeDrafts, setCodeDrafts] = useState({});

  // In-memory PREDICT answers per question ID
  const [predictAnswers, setPredictAnswers] = useState({});

  // Workspace state: 'ready' | 'editing' | 'running' | 'test_results' | 'submitting' | 'evaluated' | 'completed'
  const [workspaceState, setWorkspaceState] = useState('ready');

  // Test suite execution results
  const [testResults, setTestResults] = useState(null);

  // Final evaluation result
  const [evaluation, setEvaluation] = useState(null);

  // Inline notice
  const [noticeMessage, setNoticeMessage] = useState(null);
  const noticeTimeoutRef = useRef(null);

  // Timer state - does NOT auto-start until user begins coding!
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [hasStartedCoding, setHasStartedCoding] = useState(false);
  const timerIntervalRef = useRef(null);

  // Last completed attempt metrics for AI adaptation
  const [lastAttemptMetrics, setLastAttemptMetrics] = useState(null);

  // Active code in editor
  const currentCode = currentQuestion
    ? cleanCodeString(codeDrafts[currentQuestion.id] ?? currentQuestion.starterCode ?? '')
    : '';

  // Active PREDICT state
  const currentPredict = currentQuestion
    ? predictAnswers[currentQuestion.id] ?? { selectedOptionId: null, explanation: '' }
    : { selectedOptionId: null, explanation: '' };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setTimerSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    }
    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [isTimerRunning]);

  /**
   * Explicitly starts the coding session and runs the clock
   */
  const startCodingSession = () => {
    if (!hasStartedCoding) {
      setHasStartedCoding(true);
      setIsTimerRunning(true);
      if (workspaceState === 'ready') {
        setWorkspaceState('editing');
      }
    }
  };

  /**
   * Load a specific question into workspace
   */
  const loadQuestion = async (questionId, performanceContext = null) => {
    setIsLoadingQuestion(true);
    setNoticeMessage(null);
    setIsTimerRunning(false);
    setHasStartedCoding(false);
    setTimerSeconds(0);

    try {
      let q;
      if (performanceContext) {
        q = await questionService.getAdaptiveNextQuestion({
          technology: selectedTech,
          difficulty: selectedDifficulty,
          level: selectedLevel,
          questionNumber: performanceContext.questionNumber || 1,
          userId: clerkUser?.id || 'usr_guest',
          performanceContext,
        });
      } else {
        q = await questionService.getQuestionById(questionId);
      }

      setCurrentQuestion(q);

      const isSubmitted =
        completedEvaluations[q.id] || getQuestionStatus(q.id, q.questionNumber) === 'submitted';

      if (isSubmitted) {
        setWorkspaceState('completed');
        setEvaluation(completedEvaluations[q.id] || null);
        setIsTimerRunning(false);
        setHasStartedCoding(true);
      } else {
        setWorkspaceState('ready');
        setEvaluation(null);
        setTestResults(null);
        setTimerSeconds(0);
        setIsTimerRunning(false);
        setHasStartedCoding(false);
      }

      setCodeDrafts((prev) => {
        if (prev[q.id] === undefined) {
          return { ...prev, [q.id]: q.starterCode || '' };
        }
        return prev;
      });
    } catch (err) {
      console.error('Failed to load question:', err);
    } finally {
      setIsLoadingQuestion(false);
    }
  };

  /**
   * Update code draft in memory & start clock if user starts typing
   */
  const updateCode = (newCode) => {
    if (!currentQuestion) return;

    if (!hasStartedCoding) {
      setHasStartedCoding(true);
      setIsTimerRunning(true);
    }

    setCodeDrafts((prev) => ({
      ...prev,
      [currentQuestion.id]: newCode,
    }));
    if (workspaceState === 'ready') {
      setWorkspaceState('editing');
    }
  };

  /**
   * Update PREDICT question choice and explanation
   */
  const updatePredictAnswer = (optionId, explanation) => {
    if (!currentQuestion) return;

    if (!hasStartedCoding) {
      setHasStartedCoding(true);
      setIsTimerRunning(true);
    }

    setPredictAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedOptionId:
          optionId !== undefined ? optionId : prev[currentQuestion.id]?.selectedOptionId,
        explanation:
          explanation !== undefined ? explanation : prev[currentQuestion.id]?.explanation || '',
      },
    }));
    if (workspaceState === 'ready') {
      setWorkspaceState('editing');
    }
  };

  /**
   * Reset code back to original starter code
   */
  const resetCode = () => {
    if (!currentQuestion) return;
    setCodeDrafts((prev) => ({
      ...prev,
      [currentQuestion.id]: currentQuestion.starterCode || '',
    }));
  };

  /**
   * Run Code (Unit tests only via live Groq AI AST scanner)
   */
  const runCode = async () => {
    if (!currentQuestion) return;
    setWorkspaceState('running');
    setNoticeMessage(null);

    try {
      const results = await evaluationService.runTests(currentQuestion.id, currentCode, currentQuestion);
      setTestResults(results);
      setWorkspaceState('test_results');
    } catch (err) {
      console.error('Test run failed:', err);
      setWorkspaceState('editing');
    }
  };

  /**
   * Submit Challenge with real Groq AI verification and live User Sync
   */
  const submitSolution = async () => {
    if (!currentQuestion) return;
    setWorkspaceState('submitting');
    setIsTimerRunning(false);
    setNoticeMessage(null);

    const elapsedSeconds = timerSeconds;

    try {
      const evalResult = await submissionService.submitAttempt(
        currentQuestion.id,
        currentCode,
        elapsedSeconds,
        currentPredict,
        currentQuestion,
        clerkUser?.id || 'usr_guest',
        clerkUser
          ? {
              email: clerkUser.primaryEmailAddress?.emailAddress || '',
              fullName: clerkUser.fullName || '',
              username: clerkUser.username || clerkUser.firstName || 'developer',
              avatarUrl: clerkUser.imageUrl || '',
            }
          : null
      );

      evalResult.questionTitle = currentQuestion.title;

      setEvaluation(evalResult);
      setWorkspaceState('evaluated');

      setLastAttemptMetrics({
        previousTimeSeconds: elapsedSeconds,
        previousScore: evalResult.overallScore,
        previousQuestionTitle: currentQuestion.title,
      });

      handleQuestionSubmitted(
        currentQuestion.id,
        currentQuestion.questionNumber,
        evalResult,
        evalResult.updatedUser
      );
    } catch (err) {
      console.error('Submission failed:', err);
      setWorkspaceState('editing');
      setIsTimerRunning(true);
    }
  };

  const showNotice = (msg) => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setNoticeMessage(msg);
    noticeTimeoutRef.current = setTimeout(() => {
      setNoticeMessage(null);
    }, 3500);
  };

  const clearNotice = () => {
    if (noticeTimeoutRef.current) clearTimeout(noticeTimeoutRef.current);
    setNoticeMessage(null);
  };

  return (
    <WorkspaceContext.Provider
      value={{
        currentQuestion,
        isLoadingQuestion,
        currentCode,
        currentPredict,
        workspaceState,
        testResults,
        evaluation,
        timerSeconds,
        isTimerRunning,
        hasStartedCoding,
        noticeMessage,
        lastAttemptMetrics,
        startCodingSession,
        loadQuestion,
        updateCode,
        updatePredictAnswer,
        resetCode,
        runCode,
        submitSolution,
        showNotice,
        clearNotice,
      }}
    >
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error('useWorkspace must be used within a WorkspaceProvider');
  }
  return context;
}
