import React from 'react';
import Editor from '@monaco-editor/react';
import { FileCode, Lock, Play, Sparkles, Clock } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function MonacoCodeEditor({ language = 'javascript', isReadOnly = false }) {
  const {
    currentCode,
    updateCode,
    currentQuestion,
    hasStartedCoding,
    startCodingSession,
    workspaceState,
  } = useWorkspace();

  const getMonacoLanguage = () => {
    const tech = currentQuestion?.technology?.toLowerCase() || language.toLowerCase();
    if (tech === 'html') return 'html';
    if (tech === 'css') return 'css';
    return 'javascript';
  };

  const getFileName = () => {
    const lang = getMonacoLanguage();
    if (lang === 'html') return 'index.html';
    if (lang === 'css') return 'styles.css';
    return 'solution.js';
  };

  const handleEditorChange = (value) => {
    updateCode(value || '');
  };

  const showStartPrompt = !hasStartedCoding && !isReadOnly && workspaceState !== 'completed' && workspaceState !== 'evaluated';

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#1E1E1E] relative">
      {/* Editor Tab Header */}
      <div className="h-9 bg-[#252526] border-b border-[#333333] px-3 flex items-center justify-between text-xs text-slate-400 select-none z-10">
        <div className="flex items-center gap-2 font-mono text-slate-200">
          <FileCode className="w-3.5 h-3.5 text-blue-400" />
          <span>{getFileName()}</span>
          {isReadOnly && (
            <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-800/60">
              <Lock className="w-2.5 h-2.5" /> Read Only
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px] text-slate-400">
          <span className="uppercase">{getMonacoLanguage()}</span>
          <span>UTF-8</span>
          <span>Tab: 2</span>
        </div>
      </div>

      {/* Monaco Editor Component */}
      <div className="flex-1 min-h-0 relative">
        <Editor
          height="100%"
          language={getMonacoLanguage()}
          value={currentCode}
          theme="vs-dark"
          onChange={handleEditorChange}
          options={{
            readOnly: isReadOnly,
            fontSize: 13.5,
            fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, Monaco, Consolas, monospace",
            lineNumbers: 'on',
            lineNumbersMinChars: 3,
            minimap: { enabled: false },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            wordWrap: 'on',
            padding: { top: 12, bottom: 12 },
            cursorBlinking: 'smooth',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            contextmenu: true,
          }}
          loading={
            <div className="flex items-center justify-center h-full text-slate-400 text-xs font-mono">
              Loading Editor...
            </div>
          }
        />

        {/* Start Coding Overlay */}
        {showStartPrompt && (
          <div className="absolute inset-0 bg-[#1E1E1E]/80 backdrop-blur-[2px] flex items-center justify-center p-6 z-20 transition-all">
            <div className="max-w-md w-full bg-[#252526] border border-[#3E3E42] rounded-2xl p-6 shadow-2xl flex flex-col items-center text-center text-slate-200">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4 shadow-inner">
                <Play className="w-6 h-6 fill-blue-400 ml-0.5" />
              </div>

              <h3 className="text-lg font-bold text-white mb-1.5 flex items-center gap-2">
                <span>Ready to Start Coding?</span>
                <Sparkles className="w-4 h-4 text-amber-400" />
              </h3>

              <p className="text-xs text-slate-400 mb-5 leading-relaxed">
                Review the task description and requirements on the left. When you're ready, click below to start the timer and begin coding.
              </p>

              <button
                onClick={startCodingSession}
                className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-600/25 transition-all transform active:scale-98 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Start Coding & Start Timer</span>
              </button>

              <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>Clock starts only when you click start</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
