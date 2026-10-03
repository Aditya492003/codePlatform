import React, { useEffect } from 'react';
import { HelpCircle, CheckCircle2, Lock, Sparkles, Send, RotateCcw, Check, Zap } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

const OPTION_LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function McqSelectionView({ isReadOnly = false }) {
  const {
    currentQuestion,
    currentPredict,
    updatePredictAnswer,
    submitSolution,
    workspaceState,
  } = useWorkspace();

  if (!currentQuestion || !currentQuestion.predictConfig) return null;

  const { options = [], question: promptQuestion, correctAnswer } = currentQuestion.predictConfig;
  const selectedOptionId = currentPredict?.selectedOptionId;
  const explanation = currentPredict?.explanation || '';
  const isSubmitting = workspaceState === 'submitting';

  const handleSelectOption = (option) => {
    if (isReadOnly || isSubmitting) return;
    const val = option.id || option.label || option;
    updatePredictAnswer(val, explanation);
  };

  const handleClearSelection = () => {
    if (isReadOnly || isSubmitting) return;
    updatePredictAnswer(null, '');
  };

  // Keyboard shortcuts: A, B, C, D or 1, 2, 3, 4 to select options
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isReadOnly || isSubmitting) return;
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toUpperCase();
      let index = -1;

      if (['A', 'B', 'C', 'D'].includes(key)) {
        index = OPTION_LETTERS.indexOf(key);
      } else if (['1', '2', '3', '4'].includes(key)) {
        index = parseInt(key, 10) - 1;
      }

      if (index >= 0 && index < options.length) {
        e.preventDefault();
        handleSelectOption(options[index]);
      } else if (e.key === 'Enter' && selectedOptionId && !isReadOnly) {
        e.preventDefault();
        submitSolution();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [options, isReadOnly, isSubmitting, selectedOptionId]);

  const isOptionSelected = (option) => {
    if (!selectedOptionId) return false;
    const optLabel = typeof option === 'string' ? option : option.label;
    const optId = typeof option === 'string' ? option : option.id;
    return (
      selectedOptionId === optId ||
      selectedOptionId === optLabel ||
      selectedOptionId?.trim() === optLabel?.trim()
    );
  };

  const selectedIndex = options.findIndex((opt) => isOptionSelected(opt));

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50 flex flex-col justify-between gap-6 select-none animate-in fade-in duration-200">
      <div className="flex flex-col gap-6">
        {/* Top Header Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                <HelpCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">
                  Multiple Choice Question
                </span>
                <span className="text-[11px] text-slate-400 block font-mono">
                  Single Option Selection
                </span>
              </div>
            </div>

            {isReadOnly ? (
              <span className="flex items-center gap-1.5 text-xs font-semibold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                <Lock className="w-3.5 h-3.5" /> Answer Submitted
              </span>
            ) : (
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono bg-slate-50 px-2.5 py-1 rounded-full border border-slate-200">
                <Zap className="w-3 h-3 text-amber-500" />
                <span>Press keys [A-D] or [1-4]</span>
              </div>
            )}
          </div>

          {/* Question Text */}
          <div className="pt-2 border-t border-slate-100">
            <h2 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
              {promptQuestion || currentQuestion.title}
            </h2>
          </div>
        </div>

        {/* Options List */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Select One Option:
            </span>
            {selectedOptionId && !isReadOnly && (
              <button
                onClick={handleClearSelection}
                className="text-[11px] text-slate-400 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Clear Selection</span>
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3">
            {options.map((option, index) => {
              const letter = OPTION_LETTERS[index] || String(index + 1);
              const label = typeof option === 'string' ? option : option.label;
              const isSelected = isOptionSelected(option);

              return (
                <div
                  key={index}
                  onClick={() => handleSelectOption(option)}
                  className={`group relative p-4 rounded-xl border transition-all duration-150 flex items-center justify-between gap-4 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/90 border-blue-600 ring-2 ring-blue-500/20 shadow-sm text-slate-900'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700 shadow-2xs'
                  } ${isReadOnly ? 'cursor-default opacity-85' : ''}`}
                >
                  {/* Left: Letter Tag & Label */}
                  <div className="flex items-center gap-3.5 flex-1 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs font-mono transition-colors flex-shrink-0 ${
                        isSelected
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-slate-100 group-hover:bg-slate-200 text-slate-700 border border-slate-200'
                      }`}
                    >
                      {letter}
                    </div>

                    <div className="font-mono text-xs sm:text-sm font-semibold leading-relaxed break-words flex-1">
                      {label}
                    </div>
                  </div>

                  {/* Right: Radio Selection Check / Key Hint */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {!isReadOnly && !isSelected && (
                      <span className="hidden sm:inline-block text-[10px] font-mono text-slate-300 group-hover:text-slate-500 px-1.5 py-0.5 rounded bg-slate-50 border border-slate-200">
                        {letter}
                      </span>
                    )}

                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all ${
                        isSelected
                          ? 'bg-blue-600 border-blue-600 text-white shadow-xs'
                          : 'border-slate-300 bg-white group-hover:border-slate-400'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      {!isReadOnly && (
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex items-center justify-between gap-4 mt-auto">
          <div className="flex items-center gap-2 text-xs">
            {selectedIndex >= 0 ? (
              <span className="font-semibold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Selected: Option {OPTION_LETTERS[selectedIndex]}</span>
              </span>
            ) : (
              <span className="text-slate-400 italic">
                Choose an option above to continue
              </span>
            )}
          </div>

          <button
            onClick={submitSolution}
            disabled={!selectedOptionId || isSubmitting}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSubmitting ? 'Submitting...' : 'Submit Choice'}</span>
          </button>
        </div>
      )}
    </div>
  );
}
