import React from 'react';
import { History, ArrowUpRight, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';

export default function ActivityList() {
  const { submissions } = useProgress();

  if (!submissions || submissions.length === 0) {
    return (
      <div className="p-8 text-center bg-white border border-slate-200 rounded-xl text-slate-500 text-xs sm:text-sm">
        No challenge submissions yet. Select a level above to start practicing!
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-slate-500" />
          <h3 className="text-sm font-bold text-slate-900">Recent Challenge Submissions</h3>
        </div>
        <span className="text-xs font-medium text-slate-400">Latest Attempts</span>
      </div>

      <div className="divide-y divide-slate-100">
        {submissions.slice(0, 5).map((item) => (
          <div key={item.id} className="px-5 py-3.5 flex items-center justify-between hover:bg-slate-50/70 transition-colors">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-8 h-8 rounded bg-slate-100 border border-slate-200 flex items-center justify-center font-mono text-xs font-bold text-slate-700 flex-shrink-0">
                {item.technology === 'JavaScript' ? 'JS' : item.technology}
              </div>

              <div className="min-w-0">
                <div className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                  {item.questionTitle}
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                  <span>{item.difficulty}</span>
                  <span>•</span>
                  <span>Level {item.level}</span>
                  <span>•</span>
                  <span>{item.submittedAt}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0">
              <div className="text-right">
                <div className="font-mono text-xs sm:text-sm font-bold text-slate-900">
                  {item.score}/100
                </div>
                <div className="text-[10px] font-semibold text-emerald-600">
                  {item.classification}
                </div>
              </div>

              <div className="flex items-center gap-0.5 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-200">
                <ArrowUpRight className="w-3 h-3" />
                <span>+{item.ratingChange}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
