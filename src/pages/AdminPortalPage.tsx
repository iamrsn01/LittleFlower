import React, { useState } from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  ArrowLeft, 
  LogOut, 
  Building2, 
  Users, 
  DollarSign, 
  Bell, 
  Send, 
  CheckCircle2, 
  BookOpen, 
  GraduationCap, 
  FileText, 
  Sparkles,
  TrendingUp,
  Download,
  AlertCircle
} from 'lucide-react';
import { facultyMembers, schoolNotices, SchoolNotice } from '../data/schoolData';
import logoImg from '../assets/logoBase64';
import coverImg from '../assets/slider/cover.jpg';

interface AdminPortalPageProps {
  onNavigateHome: () => void;
  onNavigateTeacher: () => void;
  onNavigateStudent: () => void;
}

export const AdminPortalPage: React.FC<AdminPortalPageProps> = ({
  onNavigateHome,
  onNavigateTeacher,
  onNavigateStudent
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPin, setAdminPin] = useState('');
  const [activeTab, setActiveTab] = useState<'overview' | 'staff' | 'finance' | 'admissions'>('overview');
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [noticeCategory, setNoticeCategory] = useState<'Academic' | 'Examination' | 'Sports' | 'General'>('General');
  const [noticesList, setNoticesList] = useState<SchoolNotice[]>(schoolNotices);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminId.trim()) {
      setIsLoggedIn(true);
      showToast('Logged in as Administrator successfully!');
    }
  };

  const handleQuickDemoLogin = () => {
    setAdminId('ADMIN-LFS-01');
    setIsLoggedIn(true);
    showToast('Demo Login as Administrator activated!');
  };

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handlePublishNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;

    const newNotice: SchoolNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      category: noticeCategory,
      date: 'Just Now',
      isUrgent: true,
      summary: newNoticeTitle,
      fileSize: 'Online Notice',
      downloadUrl: '#',
      details: newNoticeTitle
    };

    setNoticesList([newNotice, ...noticesList]);
    setNewNoticeTitle('');
    showToast('Official Circular broadcasted to all portals!');
  };

  // =========================================================================
  // 1. FULL-SCREEN 50/50 SPLIT LOGIN VIEW
  // =========================================================================
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen w-full bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans selection:bg-red-500 selection:text-white">
        
        {/* Floating Notification Toast */}
        {notificationMsg && (
          <div className="fixed top-6 right-6 z-50 p-3.5 rounded-xl bg-emerald-900/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-2xl animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{notificationMsg}</span>
          </div>
        )}

        {/* LEFT HALF (50%): Full-Bleed Campus Photography with Gradient & Identity */}
        <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen p-8 sm:p-12 xl:p-16 flex flex-col justify-between overflow-hidden group">
          {/* Background Image */}
          <img 
            src={coverImg} 
            alt="Little Flower Secondary School Academic Campus" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-red-950/70" />

          {/* Top Brand Header */}
          <div className="relative z-10 flex items-center justify-between">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-3 text-left group/logo cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-white p-1 shadow-lg shrink-0 group-hover/logo:scale-105 transition-transform">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-xl" />
              </div>
              <div>
                <span className="text-base sm:text-lg font-black tracking-wide text-white block leading-tight">
                  Little Flower Sec. School
                </span>
                <span className="text-xs text-rose-200 font-medium">Birgunj-21, Parwanipur, Parsa</span>
              </div>
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>Admin Portal</span>
            </span>
          </div>

          {/* Bottom Highlights & Metrics */}
          <div className="relative z-10 space-y-6 pt-12 text-white">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider">
                Estd. 2005 • Central Administration
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Institutional Command &amp; Staff Desk
              </h2>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Integrated academic management, fee reconciliation, official circular broadcasts, and faculty leadership.
              </p>
            </div>

            {/* 4 Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">100%</p>
                <p className="text-[11px] text-slate-300">SEE Board Pass</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">1,420+</p>
                <p className="text-[11px] text-slate-300">Enrolled Students</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">48</p>
                <p className="text-[11px] text-slate-300">Faculty Mentors</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-lg font-black text-white">3.5 Bigha</p>
                <p className="text-[11px] text-slate-300">Green Campus</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT HALF (50%): True Full-Height Centered Login Panel */}
        <div className="w-full lg:w-1/2 min-h-screen p-6 sm:p-12 xl:p-16 flex flex-col justify-between bg-slate-900 overflow-y-auto">
          {/* Top Quick Actions Bar */}
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Portals:</span>
              <button
                onClick={onNavigateTeacher}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                <span>Teacher</span>
              </button>
              <button
                onClick={onNavigateStudent}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
                <span>Student</span>
              </button>
            </div>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Website</span>
            </button>
          </div>

          {/* Centered Login Box */}
          <div className="my-auto max-w-md w-full mx-auto py-8 space-y-6">
            <div className="space-y-1 text-left">
              <div className="w-14 h-14 rounded-2xl bg-red-600/20 border border-red-500/40 text-red-400 flex items-center justify-center shadow-lg mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-black text-white">Administrator Login</h1>
              <p className="text-xs sm:text-sm text-slate-400">
                Sign in with your administrative security credentials to manage institutional operations.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Admin Username / Security ID</label>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => setAdminId(e.target.value)}
                  placeholder="e.g. ADMIN-LFS-01"
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500 font-mono font-bold"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-300">Admin Master PIN</label>
                <input
                  type="password"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-red-500 font-mono"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In as Admin</span>
              </button>
            </form>

            {/* 1-Click Auto Demo Login */}
            <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-400">Demo Account: <strong className="text-slate-100">ADMIN-LFS-01</strong></span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-red-400 hover:text-red-300 font-bold hover:underline cursor-pointer"
              >
                1-Click Auto Login
              </button>
            </div>
          </div>

          {/* Bottom Footer Helpdesk */}
          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>Enquiry: +977-9840159560</span>
            <span>Little Flower Sec. School • Parsa</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ADMIN DASHBOARD VIEW (WHEN LOGGED IN)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-30 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
              title="Return to Main Website"
            >
              <div className="w-10 h-10 rounded-xl bg-white p-1 shadow shrink-0 group-hover:scale-105 transition-transform">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-wide text-white">
                    Little Flower Secondary School
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-red-600/90 text-white border border-red-500/50">
                    Admin Dashboard
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-medium">Birgunj-21, Parwanipur, Parsa • Central Administration</p>
              </div>
            </button>
          </div>

          {/* Quick Action Links & Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateTeacher}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>Teacher</span>
            </button>

            <button
              onClick={onNavigateStudent}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-rose-400" />
              <span>Student</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/30 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
          </div>

        </div>
      </header>

      {/* Floating Notification Toast */}
      {notificationMsg && (
        <div className="fixed top-18 right-6 z-50 p-3.5 rounded-xl bg-emerald-900/90 border border-emerald-500/50 text-emerald-200 text-xs font-semibold flex items-center gap-2 shadow-2xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Main Page Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
            
            {/* Top Admin Summary Banner */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-red-950/80 via-slate-900 to-slate-950 border border-red-900/40 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-2xl shadow-lg shrink-0">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-white">Central Administration Command</h2>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      ONLINE
                    </span>
                  </div>
                  <p className="text-xs text-rose-200">
                    Administrator ID: <strong className="text-white">{adminId}</strong> • Academic Session 2026/27 (2083 B.S.)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center gap-1.5 border border-slate-700 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Enrolled Students</span>
                <p className="text-3xl font-black text-white">1,420</p>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" /> +12% YoY Growth
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-1 shadow-md">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Active Faculty Members</span>
                <p className="text-3xl font-black text-white">48</p>
                <span className="text-[10px] text-slate-400 font-medium">All STEM &amp; Arts Staffed</span>
              </div>

              <div className="p-5 rounded-2xl bg-emerald-950/50 border border-emerald-700/50 space-y-1 shadow-md">
                <span className="text-[10px] uppercase font-bold text-emerald-300 tracking-wider">Total Fees Collected</span>
                <p className="text-3xl font-black text-emerald-300">NPR 48.2L</p>
                <span className="text-[10px] text-emerald-400 font-bold">92% Target Achieved</span>
              </div>

              <div className="p-5 rounded-2xl bg-red-950/50 border border-red-700/50 space-y-1 shadow-md">
                <span className="text-[10px] uppercase font-bold text-red-300 tracking-wider">Pending Admissions</span>
                <p className="text-3xl font-black text-red-400">14 Forms</p>
                <span className="text-[10px] text-red-400 font-bold">Awaiting Document Review</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-700/80 gap-2 overflow-x-auto pb-1">
              {[
                { key: 'overview', label: 'Overview & Notices', icon: Building2 },
                { key: 'staff', label: 'Faculty Directory', icon: Users },
                { key: 'finance', label: 'Financial Collections', icon: DollarSign },
                { key: 'admissions', label: 'Admission Inquiries', icon: Sparkles }
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/30'
                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Overview & Notice Broadcast */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Broadcast Circular Form */}
                <form onSubmit={handlePublishNotice} className="p-5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                      <Send className="w-4 h-4 text-red-400" />
                      <span>Broadcast Notice to All Portals</span>
                    </h3>
                    <select
                      value={noticeCategory}
                      onChange={(e) => setNoticeCategory(e.target.value as any)}
                      className="px-3 py-1 rounded-lg text-xs bg-slate-900 border border-slate-700 text-slate-200 font-bold"
                    >
                      <option value="General">General Notice</option>
                      <option value="Academic">Academic</option>
                      <option value="Examination">Examination</option>
                      <option value="Sports">Sports</option>
                    </select>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newNoticeTitle}
                      onChange={(e) => setNewNoticeTitle(e.target.value)}
                      placeholder="e.g. First Terminal examinations start Ashwin 1 • Hall tickets available online"
                      className="flex-1 px-4 py-2.5 rounded-xl text-xs bg-slate-900 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl text-xs font-black bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-md"
                    >
                      Broadcast Notice
                    </button>
                  </div>
                </form>

                {/* Published Notices Table */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Active Official Circulars ({noticesList.length})
                  </h3>

                  <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700 text-[11px] uppercase font-bold">
                        <tr>
                          <th className="p-4">Notice Title</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Date</th>
                          <th className="p-4 text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-700/60 text-slate-300">
                        {noticesList.map((not) => (
                          <tr key={not.id} className="hover:bg-slate-700/30">
                            <td className="p-4 font-bold text-white max-w-md">{not.title}</td>
                            <td className="p-4 font-medium text-slate-400">{not.category}</td>
                            <td className="p-4 text-slate-400 font-mono text-[11px]">{not.date}</td>
                            <td className="p-4 text-center">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                                Live
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 2: Faculty Directory */}
            {activeTab === 'staff' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Institutional Faculty &amp; HODs ({facultyMembers.length})
                </h3>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {facultyMembers.map((fac) => (
                    <div key={fac.id} className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 flex items-start gap-3.5 shadow-md">
                      <img src={fac.avatarUrl} alt={fac.name} className="w-12 h-12 rounded-xl object-cover border border-slate-600 shrink-0" />
                      <div className="space-y-0.5 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{fac.name}</h4>
                        <p className="text-[11px] text-red-400 font-semibold">{fac.role}</p>
                        <p className="text-[10px] text-slate-400">{fac.department}</p>
                        <p className="text-[10px] text-slate-500 font-mono">{fac.email}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 3: Financial Collections */}
            {activeTab === 'finance' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Academic Fee Collections &amp; Reconciliation
                </h3>

                <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 space-y-4 shadow-md">
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 text-xs">
                    <span className="font-bold text-slate-300">Pre-Primary &amp; Kindergarten Collections</span>
                    <span className="font-mono font-bold text-emerald-400">NPR 1,220,000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 text-xs">
                    <span className="font-bold text-slate-300">Primary Level (Grades 1 to 5)</span>
                    <span className="font-mono font-bold text-emerald-400">NPR 1,840,000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 text-xs">
                    <span className="font-bold text-slate-300">Lower Secondary (BLE Grades 6 to 8)</span>
                    <span className="font-mono font-bold text-emerald-400">NPR 1,420,000</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-slate-700/60 pb-3 text-xs">
                    <span className="font-bold text-slate-300">Secondary SEE Board (Grades 9 &amp; 10)</span>
                    <span className="font-mono font-bold text-emerald-400">NPR 1,560,000</span>
                  </div>
                  <div className="flex items-center justify-between pt-2 text-sm font-black">
                    <span className="text-white">Total Institutional Realized Revenue</span>
                    <span className="font-mono text-red-400">NPR 4,820,000</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: Admission Inquiries */}
            {activeTab === 'admissions' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recent 2026/27 Admission Applications
                </h3>

                <div className="bg-slate-800/80 rounded-2xl border border-slate-700 overflow-hidden shadow-md">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-700 text-[11px] uppercase font-bold">
                      <tr>
                        <th className="p-4">Applicant Name</th>
                        <th className="p-4">Target Grade</th>
                        <th className="p-4">Guardian Contact</th>
                        <th className="p-4 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 text-slate-300">
                      {[
                        { name: 'Kavita Kumari Sah', grade: 'Grade 9', contact: '+977 9845 238190', status: 'Documents Verified' },
                        { name: 'Rohan Kumar Gupta', grade: 'Nursery', contact: '+977 9815 901234', status: 'Entrance Scheduled' },
                        { name: 'Aayush Paswan', grade: 'Grade 6', contact: '+977 9804 112233', status: 'Interview Pending' },
                        { name: 'Sneha Patel', grade: 'Grade 1', contact: '+977 9845 889900', status: 'Documents Verified' }
                      ].map((app, idx) => (
                        <tr key={idx} className="hover:bg-slate-700/30">
                          <td className="p-4 font-bold text-white">{app.name}</td>
                          <td className="p-4 text-slate-400">{app.grade}</td>
                          <td className="p-4 font-mono text-[11px] text-slate-400">{app.contact}</td>
                          <td className="p-4 text-center">
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                              {app.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

      </main>

    </div>
  );
};
