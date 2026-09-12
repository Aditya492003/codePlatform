import React from 'react';
import { BarChart3 } from 'lucide-react';

export default function ScoreBreakdown({ breakdown }) {
  if (!breakdown) return null;

  const items = Object.entries(breakdown).map(([key, data]) => ({
    key,
    label: data.label,
    score: data.score,
    max: data.max,
    pct: Math.round((data.score / data.max) * 100)
  }));

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-4">
      <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
        <BarChart3 className="w-4 h-4 text-blue-600" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Evaluation Breakdown
        </h3>
      </div>

      <div className="flex flex-col gap-3.5">
        {items.map((item) => (
          <div key={item.key} className="grid grid-cols-[130px_1fr_65px] items-center gap-4 text-xs">
            <span className="font-medium text-slate-700">{item.label}</span>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${item.pct}%` }}
              />
            </div>

            {/* Score Value */}
            <span className="font-mono font-bold text-slate-900 text-right">
              {item.score} <span className="text-slate-400 font-normal">/ {item.max}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
