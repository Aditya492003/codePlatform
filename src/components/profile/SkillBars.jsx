import React from 'react';
import { mockUser } from '../../data/mockUser';

export default function SkillBars({ skillRatings = mockUser.skillRatings }) {
  const maxRating = 1000;

  const skills = [
    { name: 'JavaScript', rating: skillRatings.JavaScript || 841, color: 'bg-amber-500' },
    { name: 'HTML', rating: skillRatings.HTML || 720, color: 'bg-orange-500' },
    { name: 'CSS', rating: skillRatings.CSS || 691, color: 'bg-blue-500' }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
          Technology Skill Distribution
        </h3>
        <span className="text-xs text-slate-400 font-mono">Max Rating: 1000</span>
      </div>

      <div className="flex flex-col gap-4">
        {skills.map((skill) => {
          const pct = Math.min(100, Math.round((skill.rating / maxRating) * 100));

          return (
            <div key={skill.name} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{skill.name}</span>
                <span className="font-mono text-slate-900 font-bold">{skill.rating}</span>
              </div>

              {/* Progress Meter */}
              <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 flex">
                <div
                  className={`h-full ${skill.color} rounded-full transition-all duration-700 ease-out`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
