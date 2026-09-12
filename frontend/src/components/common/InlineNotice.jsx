import React from 'react';
import { AlertCircle, X } from 'lucide-react';

export default function InlineNotice({ message, onDismiss }) {
  if (!message) return null;

  return (
    <div className="flex items-center gap-2 bg-slate-900 text-slate-100 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-2 duration-200">
      <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
      <span>{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-2 text-slate-400 hover:text-white transition-colors"
          title="Dismiss"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
