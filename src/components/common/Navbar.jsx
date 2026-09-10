import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Code2, LayoutDashboard, Trophy, User, Settings, Award } from 'lucide-react';
import { useProgress } from '../../context/ProgressContext';
import { mockUser } from '../../data/mockUser';

export default function Navbar() {
  const location = useLocation();
  const { userRating } = useProgress();

  const isLinkActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 sticky top-0 z-40">
      {/* Brand & Main Nav Links */}
      <div className="flex items-center gap-7">
        <Link to="/" className="flex items-center gap-2.5 font-bold text-slate-900 tracking-tight text-lg">
          <div className="w-7 h-7 rounded-md bg-slate-900 text-white flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <span>CodePractice</span>
        </Link>

        {/* Navigation Links (Practice removed, added Top Rankers, Profile, Settings) */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/dashboard"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isLinkActive('/dashboard')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard</span>
          </Link>

          <Link
            to="/leaderboard"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isLinkActive('/leaderboard')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            <span>Top Rankers</span>
          </Link>

          <Link
            to="/profile"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isLinkActive('/profile')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <User className="w-4 h-4" />
            <span>Profile</span>
          </Link>

          <Link
            to="/settings"
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              isLinkActive('/settings')
                ? 'bg-blue-50 text-blue-600 font-semibold'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Settings</span>
          </Link>
        </div>
      </div>

      {/* Right User Stats & Profile Pill */}
      <div className="flex items-center gap-3">
        {/* Rating Pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-xs font-semibold text-slate-700">
          <Award className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-slate-500 font-normal">Rating</span>
          <span className="font-mono font-bold text-slate-900">{userRating}</span>
        </div>

        <Link
          to="/profile"
          className={`flex items-center gap-2 p-1 rounded-full border transition-colors ${
            isLinkActive('/profile') ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'
          }`}
          title="View Profile"
        >
          <img
            src={mockUser.avatarUrl}
            alt={mockUser.username}
            className="w-7 h-7 rounded-full object-cover"
          />
        </Link>
      </div>
    </nav>
  );
}
