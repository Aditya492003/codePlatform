import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, ShieldCheck, Zap, Layers, Award, ArrowRight, Code2, CheckCircle2 } from 'lucide-react';
import { TECHNOLOGIES, QUESTION_TYPES } from '../data/questions';

export default function LandingPage() {
  return (
    <div className="flex-1 bg-[#F8F9FA] flex flex-col">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 border-b border-slate-200 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-700">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>Developer Code Quality & Problem-Solving Assessment</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Precision coding challenges for <br className="hidden sm:inline" />
            <span className="text-blue-600">modern web engineers.</span>
          </h1>

          <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Move beyond simple algorithm tests. Evaluate real-world HTML, CSS, and JavaScript skills across correctness, architecture, readability, and best practices in a seamless single-page workspace.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 mt-2">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors shadow-xs"
            >
              <span>Explore Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/practice"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold rounded-lg text-sm border border-slate-300 transition-colors"
            >
              <Terminal className="w-4 h-4 text-slate-600" />
              <span>Launch Single-Page Workspace</span>
            </Link>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-6 pt-10 border-t border-slate-100 max-w-xl w-full text-center">
            <div>
              <div className="text-2xl font-extrabold font-mono text-slate-900">7 Types</div>
              <div className="text-xs text-slate-500 mt-0.5">Challenge Modes</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-slate-900">20 Slots</div>
              <div className="text-xs text-slate-500 mt-0.5">Per Progressive Track</div>
            </div>
            <div>
              <div className="text-2xl font-extrabold font-mono text-slate-900">5-Metric</div>
              <div className="text-xs text-slate-500 mt-0.5">Code Quality Scoring</div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 Challenge Types Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 w-full">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Comprehensive Evaluation Types
          </h2>
          <p className="text-sm text-slate-600 mt-2 max-w-lg">
            Realistic scenarios reflecting real software engineering workflows rather than toy trivia.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Object.entries(QUESTION_TYPES).map(([typeKey, info]) => (
            <div
              key={typeKey}
              className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col gap-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold tracking-wider uppercase px-2.5 py-0.5 rounded bg-slate-100 text-slate-800 border border-slate-200">
                  {info.label}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-1">
                {info.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Single-Page Workspace</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                No route jumps or jarring modal popups. Problems, Monaco code editor, test assertions, and evaluation reviews live in one cohesive workspace.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Progressive Unlocking</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Step through 20 curated level challenges. Solve each challenge to unlock the next, with preserved in-memory code state for quick review.
              </p>
            </div>

            <div className="flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">Multi-Dimensional Scoring</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Evaluates correctness, structural clarity, readability, and best practices with automated AI qualitative feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-slate-900 text-slate-400 text-xs border-t border-slate-800 text-center">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-white text-sm">
            <Code2 className="w-4 h-4 text-blue-400" />
            <span>CodePractice Platform</span>
          </div>
          <div>Frontend UI Prototype • React + Tailwind CSS + Monaco</div>
        </div>
      </footer>
    </div>
  );
}
