import React from 'react';
import { ChevronLeft, ChevronRight, Check, Lock, Circle } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useProgress } from '../../context/ProgressContext';
import InlineNotice from '../common/InlineNotice';

export default function QuestionNavigator({ questions = [] }) {
  const {
    currentQuestion,
    workspaceState,
    loadQuestion,
    noticeMessage,
    showNotice,
    clearNotice
  } = useWorkspace();

  const {
    selectedTech,
    selectedDifficulty,
    selectedLevel,
    getQuestionStatus
  } = useProgress();

  const currentNum = currentQuestion?.questionNumber || 1;
  const isCurrentSubmitted = workspaceState === 'completed' || workspaceState === 'evaluated';

  // Find question ID by slot number
  const getQuestionIdByNumber = (num) => {
    const techPrefix = selectedTech === 'HTML' ? 'ht' : selectedTech === 'CSS' ? 'css' : 'js';
    const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
    return `${techPrefix}-${diffPrefix}-l${selectedLevel}-q${String(num).padStart(2, '0')}`;
  };

  const handleSelectQuestion = (num) => {
    const targetId = getQuestionIdByNumber(num);
    const status = getQuestionStatus(targetId, num);

    if (status === 'locked') {
      showNotice('Complete earlier challenges to unlock this question.');
      return;
    }

    if (num > currentNum && !isCurrentSubmitted) {
      showNotice('Complete this challenge before continuing.');
      return;
    }

    loadQuestion(targetId);
  };

  const handlePrev = () => {
    if (currentNum > 1) {
      handleSelectQuestion(currentNum - 1);
    }
  };

  const handleNext = () => {
    if (!isCurrentSubmitted) {
      showNotice('Complete this challenge before continuing.');
      return;
    }

    if (currentNum < 20) {
      handleSelectQuestion(currentNum + 1);
    }
  };

  return (
    <footer className="h-14 bg-white border-t border-slate-200 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 relative z-30">
      {/* Floating Inline Notice for Locked / Incomplete warning */}
      {noticeMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50">
          <InlineNotice message={noticeMessage} onDismiss={clearNotice} />
        </div>
      )}

      {/* Previous Button */}
      <button
        onClick={handlePrev}
        disabled={currentNum <= 1}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* 20 Progressive Slots */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[calc(100vw-220px)] sm:max-w-none px-2 py-1">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          const qId = getQuestionIdByNumber(num);
          const status = getQuestionStatus(qId, num);
          const isCurrent = currentNum === num;
          const isSubmitted = status === 'submitted';
          const isLocked = status === 'locked';

          let buttonClasses = 'w-7 sm:w-8 h-7 sm:h-8 rounded text-xs font-mono font-semibold flex items-center justify-center transition-all border ';

          if (isCurrent) {
            buttonClasses += 'bg-blue-50 text-blue-700 border-blue-500 ring-2 ring-blue-100';
          } else if (isSubmitted) {
            buttonClasses += 'bg-slate-50 text-emerald-600 border-slate-200 hover:bg-slate-100';
          } else if (!isLocked) {
            buttonClasses += 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50';
          } else {
            buttonClasses += 'bg-transparent text-slate-300 border-transparent hover:text-slate-400 cursor-not-allowed';
          }

          return (
            <button
              key={num}
              onClick={() => handleSelectQuestion(num)}
              className={buttonClasses}
              title={`Question ${String(num).padStart(2, '0')}: ${status}`}
            >
              {isSubmitted && !isCurrent ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : isLocked ? (
                <Lock className="w-3 h-3 text-slate-300" />
              ) : (
                <span>{String(num).padStart(2, '0')}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentNum >= 20 || !isCurrentSubmitted}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </footer>
  );
}
