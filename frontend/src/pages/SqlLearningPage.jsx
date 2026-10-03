import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';
import Editor from '@monaco-editor/react';
import { 
  Play, 
  Database, 
  RotateCcw, 
  Sparkles, 
  Download, 
  Layers, 
  Table, 
  Clock, 
  Trash2, 
  Plus, 
  Check, 
  AlertCircle,
  HelpCircle,
  Sliders,
  ChevronDown,
  Terminal,
  Code2
} from 'lucide-react';
import { SqlEngine } from '../services/sqlEngineService';
import { sqlWorkspaceService } from '../services/sqlWorkspaceService';
import { SQL_TEMPLATES } from '../data/sqlTemplates';
import SqlTableCard from '../components/sql/SqlTableCard';
import SqlResultGrid from '../components/sql/SqlResultGrid';
import SqlWorkspaceModal from '../components/sql/SqlWorkspaceModal';
import SqlTemplateModal from '../components/sql/SqlTemplateModal';

export default function SqlLearningPage() {
  const { user: clerkUser } = useUser();
  const userId = clerkUser?.id || 'usr_guest';

  // Workspace States
  const [workspaces, setWorkspaces] = useState([]);
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [isLoadingWorkspaces, setIsLoadingWorkspaces] = useState(true);

  // Engine & Editor States
  const [engine, setEngine] = useState(null);
  const [isEngineReady, setIsEngineReady] = useState(false);
  const [sqlDraft, setSqlDraft] = useState('');
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [schema, setSchema] = useState({ tables: [] });

  // Modals & Panels
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'history'
  const [activeRightTab, setActiveRightTab] = useState('all'); // 'all' | 'tables' | 'results'
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saving' | 'saved' | 'idle'
  const [ddlModalTable, setDdlModalTable] = useState(null);

  const editorRef = useRef(null);
  const saveTimeoutRef = useRef(null);

  const [engineError, setEngineError] = useState(null);

  // Initialize SQLite Engine
  useEffect(() => {
    let isMounted = true;
    let currentEngine = null;

    async function init() {
      try {
        setEngineError(null);
        currentEngine = new SqlEngine();
        await currentEngine.init();
        if (isMounted) {
          setEngine(currentEngine);
          setIsEngineReady(true);
        }
      } catch (err) {
        console.error('Failed to initialize SqlEngine:', err);
        if (isMounted) {
          setEngineError(err.message || 'Failed to initialize SQLite engine.');
        }
      }
    }
    init();

    return () => {
      isMounted = false;
      if (currentEngine) currentEngine.close();
    };
  }, []);

  // Fetch or create initial workspace
  const loadWorkspaces = useCallback(async () => {
    setIsLoadingWorkspaces(true);
    try {
      let list = await sqlWorkspaceService.getWorkspaces(userId);
      if (!list || list.length === 0) {
        // Create default initial workspace
        const initialTpl = SQL_TEMPLATES[0]; // E-Commerce
        const defaultWs = await sqlWorkspaceService.createWorkspace(
          {
            workspaceName: 'E-Commerce SQL Lab',
            description: 'Learn SQL with real-time relational tables and JOINs',
            templateType: 'ECOMMERCE',
            sqlDraft: initialTpl.sql,
          },
          userId
        );
        list = [defaultWs];
      }

      setWorkspaces(list);

      // Load full active workspace
      const targetId = list[0]._id;
      const fullWs = await sqlWorkspaceService.getWorkspaceById(targetId, userId);
      setActiveWorkspace(fullWs);
      setSqlDraft(fullWs.sqlDraft || '');
    } catch (err) {
      console.error('Failed to load SQL workspaces:', err);
    } finally {
      setIsLoadingWorkspaces(false);
    }
  }, [userId]);

  useEffect(() => {
    loadWorkspaces();
  }, [loadWorkspaces]);

  // When activeWorkspace or engine changes, restore or execute DB state
  useEffect(() => {
    if (!engine || !isEngineReady || !activeWorkspace) return;

    async function hydrateEngine() {
      try {
        if (activeWorkspace.binaryDbBase64) {
          await engine.init(activeWorkspace.binaryDbBase64);
        } else {
          await engine.init();
          // If empty and has draft, run initial draft to populate tables
          if (activeWorkspace.sqlDraft) {
            const res = engine.execute(activeWorkspace.sqlDraft);
            setExecutionResult(res);
          }
        }
        const currentSchema = engine.introspectSchema();
        setSchema(currentSchema);
      } catch (e) {
        console.warn('Hydration error:', e);
      }
    }

    hydrateEngine();
  }, [engine, isEngineReady, activeWorkspace?._id]);

  // Execute SQL
  const handleExecuteSql = useCallback(
    async (customSql = null) => {
      if (!engine || !isEngineReady) return;

      const codeToRun = customSql !== null ? customSql : sqlDraft;
      if (!codeToRun || !codeToRun.trim()) return;

      setIsExecuting(true);
      try {
        const result = engine.execute(codeToRun);
        setExecutionResult(result);
        if (result.schema) {
          setSchema(result.schema);
        }

        // Auto-save history item and binary state
        if (activeWorkspace) {
          const binaryDbBase64 = engine.exportBase64();
          const newHistoryItem = {
            query: codeToRun.length > 200 ? codeToRun.substring(0, 200) + '...' : codeToRun,
            executionTimeMs: result.executionTimeMs,
            rowsAffected: result.rowsModified || (result.results?.[0]?.rowCount || 0),
            status: result.success ? 'success' : 'error',
            errorMessage: result.error || '',
          };

          // Optimistically update activeWorkspace
          setActiveWorkspace((prev) => ({
            ...prev,
            queryHistory: [newHistoryItem, ...(prev?.queryHistory || [])].slice(0, 50),
          }));

          sqlWorkspaceService.updateWorkspace(
            activeWorkspace._id,
            {
              sqlDraft: codeToRun,
              binaryDbBase64,
              schemaSnapshot: result.schema,
              newHistoryItem,
            },
            userId
          ).catch((e) => console.warn('History save failed:', e));
        }
      } catch (err) {
        setExecutionResult({
          success: false,
          error: err.message || 'Execution failed',
          executionTimeMs: 0,
        });
      } finally {
        setIsExecuting(false);
      }
    },
    [engine, isEngineReady, sqlDraft, activeWorkspace, userId]
  );

  // Debounced auto-save of sqlDraft
  const handleEditorChange = (value) => {
    const val = value || '';
    setSqlDraft(val);
    setSaveStatus('saving');

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(async () => {
      if (activeWorkspace) {
        try {
          await sqlWorkspaceService.updateWorkspace(
            activeWorkspace._id,
            { sqlDraft: val },
            userId
          );
          setSaveStatus('saved');
        } catch (e) {
          console.warn('Auto-save failed:', e);
          setSaveStatus('idle');
        }
      }
    }, 1200);
  };

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter
  const handleEditorMount = (editor, monaco) => {
    editorRef.current = editor;

    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
      const selection = editor.getModel().getValueInRange(editor.getSelection());
      if (selection && selection.trim()) {
        handleExecuteSql(selection);
      } else {
        handleExecuteSql();
      }
    });
  };

  // Switch active workspace
  const handleSelectWorkspace = async (workspaceId) => {
    if (workspaceId === activeWorkspace?._id) return;
    try {
      setIsLoadingWorkspaces(true);
      const fullWs = await sqlWorkspaceService.getWorkspaceById(workspaceId, userId);
      setActiveWorkspace(fullWs);
      setSqlDraft(fullWs.sqlDraft || '');
      setExecutionResult(null);
    } catch (err) {
      console.error('Failed to switch workspace:', err);
    } finally {
      setIsLoadingWorkspaces(false);
    }
  };

  // Create workspace
  const handleCreateWorkspace = async (workspaceData) => {
    const newWs = await sqlWorkspaceService.createWorkspace(workspaceData, userId);
    setWorkspaces((prev) => [newWs, ...prev]);
    setActiveWorkspace(newWs);
    setSqlDraft(newWs.sqlDraft || '');
    setExecutionResult(null);
  };

  // Delete workspace
  const handleDeleteWorkspace = async (workspaceId) => {
    await sqlWorkspaceService.deleteWorkspace(workspaceId, userId);
    const updated = workspaces.filter((w) => w._id !== workspaceId);
    setWorkspaces(updated);
    if (activeWorkspace?._id === workspaceId && updated.length > 0) {
      handleSelectWorkspace(updated[0]._id);
    }
  };

  // Rename workspace
  const handleRenameWorkspace = async (workspaceId, newName) => {
    const updated = await sqlWorkspaceService.updateWorkspace(
      workspaceId,
      { workspaceName: newName },
      userId
    );
    setWorkspaces((prev) =>
      prev.map((w) => (w._id === workspaceId ? { ...w, workspaceName: newName } : w))
    );
    if (activeWorkspace?._id === workspaceId) {
      setActiveWorkspace((prev) => ({ ...prev, workspaceName: newName }));
    }
  };

  // Load template into current workspace
  const handleLoadTemplate = async (template) => {
    setSqlDraft(template.sql);
    if (activeWorkspace) {
      await sqlWorkspaceService.updateWorkspace(
        activeWorkspace._id,
        { sqlDraft: template.sql, templateType: template.id },
        userId
      );
      setActiveWorkspace((prev) => ({
        ...prev,
        sqlDraft: template.sql,
        templateType: template.id,
      }));
    }
    handleExecuteSql(template.sql);
  };

  // Quick Action: Query Table
  const handleQueryTable = (tableName) => {
    const query = `SELECT * FROM "${tableName}" LIMIT 50;`;
    setSqlDraft((prev) => (prev ? `${prev}\n\n-- Quick Query:\n${query}` : query));
    handleExecuteSql(query);
  };

  // Quick Action: Drop Table
  const handleDropTable = (tableName) => {
    if (window.confirm(`Are you sure you want to DROP TABLE "${tableName}"?`)) {
      const dropSql = `DROP TABLE "${tableName}";`;
      handleExecuteSql(dropSql);
    }
  };

  // Reset database state
  const handleResetDatabase = async () => {
    if (!window.confirm('Reset database? This will clear all data and re-run your draft queries.')) {
      return;
    }
    if (engine) {
      await engine.init();
      if (sqlDraft) {
        const res = engine.execute(sqlDraft);
        setExecutionResult(res);
        setSchema(res.schema || { tables: [] });
      } else {
        setSchema({ tables: [] });
        setExecutionResult(null);
      }
    }
  };

  // Export database as .sqlite file
  const handleExportDatabase = () => {
    if (!engine) return;
    const blob = engine.exportBlob();
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeWorkspace?.workspaceName?.replace(/\s+/g, '_') || 'database'}_${Date.now()}.sqlite`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Insert SQL Snippet helper
  const handleInsertSnippet = (snippet) => {
    if (editorRef.current) {
      const editor = editorRef.current;
      const position = editor.getPosition();
      editor.executeEdits('', [
        {
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
          text: snippet,
        },
      ]);
      editor.focus();
    } else {
      setSqlDraft((prev) => `${prev}\n${snippet}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0B1120] text-slate-100 min-h-[calc(100vh-3.5rem)] select-none">
      {/* Top SQL Studio Toolbar */}
      <header className="h-14 bg-slate-900/95 border-b border-slate-800 px-4 sm:px-6 flex items-center justify-between gap-4 sticky top-0 z-20 backdrop-blur-md">
        {/* Workspace Selector & Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight text-white flex items-center gap-1.5">
                  SQL Studio
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Interactive
                </span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 mx-1 hidden sm:block" />

          {/* Workspace Pill Dropdown */}
          <button
            type="button"
            onClick={() => setIsWorkspaceModalOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 hover:border-cyan-500/50 text-xs font-medium text-slate-200 transition-all shadow-sm"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span className="max-w-[140px] sm:max-w-[200px] truncate">
              {activeWorkspace ? activeWorkspace.workspaceName : 'Loading Workspace...'}
            </span>
            <span className="text-[11px] text-slate-400 font-mono">
              ({workspaces.length}/5)
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 ml-0.5" />
          </button>
        </div>

        {/* Center/Right Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Templates Trigger */}
          <button
            type="button"
            onClick={() => setIsTemplateModalOpen(true)}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-medium text-purple-300 hover:text-purple-200 hover:border-purple-500/40 transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Templates</span>
          </button>

          {/* Reset DB Button */}
          <button
            type="button"
            onClick={handleResetDatabase}
            title="Reset Database to Clean State"
            className="p-1.5 md:px-2.5 md:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Reset DB</span>
          </button>

          {/* Export SQLite File */}
          <button
            type="button"
            onClick={handleExportDatabase}
            title="Export SQLite database (.sqlite file)"
            className="p-1.5 md:px-2.5 md:py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-slate-100 text-xs font-medium border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Export DB</span>
          </button>

          {/* PRIMARY RUN QUERY BUTTON */}
          <button
            type="button"
            onClick={() => handleExecuteSql()}
            disabled={isExecuting || !isEngineReady}
            className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-bold text-white shadow-lg transition-all ${
              isExecuting || !isEngineReady
                ? 'bg-slate-700 cursor-not-allowed text-slate-400'
                : 'bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-emerald-500/20 active:scale-95'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isExecuting ? 'animate-spin' : ''}`} />
            <span>{isExecuting ? 'Running...' : 'Run Query'}</span>
            <span className="hidden sm:inline-block px-1.5 py-0.2 rounded bg-black/20 text-[10px] font-mono text-emerald-100">
              Ctrl+↵
            </span>
          </button>
        </div>
      </header>

      {/* Engine Error Alert */}
      {engineError && (
        <div className="bg-rose-500/10 border-b border-rose-500/30 px-6 py-2.5 flex items-center justify-between text-xs text-rose-300">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span><strong>SQL Engine Notice:</strong> {engineError}</span>
          </div>
          <button
            onClick={() => window.location.reload()}
            className="px-2.5 py-1 rounded bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 text-xs font-semibold"
          >
            Reload Engine
          </button>
        </div>
      )}

      {/* Main Studio Body (Split Panels) */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* LEFT PANEL: SQL Query Editor & History (50% on desktop) */}
        <div className="flex-1 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-800 min-h-[380px] lg:min-h-0 bg-[#0F172A]/80">
          {/* Editor Sub-Header Toolbar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-2">
            {/* Tabs */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab('editor')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'editor'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Code2 className="w-3.5 h-3.5" />
                SQL Editor
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('history')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
                  activeTab === 'history'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                History ({activeWorkspace?.queryHistory?.length || 0})
              </button>
            </div>

            {/* Auto-Save & Shortcut Hints */}
            <div className="flex items-center gap-3 text-[11px] text-slate-500">
              <span className="hidden sm:inline">Highlight query to run subset</span>
              <span className="flex items-center gap-1">
                {saveStatus === 'saving' ? (
                  <span className="text-amber-400">Saving...</span>
                ) : (
                  <span className="text-slate-400 flex items-center gap-0.5">
                    <Check className="w-3 h-3 text-emerald-400" /> Saved
                  </span>
                )}
              </span>
            </div>
          </div>

          {/* Quick SQL Snippets Bar */}
          {activeTab === 'editor' && (
            <div className="px-3 py-1.5 bg-slate-950/80 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              <span className="text-slate-500 font-semibold uppercase tracking-wider text-[10px] mr-1 shrink-0">
                Snippets:
              </span>
              {[
                { label: 'SELECT *', sql: 'SELECT * FROM ;' },
                { label: 'INNER JOIN', sql: 'SELECT *\nFROM table1 t1\nJOIN table2 t2 ON t1.id = t2.t1_id;' },
                { label: 'LEFT JOIN', sql: 'SELECT *\nFROM table1 t1\nLEFT JOIN table2 t2 ON t1.id = t2.t1_id;' },
                { label: 'GROUP BY & COUNT', sql: 'SELECT category, COUNT(*) AS total\nFROM products\nGROUP BY category;' },
                { label: 'CREATE TABLE', sql: 'CREATE TABLE example (\n  id INTEGER PRIMARY KEY AUTOINCREMENT,\n  name TEXT NOT NULL\n);' },
                { label: 'INSERT INTO', sql: 'INSERT INTO example (name) VALUES (\'Sample\');' },
              ].map((snip, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleInsertSnippet(snip.sql)}
                  className="px-2.5 py-0.5 rounded bg-slate-800/90 hover:bg-cyan-600/30 text-slate-300 hover:text-cyan-200 border border-slate-700/60 hover:border-cyan-500/40 whitespace-nowrap transition-all font-mono"
                >
                  {snip.label}
                </button>
              ))}
            </div>
          )}

          {/* Editor Body */}
          <div className="flex-1 relative overflow-hidden">
            {activeTab === 'editor' ? (
              <Editor
                height="100%"
                defaultLanguage="sql"
                language="sql"
                value={sqlDraft}
                onChange={handleEditorChange}
                onMount={handleEditorMount}
                theme="vs-dark"
                options={{
                  fontSize: 13,
                  lineNumbers: 'on',
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  wordWrap: 'on',
                  tabSize: 2,
                  automaticLayout: true,
                  fontFamily: "'JetBrains Mono', 'Fira Code', Menlo, monospace",
                  suggestOnTriggerCharacters: true,
                }}
              />
            ) : (
              /* Query History View */
              <div className="h-full overflow-y-auto custom-scrollbar p-4 space-y-2.5">
                {activeWorkspace?.queryHistory && activeWorkspace.queryHistory.length > 0 ? (
                  activeWorkspace.queryHistory.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-slate-900 border border-slate-800 hover:border-cyan-500/40 transition-all text-xs"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span
                            className={`px-1.5 py-0.5 rounded text-[10px] font-bold uppercase ${
                              item.status === 'success'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                            }`}
                          >
                            {item.status}
                          </span>
                          <span className="text-[11px] text-slate-500">
                            {new Date(item.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setSqlDraft(item.query);
                            setActiveTab('editor');
                          }}
                          className="text-cyan-400 hover:text-cyan-300 font-medium"
                        >
                          Restore to Editor
                        </button>
                      </div>
                      <pre className="p-2 rounded bg-slate-950/60 font-mono text-slate-300 whitespace-pre-wrap break-all overflow-x-auto text-[11px]">
                        {item.query}
                      </pre>
                      {item.errorMessage && (
                        <p className="mt-1 text-rose-400 text-[11px] font-mono">{item.errorMessage}</p>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 text-xs">
                    <Clock className="w-6 h-6 mb-2 text-slate-600" />
                    <p>No queries recorded in history yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Live Visual Tables & Query Results (50% on desktop) */}
        <div className="flex-1 flex flex-col min-h-[420px] lg:min-h-0 bg-[#090D16]">
          {/* Right Sub-Header Bar */}
          <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveRightTab('all')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeRightTab === 'all'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                All ({schema.tables.length} Tables)
              </button>

              <button
                type="button"
                onClick={() => setActiveRightTab('results')}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  activeRightTab === 'results'
                    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                Query Output
              </button>
            </div>

            {/* Live Synchronized Pill */}
            <div className="flex items-center gap-2 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-400 text-[11px]">Live Preview Active</span>
            </div>
          </div>

          {/* Right Panel Main View */}
          <div className="flex-1 p-4 overflow-y-auto custom-scrollbar flex flex-col gap-4">
            {/* 1. Live Visual Side-by-Side Tables Grid */}
            {(activeRightTab === 'all' || activeRightTab === 'tables') && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                    <Table className="w-4 h-4 text-cyan-400" />
                    <span>Live Database Schema & Created Tables ({schema.tables.length})</span>
                  </h3>
                  {schema.tables.length > 0 && (
                    <span className="text-[11px] text-slate-500">
                      Side-by-side live relational preview
                    </span>
                  )}
                </div>

                {schema.tables.length > 0 ? (
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-3.5">
                    {schema.tables.map((table) => (
                      <SqlTableCard
                        key={table.name}
                        table={table}
                        onQueryTable={handleQueryTable}
                        onDropTable={handleDropTable}
                        onShowDdl={(t) => setDdlModalTable(t)}
                      />
                    ))}
                  </div>
                ) : (
                  /* Empty state when no tables created yet */
                  <div className="p-8 rounded-xl border border-dashed border-slate-800 bg-slate-950/40 text-center flex flex-col items-center justify-center">
                    <div className="p-3 rounded-full bg-slate-900 border border-slate-800 text-cyan-400 mb-3">
                      <Table className="w-6 h-6" />
                    </div>
                    <h4 className="font-semibold text-sm text-slate-200">No Tables in this Workspace Yet</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-sm">
                      Execute a <code className="text-cyan-400 font-mono">CREATE TABLE</code> statement or click <strong>Templates</strong> above to load a full relational schema.
                    </p>
                    <button
                      type="button"
                      onClick={() => setIsTemplateModalOpen(true)}
                      className="mt-4 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-white text-xs font-semibold shadow-md transition-all"
                    >
                      Load Sample Dataset
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 2. Live Query Result Grid */}
            {(activeRightTab === 'all' || activeRightTab === 'results') && (
              <div className="flex-1 flex flex-col min-h-[300px] space-y-2 mt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span>Execution Output & Result Sets</span>
                </h3>
                <div className="flex-1 min-h-[260px]">
                  <SqlResultGrid
                    executionResult={executionResult}
                    isExecuting={isExecuting}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workspace Management Modal */}
      <SqlWorkspaceModal
        isOpen={isWorkspaceModalOpen}
        onClose={() => setIsWorkspaceModalOpen(false)}
        workspaces={workspaces}
        activeWorkspaceId={activeWorkspace?._id}
        onSelectWorkspace={handleSelectWorkspace}
        onCreateWorkspace={handleCreateWorkspace}
        onDeleteWorkspace={handleDeleteWorkspace}
        onRenameWorkspace={handleRenameWorkspace}
      />

      {/* Template Selector Modal */}
      <SqlTemplateModal
        isOpen={isTemplateModalOpen}
        onClose={() => setIsTemplateModalOpen(false)}
        onLoadTemplate={handleLoadTemplate}
      />

      {/* DDL Structure Viewer Modal */}
      {ddlModalTable && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
              <h3 className="font-bold text-sm text-slate-100 flex items-center gap-2">
                <Table className="w-4 h-4 text-cyan-400" />
                DDL Structure: {ddlModalTable.name}
              </h3>
              <button
                type="button"
                onClick={() => setDdlModalTable(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                ✕
              </button>
            </div>
            <pre className="p-4 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs text-cyan-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
              {ddlModalTable.ddlSql || `CREATE TABLE ${ddlModalTable.name} (...)`}
            </pre>
            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setDdlModalTable(null)}
                className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-white"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
