import React from 'react';
import Editor from '@monaco-editor/react';
import { Code, FileCode, Lock } from 'lucide-react';
import { useWorkspace } from '../../context/WorkspaceContext';

export default function MonacoCodeEditor({ language = 'javascript', isReadOnly = false }) {
  const { currentCode, updateCode, currentQuestion } = useWorkspace();

  // Normalize Monaco language name
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

  return (
    <div className="flex-1 flex flex-col min-h-0 bg-[#1E1E1E]">
      {/* Editor Tab Header */}
      <div className="h-9 bg-[#252526] border-b border-[#333333] px-3 flex items-center justify-between text-xs text-slate-400 select-none">
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
            contextmenu: true // fully enabled
          }}
          loading={
            <div className="flex items-center justify-center h-full text-slate-400 text-xs font-mono">
              Loading Editor...
            </div>
          }
        />
      </div>
    </div>
  );
}
