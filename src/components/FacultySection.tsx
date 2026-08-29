import React, { useState, useRef } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Award, 
  ChevronRight, 
  ChevronLeft,
  X, 
  Send, 
  CheckCircle2,
  Phone
} from 'lucide-react';
import { facultyMembers, FacultyMember } from '../data/schoolData';

export const FacultySection: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [activeFaculty, setActiveFaculty] = useState<FacultyMember | null>(null);
  const [messageSent, setMessageSent] = useState<boolean>(false);
  const [inquiryText, setInquiryText] = useState<string>('');
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const departments = [
    'All',
    'Science & STEM',
    'Mathematics',
    'Computer & AI',
    'Languages & Literature',
    'Social Sciences',
    'Arts & Physical Ed'
  ];

  const filteredFaculty = selectedDept === 'All'
    ? facultyMembers
    : facultyMembers.filter(f => f.department === selectedDept);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inquiryText.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setMessageSent(false);
        setInquiryText('');
        setActiveFaculty(null);
      }, 2500);
    }
  };

  return (
    <section id="faculty" className="py-20 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Horizontal Scroll Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
              <GraduationCap className="w-3.5 h-3.5 text-red-600" />
              <span>Academic Leadership</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight font-display">
              Dedicated Mentors & Teachers
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
              Experienced educators committed to academic excellence and student mentorship at Little Flower Secondary School.
            </p>
          </div>

          {/* Navigation Arrows for Horizontal List */}
          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={handleScrollLeft}
              aria-label="Scroll Left"
              className="p-2.5 rounded-xl bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-300 transition-all cursor-pointer shadow-xs"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleScrollRight}
              aria-label="Scroll Right"
              className="p-2.5 rounded-xl bg-white hover:bg-red-50 text-slate-700 hover:text-red-600 border border-slate-200 hover:border-red-300 transition-all cursor-pointer shadow-xs"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Department Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {departments.map((dept) => (
            <button
              key={dept}
              onClick={() => setSelectedDept(dept)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedDept === dept
                  ? 'bg-red-600 text-white shadow-sm shadow-red-500/20 border border-red-600'
                  : 'bg-white text-slate-700 hover:text-red-600 hover:bg-red-50/50 border border-slate-200 shadow-xs'
              }`}
            >
              {dept}
            </button>
          ))}
        </div>

        {/* COMPACT HORIZONTAL LISTING CONTAINER */}
        <div 
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x scroll-smooth no-scrollbar"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {filteredFaculty.map((member) => (
            <div
              key={member.id}
              onClick={() => setActiveFaculty(member)}
              className="min-w-[290px] sm:min-w-[330px] max-w-[340px] snap-start bg-white border border-slate-200 hover:border-red-400 rounded-2xl p-4 transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md cursor-pointer flex items-center gap-3.5 group shrink-0"
            >
              {/* Compact Avatar */}
              <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
                <img
                  src={member.avatarUrl}
                  alt={member.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Compact Information */}
              <div className="space-y-1 min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-red-50 text-red-600 border border-red-100 truncate max-w-[150px]">
                    {member.department}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium ml-auto shrink-0">
                    {member.experience}
                  </span>
                </div>

                <h3 className="text-xs sm:text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                  {member.name}
                </h3>

                <p className="text-[11px] text-red-600 font-semibold truncate">
                  {member.role}
                </p>

                <p className="text-[10px] text-slate-500 font-medium truncate">
                  {member.qualification}
                </p>
              </div>

              <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-red-600 group-hover:translate-x-0.5 transition-all shrink-0" />
            </div>
          ))}
        </div>

      </div>

      {/* Faculty Profile & Inquiry Modal */}
      {activeFaculty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
          <div 
            className="bg-white border border-slate-300 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="relative p-6 bg-red-50/40 border-b border-red-100 flex items-start gap-4">
              <div className="w-18 h-18 rounded-2xl overflow-hidden border-2 border-red-500 shrink-0 shadow-sm">
                <img 
                  src={activeFaculty.avatarUrl} 
                  alt={activeFaculty.name}
                  className="w-full h-full object-cover" 
                />
              </div>

              <div className="space-y-1 flex-1 pr-6">
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-red-600 border border-red-200">
                  {activeFaculty.department}
                </span>
                <h3 className="text-xl font-black text-slate-900">
                  {activeFaculty.name}
                </h3>
                <p className="text-xs text-red-600 font-bold">
                  {activeFaculty.role}
                </p>
                <p className="text-[11px] text-slate-600 font-medium">
                  {activeFaculty.qualification} • {activeFaculty.experience}
                </p>
              </div>

              <button
                onClick={() => setActiveFaculty(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white text-slate-600 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer shadow-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Bio & Achievements */}
            <div className="p-6 space-y-5">
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Academic Background & Teaching Approach
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  {activeFaculty.bio}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Key Achievements & Recognitions
                </h4>
                <div className="space-y-1.5">
                  {activeFaculty.achievements.map((ach, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inquiry Form */}
              <div className="pt-3 border-t border-slate-200 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-red-600" />
                  Send Academic Message / Inquiry
                </h4>

                {messageSent ? (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Inquiry sent to {activeFaculty.name}! You will receive a response within 24 hours.</span>
                  </div>
                ) : (
                  <form onSubmit={handleSendMessage} className="space-y-2.5">
                    <textarea
                      value={inquiryText}
                      onChange={(e) => setInquiryText(e.target.value)}
                      placeholder={`Write your inquiry for ${activeFaculty.name}...`}
                      rows={3}
                      required
                      className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-300 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors"
                    />
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-mono">
                        {activeFaculty.email}
                      </span>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-500/20 flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3 h-3" />
                        <span>Send Message</span>
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
