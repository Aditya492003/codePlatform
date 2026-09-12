import React from 'react';
import { TrendingUp } from 'lucide-react';
import { mockUser } from '../../data/mockUser';

export default function RatingChart({ history = mockUser.ratingHistory }) {
  if (!history || history.length === 0) return null;

  const minRating = Math.min(...history.map((h) => h.rating)) - 40;
  const maxRating = Math.max(...history.map((h) => h.rating)) + 40;
  const range = maxRating - minRating;

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
            Rating Progression Timeline
          </h3>
        </div>
        <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
          +134 pts past 30 days
        </span>
      </div>

      {/* SVG Sparkline / Progression Graph */}
      <div className="h-44 w-full relative flex flex-col justify-end pt-4">
        <div className="flex items-end justify-between h-32 w-full gap-2 px-2 border-b border-slate-200 pb-2">
          {history.map((point, idx) => {
            const heightPct = Math.max(15, Math.round(((point.rating - minRating) / range) * 100));

            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono font-bold text-slate-800 bg-slate-100 px-1 rounded shadow-xs">
                  {point.rating}
                </div>

                <div className="w-full max-w-[28px] bg-blue-100 hover:bg-blue-600 group-hover:bg-blue-600 rounded-t transition-all duration-300 relative flex items-end justify-center" style={{ height: `${heightPct}%` }}>
                  <div className="w-2 h-2 rounded-full bg-blue-600 group-hover:bg-white mb-1 transition-colors" />
                </div>

                <span className="text-[10px] font-medium text-slate-400 mt-1">
                  {point.date}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
