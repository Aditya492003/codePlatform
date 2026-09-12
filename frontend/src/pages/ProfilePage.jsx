import React, { useEffect, useState } from 'react';
import { Award, Calendar, User as UserIcon } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';
import { useProgress } from '../context/ProgressContext';
import { userService } from '../services/userService';
import SkillBars from '../components/profile/SkillBars';
import RatingChart from '../components/profile/RatingChart';

export default function ProfilePage() {
  const { user: clerkUser, isLoaded } = useUser();
  const { userRating, solvedCount, submissions } = useProgress();
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function syncAndLoadProfile() {
      if (clerkUser) {
        try {
          const synced = await userService.syncUser({
            clerkId: clerkUser.id,
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            fullName: clerkUser.fullName || '',
            avatarUrl: clerkUser.imageUrl || '',
            username: clerkUser.username || clerkUser.firstName || 'developer',
          });
          if (synced) {
            setProfileData(synced);
          }
        } catch (err) {
          console.warn('Error syncing profile:', err);
        }
      }
    }
    if (isLoaded && clerkUser) {
      syncAndLoadProfile();
    }
  }, [clerkUser, isLoaded]);

  const displayName = clerkUser?.fullName || profileData?.fullName || 'Developer';
  const displayUsername = clerkUser?.username || profileData?.username || 'user';
  const displayAvatar = clerkUser?.imageUrl || profileData?.avatarUrl || '';
  const skillRatings = profileData?.skillRatings || {
    JavaScript: 750,
    HTML: 750,
    CSS: 750,
  };
  const ratingHistory = profileData?.ratingHistory || [
    { date: 'Initial', rating: userRating || 750 },
  ];

  return (
    <div className="flex-1 bg-[#F8F9FA] py-8 sm:py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col gap-8">
        {/* Profile Header Card */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            {displayAvatar ? (
              <img
                src={displayAvatar}
                alt={displayName}
                className="w-20 h-20 rounded-full object-cover border-2 border-slate-200 shadow-xs"
              />
            ) : (
              <div className="w-20 h-20 rounded-full bg-blue-50 border-2 border-blue-200 flex items-center justify-center text-blue-600 font-extrabold text-2xl">
                {displayName[0] || 'D'}
              </div>
            )}
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
                  {displayName}
                </h1>
                <span className="font-mono text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                  @{displayUsername}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                Frontend Software Engineer
              </p>
              <div className="flex items-center gap-4 text-xs text-slate-400 mt-1">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  Active Engineer
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
                {userRating || 750}
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
              Accuracy
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {solvedCount > 0 ? '100%' : '100%'}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Submissions
            </span>
            <div className="text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {submissions.length}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-4.5 shadow-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              Tier Status
            </span>
            <div className="text-2xl font-extrabold font-mono text-blue-600 mt-1">
              {profileData?.tier || 'Bronze'}
            </div>
          </div>
        </div>

        {/* Skill Bars & Rating Progression Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkillBars skillRatings={skillRatings} />
          <RatingChart history={ratingHistory} />
        </div>
      </div>
    </div>
  );
}
