import React, { useState } from 'react';
import { 
  GraduationCap, 
  UserCheck, 
  ArrowLeft, 
  LogOut, 
  Award, 
  Calendar, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  Printer, 
  TrendingUp, 
  ShieldCheck, 
  BookOpen, 
  FileText,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { mockStudentRecord, StudentRecord } from '../data/schoolData';
import confetti from 'canvas-confetti';
import logoImg from '../assets/logoBase64';

interface StudentPortalPageProps {
  onNavigateHome: () => void;
  onNavigateAdmin: () => void;
  onNavigateTeacher: () => void;
}

export const StudentPortalPage: React.FC<StudentPortalPageProps> = ({
  onNavigateHome,
  onNavigateAdmin,
  onNavigateTeacher
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [studentIdInput, setStudentIdInput] = useState('');
  const [studentPin, setStudentPin] = useState('');
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'exams' | 'fees'>('grades');
  const [selectedTermIndex, setSelectedTermIndex] = useState<number>(0);
  const [paidInvoices, setPaidInvoices] = useState<string[]>([]);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const student: StudentRecord = mockStudentRecord;

  const showToast = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentIdInput.trim()) {
      setIsLoggedIn(true);
      showToast(`Welcome back, ${student.studentName}!`);
    }
  };

  const handleQuickDemoLogin = () => {
    setStudentIdInput('LFS-2005-084');
    setIsLoggedIn(true);
    showToast('Demo Login as Student activated!');
  };

  const handlePayFee = (invoiceId: string, amount: number) => {
    setPaidInvoices([...paidInvoices, invoiceId]);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    showToast(`Payment of NPR ${amount.toLocaleString()} processed! Official receipt issued.`);
  };

  const handlePrintHallTicket = () => {
    showToast('Admit Card generated! Preparing printer dialog.');
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

        {/* LEFT HALF (50%): Library & Campus Photography with Gradient & Identity */}
        <div className="relative w-full lg:w-1/2 min-h-[380px] lg:min-h-screen p-8 sm:p-12 xl:p-16 flex flex-col justify-between overflow-hidden group">
          {/* Background Image */}
          <img 
            src="https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1400&q=80" 
            alt="Little Flower Library & Academic Resource Center" 
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

            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-600 text-white shadow-md flex items-center gap-1.5 font-bold">
              <GraduationCap className="w-3.5 h-3.5 text-white" />
              <span>Student Portal</span>
            </span>
          </div>

          {/* Bottom Highlights & Metrics */}
          <div className="relative z-10 space-y-6 pt-12 text-white">
            <div className="space-y-2 max-w-xl">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-white/20 text-white font-bold text-[11px] uppercase tracking-wider">
                Student &amp; Parent Academic Desk
              </span>
              <h2 className="text-3xl sm:text-4xl xl:text-5xl font-black font-display tracking-tight text-white leading-tight">
                Academic Results &amp; Student Portal
              </h2>
              <p className="text-sm text-slate-300 font-normal leading-relaxed">
                Access your official terminal marksheets, track classroom attendance, download exam admit cards, and review fee statements.
              </p>
            </div>

            {/* 4 Student Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/20">
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-rose-300">Terminal GPA</p>
                <p className="text-[11px] text-slate-300">Grade 10 Lotus</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-rose-300">Exam Admit Card</p>
                <p className="text-[11px] text-slate-300">1-Click PDF Print</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-rose-300">97.2% Attendance</p>
                <p className="text-[11px] text-slate-300">5-Month Summary</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/15">
                <p className="text-sm font-bold text-rose-300">Fee Ledger</p>
                <p className="text-[11px] text-slate-300">Online Receipt</p>
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
                onClick={onNavigateTeacher}
                className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5 text-amber-600" />
                <span>Teacher</span>
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
              <div className="w-14 h-14 rounded-2xl bg-rose-100 border border-rose-300 text-red-600 flex items-center justify-center shadow-xs mb-4">
                <GraduationCap className="w-7 h-7" />
              </div>
              <h1 className="text-3xl font-black text-slate-900">Student &amp; Parent Login</h1>
              <p className="text-xs sm:text-sm text-slate-500">
                Enter your official Student Roll ID to check terminal results and statements.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Student Roll Code / ID</label>
                <input
                  type="text"
                  value={studentIdInput}
                  onChange={(e) => setStudentIdInput(e.target.value)}
                  placeholder="e.g. LFS-2005-084"
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-red-500 font-mono font-bold shadow-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Password / PIN</label>
                <input
                  type="password"
                  value={studentPin}
                  onChange={(e) => setStudentPin(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-red-500 font-mono shadow-xs"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/20 transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Sign In as Student</span>
              </button>
            </form>

            {/* 1-Click Auto Demo Login */}
            <div className="p-3.5 rounded-xl bg-rose-50/70 border border-rose-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">Demo Student: <strong className="text-slate-900">LFS-2005-084</strong></span>
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
            <span>Student Support: lfsparwanipur@gmail.com</span>
            <span>Little Flower Sec. School • Parsa</span>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. STUDENT DASHBOARD VIEW (WHEN LOGGED IN)
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Student Navigation Header */}
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
                  <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-900 border border-rose-300">
                    Student Dashboard
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 font-medium">Birgunj-21, Parwanipur, Parsa • Student &amp; Guardian Desk</p>
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
              onClick={onNavigateTeacher}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-600" />
              <span>Teacher</span>
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
            
            {/* Student Overview Header Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-r from-red-50/70 via-white to-slate-50 border border-red-200 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-2xl shadow-md shrink-0">
                  AS
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900">{student.studentName}</h2>
                    <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                      {student.studentId}
                    </span>
                  </div>
                  <p className="text-xs text-red-600 font-bold">{student.grade} • Roll No: {student.rollNo}</p>
                  <p className="text-[11px] text-slate-500 font-medium">Guardian: {student.guardianName}</p>
                </div>
              </div>

              <div className="flex items-center gap-6 border-t md:border-t-0 md:border-l border-slate-200 pt-4 md:pt-0 md:pl-6">
                <div className="text-center md:text-right">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Current GPA</span>
                  <p className="text-3xl font-black text-red-600">{student.gpa}</p>
                </div>
                <div className="text-center md:text-right">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Attendance</span>
                  <p className="text-3xl font-black text-emerald-700">{student.attendanceRate}%</p>
                </div>
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-bold flex items-center gap-1.5 border border-slate-200 transition-colors cursor-pointer shadow-xs"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
              {[
                { key: 'grades', label: 'Terminal Marks', icon: Award },
                { key: 'attendance', label: 'Attendance Record', icon: TrendingUp },
                { key: 'exams', label: 'Exam Routine & Hall Ticket', icon: Calendar },
                { key: 'fees', label: 'Fee Dues & Receipts', icon: CreditCard }
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

            {/* TAB 1: Academic Performance */}
            {activeTab === 'grades' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    Terminal Marksheet Card
                  </h3>
                  <select
                    value={selectedTermIndex}
                    onChange={(e) => setSelectedTermIndex(Number(e.target.value))}
                    className="px-3 py-1.5 rounded-xl text-xs bg-white border border-slate-200 text-slate-800 font-bold shadow-xs"
                  >
                    {student.termResults.map((t, idx) => (
                      <option key={idx} value={idx}>{t.term}</option>
                    ))}
                  </select>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
                      <tr>
                        <th className="p-3.5">Subject</th>
                        <th className="p-3.5 text-center">Full Marks</th>
                        <th className="p-3.5 text-center">Score</th>
                        <th className="p-3.5 text-center">Grade</th>
                        <th className="p-3.5">Teacher Remark</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {student.termResults[selectedTermIndex].subjects.map((sub, idx) => (
                        <tr key={idx} className="hover:bg-red-50/20">
                          <td className="p-3.5 font-bold text-slate-900">{sub.name}</td>
                          <td className="p-3.5 text-center font-mono">{sub.fullMarks}</td>
                          <td className="p-3.5 text-center font-mono font-black text-red-600">{sub.obtainedMarks}</td>
                          <td className="p-3.5 text-center">
                            <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
                              {sub.grade}
                            </span>
                          </td>
                          <td className="p-3.5 text-slate-600 text-[11px]">{sub.remark}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 2: Attendance Record */}
            {activeTab === 'attendance' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Monthly School Attendance Summary
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {student.monthlyAttendance.map((m, idx) => {
                    const rate = Math.round((m.present / m.total) * 100);
                    return (
                      <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200 text-center space-y-1 shadow-xs">
                        <span className="text-xs font-bold text-red-600 uppercase">{m.month} 2083</span>
                        <p className="text-xl font-black text-slate-900">{m.present} / {m.total}</p>
                        <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                          {rate}% Present
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: Exam Routine */}
            {activeTab === 'exams' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                    {student.examRoutines[0].examName}
                  </h3>
                  <button
                    onClick={handlePrintHallTicket}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow-md cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Exam Admit Card</span>
                  </button>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
                      <tr>
                        <th className="p-3.5">Date &amp; Day</th>
                        <th className="p-3.5">Subject</th>
                        <th className="p-3.5">Timing</th>
                        <th className="p-3.5 text-right">Examination Hall</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                      {student.examRoutines[0].schedule.map((item, idx) => (
                        <tr key={idx} className="hover:bg-red-50/20">
                          <td className="p-3.5 font-bold text-slate-900">{item.date} ({item.day})</td>
                          <td className="p-3.5 font-black text-red-600">{item.subject}</td>
                          <td className="p-3.5 text-slate-600">{item.time}</td>
                          <td className="p-3.5 text-right font-mono text-slate-600 font-bold">{item.roomNo}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 4: Fees & Invoices */}
            {activeTab === 'fees' && (
              <div className="space-y-4 animate-in fade-in duration-150">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-800">Total Fees Cleared</span>
                      <p className="text-2xl font-black text-slate-900">NPR {student.feeLedger.totalPaid.toLocaleString()}</p>
                    </div>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>

                  <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-red-600">Pending Term Dues</span>
                      <p className="text-2xl font-black text-red-600">NPR {student.feeLedger.totalPending.toLocaleString()}</p>
                    </div>
                    <CreditCard className="w-6 h-6 text-red-600" />
                  </div>
                </div>

                <div className="space-y-2.5">
                  {student.feeLedger.invoices.map((inv) => {
                    const isNowPaid = paidInvoices.includes(inv.id) || inv.status === 'Paid';
                    return (
                      <div
                        key={inv.id}
                        className="p-4 rounded-2xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-slate-500 font-bold">{inv.id}</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                              isNowPaid ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-red-100 text-red-700 border border-red-200'
                            }`}>
                              {isNowPaid ? 'Paid' : 'Pending Payment'}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-900">{inv.title}</h4>
                          <p className="text-[11px] text-slate-500 font-medium">Due Date: {inv.dueDate}</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono text-sm font-black text-slate-900">
                            NPR {inv.amount.toLocaleString()}
                          </span>
                          {!isNowPaid ? (
                            <button
                              onClick={() => handlePayFee(inv.id, inv.amount)}
                              className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1 shadow-md cursor-pointer"
                            >
                              <span>Pay Dues Online</span>
                            </button>
                          ) : (
                            <button
                              onClick={() => alert(`Official Receipt #${inv.receiptNo || 'REC-LFS-4412'} printed!`)}
                              className="px-3.5 py-1.5 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1 border border-slate-200 cursor-pointer"
                            >
                              <Printer className="w-3.5 h-3.5" />
                              <span>Print Receipt</span>
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

          </div>

      </main>

    </div>
  );
};
