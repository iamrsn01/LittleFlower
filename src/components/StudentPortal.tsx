import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  ShieldCheck,
  GraduationCap,
  BookOpen,
  Award, 
  Calendar, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  LogOut, 
  Printer,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  ChevronDown,
  Clock,
  Send,
  Check,
  FileText,
  AlertCircle
} from 'lucide-react';
import { mockStudentRecord, StudentRecord, facultyMembers, schoolNotices } from '../data/schoolData';
import confetti from 'canvas-confetti';
import logoImg from '../assets/logoBase64';

export type PortalRole = 'admin' | 'teachers' | 'students';

interface StudentPortalProps {
  isOpen: boolean;
  onClose: () => void;
  initialRole?: PortalRole;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ 
  isOpen, 
  onClose,
  initialRole = 'admin'
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedRole, setSelectedRole] = useState<PortalRole>(initialRole);
  const [loginIdInput, setLoginIdInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<string>('overview');
  const [selectedTermIndex, setSelectedTermIndex] = useState<number>(0);
  const [paidInvoices, setPaidInvoices] = useState<string[]>([]);
  const [portalFeedback, setPortalFeedback] = useState<string | null>(null);

  // Sync role when initialRole changes or modal opens
  React.useEffect(() => {
    if (isOpen && initialRole) {
      handleRoleChange(initialRole);
    }
  }, [isOpen, initialRole]);

  // Mock state for Teachers attendance
  const [classAttendance, setClassAttendance] = useState([
    { id: 'LFS-2005-084', name: 'Aryan Kumar Sah', rollNo: 5, status: 'Present' },
    { id: 'LFS-2005-085', name: 'Priya Kumari Sah', rollNo: 6, status: 'Present' },
    { id: 'LFS-2005-086', name: 'Bikash Mahato', rollNo: 7, status: 'Present' },
    { id: 'LFS-2005-087', name: 'Neha Kumari Patel', rollNo: 8, status: 'Absent' },
    { id: 'LFS-2005-088', name: 'Roshan Kumar Yadav', rollNo: 9, status: 'Present' }
  ]);

  // Mock state for Admin notice publishing
  const [newNoticeTitle, setNewNoticeTitle] = useState('');
  const [adminNotices, setAdminNotices] = useState(schoolNotices);

  if (!isOpen) return null;

  const student: StudentRecord = mockStudentRecord;

  const handleRoleChange = (role: PortalRole) => {
    setSelectedRole(role);
    setLoginIdInput('');
    setPasswordInput('');
    if (role === 'admin') {
      setActiveTab('overview');
    } else if (role === 'teachers') {
      setActiveTab('attendance');
    } else {
      setActiveTab('grades');
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginIdInput.trim()) {
      setIsLoggedIn(true);
      const roleLabel = selectedRole === 'admin' ? 'Administrator' : selectedRole === 'teachers' ? 'Teacher' : 'Student';
      setPortalFeedback(`Logged in as ${roleLabel} successfully!`);
      setTimeout(() => setPortalFeedback(null), 3000);
    }
  };

  const handleQuickDemoLogin = (role: PortalRole) => {
    handleRoleChange(role);
    setIsLoggedIn(true);
    const roleLabel = role === 'admin' ? 'Administrator' : role === 'teachers' ? 'Teacher' : 'Student';
    setPortalFeedback(`1-Click Demo Login as ${roleLabel}!`);
    setTimeout(() => setPortalFeedback(null), 3000);
  };

  const handlePayFee = (invoiceId: string, amount: number) => {
    setPaidInvoices([...paidInvoices, invoiceId]);
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.6 }
    });
    setPortalFeedback(`Payment of NPR ${amount.toLocaleString()} received! Official receipt generated.`);
    setTimeout(() => setPortalFeedback(null), 4000);
  };

  const handlePrintHallTicket = () => {
    setPortalFeedback('Exam Hall Ticket prepared! Sending to printer.');
    setTimeout(() => setPortalFeedback(null), 3500);
  };

  const toggleStudentAttendance = (index: number) => {
    const updated = [...classAttendance];
    updated[index].status = updated[index].status === 'Present' ? 'Absent' : 'Present';
    setClassAttendance(updated);
    setPortalFeedback(`Attendance for ${updated[index].name} set to ${updated[index].status}`);
    setTimeout(() => setPortalFeedback(null), 2500);
  };

  const handlePublishAdminNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoticeTitle.trim()) return;
    const newNotice = {
      id: `not-${Date.now()}`,
      title: newNoticeTitle,
      category: 'General' as const,
      date: 'Just Now',
      isUrgent: true,
      summary: newNoticeTitle,
      fileSize: 'Online Notice',
      downloadUrl: '#',
      details: newNoticeTitle
    };
    setAdminNotices([newNotice, ...adminNotices]);
    setNewNoticeTitle('');
    setPortalFeedback('Official School Notice published to portal board!');
    setTimeout(() => setPortalFeedback(null), 3500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-white border border-slate-300 rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar - Fresh Light Red */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white p-0.5 shadow shrink-0">
              <img src={logoImg} alt="Little Flower Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-wide">Little Flower Portal</span>
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-white/20 text-white uppercase tracking-wider">
                  {selectedRole === 'admin' ? 'Admin' : selectedRole === 'teachers' ? 'Teacher' : 'Student'}
                </span>
              </div>
              <p className="text-xs text-rose-100 font-medium">Birgunj-21, Parwanipur, Parsa • Centralized Management System</p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Portal Feedback Toast */}
        {portalFeedback && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{portalFeedback}</span>
          </div>
        )}

        {/* Portal Body */}
        <div className="flex-1 p-6 sm:p-8 overflow-y-auto space-y-6">
          
          {!isLoggedIn ? (
            /* Login View */
            <div className="max-w-md mx-auto py-4 text-center space-y-6">
              
              {/* Dynamic Role Icon */}
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-sm">
                {selectedRole === 'admin' && <ShieldCheck className="w-7 h-7" />}
                {selectedRole === 'teachers' && <BookOpen className="w-7 h-7" />}
                {selectedRole === 'students' && <GraduationCap className="w-7 h-7" />}
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">
                  {selectedRole === 'admin' && 'Admin Login'}
                  {selectedRole === 'teachers' && 'Teacher Login'}
                  {selectedRole === 'students' && 'Student Login'}
                </h3>
                <p className="text-xs text-slate-500">
                  Select Admin, Teacher, or Student from the dropdown list below.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                
                {/* REQUIRED DROPDOWN: Admin, Teacher, Student */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                    <span>Select Role</span>
                    <span className="text-[10px] text-red-600 font-semibold uppercase tracking-wider">Required</span>
                  </label>
                  <div className="relative">
                    <select
                      id="portal-role-select"
                      value={selectedRole}
                      onChange={(e) => handleRoleChange(e.target.value as PortalRole)}
                      className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border-2 border-slate-200 hover:border-slate-300 focus:border-red-500 text-slate-900 font-bold focus:outline-none appearance-none cursor-pointer pr-10 shadow-xs"
                    >
                      <option value="admin">Admin</option>
                      <option value="teachers">Teacher</option>
                      <option value="students">Student</option>
                    </select>
                    <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* ID / Username Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {selectedRole === 'admin' && 'Admin Username / Security ID'}
                    {selectedRole === 'teachers' && 'Teacher ID / Staff Email'}
                    {selectedRole === 'students' && 'Student Roll Code / ID'}
                  </label>
                  <input
                    type="text"
                    value={loginIdInput}
                    onChange={(e) => setLoginIdInput(e.target.value)}
                    placeholder={
                      selectedRole === 'admin' 
                        ? 'e.g. ADMIN-LFS-01' 
                        : selectedRole === 'teachers' 
                        ? 'e.g. TCH-8802' 
                        : 'e.g. LFS-2005-084'
                    }
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-mono font-bold"
                  />
                </div>

                {/* Password / PIN Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    {selectedRole === 'admin' ? 'Admin Master PIN' : 'Password / PIN'}
                  </label>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-500/20 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <UserCheck className="w-4 h-4" />
                  <span>
                    Sign In as {selectedRole === 'admin' ? 'Admin' : selectedRole === 'teachers' ? 'Teacher' : 'Student'}
                  </span>
                </button>
              </form>

              <p className="text-[11px] text-slate-500 font-medium">
                Need Portal Assistance? School Helpdesk: <a href="tel:+9779840159560" className="text-red-600 font-bold hover:underline">+977-9840159560</a>
              </p>
            </div>
          ) : (
            /* Logged-In Dynamic Dashboard */
            <>
              {/* ============================================================ */}
              {/* 1. ADMIN DASHBOARD VIEW                                      */}
              {/* ============================================================ */}
              {selectedRole === 'admin' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Admin Header */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-red-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-md">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-white">Administrative Central Command</h3>
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                            ONLINE
                          </span>
                        </div>
                        <p className="text-xs text-rose-200 font-medium">ID: {loginIdInput} • Session 2026/27</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Switch Role / Sign Out</span>
                      </button>
                    </div>
                  </div>

                  {/* Admin Quick Metrics */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Total Enrolled</span>
                      <p className="text-2xl font-black text-slate-900">1,200+</p>
                      <span className="text-[10px] text-emerald-600 font-bold">+12% vs Last Year</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-slate-500">Active Teachers</span>
                      <p className="text-2xl font-black text-slate-900">52+</p>
                      <span className="text-[10px] text-slate-500 font-medium">All Sections Staffed</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-300 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-emerald-800">Fee Collections</span>
                      <p className="text-2xl font-black text-emerald-900">NPR 48.2L</p>
                      <span className="text-[10px] text-emerald-700 font-bold">92% Target Reached</span>
                    </div>
                    <div className="p-4 rounded-2xl bg-red-50 border border-red-200 space-y-1">
                      <span className="text-[10px] uppercase font-bold text-red-600">Pending Inquiries</span>
                      <p className="text-2xl font-black text-red-600">14</p>
                      <span className="text-[10px] text-red-600 font-bold">New Admission Forms</span>
                    </div>
                  </div>

                  {/* Admin Action Tabs */}
                  <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
                    {[
                      { key: 'overview', label: 'Overview & Notices', icon: Building2 },
                      { key: 'staff', label: 'Faculty Directory', icon: Users },
                      { key: 'finance', label: 'Financial Ledger', icon: DollarSign }
                    ].map((t) => {
                      const Icon = t.icon;
                      const isActive = activeTab === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setActiveTab(t.key)}
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

                  {/* Admin Tab Content */}
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      {/* Notice Broadcast Form */}
                      <form onSubmit={handlePublishAdminNotice} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                        <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                          <Send className="w-3.5 h-3.5 text-red-600" />
                          <span>Broadcast Urgent Notice to School Board</span>
                        </h4>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={newNoticeTitle}
                            onChange={(e) => setNewNoticeTitle(e.target.value)}
                            placeholder="e.g. Science Fair scheduled for coming Friday • All sections report at 08:00 AM"
                            className="flex-1 px-3.5 py-2 rounded-xl text-xs bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-red-500"
                          />
                          <button
                            type="submit"
                            className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white cursor-pointer shadow-xs"
                          >
                            Publish Notice
                          </button>
                        </div>
                      </form>

                      {/* Recent Notices List */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Published Circulars</h4>
                        <div className="space-y-2">
                          {adminNotices.slice(0, 3).map((notice) => (
                            <div key={notice.id} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-bold text-slate-900">{notice.title}</p>
                                <span className="text-[10px] text-slate-500">{notice.date} • {notice.category}</span>
                              </div>
                              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'staff' && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">School Faculty &amp; Mentors</h4>
                      <div className="grid sm:grid-cols-2 gap-3">
                        {facultyMembers.slice(0, 4).map((member) => (
                          <div key={member.id} className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center gap-3">
                            <img src={member.avatarUrl} alt={member.name} className="w-10 h-10 rounded-full object-cover border" />
                            <div className="min-w-0">
                              <p className="text-xs font-bold text-slate-900 truncate">{member.name}</p>
                              <p className="text-[11px] text-red-600 font-semibold">{member.role}</p>
                              <p className="text-[10px] text-slate-500">{member.department}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'finance' && (
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">Term Revenue Reconciliations</h4>
                      <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold border-b pb-2">
                          <span>Primary Section Revenue</span>
                          <span className="font-mono text-emerald-600">NPR 1,840,000</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold border-b pb-2">
                          <span>Lower Secondary Revenue</span>
                          <span className="font-mono text-emerald-600">NPR 1,420,000</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-bold border-b pb-2">
                          <span>Secondary (SEE Board) Revenue</span>
                          <span className="font-mono text-emerald-600">NPR 1,560,000</span>
                        </div>
                        <div className="flex items-center justify-between text-xs font-black pt-1">
                          <span>Total Collections Reconciled</span>
                          <span className="font-mono text-red-600">NPR 4,820,000</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================ */}
              {/* 2. TEACHERS DASHBOARD VIEW                                   */}
              {/* ============================================================ */}
              {selectedRole === 'teachers' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Teacher Header */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50/70 via-white to-slate-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                        <BookOpen className="w-7 h-7" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-slate-900">Mr. Manoj Kumar Yadav</h3>
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                            {loginIdInput}
                          </span>
                        </div>
                        <p className="text-xs text-red-600 font-bold">HOD — Science &amp; STEM • Grades 9 &amp; 10</p>
                        <p className="text-[11px] text-slate-500 font-medium">Assigned Class: Grade 10 (Lotus)</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-red-50 text-slate-700 hover:text-red-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Switch Role / Sign Out</span>
                      </button>
                    </div>
                  </div>

                  {/* Teacher Tabs */}
                  <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
                    {[
                      { key: 'attendance', label: 'Daily Attendance Marking', icon: Check },
                      { key: 'schedule', label: 'Teaching Timetable', icon: Clock },
                      { key: 'roster', label: 'Grade 10 Class Roster', icon: Users }
                    ].map((t) => {
                      const Icon = t.icon;
                      const isActive = activeTab === t.key;
                      return (
                        <button
                          key={t.key}
                          onClick={() => setActiveTab(t.key)}
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

                  {/* Teacher Tab Content */}
                  {activeTab === 'attendance' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Grade 10 Section Lotus • Daily Roll Call (Today)
                        </h4>
                        <span className="text-[11px] font-bold text-slate-500">
                          Total: {classAttendance.length} Students
                        </span>
                      </div>

                      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                        <table className="w-full text-left text-xs">
                          <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
                            <tr>
                              <th className="p-3.5">Roll No</th>
                              <th className="p-3.5">Student Name</th>
                              <th className="p-3.5">Student ID</th>
                              <th className="p-3.5 text-center">Status</th>
                              <th className="p-3.5 text-right">Quick Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                            {classAttendance.map((st, idx) => (
                              <tr key={st.id} className="hover:bg-red-50/20">
                                <td className="p-3.5 font-bold font-mono text-slate-900">{st.rollNo}</td>
                                <td className="p-3.5 font-bold text-slate-900">{st.name}</td>
                                <td className="p-3.5 font-mono text-slate-500 text-[11px]">{st.id}</td>
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
                                    onClick={() => toggleStudentAttendance(idx)}
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

                  {activeTab === 'schedule' && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Today's Teaching Schedule &amp; Lab Sessions
                      </h4>
                      <div className="space-y-2.5">
                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-red-600 bg-red-50 px-2 py-1 rounded">07:45 - 08:35 AM</span>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Grade 10 — Physics Theory &amp; Optics</p>
                              <p className="text-[10px] text-slate-500">Hall A-1 • Lotus Section</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded">Completed</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-red-50/50 border border-red-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-red-600 bg-red-100 px-2 py-1 rounded">09:45 - 11:00 AM</span>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Grade 9 — Chemistry Titration Practical Lab</p>
                              <p className="text-[10px] text-slate-500">Main Science Lab • Group A &amp; B</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">Current Session</span>
                        </div>

                        <div className="p-3.5 rounded-xl bg-white border border-slate-200 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded">01:30 - 02:20 PM</span>
                            <div>
                              <p className="text-xs font-bold text-slate-900">Grade 8 — General Science &amp; Environment</p>
                              <p className="text-[10px] text-slate-500">Room 204</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">Upcoming</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'roster' && (
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Grade 10 Registered Student Roster
                      </h4>
                      <div className="p-4 rounded-xl bg-white border border-slate-200 text-xs text-slate-700 space-y-2">
                        <p>Total Registered Candidates: <strong>42 Students</strong></p>
                        <p>Average Terminal Class GPA: <strong>3.72</strong></p>
                        <p>Class Monitor: <strong>Aryan Kumar Sah (Roll No: 5)</strong></p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================ */}
              {/* 3. STUDENTS DASHBOARD VIEW                                   */}
              {/* ============================================================ */}
              {selectedRole === 'students' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  {/* Student Overview Header Card */}
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-red-50/60 via-white to-slate-50 border border-red-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-red-600 text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                        AS
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base sm:text-lg font-black text-slate-900">{student.studentName}</h3>
                          <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 border border-red-200">
                            {student.studentId}
                          </span>
                        </div>
                        <p className="text-xs text-red-600 font-bold">{student.grade} • Roll No: {student.rollNo}</p>
                        <p className="text-[11px] text-slate-500 font-medium">Guardian: {student.guardianName}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-6">
                      <div className="text-center sm:text-right">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Current GPA</span>
                        <p className="text-2xl font-black text-red-600">{student.gpa}</p>
                      </div>
                      <div className="text-center sm:text-right">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Attendance</span>
                        <p className="text-2xl font-black text-emerald-700">{student.attendanceRate}%</p>
                      </div>
                      <button
                        onClick={() => setIsLoggedIn(false)}
                        className="p-2 text-slate-400 hover:text-red-600 transition-colors"
                        title="Switch Role / Sign Out"
                      >
                        <LogOut className="w-4 h-4" />
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
                          onClick={() => setActiveTab(t.key)}
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
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          Terminal Marksheet Card
                        </h4>
                        <select
                          value={selectedTermIndex}
                          onChange={(e) => setSelectedTermIndex(Number(e.target.value))}
                          className="px-3 py-1 rounded-lg text-xs bg-slate-50 border border-slate-200 text-slate-800 font-bold"
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
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                        Monthly School Attendance Summary
                      </h4>

                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                        {student.monthlyAttendance.map((m, idx) => {
                          const rate = Math.round((m.present / m.total) * 100);
                          return (
                            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1">
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
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                          {student.examRoutines[0].examName}
                        </h4>
                        <button
                          onClick={handlePrintHallTicket}
                          className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow cursor-pointer"
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
                            <p className="text-xl font-black text-slate-900">NPR {student.feeLedger.totalPaid.toLocaleString()}</p>
                          </div>
                          <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                        </div>

                        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] uppercase font-bold text-red-600">Pending Term Dues</span>
                            <p className="text-xl font-black text-red-600">NPR {student.feeLedger.totalPending.toLocaleString()}</p>
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
                                <h5 className="text-xs font-bold text-slate-900">{inv.title}</h5>
                                <p className="text-[11px] text-slate-500 font-medium">Due Date: {inv.dueDate}</p>
                              </div>

                              <div className="flex items-center gap-3">
                                <span className="font-mono text-sm font-black text-slate-900">
                                  NPR {inv.amount.toLocaleString()}
                                </span>
                                {!isNowPaid ? (
                                  <button
                                    onClick={() => handlePayFee(inv.id, inv.amount)}
                                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1 shadow cursor-pointer"
                                  >
                                    <span>Pay Dues Online</span>
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => alert(`Official Receipt #${inv.receiptNo || 'REC-LFS-4412'} printed!`)}
                                    className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1 border border-slate-200 cursor-pointer"
                                  >
                                    <Printer className="w-3 h-3" />
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
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
