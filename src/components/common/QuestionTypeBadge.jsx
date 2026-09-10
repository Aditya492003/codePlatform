import React from 'react';
import { Hammer, Bug, RefreshCw, CheckSquare, Eye, Zap, Search } from 'lucide-react';

const TYPE_CONFIG = {
  BUILD: {
    label: 'BUILD',
    icon: Hammer,
    classes: 'bg-sky-50 text-sky-700 border-sky-200'
  },
  DEBUG: {
    label: 'DEBUG',
    icon: Bug,
    classes: 'bg-red-50 text-red-700 border-red-200'
  },
  REFACTOR: {
    label: 'REFACTOR',
    icon: RefreshCw,
    classes: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  COMPLETE: {
    label: 'COMPLETE',
    icon: CheckSquare,
    classes: 'bg-violet-50 text-violet-700 border-violet-200'
  },
  PREDICT: {
    label: 'PREDICT',
    icon: Eye,
    classes: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  OPTIMIZE: {
    label: 'OPTIMIZE',
    icon: Zap,
    classes: 'bg-orange-50 text-orange-700 border-orange-200'
  },
  FIND_THE_BUG: {
    label: 'FIND THE BUG',
    icon: Search,
    classes: 'bg-rose-50 text-rose-700 border-rose-200'
  }
};

export default function QuestionTypeBadge({ type }) {
  const normalizedType = type ? type.toUpperCase().replace(/\s+/g, '_') : 'BUILD';
  const config = TYPE_CONFIG[normalizedType] || TYPE_CONFIG.BUILD;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold border tracking-wider uppercase font-mono ${config.classes}`}
    >
      <Icon className="w-3 h-3" />
      <span>{config.label}</span>
    </span>
  );
}
