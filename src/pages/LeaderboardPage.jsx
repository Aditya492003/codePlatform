import React, { useState } from 'react';
import { Trophy, Medal, Flame, Search, Target, CheckCircle2, Award, ArrowUpRight, Filter } from 'lucide-react';
import { mockLeaderboard } from '../data/mockLeaderboard';
import { mockUser } from '../data/mockUser';
import { useProgress } from '../context/ProgressContext';

export default function LeaderboardPage() {
  const { userRating, solvedCount } = useProgress();
  const [selectedTechFilter, setSelectedTechFilter] = useState('All');
  const [timeframe, setTimeframe] = useState('all-time');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter rankers
  const filteredRankers = mockLeaderboard.filter((user) => {
    const matchesTech =
      selectedTechFilter === 'All' ||
      user.primaryTech.toLowerCase() === selectedTechFilter.toLowerCase();
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTech && matchesSearch;
  });

  const topThree = mockLeaderboard.slice(0, 3);

  return (
    <div className="flex-1 bg-[#F8F9FA] py-8 sm:py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Header Hero */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
                <Trophy className="w-4 h-4" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Global Top Rankers
              </h1>
            </div>
            <p className="text-sm text-slate-600 mt-1">
              Top engineers evaluated on code structure, correctness, and problem-solving velocity.
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-xs text-xs font-semibold">
            <button
              onClick={() => setTimeframe('all-time')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeframe === 'all-time'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All Time
            </button>
            <button
              onClick={() => setTimeframe('monthly')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeframe === 'monthly'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              This Month
            </button>
            <button
              onClick={() => setTimeframe('weekly')}
              className={`px-3 py-1.5 rounded-md transition-colors ${
                timeframe === 'weekly'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              This Week
            </button>
          </div>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Rank 2 (Silver) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col items-center text-center relative order-2 md:order-1 hover:border-slate-300 transition-colors">
            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center text-xs font-mono font-bold text-slate-700">
              #2
            </div>
            <div className="relative">
              <img
                src={topThree[1]?.avatarUrl}
                alt={topThree[1]?.name}
                className="w-18 h-18 rounded-full object-cover border-2 border-slate-300 shadow-xs mb-3"
              />
              <span className="absolute bottom-3 right-0 w-6 h-6 rounded-full bg-slate-200 border border-white flex items-center justify-center text-xs">
                🥈
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{topThree[1]?.name}</h3>
            <span className="text-xs font-mono text-slate-500">@{topThree[1]?.username}</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {topThree[1]?.tier}
              </span>
              <span className="text-xs text-slate-400">• {topThree[1]?.country}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Rating</span>
                <span className="font-mono font-bold text-slate-900 text-base">{topThree[1]?.rating}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Solved</span>
                <span className="font-mono font-bold text-slate-900 text-base">{topThree[1]?.solved}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Accuracy</span>
                <span className="font-mono font-bold text-emerald-600 text-base">{topThree[1]?.accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Rank 1 (Gold - Center elevated) */}
          <div className="bg-gradient-to-b from-amber-50/50 to-white border-2 border-amber-300 rounded-xl p-6 shadow-sm flex flex-col items-center text-center relative order-1 md:order-2 md:-translate-y-2">
            <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-amber-100 border border-amber-300 flex items-center justify-center text-xs font-mono font-bold text-amber-900">
              #1
            </div>
            <div className="relative">
              <img
                src={topThree[0]?.avatarUrl}
                alt={topThree[0]?.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-amber-300 shadow-md mb-3"
              />
              <span className="absolute bottom-3 right-0 w-7 h-7 rounded-full bg-amber-300 border-2 border-white flex items-center justify-center text-sm shadow-xs">
                👑
              </span>
            </div>
            <h3 className="text-lg font-extrabold text-slate-900">{topThree[0]?.name}</h3>
            <span className="text-xs font-mono text-slate-500">@{topThree[0]?.username}</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-purple-50 text-purple-700 border border-purple-200">
                {topThree[0]?.tier}
              </span>
              <span className="text-xs text-slate-400">• {topThree[0]?.country}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-amber-100 w-full flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Rating</span>
                <span className="font-mono font-extrabold text-blue-600 text-lg">{topThree[0]?.rating}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Solved</span>
                <span className="font-mono font-bold text-slate-900 text-base">{topThree[0]?.solved}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Accuracy</span>
                <span className="font-mono font-bold text-emerald-600 text-base">{topThree[0]?.accuracy}%</span>
              </div>
            </div>
          </div>

          {/* Rank 3 (Bronze) */}
          <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs flex flex-col items-center text-center relative order-3 hover:border-slate-300 transition-colors">
            <div className="absolute top-4 left-4 w-7 h-7 rounded-full bg-orange-50 border border-orange-200 flex items-center justify-center text-xs font-mono font-bold text-orange-800">
              #3
            </div>
            <div className="relative">
              <img
                src={topThree[2]?.avatarUrl}
                alt={topThree[2]?.name}
                className="w-18 h-18 rounded-full object-cover border-2 border-orange-300 shadow-xs mb-3"
              />
              <span className="absolute bottom-3 right-0 w-6 h-6 rounded-full bg-orange-100 border border-white flex items-center justify-center text-xs">
                🥉
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900">{topThree[2]?.name}</h3>
            <span className="text-xs font-mono text-slate-500">@{topThree[2]?.username}</span>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                {topThree[2]?.tier}
              </span>
              <span className="text-xs text-slate-400">• {topThree[2]?.country}</span>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-100 w-full flex items-center justify-around text-xs">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Rating</span>
                <span className="font-mono font-bold text-slate-900 text-base">{topThree[2]?.rating}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Solved</span>
                <span className="font-mono font-bold text-slate-900 text-base">{topThree[2]?.solved}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Accuracy</span>
                <span className="font-mono font-bold text-emerald-600 text-base">{topThree[2]?.accuracy}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Search Bar */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Tech Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 sm:pb-0">
            {['All', 'JavaScript', 'HTML', 'CSS'].map((tech) => (
              <button
                key={tech}
                onClick={() => setSelectedTechFilter(tech)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                  selectedTechFilter === tech
                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by name or handle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Your Current Rank Card */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-blue-600 text-white font-mono font-bold text-xs flex items-center justify-center flex-shrink-0">
              #1,420
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900">Your Current Standing ({mockUser.fullName})</span>
                <span className="text-[10px] uppercase font-bold bg-blue-200/70 text-blue-900 px-1.5 py-0.5 rounded">You</span>
              </div>
              <span className="text-xs text-slate-600">Top 8% of all assessed engineers</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs self-end sm:self-auto">
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Your Rating</span>
              <span className="font-mono font-bold text-slate-900 text-base">{userRating}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Solved</span>
              <span className="font-mono font-bold text-slate-900 text-base">{solvedCount}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px] uppercase font-semibold">Accuracy</span>
              <span className="font-mono font-bold text-emerald-600 text-base">{mockUser.accuracy}%</span>
            </div>
          </div>
        </div>

        {/* Full Leaderboard Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Rankings Directory</h3>
            <span className="text-xs text-slate-400 font-mono">{filteredRankers.length} Active Candidates</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-3 w-16">Rank</th>
                  <th className="px-6 py-3">Engineer</th>
                  <th className="px-6 py-3">Tier</th>
                  <th className="px-6 py-3">Primary Tech</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Solved</th>
                  <th className="px-6 py-3">Accuracy</th>
                  <th className="px-6 py-3">Streak</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredRankers.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4 font-mono font-bold text-slate-900">
                      {user.rank === 1 ? '🥇 #1' : user.rank === 2 ? '🥈 #2' : user.rank === 3 ? '🥉 #3' : `#${user.rank}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatarUrl}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border border-slate-200 flex-shrink-0"
                        />
                        <div>
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-[11px] text-slate-400">@{user.username} • {user.country}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-0.5 rounded text-xs font-semibold border ${user.tierColor}`}>
                        {user.tier}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-slate-600 font-medium">
                      {user.primaryTech}
                    </td>
                    <td className="px-6 py-4 font-mono font-bold text-blue-600 text-sm">
                      {user.rating}
                    </td>
                    <td className="px-6 py-4 font-mono text-slate-700">
                      {user.solved}
                    </td>
                    <td className="px-6 py-4 font-mono font-semibold text-emerald-600">
                      {user.accuracy}%
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                        <Flame className="w-3 h-3 text-amber-500 fill-amber-500" />
                        <span>{user.streak}d</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
