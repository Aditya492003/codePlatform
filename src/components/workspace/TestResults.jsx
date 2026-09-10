import React, { useState } from 'react';
import { CheckCircle2, XCircle, Terminal, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function TestResults() {
  const { testResults, workspaceState } = useWorkspace();
  const [activeTab, setActiveTab] = useState('cases'); // 'cases' | 'logs'
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!testResults || workspaceState !== 'test_results') return null;

  const { tests = [], testsPassed = 0, totalTests = 0, logs = [] } = testResults;
  const isAllPassed = testsPassed === totalTests;

  return (
    <div className="bg-[#111827] border-t border-slate-700 flex flex-col flex-shrink-0 transition-all">
      {/* Drawer Bar */}
      <div className="h-9 bg-[#1E293B] px-4 flex items-center justify-between border-b border-slate-700 text-xs select-none">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isAllPassed ? (
              <span className="flex items-center gap-1.5 text-emerald-400 font-semibold font-mono">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Passed {testsPassed}/{totalTests} Tests</span>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-red-400 font-semibold font-mono">
                <XCircle className="w-3.5 h-3.5" />
                <span>{testsPassed}/{totalTests} Tests Passed</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 border-l border-slate-700 pl-3">
            <button
              onClick={() => setActiveTab('cases')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeTab === 'cases' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Test Cases ({tests.length})
            </button>
            <button
              onClick={() => setActiveTab('logs')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${
                activeTab === 'logs' ? 'bg-slate-700 text-white' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Runner Logs
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-700"
            title={isCollapsed ? 'Expand Test Results' : 'Collapse Test Results'}
          >
            {isCollapsed ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      {!isCollapsed && (
        <div className="h-44 overflow-y-auto p-3.5 font-mono text-xs text-slate-300 flex flex-col gap-2">
          {activeTab === 'cases' ? (
            <div className="space-y-2">
              {tests.map((tc, idx) => (
                <div
                  key={tc.id || idx}
                  className="bg-[#182234] border border-slate-800 rounded p-2.5 flex flex-col gap-1.5"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {tc.status === 'passed' ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <XCircle className="w-3.5 h-3.5 text-red-400" />
                      )}
                      <span className="font-semibold text-slate-200">{tc.name}</span>
                    </div>
                    <span className="text-[11px] text-slate-500">{tc.duration || '1ms'}</span>
                  </div>

                  {tc.input && (
                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-[#0B1120] p-1.5 rounded border border-slate-800/80">
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Input:</span>
                        <span className="text-slate-300">{tc.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10px] uppercase">Expected:</span>
                        <span className="text-emerald-400">{tc.expected}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#0B1120] p-3 rounded border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="flex items-center gap-1.5 text-slate-500 mb-2 border-b border-slate-800 pb-1">
                <Terminal className="w-3 h-3" />
                <span>Isolated Sandbox Console</span>
              </div>
              {logs.map((log, i) => (
                <div key={i} className="text-slate-300">{log}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
