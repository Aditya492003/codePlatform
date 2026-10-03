import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Check, Circle } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useProgress } from '../../context/ProgressContext';
import InlineNotice from '../common/InlineNotice';

export default function QuestionNavigator({ questions = [] }) {
  const navigate = useNavigate();
  const {
    currentQuestion,
    loadQuestion,
    noticeMessage,
    clearNotice
  } = useWorkspace();

  const {
    selectedTech,
    selectedDifficulty,
    selectedLevel,
    getQuestionStatus
  } = useProgress();

  const currentNum = Number(currentQuestion?.questionNumber) || 1;

  // Find question ID by slot number
  const getQuestionIdByNumber = (num) => {
    const tech = (currentQuestion?.technology || selectedTech || 'HTML').toUpperCase();
    const diff = (currentQuestion?.difficulty || selectedDifficulty || 'Beginner').toLowerCase().slice(0, 3);
    const lvl = currentQuestion?.level || selectedLevel || 1;
    const techPrefix = tech === 'HTML' ? 'ht' : tech === 'CSS' ? 'css' : 'js';
    return `${techPrefix}-${diff}-l${lvl}-q${String(num).padStart(2, '0')}`;
  };

  const handleSelectQuestion = (num) => {
    console.log('clicked', num);
    try {
      console.log(`%c[QuestionNavigator] 👉 Clicked question #${num}`, 'color: #2563eb; font-weight: bold; font-size: 13px;');
      const targetId = getQuestionIdByNumber(num);
      console.log(`[QuestionNavigator] Target ID: "${targetId}"`, {
        tech: currentQuestion?.technology || selectedTech,
        diff: currentQuestion?.difficulty || selectedDifficulty,
        lvl: currentQuestion?.level || selectedLevel,
      });
      navigate(`/practice/${targetId}`);
      loadQuestion(targetId);
    } catch (err) {
      console.error('Error selecting question:', err);
    }
  };

  const handlePrev = () => {
    console.log('clicked prev');
    if (currentNum > 1) {
      handleSelectQuestion(currentNum - 1);
    }
  };

  const handleNext = () => {
    console.log('clicked next');
    if (currentNum < 20) {
      handleSelectQuestion(currentNum + 1);
    }
  };

  return (
    <footer className="h-14 bg-white border-t border-slate-200 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 relative z-30 pointer-events-auto select-none">
      {/* Floating Inline Notice */}
      {noticeMessage && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-50">
          <InlineNotice message={noticeMessage} onDismiss={clearNotice} />
        </div>
      )}

      {/* Previous Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentNum <= 1}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer pointer-events-auto"
      >
        <ChevronLeft className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* 20 Unlocked Question Slots */}
      <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto max-w-[calc(100vw-220px)] sm:max-w-none px-2 py-1 pointer-events-auto">
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => {
          const qId = getQuestionIdByNumber(num);
          const status = getQuestionStatus(qId, num);
          const isCurrent = Number(currentNum) === Number(num);
          const isSubmitted = status === 'submitted';

          let buttonClasses =
            'w-7 sm:w-8 h-7 sm:h-8 rounded-lg text-xs font-mono font-semibold flex items-center justify-center transition-all border cursor-pointer pointer-events-auto ';

          if (isCurrent) {
            buttonClasses += 'bg-blue-600 text-white border-blue-600 ring-2 ring-blue-200 shadow-xs';
          } else if (isSubmitted) {
            buttonClasses += 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100/70';
          } else {
            buttonClasses += 'bg-white text-slate-700 border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 hover:text-blue-700 shadow-2xs';
          }

          return (
            <button
              type="button"
              key={num}
              onClick={() => {
                console.log('clicked', num);
                handleSelectQuestion(num);
              }}
              className={buttonClasses}
              title={`Question ${String(num).padStart(2, '0')}${isSubmitted ? ' (Solved)' : ''}`}
            >
              {isSubmitted && !isCurrent ? (
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[2.5]" />
              ) : (
                <span>{String(num).padStart(2, '0')}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentNum >= 20}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer pointer-events-auto"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="w-3.5 h-3.5" />
      </button>
    </footer>
  );
}
