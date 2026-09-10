import React from 'react';
import { DIFFICULTIES } from '../../data/questions';

export default function DifficultySelector({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
        2. Difficulty
      </span>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {DIFFICULTIES.map((diff) => {
          const isSelected = selected === diff;
          return (
            <button
              key={diff}
              onClick={() => onSelect(diff)}
              className={`p-2.5 rounded-lg border text-xs sm:text-sm font-semibold text-center transition-all ${
                isSelected
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              {diff}
            </button>
          );
        })}
      </div>
    </div>
  );
}
