import React, { useState } from 'react';
import QuestionTypeBadge from '../common/QuestionTypeBadge';
import {
  CheckCircle,
  ShieldAlert,
  Sparkles,
  Lightbulb,
  Eye,
  EyeOff,
  Copy,
  Check,
  Code2,
  Bug,
  HelpCircle,
  Hammer,
  FileCode,
  Tag
} from 'lucide-react';

const TYPE_THEMES = {
  MCQ: {
    border: 'border-indigo-100',
    bg: 'bg-indigo-50/40',
    badgeText: 'Multiple Choice Concept Check',
    icon: HelpCircle,
    iconColor: 'text-indigo-600',
  },
  PREDICT_OUTPUT: {
    border: 'border-emerald-100',
    bg: 'bg-emerald-50/40',
    badgeText: 'Execution Output Prediction',
    icon: Sparkles,
    iconColor: 'text-emerald-600',
  },
  PREDICT: {
    border: 'border-emerald-100',
    bg: 'bg-emerald-50/40',
    badgeText: 'Execution Output Prediction',
    icon: Sparkles,
    iconColor: 'text-emerald-600',
  },
  FIX_CODE: {
    border: 'border-rose-100',
    bg: 'bg-rose-50/40',
    badgeText: 'Bug Resolution & Code Fix',
    icon: Bug,
    iconColor: 'text-rose-600',
  },
  DEBUG: {
    border: 'border-rose-100',
    bg: 'bg-rose-50/40',
    badgeText: 'Debugging & Fix Challenge',
    icon: Bug,
    iconColor: 'text-rose-600',
  },
  CODING: {
    border: 'border-blue-100',
    bg: 'bg-blue-50/40',
    badgeText: 'Core Algorithm & Implementation',
    icon: Code2,
    iconColor: 'text-blue-600',
  },
  BUILD: {
    border: 'border-sky-100',
    bg: 'bg-sky-50/40',
    badgeText: 'Component & Feature Construction',
    icon: Hammer,
    iconColor: 'text-sky-600',
  },
};

export default function QuestionPanel({ question }) {
  const [showSolution, setShowSolution] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!question) return null;

  const normalizedType = (question.type || 'BUILD').toUpperCase();
  const theme = TYPE_THEMES[normalizedType] || TYPE_THEMES.BUILD;
  const TypeIcon = theme.icon;

  const isPredictOrMcq =
    normalizedType === 'PREDICT' ||
    normalizedType === 'PREDICT_OUTPUT' ||
    normalizedType === 'MCQ';

  const codeSnippet =
    question.predictConfig?.snippet || (isPredictOrMcq ? question.starterCode : null);

  const hasSolution = Boolean(
    question.solutionCode ||
    question.predictConfig?.correctAnswer ||
    question.predictConfig?.explanation
  );

  const handleCopySolution = () => {
    const textToCopy = question.solutionCode || question.predictConfig?.correctAnswer || '';
    if (textToCopy) {
      navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePreventCopy = (e) => {
    if (!e.target.closest('.solution-allow-copy')) {
      e.preventDefault();
    }
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      key={question.id || question.slug}
      className="bg-white overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 anti-copy-question select-none animate-in fade-in duration-200"
      onCopy={handlePreventCopy}
      onCut={handlePreventCopy}
      onContextMenu={handleContextMenu}
      onDragStart={handlePreventCopy}
    >
      {/* Header Info & Type Callout Banner */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QuestionTypeBadge type={question.type} />
            <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
              Track: {question.technology} • L{question.level}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {question.points && (
              <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 shadow-2xs">
                +{question.points} pts
              </span>
            )}
            <span className="text-xs font-mono text-slate-400">
              ~{question.estimatedTime || 5} min
            </span>
          </div>
        </div>

        {/* Dynamic Category Hero Tag */}
        <div className={`p-3 rounded-xl border flex items-center gap-2.5 ${theme.bg} ${theme.border}`}>
          <TypeIcon className={`w-4 h-4 ${theme.iconColor} flex-shrink-0`} />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            {theme.badgeText}
          </span>
        </div>

        <h1 className="text-xl lg:text-2xl font-black text-slate-900 tracking-tight leading-snug">
          {question.title}
        </h1>

        <p className="text-sm lg:text-base text-slate-600 leading-relaxed whitespace-pre-line">
          {question.description}
        </p>

        {question.concepts && question.concepts.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            <Tag className="w-3.5 h-3.5 text-slate-400 mr-0.5" />
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
              Concepts:
            </span>
            {question.concepts.map((c, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-md text-xs font-mono font-medium text-slate-700 transition-colors"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* For PREDICT / MCQ questions: show code snippet context */}
      {codeSnippet && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Target Execution Code</span>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-xl text-xs lg:text-sm font-mono leading-relaxed overflow-x-auto border border-slate-800 shadow-inner">
            <code>{codeSnippet}</code>
          </pre>
        </div>
      )}

      {/* Requirements */}
      {question.requirements && question.requirements.length > 0 && (
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Key Requirements</span>
          </div>
          <ul className="space-y-2 bg-slate-50/70 p-4 rounded-xl border border-slate-200/80">
            {question.requirements.map((req, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5 leading-normal">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Constraints */}
      {question.constraints && question.constraints.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            <span>Constraints & Environment</span>
          </div>
          <ul className="space-y-1.5 bg-white p-3 rounded-lg border border-slate-100">
            {question.constraints.map((c, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-500 flex items-start gap-2">
                <span className="text-slate-400">—</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Solution Reveal Section */}
      {hasSolution && (
        <div className="pt-2 border-t border-slate-100 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setShowSolution((prev) => !prev)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100/80 text-amber-900 border border-amber-200 transition-colors cursor-pointer"
            >
              <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
              <span>{showSolution ? 'Hide Solution' : 'View Reference Solution'}</span>
              {showSolution ? (
                <EyeOff className="w-3 h-3 text-amber-700" />
              ) : (
                <Eye className="w-3 h-3 text-amber-700" />
              )}
            </button>
            {showSolution && (
              <span className="text-[11px] text-amber-600 font-medium">
                Official Reference Solution
              </span>
            )}
          </div>

          {showSolution && (
            <div className="p-4 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 flex flex-col gap-3 animate-in fade-in duration-200 solution-allow-copy select-text">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{question.technology || 'Code'} Reference Solution</span>
                </div>
                <button
                  onClick={handleCopySolution}
                  className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code / Answer display */}
              {question.solutionCode ? (
                <pre className="text-xs sm:text-sm font-mono leading-relaxed overflow-x-auto text-emerald-300">
                  <code>{question.solutionCode}</code>
                </pre>
              ) : question.predictConfig?.correctAnswer ? (
                <div className="flex flex-col gap-2">
                  <div className="text-xs font-mono text-slate-400">Correct Output / Selection:</div>
                  <div className="p-2.5 bg-slate-950 rounded-lg text-xs sm:text-sm font-mono text-emerald-400 font-bold border border-slate-800">
                    {question.predictConfig.correctAnswer}
                  </div>
                </div>
              ) : null}

              {question.predictConfig?.explanation && (
                <div className="pt-2 border-t border-slate-800/80 text-xs text-slate-300 leading-relaxed">
                  <strong className="text-slate-200">Explanation: </strong>
                  {question.predictConfig.explanation}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

