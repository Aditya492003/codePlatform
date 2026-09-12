import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useWorkspace } from '../context/WorkspaceContext';
import { useProgress } from '../context/ProgressContext';
import ChallengeHeader from '../components/workspace/ChallengeHeader';
import QuestionPanel from '../components/workspace/QuestionPanel';
import MonacoCodeEditor from '../components/workspace/MonacoCodeEditor';
import PredictAnswerView from '../components/workspace/PredictAnswerView';
import TestResults from '../components/workspace/TestResults';
import EvaluationPanel from '../components/workspace/EvaluationPanel';
import QuestionNavigator from '../components/workspace/QuestionNavigator';
import { Loader2 } from 'lucide-react';

export default function PracticeWorkspacePage() {
  const { questionId } = useParams();
  const navigate = useNavigate();

  const {
    currentQuestion,
    isLoadingQuestion,
    loadQuestion,
    workspaceState,
    evaluation
  } = useWorkspace();

  const {
    selectedTech,
    selectedDifficulty,
    selectedLevel
  } = useProgress();

  // Load question on mount or URL change
  useEffect(() => {
    let targetId = questionId;
    if (!targetId) {
      // Default to Question 01 of active selection
      const techPrefix = selectedTech === 'JavaScript' ? 'js' : selectedTech.toLowerCase();
      const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
      targetId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q01`;
    }
    loadQuestion(targetId);
  }, [questionId, selectedTech, selectedDifficulty, selectedLevel]);

  if (isLoadingQuestion && !currentQuestion) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#F8F9FA] text-slate-500 gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="text-sm font-medium">Loading challenge workspace...</span>
      </div>
    );
  }

  const isEvaluatedOrCompleted = workspaceState === 'evaluated' || workspaceState === 'completed';

  const handleContinueToNext = () => {
    if (!currentQuestion) return;
    const nextNum = currentQuestion.questionNumber + 1;
    if (nextNum <= 20) {
      const techPrefix = selectedTech === 'JavaScript' ? 'js' : selectedTech.toLowerCase();
      const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
      const nextId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q${String(nextNum).padStart(2, '0')}`;
      navigate(`/practice/${nextId}`);
      loadQuestion(nextId);
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

        {/* Right: Code Editor / Predict View / In-Place Transformed Evaluation View */}
        <div className="overflow-hidden flex flex-col bg-white">
          {isEvaluatedOrCompleted ? (
            <EvaluationPanel
              evaluation={evaluation}
              onContinue={currentQuestion?.questionNumber < 20 ? handleContinueToNext : null}
            />
          ) : currentQuestion?.type === 'PREDICT' ? (
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
