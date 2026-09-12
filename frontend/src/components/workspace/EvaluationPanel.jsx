import React from 'react';
import { Award, CheckCircle2, TrendingUp, ArrowRight, ShieldCheck, XCircle, AlertTriangle, Code2 } from 'lucide-react';
import ScoreBreakdown from './ScoreBreakdown';
import CodeReview from './CodeReview';

export default function EvaluationPanel({ evaluation, onContinue }) {
  if (!evaluation) return null;

  const {
    overallScore = 0,
    classification = 'Needs Work',
    status = 'Failed',
    testsPassed = 0,
    totalTests = 1,
    breakdown,
    aiReview,
    tests = [],
    codeSmells = [],
    ratingDelta = { previous: 750, current: 750, change: 0 },
  } = evaluation;

  const passPercent = totalTests > 0 ? Math.round((testsPassed / totalTests) * 100) : 0;
  const isAllPassed = testsPassed === totalTests && totalTests > 0;

  const getStatusBadge = () => {
    if (status === 'Accepted' || overallScore >= 80) {
      return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    }
    if (overallScore >= 50) {
      return 'bg-amber-50 text-amber-700 border-amber-200';
    }
    return 'bg-rose-50 text-rose-700 border-rose-200';
  };

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
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${getStatusBadge()}`}>
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
            <span className={`text-3xl font-extrabold font-mono ${isAllPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
              {testsPassed}
            </span>
            <span className="text-sm font-semibold text-slate-400">/ {totalTests} Passed</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs">
            {isAllPassed ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span className="text-emerald-700 font-medium">100% assertions passed</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-rose-500" />
                <span className="text-rose-600 font-medium">{passPercent}% assertions passed</span>
              </>
            )}
          </div>
        </div>

        {/* Rating Progression Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs flex flex-col justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Platform Rating
          </span>
          <div className="flex items-baseline gap-2.5 my-1.5">
            <span className="text-sm font-mono text-slate-400 line-through">
              {ratingDelta.previous}
            </span>
            <span className="text-3xl font-extrabold font-mono text-slate-900">
              {ratingDelta.current}
            </span>
            <span className={`text-xs font-bold px-2 py-0.5 rounded border ${
              ratingDelta.change > 0
                ? 'text-emerald-600 bg-emerald-50 border-emerald-200'
                : 'text-slate-600 bg-slate-100 border-slate-200'
            }`}>
              +{ratingDelta.change}
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            <span>{ratingDelta.change > 0 ? 'Rating Updated' : 'Rating Maintained'}</span>
          </div>
        </div>
      </div>

      {/* Granular Breakdown */}
      <ScoreBreakdown breakdown={breakdown} />

      {/* Individual Test Assertions */}
      {tests && tests.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
              <Code2 className="w-3.5 h-3.5 text-blue-600" />
              <span>Test Assertions & Output Scan</span>
            </span>
            <span className="text-xs font-mono text-slate-400">
              {testsPassed}/{totalTests} Passed
            </span>
          </div>

          <div className="space-y-2.5">
            {tests.map((t, idx) => (
              <div
                key={t.id || idx}
                className={`p-3 rounded-lg border text-xs font-mono flex flex-col gap-1.5 ${
                  t.status === 'passed'
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/50 border-rose-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-semibold">
                    {t.status === 'passed' ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <XCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                    )}
                    <span className={t.status === 'passed' ? 'text-emerald-950' : 'text-rose-950'}>
                      {t.name}
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      t.status === 'passed'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {t.status}
                  </span>
                </div>

                {t.error && (
                  <div className="text-rose-700 bg-white/80 p-2 rounded border border-rose-200 font-sans text-xs">
                    <strong>Error:</strong> {t.error}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Code Review */}
      <CodeReview aiReview={aiReview} />

      {/* Footer Banner */}
      <div className="mt-2 p-4 bg-white border border-slate-200 rounded-xl flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Evaluation verified by Groq AI engine.</span>
        </div>

        {onContinue && (
          <button
            onClick={onContinue}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
          >
            <span>Continue to Next Question</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
}
