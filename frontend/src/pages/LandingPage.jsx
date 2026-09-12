import React from 'react';
import { Link } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton
} from '@clerk/clerk-react';
import {
  GraduationCap,
  ChevronRight,
  Code2,
  Terminal,
  Trophy,
  CheckCircle2,
  BookOpen,
  Laptop
} from 'lucide-react';
import { TECHNOLOGIES } from '../data/questions';

export default function LandingPage() {
  return (
    <div className="flex-1 bg-white text-slate-900 font-sans flex flex-col">
      {/* ==================================================== */}
      {/* 1. DEDICATED LANDING TOPBAR (LeetCode Dark Minimal)  */}
      {/* ==================================================== */}
      <header className="h-14 bg-[#262626] border-b border-white/10 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-50">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5 font-bold text-white tracking-tight text-lg">
          <div className="w-7 h-7 rounded-md bg-white text-slate-900 flex items-center justify-center">
            <Code2 className="w-4 h-4" />
          </div>
          <span>CodePractice</span>
        </Link>

        {/* Right Auth Controls */}
        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <button className="text-sm font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer px-3 py-1.5 rounded-md hover:bg-white/5">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-xs sm:text-sm font-semibold px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-colors"
              >
                Open Dashboard
              </Link>
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      </header>

      {/* ==================================================== */}
      {/* 2. HERO SECTION (LeetCode Dark Slanted Backdrop)     */}
      {/* ==================================================== */}
      <section className="relative bg-[#262626] text-white pt-14 pb-28 sm:pb-36 overflow-hidden">
        {/* Subtle geometric ambient lighting */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left: Isometric Tablet Platform Preview */}
            <div className="lg:col-span-6 flex justify-center lg:justify-start">
              <div className="relative w-full max-w-md transform lg:-rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                {/* Tablet Frame */}
                <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-2xl border-4 border-slate-100 text-slate-800">
                  {/* Top 4 Colorful Stat Tiles */}
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    <div className="bg-sky-500 text-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
                      <span className="text-[10px] font-bold uppercase opacity-80">HTML</span>
                      <span className="font-mono text-sm font-black">100%</span>
                    </div>
                    <div className="bg-emerald-500 text-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
                      <span className="text-[10px] font-bold uppercase opacity-80">CSS</span>
                      <span className="font-mono text-sm font-black">94%</span>
                    </div>
                    <div className="bg-amber-500 text-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
                      <span className="text-[10px] font-bold uppercase opacity-80">JS</span>
                      <span className="font-mono text-sm font-black">88%</span>
                    </div>
                    <div className="bg-rose-500 text-white rounded-lg p-2 flex flex-col items-center justify-center text-center shadow-xs">
                      <span className="text-[10px] font-bold uppercase opacity-80">Rating</span>
                      <span className="font-mono text-sm font-black">798</span>
                    </div>
                  </div>

                  {/* Tablet Center Split */}
                  <div className="grid grid-cols-12 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                    {/* Left Question List */}
                    <div className="col-span-8 flex flex-col gap-2">
                      <div className="flex items-center justify-between pb-1 border-b border-slate-200 text-[10px] font-bold uppercase text-slate-400">
                        <span>Challenge Feed</span>
                        <span>Status</span>
                      </div>

                      <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                        <span className="font-medium text-slate-800 truncate">01. Basic Heading & Paragraph</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      </div>

                      <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                        <span className="font-medium text-slate-800 truncate">02. Heading Hierarchy</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      </div>

                      <div className="flex items-center justify-between text-xs py-1 border-b border-slate-100">
                        <span className="font-medium text-slate-800 truncate">03. Unordered Lists</span>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0" />
                      </div>

                      <div className="flex items-center justify-between text-xs py-1">
                        <span className="font-medium text-slate-800 truncate">04. Hyperlinks with href</span>
                        <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                      </div>
                    </div>

                    {/* Right Progress Donut Mockup */}
                    <div className="col-span-4 flex flex-col items-center justify-center bg-white p-2 rounded-lg border border-slate-200 text-center">
                      <div className="w-12 h-12 rounded-full border-4 border-emerald-400 border-t-amber-400 border-r-sky-400 flex items-center justify-center font-mono font-bold text-xs text-slate-900 mb-1">
                        44/60
                      </div>
                      <span className="text-[9px] font-bold uppercase text-slate-400">Solved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Hero Headline & Dynamic Auth Action Button */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                A New Way to Learn
              </h1>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                CodePractice is the premier platform to help you enhance your skills, master code structure, expand your knowledge, and prepare for real-world frontend engineering assessments.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
                <SignedOut>
                  <SignUpButton mode="modal">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#00AF9B] hover:bg-[#009B89] text-white font-bold rounded-full text-sm transition-all shadow-lg hover:shadow-teal-500/20 active:scale-98 cursor-pointer">
                      <span>Create Account</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <Link
                    to="/dashboard"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#00AF9B] hover:bg-[#009B89] text-white font-bold rounded-full text-sm transition-all shadow-lg hover:shadow-teal-500/20 active:scale-98"
                  >
                    <span>Continue to Dashboard →</span>
                  </Link>
                </SignedIn>
              </div>
            </div>
          </div>
        </div>

        {/* Diagonal Slanted Slice Transition */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 sm:h-20 bg-white"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 0)' }}
        />
      </section>

      {/* ==================================================== */}
      {/* 3. "START EXPLORING" BADGE & CORE TRACKS             */}
      {/* ==================================================== */}
      <section className="relative -mt-10 sm:-mt-12 z-20 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center">
          {/* Start Exploring Central LeetCode-style Badge */}
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-3 bg-white px-6 py-2.5 rounded-full border border-slate-200 shadow-md hover:shadow-lg transition-all group"
          >
            <span className="text-sm font-bold text-teal-700 tracking-tight">Start Exploring</span>
            <div className="w-7 h-7 rounded-full bg-teal-600 text-white flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-4 h-4" />
            </div>
          </Link>

          {/* Alternating Feature Sections (Explore -> Workspace -> Leaderboard) */}
          <div className="w-full mt-16 flex flex-col gap-20">
            {/* Feature 1: Explore Progressive Tracks */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
                  <BookOpen className="w-4 h-4" />
                  <span>Curated Learning Tracks</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Explore and expand your skills
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Start from absolute fundamentals in HTML, CSS, and JavaScript. Progressively unlock 20 carefully structured challenges per level—from basic elements and selectors to algorithmic logic and real-world debugging.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
                  >
                    <span>Get Started</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Visual Card */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-xs">
                <div className="grid grid-cols-3 gap-3">
                  {TECHNOLOGIES.map((tech) => (
                    <div key={tech} className="bg-white p-4 rounded-xl border border-slate-200 text-center flex flex-col items-center gap-2">
                      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-xs text-slate-800">
                        {tech === 'JavaScript' ? 'JS' : tech}
                      </div>
                      <span className="font-bold text-xs text-slate-900">{tech}</span>
                      <span className="text-[10px] text-slate-400 font-mono">20 Levels</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Feature 2: Single-Page Developer Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 bg-[#1E293B] text-slate-200 rounded-2xl p-6 shadow-md border border-slate-700 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700 text-slate-400">
                  <span className="flex items-center gap-1.5 text-slate-200">
                    <Terminal className="w-3.5 h-3.5 text-teal-400" />
                    <span>challenge_workspace.js</span>
                  </span>
                  <span>Monaco Editor</span>
                </div>
                <div className="py-4 space-y-1 text-slate-300">
                  <p className="text-slate-500">// 1. Write or debug code</p>
                  <p><span className="text-purple-400">function</span> <span className="text-blue-400">calculateTotal</span>(cart) &#123;</p>
                  <p className="pl-4"><span className="text-purple-400">return</span> cart.<span className="text-yellow-400">reduce</span>((acc, item) =&gt; acc + item.price, <span className="text-emerald-400">0</span>);</p>
                  <p>&#125;</p>
                </div>
                <div className="pt-3 border-t border-slate-700 flex items-center justify-between text-[11px] text-emerald-400">
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>In-Place AI Evaluation: 92/100</span>
                  </span>
                  <span className="text-slate-400">Rating +7</span>
                </div>
              </div>

              <div className="lg:col-span-6 order-1 lg:order-2 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
                  <Laptop className="w-4 h-4" />
                  <span>Single-Page Workspace</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Developer assessment environment
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Never leave the challenge page to review results. The single-page workspace combines Monaco editor, anti-copy protected problem statements, isolated unit test execution, and instant qualitative AI code reviews.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to="/dashboard"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
                  >
                    <span>Launch Challenge</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Feature 3: Global Contests & Top Rankers */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-6 flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 text-xs font-bold text-teal-700 uppercase tracking-wider">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Community & Standings</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Compete with top engineers
                </h2>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Test yourself against engineers worldwide. Track your global rating progression, earn tier badges (Grandmaster, Master, Diamond), and build a verified portfolio of solved challenges.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <Link
                    to="/leaderboard"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800"
                  >
                    <span>View Top Rankers</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Visual Leaderboard Card */}
              <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col gap-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200 text-xs font-bold text-slate-800">
                  <span>Top Candidates</span>
                  <span className="text-slate-400 font-normal">Rating</span>
                </div>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-amber-600">🥇 #1</span>
                    <span className="font-semibold text-slate-900">Elena Rostova</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600">982</span>
                </div>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-500">🥈 #2</span>
                    <span className="font-semibold text-slate-900">Marcus Vance</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600">954</span>
                </div>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-orange-600">🥉 #3</span>
                    <span className="font-semibold text-slate-900">Sophia Lin</span>
                  </div>
                  <span className="font-mono font-bold text-blue-600">938</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================== */}
      {/* 4. CLEAN LEETCODE-STYLE FOOTER                       */}
      {/* ==================================================== */}
      <footer className="bg-[#1A1A1A] text-slate-400 text-xs py-10 border-t border-slate-800 mt-auto">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded bg-slate-800 text-white flex items-center justify-center font-mono text-xs font-bold">
              CP
            </div>
            <span className="text-slate-200 font-semibold">CodePractice</span>
            <span className="text-slate-600">|</span>
            <span>Copyright &copy; 2026 CodePractice</span>
          </div>

          <div className="flex items-center gap-6 text-slate-400">
            <Link to="/dashboard" className="hover:text-slate-200 transition-colors">
              Dashboard
            </Link>
            <Link to="/leaderboard" className="hover:text-slate-200 transition-colors">
              Top Rankers
            </Link>
            <Link to="/profile" className="hover:text-slate-200 transition-colors">
              Profile
            </Link>
            <Link to="/settings" className="hover:text-slate-200 transition-colors">
              Settings
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
