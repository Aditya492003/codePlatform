import React from 'react';
import { Award, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck } from 'lucide-react';
import ScoreBreakdown from './ScoreBreakdown';
import CodeReview from './CodeReview';

export default function EvaluationPanel({ evaluation, onContinue }) {
  if (!evaluation) return null;

  const {
    overallScore = 86,
    classification = 'Excellent',
    testsPassed = 8,
    totalTests = 8,
    breakdown,
    aiReview,
    ratingDelta = { previous: 784, current: 791, change: 7 }
  } = evaluation;

  return (
    <div className="flex-1 overflow-y-auto p-6 lg:p-8 bg-slate-50 flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-3 duration-300">
      {/* Top Hero Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Overall Score Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Overall Score
          </span>
          <div className="flex items-baseline gap-1.5 my-1.5">
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {overallScore}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ 100</span>
          </div>
          <div>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              {classification}
            </span>
          </div>
        </div>

        {/* Tests Passed Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Tests Status
          </span>
          <div className="flex items-baseline gap-1.5 my-1.5">
            <span className="text-3xl font-extrabold font-mono text-emerald-600">
              {testsPassed}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ {totalTests} Passed</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>100% assertions passed</span>
          </div>
        </div>

        {/* Rating Progression Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Platform Rating
          </span>
          <div className="flex items-baseline gap-3 my-1.5">
            <span className="text-sm font-mono text-slate-400 line-through">
              {ratingDelta.previous}
            </span>
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {ratingDelta.current}
            </span>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              +{ratingDelta.change}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>Rating Updated</span>
          </div>
        </div>
      </div>

      {/* Granular Breakdown */}
      <ScoreBreakdown breakdown={breakdown} />

      {/* AI Code Review */}
      <CodeReview aiReview={aiReview} />

      {/* Footer Banner */}
      <div className="mt-2 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Attempt recorded and verified. You can now advance to the next challenge.</span>
        </div>

        {onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            <span>Continue to Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
