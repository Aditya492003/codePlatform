import React from 'react';
import QuestionTypeBadge from '../common/QuestionTypeBadge';
import { FileText, CheckCircle, ShieldAlert, Sparkles } from 'lucide-react';

export default function QuestionPanel({ question }) {
  if (!question) return null;

  // Anti-copy event handlers scoped exclusively to this container
  const handlePreventCopy = (e) => {
    e.preventDefault();
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="bg-white overflow-y-auto p-6 lg:p-8 flex flex-col gap-6 anti-copy-question"
      onCopy={handlePreventCopy}
      onCut={handlePreventCopy}
      onContextMenu={handleContextMenu}
      onDragStart={handlePreventCopy}
    >
      {/* Header Info */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <QuestionTypeBadge type={question.type} />
          <span className="text-xs font-mono text-slate-400">
            Est. ~{question.estimatedTime || 10} mins
          </span>
        </div>

        <h1 className="text-xl lg:text-2xl font-bold text-slate-900 tracking-tight leading-tight">
          {question.title}
        </h1>

        <p className="text-sm lg:text-base text-slate-600 leading-relaxed">
          {question.description}
        </p>
      </div>

      {/* For PREDICT questions: show code snippet inside question panel */}
      {question.type === 'PREDICT' && question.predictConfig?.snippet && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Code Execution Context</span>
          </div>
          <pre className="p-4 bg-slate-900 text-slate-100 rounded-lg text-xs lg:text-sm font-mono leading-relaxed overflow-x-auto border border-slate-800">
            <code>{question.predictConfig.snippet}</code>
          </pre>
        </div>
      )}

      {/* Requirements */}
      {question.requirements && question.requirements.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <CheckCircle className="w-3.5 h-3.5 text-blue-600" />
            <span>Requirements</span>
          </div>
          <ul className="space-y-2">
            {question.requirements.map((req, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-600 flex items-start gap-2.5 leading-normal">
                <span className="text-blue-500 font-bold mt-0.5">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Examples */}
      {question.examples && question.examples.length > 0 && (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <FileText className="w-3.5 h-3.5 text-slate-600" />
            <span>Examples</span>
          </div>
          <div className="space-y-3">
            {question.examples.map((ex, idx) => (
              <div
                key={idx}
                className="bg-slate-50 border border-slate-200 rounded-lg p-3.5 text-xs font-mono flex flex-col gap-2"
              >
                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px] block mb-1">
                    Input / Context
                  </span>
                  <div className="text-slate-800 bg-white p-2 rounded border border-slate-200 whitespace-pre-wrap">
                    {ex.input}
                  </div>
                </div>
                <div>
                  <span className="text-slate-400 uppercase font-semibold text-[10px] block mb-1">
                    Expected Output
                  </span>
                  <div className="text-emerald-700 bg-emerald-50/50 p-2 rounded border border-emerald-200 whitespace-pre-wrap">
                    {ex.output}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Constraints */}
      {question.constraints && question.constraints.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5 text-slate-500" />
            <span>Constraints & Environment</span>
          </div>
          <ul className="space-y-1.5">
            {question.constraints.map((c, idx) => (
              <li key={idx} className="text-xs sm:text-sm text-slate-500 flex items-start gap-2">
                <span className="text-slate-400">—</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
