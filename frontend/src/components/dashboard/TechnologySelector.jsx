import React from 'react';
import { FileCode2, Palette, Braces } from 'lucide-react';
import { TECHNOLOGIES } from '../../data/questions';

const TECH_META = {
  JavaScript: { icon: Braces, color: 'text-amber-500' },
  HTML: { icon: FileCode2, color: 'text-orange-500' },
  CSS: { icon: Palette, color: 'text-blue-500' }
};

export default function TechnologySelector({ selected, onSelect }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
        1. Select Technology
      </span>
      <div className="grid grid-cols-3 gap-2">
        {TECHNOLOGIES.map((tech) => {
          const isSelected = selected === tech;
          const meta = TECH_META[tech] || { icon: FileCode2, color: 'text-slate-500' };
          const Icon = meta.icon;

          return (
            <button
              key={tech}
              onClick={() => onSelect(tech)}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg border text-xs sm:text-sm font-semibold transition-all ${
                isSelected
                  ? 'bg-blue-50 border-blue-500 text-blue-700 shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${meta.color}`} />
              <span>{tech}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
