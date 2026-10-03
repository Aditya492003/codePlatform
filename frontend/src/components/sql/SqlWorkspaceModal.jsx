import React, { useState } from 'react';
import { 
  X, 
  Database, 
  Plus, 
  Trash2, 
  Edit3, 
  Check, 
  Clock, 
  Layers, 
  AlertCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { SQL_TEMPLATES } from '../../data/sqlTemplates';

export default function SqlWorkspaceModal({
  isOpen,
  onClose,
  workspaces = [],
  activeWorkspaceId,
  onSelectWorkspace,
  onCreateWorkspace,
  onDeleteWorkspace,
  onRenameWorkspace,
}) {
  const [isCreating, setIsCreating] = useState(false);
  const [newWsName, setNewWsName] = useState('');
  const [newWsDesc, setNewWsDesc] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('BLANK');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const maxWorkspaces = 5;
  const isFull = workspaces.length >= maxWorkspaces;

  const handleStartCreate = () => {
    if (isFull) {
      setErrorMsg('Workspace limit reached (5/5). Delete an existing workspace first.');
      return;
    }
    setErrorMsg('');
    setNewWsName(`SQL Workspace ${workspaces.length + 1}`);
    setNewWsDesc('');
    setSelectedTemplate('BLANK');
    setIsCreating(true);
  };

  const handleConfirmCreate = async (e) => {
    e.preventDefault();
    if (!newWsName.trim()) {
      setErrorMsg('Please enter a workspace name.');
      return;
    }

    try {
      const tpl = SQL_TEMPLATES.find((t) => t.id === selectedTemplate) || SQL_TEMPLATES[0];
      await onCreateWorkspace({
        workspaceName: newWsName.trim(),
        description: newWsDesc.trim(),
        templateType: selectedTemplate,
        sqlDraft: tpl.sql || '',
      });
      setIsCreating(false);
      onClose();
    } catch (err) {
      setErrorMsg(err.message || 'Failed to create workspace.');
    }
  };

  const handleStartEdit = (ws) => {
    setEditingId(ws._id);
    setEditName(ws.workspaceName);
  };

  const handleSaveEdit = async (wsId) => {
    if (!editName.trim()) return;
    try {
      await onRenameWorkspace(wsId, editName.trim());
      setEditingId(null);
    } catch (err) {
      setErrorMsg(err.message || 'Failed to rename workspace.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-100">SQL Workspaces</h3>
              <p className="text-xs text-slate-400">
                Manage your isolated database playgrounds ({workspaces.length}/{maxWorkspaces})
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

        {/* Capacity Bar */}
        <div className="px-6 py-3 bg-slate-900/90 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1 max-w-sm">
            <span className="text-xs text-slate-400 whitespace-nowrap">
              Capacity: <strong className="text-slate-200">{workspaces.length} / {maxWorkspaces}</strong>
            </span>
            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  workspaces.length >= 5
                    ? 'bg-rose-500'
                    : workspaces.length >= 4
                    ? 'bg-amber-400'
                    : 'bg-gradient-to-r from-cyan-500 to-emerald-400'
                }`}
                style={{ width: `${(workspaces.length / maxWorkspaces) * 100}%` }}
              />
            </div>
          </div>

          {!isCreating && (
            <button
              type="button"
              onClick={handleStartCreate}
              disabled={isFull}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                isFull
                  ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-cyan-500/20'
              }`}
            >
              <Plus className="w-4 h-4" />
              New Workspace
            </button>
          )}
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-3 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-4">
          {isCreating ? (
            <form onSubmit={handleConfirmCreate} className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/30 space-y-3">
                <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2">
                  <Sparkles className="w-4 h-4" /> Create New Workspace
                </h4>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Workspace Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newWsName}
                    onChange={(e) => setNewWsName(e.target.value)}
                    placeholder="e.g., E-Commerce Analytics, Joins Practice"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Description (Optional)
                  </label>
                  <input
                    type="text"
                    value={newWsDesc}
                    onChange={(e) => setNewWsDesc(e.target.value)}
                    placeholder="e.g. Practice querying multiple joined tables"
                    className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-2">
                    Initial Template & Schema
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {SQL_TEMPLATES.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => setSelectedTemplate(tpl.id)}
                        className={`p-3 rounded-xl border cursor-pointer transition-all ${
                          selectedTemplate === tpl.id
                            ? 'bg-cyan-500/10 border-cyan-500 text-cyan-200'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-xs text-slate-100">{tpl.name}</span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700">
                            {tpl.badge}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 leading-relaxed">
                          {tpl.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreating(false)}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white transition-all shadow-md shadow-cyan-500/20"
                  >
                    Create Workspace
                  </button>
                </div>
              </div>
            </form>
          ) : null}

          {/* Workspace List */}
          <div className="space-y-2.5">
            {workspaces.map((ws) => {
              const isActive = ws._id === activeWorkspaceId;
              const isEditing = editingId === ws._id;

              return (
                <div
                  key={ws._id}
                  className={`p-4 rounded-xl border transition-all duration-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    isActive
                      ? 'bg-cyan-500/10 border-cyan-500/50 shadow-md shadow-cyan-500/5'
                      : 'bg-slate-950/40 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-2 py-1 rounded bg-slate-900 border border-cyan-500 text-xs text-white"
                          />
                          <button
                            type="button"
                            onClick={() => handleSaveEdit(ws._id)}
                            className="p-1 rounded bg-cyan-600 text-white hover:bg-cyan-500"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <h4 className="font-semibold text-sm text-slate-100 flex items-center gap-2 truncate">
                          {ws.workspaceName}
                          {isActive && (
                            <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                              Active
                            </span>
                          )}
                        </h4>
                      )}
                    </div>

                    {ws.description && (
                      <p className="text-xs text-slate-400 mt-1 truncate">{ws.description}</p>
                    )}

                    <div className="flex items-center gap-3 mt-2 text-[11px] text-slate-500">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        Updated {new Date(ws.updatedAt || ws.createdAt).toLocaleDateString()}
                      </span>
                      <span>•</span>
                      <span className="text-cyan-400/80">Template: {ws.templateType || 'BLANK'}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    {!isActive && (
                      <button
                        type="button"
                        onClick={() => {
                          onSelectWorkspace(ws._id);
                          onClose();
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-cyan-600 hover:text-white text-slate-300 text-xs font-medium transition-all"
                      >
                        Switch <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => handleStartEdit(ws)}
                      title="Rename Workspace"
                      className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>

                    {workspaces.length > 1 && (
                      <button
                        type="button"
                        onClick={() => onDeleteWorkspace(ws._id)}
                        title="Delete Workspace"
                        className="p-1.5 rounded-lg hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>Each workspace keeps its own tables, queries, and history completely isolated.</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
