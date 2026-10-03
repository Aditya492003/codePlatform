import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkspace } from '../context/WorkspaceContext';
import { useProgress } from '../context/ProgressContext';
import ChallengeHeader from '../components/workspace/ChallengeHeader';
import QuestionPanel from '../components/workspace/QuestionPanel';
import MonacoCodeEditor from '../components/workspace/MonacoCodeEditor';
import McqSelectionView from '../components/workspace/McqSelectionView';
import PredictAnswerView from '../components/workspace/PredictAnswerView';
import TestResults from '../components/workspace/TestResults';
import EvaluationPanel from '../components/workspace/EvaluationPanel';
import QuestionNavigator from '../components/workspace/QuestionNavigator';
import { Sparkles, Loader2, Cpu } from 'lucide-react';

export default function PracticeWorkspacePage() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const {
    currentQuestion,
    isLoadingQuestion,
    loadQuestion,
    workspaceState,
    evaluation,
    lastAttemptMetrics,
  } = useWorkspace();

  const {
    selectedTech,
    setSelectedTech,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedLevel,
    setSelectedLevel,
  } = useProgress();

  // Load question on mount or URL change
  useEffect(() => {
    let targetId = questionId;
    if (!targetId) {
      const techPrefix = selectedTech === 'HTML' ? 'ht' : selectedTech === 'CSS' ? 'css' : 'js';
      const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
      targetId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q01`;
    }
    loadQuestion(targetId);
  }, [questionId]);

  // Synchronize track selectors when a specific question is loaded
  useEffect(() => {
    if (currentQuestion) {
      if (currentQuestion.technology && currentQuestion.technology !== selectedTech) {
        setSelectedTech(currentQuestion.technology);
      }
      if (currentQuestion.difficulty && currentQuestion.difficulty !== selectedDifficulty) {
        setSelectedDifficulty(currentQuestion.difficulty);
      }
      if (currentQuestion.level && Number(currentQuestion.level) !== Number(selectedLevel)) {
        setSelectedLevel(Number(currentQuestion.level));
      }
    }
  }, [currentQuestion?.id]);

  if (isLoadingQuestion && !currentQuestion) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F8F9FA] text-slate-600 gap-4 p-6 text-center">
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 animate-pulse">
            <Cpu className="w-8 h-8" />
          </div>
          <Sparkles className="w-5 h-5 text-amber-400 absolute -top-1 -right-1 animate-bounce" />
        </div>
        <div className="flex flex-col items-center gap-1.5 max-w-sm">
          <h3 className="text-base font-bold text-slate-900">
            Loading Challenge
          </h3>
          <p className="text-xs text-slate-500">
            Preparing your challenge environment and verification test suite...
          </p>
        </div>
      </div>
    );
  }

  const isEvaluatedOrCompleted = workspaceState === 'evaluated' || workspaceState === 'completed';

  const handleContinueToNext = () => {
    if (!currentQuestion) return;
    const nextNum = currentQuestion.questionNumber + 1;
    if (nextNum <= 20) {
      const techPrefix = selectedTech === 'HTML' ? 'ht' : selectedTech === 'CSS' ? 'css' : 'js';
      const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
      const nextId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q${String(nextNum).padStart(2, '0')}`;
      navigate(`/practice/${nextId}`);
      loadQuestion(nextId, {
        questionNumber: nextNum,
        ...(lastAttemptMetrics || {}),
      });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] bg-[#F8F9FA] overflow-hidden">
      {/* Top Header */}
      <ChallengeHeader />

      {/* Main Single-Page 50/50 Workspace Body */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden border-b border-slate-200">
        {/* Left: Anti-Copy Question & Description Panel */}
        <div className="border-r border-slate-200 overflow-hidden flex flex-col bg-white">
          <QuestionPanel question={currentQuestion} />
        </div>

        {/* Right: Code Editor / MCQ View / Predict View / Evaluation View */}
        <div className="overflow-hidden flex flex-col bg-white">
          {isEvaluatedOrCompleted ? (
            <EvaluationPanel
              evaluation={evaluation}
              onContinue={currentQuestion?.questionNumber < 20 ? handleContinueToNext : null}
            />
          ) : currentQuestion?.type === 'MCQ' ? (
            <McqSelectionView isReadOnly={isEvaluatedOrCompleted} />
          ) : (currentQuestion?.type === 'PREDICT' || currentQuestion?.type === 'PREDICT_OUTPUT') ? (
            <PredictAnswerView isReadOnly={isEvaluatedOrCompleted} />
          ) : (
            <div className="flex-1 flex flex-col min-h-0">
              <MonacoCodeEditor
                language={currentQuestion?.technology}
                isReadOnly={isEvaluatedOrCompleted}
              />
              <TestResults />
            </div>
          )}
        </div>
      </div>

      {/* Progressive 20-Question Footer Navigation */}
      <QuestionNavigator />
    </div>
  );
}
