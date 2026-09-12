import React from 'react';
import { Play, Send, RotateCcw, Clock, CheckCircle2, Loader2, Pause } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';
import { useProgress } from '../../context/ProgressContext';

export default function ChallengeHeader() {
  const {
    currentQuestion,
    workspaceState,
    timerSeconds,
    isTimerRunning,
    hasStartedCoding,
    startCodingSession,
    resetCode,
    runCode,
    submitSolution,
  } = useWorkspace();

  const { selectedTech, selectedDifficulty, selectedLevel } = useProgress();

  if (!currentQuestion) return null;

  // Format MM:SS
  const formatTimer = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const isSubmitted = workspaceState === 'completed' || workspaceState === 'evaluated';
  const isRunning = workspaceState === 'running';
  const isSubmitting = workspaceState === 'submitting';

  return (
    <header className="h-13 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between flex-shrink-0 z-20">
      {/* Left: Metadata Hierarchy */}
      <div className="flex items-center gap-3">
        <span className="text-xs sm:text-sm font-semibold text-slate-900 flex items-center gap-1.5">
          {selectedTech}
        </span>

        <span className="w-px h-4 bg-slate-200" />

        <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
          {selectedDifficulty}
        </span>

        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Level {selectedLevel}
        </span>

        <span className="w-px h-4 bg-slate-200 hidden sm:inline" />

        <div className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2.5 py-1 rounded border border-slate-200">
          Question {String(currentQuestion.questionNumber).padStart(2, '0')} / 20
        </div>
      </div>

      {/* Center: Live Session Timer */}
      <div className="flex items-center gap-2 font-mono text-xs sm:text-sm font-semibold text-slate-600 bg-slate-50 px-3 py-1 rounded-full border border-slate-200">
        <Clock className="w-3.5 h-3.5 text-slate-400" />
        <span>{formatTimer(timerSeconds)}</span>
        {!isSubmitted && (
          isTimerRunning ? (
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Clock running" />
          ) : (
            <span className="text-[10px] text-amber-600 font-sans font-bold uppercase bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">
              Ready
            </span>
          )
        )}
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 sm:gap-3">
        {isSubmitted ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-md text-xs sm:text-sm font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Challenge Submitted</span>
          </div>
        ) : !hasStartedCoding ? (
          <button
            onClick={startCodingSession}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Start Coding</span>
          </button>
        ) : (
          <>
            <button
              onClick={resetCode}
              disabled={isRunning || isSubmitting}
              className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors disabled:opacity-50"
              title="Reset code to original starter template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            {currentQuestion.type !== 'PREDICT' && (
              <button
                onClick={runCode}
                disabled={isRunning || isSubmitting}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs sm:text-sm font-medium bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 transition-colors disabled:opacity-50"
              >
                {isRunning ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-slate-700 text-slate-700" />
                )}
                <span>Run Code</span>
              </button>
            )}

            <button
              onClick={submitSolution}
              disabled={isRunning || isSubmitting}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md text-xs sm:text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-xs disabled:opacity-50"
            >
              {isSubmitting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
              <span>Submit</span>
            </button>
          </>
        )}
      </div>
    </header>
  );
}
