import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  Download, 
  Copy, 
  Clock, 
  Layers, 
  Check, 
  Sparkles,
  Info
} from 'lucide-react';

export default function SqlResultGrid({ executionResult, isExecuting }) {
  const [copied, setCopied] = useState(false);
  const [activeResultIdx, setActiveResultIdx] = useState(0);

  if (isExecuting) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400">
        <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin mb-3"></div>
        <p className="text-sm font-medium text-slate-300">Executing SQL queries...</p>
        <p className="text-xs text-slate-500 mt-1">Running in SQLite WebAssembly engine</p>
      </div>
    );
  }

  if (!executionResult) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 bg-slate-950/60 rounded-xl border border-slate-800 text-slate-400">
        <div className="p-3 rounded-full bg-slate-800/80 mb-3 text-cyan-400">
          <Sparkles className="w-6 h-6" />
        </div>
        <p className="text-sm font-medium text-slate-300">No Query Results Yet</p>
        <p className="text-xs text-slate-500 mt-1 text-center max-w-sm">
          Write a query or select a template, then click <strong>Run Query</strong> or press <strong>Ctrl + Enter</strong>.
        </p>
      </div>
    );
  }

  // Handle Query Error
  if (!executionResult.success) {
    return (
      <div className="h-full flex flex-col p-4 bg-slate-950/80 rounded-xl border border-rose-500/30 overflow-y-auto">
        <div className="flex items-start gap-3 p-4 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 mb-4">
          <AlertTriangle className="w-5 h-5 shrink-0 text-rose-400 mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm text-rose-200">Execution Error</h4>
            <pre className="mt-2 text-xs font-mono text-rose-300 whitespace-pre-wrap break-all leading-relaxed bg-rose-950/40 p-3 rounded border border-rose-900/50">
              {executionResult.error}
            </pre>
            <div className="mt-3 flex items-center gap-3 text-xs text-rose-400/80">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {executionResult.executionTimeMs} ms
              </span>
            </div>
          </div>
        </div>

        <div className="p-3 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 space-y-1">
          <div className="flex items-center gap-1.5 font-medium text-slate-300">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>SQL Troubleshooting Tips:</span>
          </div>
          <p>• Verify table and column spelling matching the schemas on the left.</p>
          <p>• Ensure strings are enclosed in single quotes: <code className="text-amber-300 font-mono">'John'</code>.</p>
          <p>• Check for missing commas or semicolon terminators between statements.</p>
        </div>
      </div>
    );
  }

  const results = executionResult.results || [];
  const currentResult = results[activeResultIdx] || results[0];

  const handleExportCsv = () => {
    if (!currentResult || !currentResult.columns) return;
    const header = currentResult.columns.join(',');
    const rows = (currentResult.values || []).map((row) =>
      row
        .map((val) => {
          if (val === null) return '';
          const str = String(val).replace(/"/g, '""');
          return `"${str}"`;
        })
        .join(',')
    );
    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `query_result_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyJson = () => {
    if (!currentResult || !currentResult.columns) return;
    const jsonRows = (currentResult.values || []).map((row) => {
      const obj = {};
      currentResult.columns.forEach((col, idx) => {
        obj[col] = row[idx];
      });
      return obj;
    });
    navigator.clipboard.writeText(JSON.stringify(jsonRows, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950/80 rounded-xl border border-slate-800 overflow-hidden">
      {/* Result Top Bar */}
      <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3">
        {/* Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Success</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-400">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-slate-500" />
              <strong className="text-slate-200">{executionResult.executionTimeMs} ms</strong>
            </span>
            {currentResult && (
              <>
                <span>•</span>
                <span>
                  <strong className="text-slate-200">{currentResult.rowCount}</strong> rows
                </span>
                <span>•</span>
                <span>
                  <strong className="text-slate-200">{currentResult.columns.length}</strong> columns
                </span>
              </>
            )}
            {executionResult.rowsModified > 0 && (
              <>
                <span>•</span>
                <span className="text-cyan-400">
                  {executionResult.rowsModified} modified
                </span>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        {currentResult && currentResult.values && currentResult.values.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyJson}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'JSON'}
            </button>
            <button
              type="button"
              onClick={handleExportCsv}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              CSV
            </button>
          </div>
        )}
      </div>

      {/* Multiple Result Sets Tabs */}
      {results.length > 1 && (
        <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-900/60 border-b border-slate-800 overflow-x-auto">
          <span className="text-[11px] text-slate-500 uppercase tracking-wider font-semibold mr-1 flex items-center gap-1">
            <Layers className="w-3 h-3" /> Result Sets:
          </span>
          {results.map((res, idx) => (
            <button
              key={res.id || idx}
              type="button"
              onClick={() => setActiveResultIdx(idx)}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                activeResultIdx === idx
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-medium'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              Query #{idx + 1} ({res.rowCount} rows)
            </button>
          ))}
        </div>
      )}

      {/* Result Grid Data Table */}
      <div className="flex-1 overflow-auto custom-scrollbar p-3">
        {currentResult && currentResult.values && currentResult.values.length > 0 ? (
          <div className="overflow-x-auto rounded-lg border border-slate-800 shadow-inner">
            <table className="w-full text-left text-xs border-collapse font-mono">
              <thead>
                <tr className="bg-slate-900 text-slate-200 border-b border-slate-700 sticky top-0 z-10">
                  <th className="px-3 py-2 text-slate-500 font-normal w-10 text-center bg-slate-900 border-r border-slate-800">
                    #
                  </th>
                  {currentResult.columns.map((colName) => (
                    <th
                      key={colName}
                      className="px-3.5 py-2 font-semibold text-slate-200 tracking-wide border-r border-slate-800/80 whitespace-nowrap bg-slate-900"
                    >
                      {colName}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentResult.values.map((row, rIdx) => (
                  <tr
                    key={rIdx}
                    className={`border-b border-slate-800/60 transition-colors ${
                      rIdx % 2 === 0 ? 'bg-slate-950/40' : 'bg-slate-900/20'
                    } hover:bg-cyan-500/10`}
                  >
                    <td className="px-3 py-1.5 text-[11px] text-slate-500 text-center border-r border-slate-800 select-none">
                      {rIdx + 1}
                    </td>
                    {row.map((val, cIdx) => (
                      <td
                        key={cIdx}
                        className="px-3.5 py-1.5 border-r border-slate-800/40 whitespace-nowrap text-slate-200 max-w-[280px] truncate"
                      >
                        {val === null ? (
                          <span className="text-slate-500 italic">NULL</span>
                        ) : typeof val === 'number' ? (
                          <span className="text-amber-300 font-semibold">{val}</span>
                        ) : typeof val === 'boolean' ? (
                          <span className="text-purple-300 font-semibold">{val.toString()}</span>
                        ) : (
                          String(val)
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-12 flex flex-col items-center justify-center text-slate-400">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mb-2" />
            <p className="text-sm font-medium text-slate-200">Query Executed Successfully</p>
            <p className="text-xs text-slate-500 mt-0.5">
              Statement completed with 0 rows returned (e.g. CREATE TABLE or INSERT/UPDATE/DELETE).
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
