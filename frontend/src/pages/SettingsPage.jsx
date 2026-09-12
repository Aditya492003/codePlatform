import React, { useState } from 'react';
import { Sliders, Code2, Bell, Shield, Save, Check } from 'lucide-react';

export default function SettingsPage() {
  const [fontSize, setFontSize] = useState('14');
  const [tabSize, setTabSize] = useState('2');
  const [theme, setTheme] = useState('vs-dark');
  const [wordWrap, setWordWrap] = useState('on');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="flex-1 bg-[#F8F9FA] py-8 sm:py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Platform Preferences</h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Configure your Monaco editor layout, typography, and session preferences.
          </p>
        </div>

        <form onSubmit={handleSave} className="flex flex-col gap-6">
          {/* Editor Preferences */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Code2 className="w-4 h-4 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">Monaco Code Editor</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Editor Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="vs-dark">VS Dark (Calm Night)</option>
                  <option value="vs-light">VS Light</option>
                  <option value="hc-black">High Contrast</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Font Size (px)</label>
                <select
                  value={fontSize}
                  onChange={(e) => setFontSize(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="12">12px - Compact</option>
                  <option value="13.5">13.5px - Default</option>
                  <option value="15">15px - Medium</option>
                  <option value="16">16px - Large</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Tab Indentation</label>
                <select
                  value={tabSize}
                  onChange={(e) => setTabSize(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="2">2 Spaces</option>
                  <option value="4">4 Spaces</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-slate-700">Word Wrapping</label>
                <select
                  value={wordWrap}
                  onChange={(e) => setWordWrap(e.target.value)}
                  className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  <option value="on">On</option>
                  <option value="off">Off</option>
                </select>
              </div>
            </div>
          </div>

          {/* Assessment Environment */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Sliders className="w-4 h-4 text-slate-600" />
              <h2 className="text-sm font-bold text-slate-900">Workspace Behavior</h2>
            </div>

            <div className="space-y-3 text-xs sm:text-sm">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700">Auto-save in-memory code drafts on keystroke</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700">Auto-submit when timer expires on timed assessments</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" defaultChecked className="rounded text-blue-600 focus:ring-blue-500" />
                <span className="text-slate-700">Show inline helpful suggestions during PREDICT reviews</span>
              </label>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex items-center justify-between pt-2">
            {isSaved ? (
              <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                <Check className="w-4 h-4" /> Preferences saved!
              </span>
            ) : <span />}

            <button
              type="submit"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs sm:text-sm font-semibold transition-colors shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Save Preferences</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
