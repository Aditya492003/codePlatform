import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Award, CheckCircle2, Target, Sparkles, ArrowRight, Play } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { mockUser } from '../data/mockUser';
import TechnologySelector from '../components/dashboard/TechnologySelector';
import DifficultySelector from '../components/dashboard/DifficultySelector';
import LevelSelector from '../components/dashboard/LevelSelector';
import ActivityList from '../components/dashboard/ActivityList';

export default function DashboardPage() {
  const navigate = useNavigate();
  const {
    selectedTech,
    setSelectedTech,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedLevel,
    setSelectedLevel,
    userRating,
    solvedCount
  } = useProgress();

  const handleStartPractice = () => {
    const techPrefix = selectedTech === 'JavaScript' ? 'js' : selectedTech.toLowerCase();
    const diffPrefix = selectedDifficulty.toLowerCase().slice(0, 3);
    const targetId = `${techPrefix}-${diffPrefix}-l${selectedLevel}-q01`;
    navigate(`/practice/${targetId}`);
  };

  return (
    <div className="flex-1 bg-[#F8F9FA] py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Header Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Developer Assessment Workspace
            </h1>
            <p className="text-sm text-slate-600 mt-1">
              Select a technology and difficulty level to test your code quality, structure, and problem-solving mastery.
            </p>
          </div>

          <button
            onClick={handleStartPractice}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-semibold shadow-xs transition-colors self-start sm:self-auto"
          >
            <Play className="w-4 h-4 fill-white" />
            <span>Continue Practice</span>
          </button>
        </div>

        {/* 4 Core Stat Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Overall Rating
            </span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 my-2">
              {userRating}
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
              <Award className="w-3.5 h-3.5" />
              <span>Top 8% globally</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Problems Solved
            </span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 my-2">
              {solvedCount}
            </div>
            <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
              <span>Across HTML, CSS, JS</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Pass Accuracy
            </span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 my-2">
              {mockUser.accuracy}%
            </div>
            <div className="flex items-center gap-1 text-xs text-emerald-600 font-semibold">
              <Target className="w-3.5 h-3.5" />
              <span>High consistency</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              Avg Code Quality
            </span>
            <div className="text-3xl font-extrabold font-mono text-slate-900 my-2">
              {mockUser.averageCodeQuality}
            </div>
            <div className="flex items-center gap-1 text-xs text-blue-600 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Evaluated by best practices</span>
            </div>
          </div>
        </div>

        {/* Challenge Track Configuration Panel */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-7 shadow-xs flex flex-col gap-6">
          <div>
            <h2 className="text-base font-bold text-slate-900">
              Configure Next Assessment
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Each level contains 20 progressive, unlocked challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <TechnologySelector
              selected={selectedTech}
              onSelect={setSelectedTech}
            />

            <DifficultySelector
              selected={selectedDifficulty}
              onSelect={setSelectedDifficulty}
            />

            <LevelSelector
              selected={selectedLevel}
              onSelect={setSelectedLevel}
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
              <span className="w-2 h-2 rounded-full bg-blue-600" />
              <span>
                Selected: <strong className="text-slate-900">{selectedTech}</strong> • <strong className="text-slate-900">{selectedDifficulty}</strong> • <strong className="text-slate-900">Level {selectedLevel}</strong> (20 Challenges)
              </span>
            </div>

            <button
              onClick={handleStartPractice}
              className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              <span>Launch Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Technology Ratings & Difficulty Progress Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Tech Breakdown */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Technology Skill Ratings
            </h3>

            <div className="space-y-3">
              {Object.entries(mockUser.skillRatings).map(([tech, rating]) => (
                <div key={tech} className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="font-semibold text-xs sm:text-sm text-slate-800">{tech}</span>
                  <span className="font-mono font-bold text-xs sm:text-sm text-blue-600">{rating} Rating</span>
                </div>
              ))}
            </div>
          </div>

          {/* Difficulty Mastery */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col gap-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Difficulty Tier Mastery
            </h3>

            <div className="space-y-3">
              {Object.entries(mockUser.difficultyProgress).map(([diff, prog]) => (
                <div key={diff} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                    <span>{diff}</span>
                    <span className="font-mono text-slate-500">{prog.completed}/{prog.total} ({prog.percentage}%)</span>
                  </div>
                  <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
                    <div
                      className="h-full bg-slate-900 rounded-full transition-all"
                      style={{ width: `${prog.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity Table */}
        <ActivityList />
      </div>
    </div>
  );
}
