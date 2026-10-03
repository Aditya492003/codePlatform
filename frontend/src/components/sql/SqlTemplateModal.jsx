import React from 'react';
import { X, Sparkles, Database, ArrowRight, Code } from 'lucide-react';
import { SQL_TEMPLATES } from '../../data/sqlTemplates';

export default function SqlTemplateModal({ isOpen, onClose, onLoadTemplate }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">SQL Schema & Dataset Templates</h3>
              <p className="text-xs text-slate-400">
                Load rich pre-built relational databases with sample tables, foreign keys, and JOIN queries
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Templates Grid */}
        <div className="p-6 overflow-y-auto custom-scrollbar space-y-3">
          {SQL_TEMPLATES.map((tpl) => (
            <div
              key={tpl.id}
              className="p-4 rounded-xl bg-slate-950/40 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-sm text-slate-100 group-hover:text-cyan-300 transition-colors">
                    {tpl.name}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">{tpl.description}</p>
              </div>

              <button
                type="button"
                onClick={() => {
                  onLoadTemplate(tpl);
                  onClose();
                }}
                className="flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-md shadow-cyan-500/20 transition-all shrink-0"
              >
                Load Template <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Loading a template will replace the current SQL draft and create its tables.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
