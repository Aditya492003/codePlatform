import React, { useState } from 'react';
import { 
  Table, 
  Key, 
  Link2, 
  Database, 
  Code2, 
  Trash2, 
  Eye, 
  List, 
  ChevronRight,
  ExternalLink
} from 'lucide-react';

export default function SqlTableCard({ 
  table, 
  onQueryTable, 
  onDropTable, 
  onShowDdl 
}) {
  const [activeTab, setActiveTab] = useState('schema'); // 'schema' | 'data'

  if (!table) return null;

  return (
    <div className="flex flex-col bg-slate-900/90 border border-slate-700/70 hover:border-cyan-500/50 rounded-xl overflow-hidden shadow-lg transition-all duration-200 min-w-[320px] max-w-[420px] flex-1">
      {/* Table Header */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-800/60 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
            <Table className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-semibold text-sm text-slate-100 truncate tracking-wide">
              {table.name}
            </h4>
            <div className="flex items-center gap-2 text-xs text-slate-400">
              <span>{table.columns.length} columns</span>
              <span>•</span>
              <span className="text-emerald-400 font-medium">
                {table.rowCount} {table.rowCount === 1 ? 'row' : 'rows'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onQueryTable && onQueryTable(table.name)}
            title={`Run SELECT * FROM ${table.name}`}
            className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-cyan-300 transition-colors"
          >
            <Code2 className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => onShowDdl && onShowDdl(table)}
            title="View DDL Structure"
            className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-amber-300 transition-colors"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          {onDropTable && (
            <button
              type="button"
              onClick={() => onDropTable(table.name)}
              title="Drop Table"
              className="p-1.5 rounded-md hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/60 px-2 pt-1 gap-1">
        <button
          type="button"
          onClick={() => setActiveTab('schema')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors ${
            activeTab === 'schema'
              ? 'bg-slate-800 text-cyan-400 border-t border-x border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <List className="w-3 h-3" />
          Schema ({table.columns.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('data')}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-t-md transition-colors ${
            activeTab === 'data'
              ? 'bg-slate-800 text-emerald-400 border-t border-x border-slate-700'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-3 h-3" />
          Data Preview ({table.rowCount})
        </button>
      </div>

      {/* Tab Body */}
      <div className="p-3 overflow-y-auto max-h-[260px] custom-scrollbar bg-slate-950/30">
        {activeTab === 'schema' ? (
          <div className="space-y-1.5">
            {table.columns.map((col) => {
              const fk = table.foreignKeys?.find((f) => f.fromColumn === col.name);

              return (
                <div
                  key={col.name}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800/80 border border-slate-800 transition-colors text-xs"
                >
                  <div className="flex items-center gap-2 overflow-hidden">
                    {col.isPk ? (
                      <span title="Primary Key" className="text-amber-400">
                        <Key className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    ) : fk ? (
                      <span title={`Foreign Key -> ${fk.toTable}.${fk.toColumn}`} className="text-purple-400">
                        <Link2 className="w-3.5 h-3.5 shrink-0" />
                      </span>
                    ) : (
                      <span className="w-3.5 h-3.5 block rounded-full bg-slate-700/60" />
                    )}
                    <span className="font-mono text-slate-200 truncate">{col.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {col.isPk && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold uppercase rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                        PK
                      </span>
                    )}
                    {fk && (
                      <span
                        title={`References ${fk.toTable}(${fk.toColumn})`}
                        className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-purple-500/10 text-purple-300 border border-purple-500/20"
                      >
                        FK: {fk.toTable}
                      </span>
                    )}
                    <span className="px-2 py-0.5 text-[11px] font-mono rounded bg-slate-700/60 text-slate-300 border border-slate-600/40">
                      {col.type || 'ANY'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div>
            {table.sampleRows && table.sampleRows.length > 0 ? (
              <div className="overflow-x-auto rounded border border-slate-800">
                <table className="w-full text-left text-xs border-collapse font-mono">
                  <thead>
                    <tr className="bg-slate-800 text-slate-300 border-b border-slate-700">
                      {table.sampleCols.map((colName) => (
                        <th key={colName} className="px-2.5 py-1.5 font-semibold truncate whitespace-nowrap">
                          {colName}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {table.sampleRows.map((row, rIdx) => (
                      <tr
                        key={rIdx}
                        className="border-b border-slate-800/60 hover:bg-slate-800/40 text-slate-300 transition-colors"
                      >
                        {row.map((val, cIdx) => (
                          <td key={cIdx} className="px-2.5 py-1 whitespace-nowrap truncate max-w-[140px]">
                            {val === null ? (
                              <span className="text-slate-500 italic">NULL</span>
                            ) : typeof val === 'boolean' ? (
                              val.toString()
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
              <div className="py-6 text-center text-xs text-slate-500">
                No rows in this table yet. Run an `INSERT INTO` query to add data!
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer DDL Hint */}
      <div className="px-3 py-1.5 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate">Auto-synchronized with engine</span>
        <button
          type="button"
          onClick={() => onQueryTable && onQueryTable(table.name)}
          className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 hover:underline"
        >
          Select All <ChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
