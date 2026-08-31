import React, { useState } from 'react';
import { 
  BookOpen, 
  UserCheck, 
  ArrowLeft, 
  LogOut, 
  Check, 
  Clock, 
  Users, 
  FileText, 
  CheckCircle2, 
  ShieldCheck, 
  GraduationCap, 
  Send,
  Sparkles,
  Calendar,
  Award
} from 'lucide-react';
import logoImg from '../assets/logoBase64';

interface TeacherPortalPageProps {
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
  onNavigateStudent: () => void;
}

export const TeacherPortalPage: React.FC<TeacherPortalPageProps> = ({
  onNavigateHome,
  onNavigateAdmin,
  onNavigateStudent
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [teacherId, setTeacherId] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'attendance' | 'schedule' | 'roster' | 'homework'>('attendance');
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Student Attendance State
  const [studentsAttendance, setStudentsAttendance] = useState([
    { id: 'LFS-2005-084', rollNo: 5, name: 'Aryan Kumar Sah', guardian: '+977 9845 128940', status: 'Present' },
    { id: 'LFS-2005-085', rollNo: 6, name: 'Priya Kumari Sah', guardian: '+977 9845 334455', status: 'Present' },
    { id: 'LFS-2005-086', rollNo: 7, name: 'Bikash Mahato', guardian: '+977 9815 667788', status: 'Present' },
    { id: 'LFS-2005-087', rollNo: 8, name: 'Neha Kumari Patel', guardian: '+977 9804 990011', status: 'Absent' },
    { id: 'LFS-2005-088', rollNo: 9, name: 'Roshan Kumar Yadav', guardian: '+977 9845 223344', status: 'Present' },
    { id: 'LFS-2005-089', rollNo: 10, name: 'Anjali Gupta', guardian: '+977 9815 445566', status: 'Present' }
  ]);

  // Homework State
  const [homeworkSubject, setHomeworkSubject] = useState('Science & Physics');
  const [homeworkTopic, setHomeworkTopic] = useState('');
  const [homeworkList, setHomeworkList] = useState([
    { id: 1, subject: 'Science & Physics', topic: 'Refraction of Light Numerical Problems (Ex 4.2)', dueDate: 'Tomorrow, 08:00 AM' },
    { id: 2, subject: 'Chemistry Lab', topic: 'Submit Titration Experiment Record Book', dueDate: 'Friday, 11:00 AM' }
  ]);

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (teacherId.trim()) {
      setIsLoggedIn(true);
      showToast('Logged in as Mr. Manoj Kumar Yadav (HOD Science)!');
    }
  };

  const handleQuickDemoLogin = () => {
    setTeacherId('TCH-8802');
    setIsLoggedIn(true);
    showToast('Demo Login as Teacher activated!');
  };

  const toggleAttendance = (index: number) => {
    const updated = [...studentsAttendance];
    updated[index].status = updated[index].status === 'Present' ? 'Absent' : 'Present';
    setStudentsAttendance(updated);
    showToast(`Marked ${updated[index].name} as ${updated[index].status}`);
  };

  const handleAssignHomework = (e: React.FormEvent) => {
    e.preventDefault();
    if (!homeworkTopic.trim()) return;

    setHomeworkList([
      { id: Date.now(), subject: homeworkSubject, topic: homeworkTopic, dueDate: 'Tomorrow, 08:00 AM' },
      ...homeworkList
    ]);
    setHomeworkTopic('');
    showToast('Homework assignment published to Student Portal!');
  };

  const presentCount = studentsAttendance.filter(s => s.status === 'Present').length;
  const absentCount = studentsAttendance.filter(s => s.status === 'Absent').length;

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

        {/* LEFT HALF (50%): Science Lab Photography with Gradient & Identity */}
        <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen p-8 sm:p-12 xl:p-16 flex flex-col justify-between overflow-hidden group">
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80" 
            alt="Little Flower Science & STEM Practical Laboratory" 
            className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-amber-950/70" />

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
                <span className="text-xs text-amber-200 font-medium">Birgunj-21, Parwanipur, Parsa</span>
              </div>
            </button>

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-md flex items-center gap-1.5 font-bold">
              <BookOpen className="w-3.5 h-3.5 text-slate-950" />
              <span>Teacher Portal</span>
            </span>
          </div>

          {/* Bottom Highlights & Metrics */}
          <div className="relative z-10 space-y-6 pt-12 text-white">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider">
                Academic Staff &amp; Faculty Desk
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Academic Mentorship &amp; Classroom Command
              </h2>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Empowering teachers to mark classroom attendance, enter terminal test scores, and mentor students with conceptual clarity.
              </p>
            </div>

            {/* 4 Faculty Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-amber-300">Live Attendance</p>
                <p className="text-[11px] text-slate-300">Daily Roll Call</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-amber-300">Terminal Marks</p>
                <p className="text-[11px] text-slate-300">Grade 10 Lotus</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-amber-300">Timetable</p>
                <p className="text-[11px] text-slate-300">Class &amp; Lab Routine</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-amber-300">Assignments</p>
                <p className="text-[11px] text-slate-300">Homework Desk</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT HALF (50%): True Full-Height Centered Login Panel */}
        <div className="w-full lg:w-1/2 min-h-screen p-6 sm:p-12 xl:p-16 flex flex-col justify-between bg-white text-slate-900 overflow-y-auto">
          {/* Top Quick Actions Bar */}
          <div className="flex items-center justify-between gap-3 pb-6 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Portals:</span>
              <button
                onClick={onNavigateAdmin}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
                <span>Admin</span>
              </button>
              <button
                onClick={onNavigateStudent}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
                <span>Student</span>
              </button>
            </div>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>← Website</span>
            </button>
          </div>

          {/* Centered Login Box */}
          <div className="my-auto max-w-md w-full mx-auto py-8 space-y-6">
            <div className="space-y-1 text-left">
              <div className="w-14 h-14 rounded-2xl bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center shadow-xs mb-4">
                <BookOpen className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-black text-slate-900">Faculty &amp; Teacher Login</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter your staff credentials to record classroom attendance and grades.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Teacher ID / Staff Email</label>
                <input
                  type="text"
                  value={teacherId}
                  onChange={(e) => setTeacherId(e.target.value)}
                  placeholder="e.g. TCH-8802"
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-mono font-bold shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Password / PIN</label>
                <input
                  type="password"
                  value={teacherPassword}
                  onChange={(e) => setTeacherPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-500 font-mono shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In as Teacher</span>
              </button>
            </form>

            {/* 1-Click Auto Demo Login */}
            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Demo Faculty: <strong className="text-slate-900">TCH-8802</strong></span>
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="text-red-600 hover:text-red-700 font-bold hover:underline cursor-pointer"
              >
                1-Click Auto Login
              </button>
            </div>
          </div>

          {/* Bottom Footer Helpdesk */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
            <span>Staff Support: lfsparwanipur@gmail.com</span>
            <span>Little Flower Sec. School • Parsa</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. TEACHER DASHBOARD VIEW (WHEN LOGGED IN)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Teacher Navigation Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
          
          {/* Logo & School Branding */}
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 group cursor-pointer text-left"
              title="Return to Main Website"
            >
              <div className="w-10 h-10 rounded-xl bg-red-50 p-1 shadow-xs border border-red-100 shrink-0 group-hover:scale-105 transition-transform">
                <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-lg" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm sm:text-base font-black tracking-wide text-slate-900">
                    Little Flower Secondary School
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                    Teacher Dashboard
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Birgunj-21, Parwanipur, Parsa • Faculty Academic Desk</p>
              </div>
            </button>
          </div>

          {/* Quick Action Links & Switchers */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateAdmin}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-red-600" />
              <span>Admin</span>
            </button>

            <button
              onClick={onNavigateStudent}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <GraduationCap className="w-3.5 h-3.5 text-rose-600" />
              <span>Student</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/20 transition-all cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Website</span>
            </button>
          </div>

        </div>
      </header>

      {/* Floating Notification Toast */}
      {notificationMsg && (
        <div className="fixed top-18 right-6 z-50 p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-semibold flex items-center gap-2 shadow-xl animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <div className="space-y-6">
            
            {/* Teacher Profile Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-50/60 via-white to-red-50/50 border border-amber-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-amber-500 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">Mr. Manoj Kumar Yadav</h2>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                      {teacherId}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-red-600">Head of Department — Science &amp; STEM (14+ Yrs Exp.)</p>
                  <p className="text-[11px] text-slate-500">Assigned Class: <strong>Grade 10 Section Lotus</strong> (Secondary Level)</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Attendance Summary Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Total Enrolled in Section</span>
                <p className="text-2xl font-black text-slate-900">{studentsAttendance.length} Students</p>
                <span className="text-[10px] text-slate-500">Grade 10 Lotus</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-emerald-800">Present Today</span>
                <p className="text-2xl font-black text-emerald-800">{presentCount}</p>
                <span className="text-[10px] text-emerald-700 font-bold">{Math.round((presentCount / studentsAttendance.length) * 100)}% Present</span>
              </div>

              <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-red-700">Absent Today</span>
                <p className="text-2xl font-black text-red-600">{absentCount}</p>
                <span className="text-[10px] text-red-600 font-bold">SMS Sent to Guardians</span>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-500">Scheduled Periods</span>
                <p className="text-2xl font-black text-slate-900">4 Periods</p>
                <span className="text-[10px] text-slate-500 font-medium">Next: Chemistry Lab</span>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
              {[
                { key: 'attendance', label: 'Daily Roll Call (Today)', icon: Check },
                { key: 'schedule', label: 'Teaching Schedule', icon: Clock },
                { key: 'roster', label: 'Class Roster & Marks', icon: Users },
                { key: 'homework', label: 'Homework & Assignments', icon: FileText }
              ].map((t) => {
                const Icon = t.icon;
                const isActive = activeTab === t.key;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key as any)}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer transition-all whitespace-nowrap ${
                      isActive
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-slate-600 hover:text-red-600 hover:bg-red-50/50'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{t.label}</span>
                  </button>
                );
              })}
            </div>

            {/* TAB 1: Attendance Roll Call */}
            {activeTab === 'attendance' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Grade 10 Section Lotus • Attendance Roll Call
                  </h3>
                  <span className="text-[11px] font-bold text-slate-500">
                    Click "Toggle Status" to instantly switch Present / Absent
                  </span>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
                      <tr>
                        <th className="p-3.5">Roll No</th>
                        <th className="p-3.5">Student Name</th>
                        <th className="p-3.5">Student ID</th>
                        <th className="p-3.5">Guardian Contact</th>
                        <th className="p-3.5 text-center">Status</th>
                        <th className="p-3.5 text-right">Quick Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {studentsAttendance.map((st, idx) => (
                        <tr key={st.id} className="hover:bg-red-50/20">
                          <td className="p-3.5 font-bold font-mono text-slate-900">#{st.rollNo}</td>
                          <td className="p-3.5 font-bold text-slate-900">{st.name}</td>
                          <td className="p-3.5 font-mono text-slate-500 text-[11px]">{st.id}</td>
                          <td className="p-3.5 font-mono text-slate-500 text-[11px]">{st.guardian}</td>
                          <td className="p-3.5 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                              st.status === 'Present'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : 'bg-red-100 text-red-700 border-red-200'
                            }`}>
                              {st.status}
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              onClick={() => toggleAttendance(idx)}
                              className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-700 border border-slate-200 cursor-pointer"
                            >
                              Toggle Status
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Schedule */}
            {activeTab === 'schedule' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Daily Science Teaching Schedule &amp; Practical Periods
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1.5 rounded-lg border border-red-100">
                        07:45 - 08:35 AM
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Grade 10 — Physics Mechanics &amp; Motion</h4>
                        <p className="text-[11px] text-slate-500">Hall A-1 • Lotus Section</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-1 rounded-full">Completed</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1.5 rounded-lg border border-amber-200">
                        09:45 - 11:00 AM
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Grade 9 — Chemistry Acid-Base Titration Practical</h4>
                        <p className="text-[11px] text-slate-500">Main Science Lab • Batch A</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-amber-800 bg-amber-200 px-2.5 py-1 rounded-full">Current Period</span>
                  </div>

                  <div className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
                        01:30 - 02:20 PM
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">Grade 8 — Environmental Science &amp; Ecology</h4>
                        <p className="text-[11px] text-slate-500">Room 204</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">Upcoming</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: Class Roster & Marks */}
            {activeTab === 'roster' && (
              <div className="space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Grade 10 Performance Records (Science Dept)
                </h3>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
                      <tr>
                        <th className="p-3.5">Roll No</th>
                        <th className="p-3.5">Student Name</th>
                        <th className="p-3.5 text-center">First Term Science (100)</th>
                        <th className="p-3.5 text-center">Grade</th>
                        <th className="p-3.5">Practical Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {[
                        { roll: 5, name: 'Aryan Kumar Sah', score: 90, grade: 'A+', practical: 'Experiments Completed & Signed' },
                        { roll: 6, name: 'Priya Kumari Sah', score: 94, grade: 'A+', practical: 'Experiments Completed & Signed' },
                        { roll: 7, name: 'Bikash Mahato', score: 82, grade: 'A', practical: 'Experiments Completed & Signed' },
                        { roll: 8, name: 'Neha Kumari Patel', score: 76, grade: 'B+', practical: 'Pending Chemistry File' },
                        { roll: 9, name: 'Roshan Kumar Yadav', score: 88, grade: 'A', practical: 'Experiments Completed & Signed' }
                      ].map((r, idx) => (
                        <tr key={idx} className="hover:bg-red-50/20">
                          <td className="p-3.5 font-bold font-mono text-slate-900">#{r.roll}</td>
                          <td className="p-3.5 font-bold text-slate-900">{r.name}</td>
                          <td className="p-3.5 text-center font-mono font-black text-red-600">{r.score}</td>
                          <td className="p-3.5 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                              {r.grade}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600 text-[11px]">{r.practical}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Homework */}
            {activeTab === 'homework' && (
              <div className="space-y-4">
                {/* Publish Homework Form */}
                <form onSubmit={handleAssignHomework} className="p-5 rounded-2xl bg-white border border-slate-200 space-y-4 shadow-xs">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                    <Send className="w-4 h-4 text-red-600" />
                    <span>Assign Homework / Lab Tasks to Grade 10</span>
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-slate-700">Subject</label>
                      <input
                        type="text"
                        value={homeworkSubject}
                        onChange={(e) => setHomeworkSubject(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 font-bold text-slate-800 mt-1"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-slate-700">Task Details</label>
                      <input
                        type="text"
                        value={homeworkTopic}
                        onChange={(e) => setHomeworkTopic(e.target.value)}
                        placeholder="e.g. Complete Exercise 5 on Electricity &amp; Magnetism"
                        className="w-full px-3.5 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 mt-1"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-xs"
                  >
                    Publish Homework Task
                  </button>
                </form>

                {/* Homework List */}
                <div className="space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">Assigned Tasks</h3>
                  {homeworkList.map((hw) => (
                    <div key={hw.id} className="p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between shadow-xs">
                      <div>
                        <span className="text-[10px] font-bold text-red-600 uppercase">{hw.subject}</span>
                        <h4 className="text-xs font-bold text-slate-900">{hw.topic}</h4>
                      </div>
                      <span className="text-[11px] font-medium text-slate-500 font-mono">Due: {hw.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

      </main>

    </div>
  );
};
