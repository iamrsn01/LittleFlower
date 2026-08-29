import React, { useState } from 'react';
import { 
  X, 
  UserCheck, 
  Award, 
  Calendar, 
  CreditCard, 
  Download, 
  CheckCircle2, 
  LogOut, 
  Printer,
  TrendingUp
} from 'lucide-react';
import { mockStudentRecord, StudentRecord } from '../data/schoolData';
import confetti from 'canvas-confetti';

interface StudentPortalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentPortal: React.FC<StudentPortalProps> = ({ isOpen, onClose }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [studentIdInput, setStudentIdInput] = useState('LFS-2005-084');
  const [activeTab, setActiveTab] = useState<'grades' | 'attendance' | 'exams' | 'fees'>('grades');
  const [selectedTermIndex, setSelectedTermIndex] = useState<number>(0);
  const [paidInvoices, setPaidInvoices] = useState<string[]>([]);
  const [portalFeedback, setPortalFeedback] = useState<string | null>(null);

  if (!isOpen) return null;

  const student: StudentRecord = mockStudentRecord;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentIdInput.trim()) {
      setIsLoggedIn(true);
      setPortalFeedback('Logged into Little Flower Portal successfully!');
      setTimeout(() => setPortalFeedback(null), 3000);
    }
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
              <img src="/logo.png" alt="Little Flower Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-base sm:text-lg font-black tracking-wide">Little Flower Student Portal</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/20 text-white">
                  Parwanipur, Parsa
                </span>
              </div>
              <p className="text-xs text-rose-100 font-medium">Guardian & Student Integrated Academic Desk</p>
            </div>
          </div>

          <button
            onClick={onClose}
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
            <div className="max-w-md mx-auto py-8 text-center space-y-6">
              <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto shadow-sm">
                <UserCheck className="w-7 h-7" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Student & Parent Login</h3>
                <p className="text-xs text-slate-500">Enter your Roll Code (e.g. LFS-2005-084) to access term marks and fee details.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 text-left">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Student Roll / ID</label>
                  <input
                    type="text"
                    value={studentIdInput}
                    onChange={(e) => setStudentIdInput(e.target.value)}
                    placeholder="e.g. LFS-2005-084"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-mono font-bold"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Password / PIN</label>
                  <input
                    type="password"
                    defaultValue="••••••••"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-md shadow-red-500/20 transition-all cursor-pointer"
                >
                  Sign In to Little Flower Portal
                </button>
              </form>

              <div className="p-3 rounded-xl bg-red-50/50 border border-red-100 text-[11px] text-slate-700 flex items-center justify-between font-medium">
                <span>Demo Student: <strong>LFS-2005-084</strong></span>
                <button
                  type="button"
                  onClick={() => setIsLoggedIn(true)}
                  className="text-red-600 font-bold hover:underline"
                >
                  1-Click Auto Login
                </button>
              </div>
            </div>
          ) : (
            /* Logged-In Student Dashboard */
            <>
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
                    title="Sign Out"
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
                      className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download Exam Admit Card</span>
                    </button>
                  </div>

                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-50 text-slate-700 border-b border-slate-200 text-[11px] uppercase font-bold">
                        <tr>
                          <th className="p-3.5">Date & Day</th>
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
                                className="px-3 py-1.5 rounded-xl text-xs bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold flex items-center gap-1 border border-slate-200"
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
            </>
          )}

        </div>
      </div>
    </div>
  );
};
