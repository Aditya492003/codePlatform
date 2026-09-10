import React from 'react';
import { ThumbsUp, ArrowUpRight, Sparkles } from 'lucide-react';

export default function CodeReview({ aiReview }) {
  if (!aiReview) return null;

  const strengths = aiReview.strengths || [
    'Clear function naming and semantic variables',
    'Good separation of concerns across helpers',
    'Appropriate use of immutable operations'
  ];

  const improvements = aiReview.improvements || [
    'Extract repeated logic into dedicated helper',
    'Improve edge-case handling for empty collections',
    'Reduce unnecessary nesting in accumulator loops'
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-violet-600" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          AI Code Review & Insights
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* What you did well */}
        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
            <ThumbsUp className="w-3.5 h-3.5 text-emerald-600" />
            <span>What You Did Well</span>
          </div>

          <ul className="space-y-2">
            {strengths.map((item, idx) => (
              <li key={idx} className="text-xs text-emerald-950 flex items-start gap-2 leading-relaxed">
                <span className="text-emerald-600 font-bold mt-0.5">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* What could improve */}
        <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex flex-col gap-3">
          <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-600" />
            <span>What Could Improve</span>
          </div>

          <ul className="space-y-2">
            {improvements.map((item, idx) => (
              <li key={idx} className="text-xs text-amber-950 flex items-start gap-2 leading-relaxed">
                <span className="text-amber-600 font-bold mt-0.5">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
