import React from 'react';
import { Award, Target, CheckCircle2, Sparkles, Calendar, Mail, MapPin } from 'lucide-react';
import { useProgress } from '../context/ProgressContext';
import { mockUser } from '../data/mockUser';
import SkillBars from '../components/profile/SkillBars';
import RatingChart from '../components/profile/RatingChart';

export default function ProfilePage() {
  const { userRating, solvedCount, submissions } = useProgress();

  return (
    <div className="flex-1 bg-[#F8F9FA] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Profile Header Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={mockUser.avatarUrl}
              alt={mockUser.fullName}
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs"
            />
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {mockUser.fullName}
                </h1>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  @{mockUser.username}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {mockUser.title}
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Member since {mockUser.joinedDate}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 self-stretch sm:self-auto justify-between sm:justify-start bg-slate-50 sm:bg-transparent p-4 sm:p-0 rounded-lg sm:rounded-none border sm:border-none border-slate-200">
            <div className="text-left sm:text-right">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Platform Rating
              </span>
              <span className="text-3xl font-extrabold font-mono text-slate-900">
                {userRating}
              </span>
            </div>
            <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 font-bold">
              <Award className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* 4 Stat Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Problems Solved
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {solvedCount}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Pass Accuracy
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {mockUser.accuracy}%
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Avg Code Quality
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {mockUser.averageCodeQuality}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Global Rank
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
              #1,420
            </div>
          </div>
        </div>

        {/* Skill Bars & Rating Progression Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillBars skillRatings={mockUser.skillRatings} />
          <RatingChart history={mockUser.ratingHistory} />
        </div>

        {/* Detailed Submission History Table */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-xs overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">All Completed Submissions</h3>
            <span className="text-xs text-slate-400 font-mono">{submissions.length} Total</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold text-[11px] tracking-wider">
                <tr>
                  <th className="px-6 py-3">Challenge Title</th>
                  <th className="px-6 py-3">Tech</th>
                  <th className="px-6 py-3">Difficulty</th>
                  <th className="px-6 py-3">Score</th>
                  <th className="px-6 py-3">Rating Δ</th>
                  <th className="px-6 py-3">Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {submissions.map((sub) => (
                  <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-3.5 text-slate-900 font-semibold">{sub.questionTitle}</td>
                    <td className="px-6 py-3.5 text-slate-600">{sub.technology}</td>
                    <td className="px-6 py-3.5 text-slate-500">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-xs font-semibold">
                        {sub.difficulty} L{sub.level}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 font-mono font-bold text-slate-900">
                      {sub.score}/100
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-xs">
                        +{sub.ratingChange}
                      </span>
                    </td>
                    <td className="px-6 py-3.5 text-slate-400 text-xs">{sub.submittedAt}</td>
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
