import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { questionService } from '../services/questionService';
import { evaluationService } from '../services/evaluationService';
import { submissionService } from '../services/submissionService';
import { useProgress } from './ProgressContext';

const WorkspaceContext = createContext(null);

export function WorkspaceProvider({ children }) {
  const {
    selectedTech,
    selectedDifficulty,
    selectedLevel,
    getQuestionStatus,
    handleQuestionSubmitted,
    completedEvaluations
  } = useProgress();

  // Current question data
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [isLoadingQuestion, setIsLoadingQuestion] = useState(true);

  // In-memory code drafts per question ID
  const [codeDrafts, setCodeDrafts] = useState({});

  // In-memory PREDICT answers per question ID: { selectedOptionId, explanation }
  const [predictAnswers, setPredictAnswers] = useState({});

  // Workspace state: 'ready' | 'editing' | 'running' | 'test_results' | 'submitting' | 'evaluated' | 'completed'
  const [workspaceState, setWorkspaceState] = useState('ready');

  // Test suite execution results (from Run Code)
  const [testResults, setTestResults] = useState(null);

  // Final evaluation result (from Submit)
  const [evaluation, setEvaluation] = useState(null);

  // Inline non-intrusive feedback notice (e.g. "Complete this challenge before continuing.")
  const [noticeMessage, setNoticeMessage] = useState(null);
  const noticeTimeoutRef = useRef(null);

  // Timer state
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef(null);

  // Active code in editor
  const currentCode = currentQuestion
    ? codeDrafts[currentQuestion.id] ?? currentQuestion.starterCode ?? ''
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
   * Load a specific question by ID into workspace
   */
  const loadQuestion = async (questionId) => {
    setIsLoadingQuestion(true);
    setNoticeMessage(null);

    try {
      const q = await questionService.getQuestionById(questionId);
      setCurrentQuestion(q);

      // Check if already submitted
      const isSubmitted = completedEvaluations[q.id] || getQuestionStatus(q.id, q.questionNumber) === 'submitted';

      if (isSubmitted) {
        setWorkspaceState('completed');
        setEvaluation(completedEvaluations[q.id] || null);
        setIsTimerRunning(false);
      } else {
        setWorkspaceState('ready');
        setEvaluation(null);
        setTestResults(null);
        // Start or resume timer
        setIsTimerRunning(true);
      }

      // Initialize code draft if empty
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
   * Update code draft in memory (preserves changes during navigation)
   */
  const updateCode = (newCode) => {
    if (!currentQuestion) return;
    setCodeDrafts((prev) => ({
      ...prev,
      [currentQuestion.id]: newCode
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
    setPredictAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: {
        selectedOptionId: optionId !== undefined ? optionId : prev[currentQuestion.id]?.selectedOptionId,
        explanation: explanation !== undefined ? explanation : prev[currentQuestion.id]?.explanation || ''
      }
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
      [currentQuestion.id]: currentQuestion.starterCode || ''
    }));
  };

  /**
   * Run Code (Unit tests only — does NOT submit, does NOT change rating, does NOT unlock)
   */
  const runCode = async () => {
    if (!currentQuestion) return;
    setWorkspaceState('running');
    setNoticeMessage(null);

    try {
      const results = await evaluationService.runTests(currentQuestion.id, currentCode);
      setTestResults(results);
      setWorkspaceState('test_results');
    } catch (err) {
      console.error('Test run failed:', err);
      setWorkspaceState('editing');
    }
  };

  /**
   * Submit Challenge (Evaluates, calculates scores & AI review, updates rating, marks submitted & unlocks next)
   */
  const submitSolution = async () => {
    if (!currentQuestion) return;
    setWorkspaceState('submitting');
    setIsTimerRunning(false);
    setNoticeMessage(null);

    try {
      const evalResult = await submissionService.submitAttempt(
        currentQuestion.id,
        currentCode,
        timerSeconds,
        currentPredict
      );

      // Attach question title for reference
      evalResult.questionTitle = currentQuestion.title;

      setEvaluation(evalResult);
      setWorkspaceState('evaluated');

      // Update progress state
      handleQuestionSubmitted(currentQuestion.id, currentQuestion.questionNumber, evalResult);
    } catch (err) {
      console.error('Submission failed:', err);
      setWorkspaceState('editing');
      setIsTimerRunning(true);
    }
  };

  /**
   * Display non-intrusive inline notice
   */
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
        noticeMessage,
        loadQuestion,
        updateCode,
        updatePredictAnswer,
        resetCode,
        runCode,
        submitSolution,
        showNotice,
        clearNotice
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
