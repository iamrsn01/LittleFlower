import React, { useState } from 'react';
import { 
  Bell, 
  Calendar, 
  Download, 
  Search, 
  Clock, 
  MapPin, 
  ChevronRight, 
  X, 
  CheckCircle2, 
  FileText,
  Sparkles,
  Users
} from 'lucide-react';
import { upcomingEvents, SchoolNotice, SchoolEvent } from '../data/schoolData';
import { useSchoolData } from '../context/SchoolDataContext';

export const NoticesAndEvents: React.FC = () => {
  const { schoolNotices } = useSchoolData();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedNotice, setSelectedNotice] = useState<SchoolNotice | null>(null);
  const [rsvpEvent, setRsvpEvent] = useState<SchoolEvent | null>(null);
  const [rsvpSuccess, setRsvpSuccess] = useState<boolean>(false);
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const categories = ['All', 'Academic', 'Examination', 'Sports', 'Holiday'];

  const filteredNotices = schoolNotices.filter((n) => {
    const matchesCat = activeCategory === 'All' || n.category === activeCategory;
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          n.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const handleDownloadNotice = (notice: SchoolNotice) => {
    setDownloadToast(`Downloaded: ${notice.title}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSuccess(true);
    setTimeout(() => {
      setRsvpSuccess(false);
      setRsvpEvent(null);
    }, 2500);
  };

  return (
    <section id="notices" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Bell className="w-3.5 h-3.5 text-red-600" />
            <span>School Circulars & Events</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Notice Board & Upcoming Programs
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Official announcements, examination routines, vacation schedules, and annual cultural celebrations of Little Flower Secondary School.
          </p>
        </div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Official Notices (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Bell className="w-5 h-5 text-red-600" />
                <span>School Notice Board</span>
              </h3>

              {/* Search input */}
              <div className="relative w-full sm:w-64">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search notices..."
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-red-500 transition-colors shadow-xs"
                />
              </div>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    activeCategory === c
                      ? 'bg-red-600 text-white shadow-xs'
                      : 'bg-slate-50 text-slate-600 hover:text-red-600 border border-slate-200'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Download Toast */}
            {downloadToast && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{downloadToast}</span>
              </div>
            )}

            {/* Notices List */}
            <div className="space-y-3">
              {filteredNotices.length > 0 ? (
                filteredNotices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => setSelectedNotice(notice)}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-400 transition-all hover:bg-red-50/20 cursor-pointer flex items-start justify-between gap-4 group shadow-sm hover:shadow-md"
                  >
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        {notice.isUrgent && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-100 text-red-700 border border-red-200 animate-pulse">
                            Important
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {notice.category}
                        </span>
                        <span className="text-[11px] text-slate-500 font-semibold font-mono">
                          {notice.date}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-red-600 transition-colors leading-snug">
                        {notice.title}
                      </h4>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {notice.summary}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-2 shrink-0">
                      <span className="text-red-600 text-xs font-bold group-hover:underline flex items-center gap-0.5">
                        Read
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                      {notice.fileSize && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownloadNotice(notice);
                          }}
                          title="Download attachment"
                          className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-xs text-slate-500">
                  No notices matching your filter.
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Upcoming Events (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-red-600" />
                <span>Upcoming Events Calendar</span>
              </h3>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((ev) => (
                <div
                  key={ev.id}
                  className="p-5 rounded-2xl bg-white border border-slate-200 hover:border-red-300 transition-all space-y-3.5 shadow-sm relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                      {ev.category}
                    </span>
                    <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded border border-red-100">
                      {ev.date}
                    </span>
                  </div>

                  <h4 className="text-sm sm:text-base font-bold text-slate-900">
                    {ev.title}
                  </h4>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {ev.description}
                  </p>

                  <div className="pt-2 border-t border-slate-100 flex flex-col gap-1.5 text-[11px] text-slate-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-red-600" />
                      <span>{ev.time}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-600" />
                      <span>{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Users className="w-3.5 h-3.5 text-red-600" />
                      <span>{ev.audience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setRsvpEvent(ev)}
                    className="w-full mt-2 py-2 rounded-xl text-xs font-bold bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 hover:border-red-600 transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Reserve Seat / Join Program</span>
                  </button>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Notice Detail Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
          <div 
            className="bg-white border border-slate-300 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-red-50 text-red-700 border border-red-200">
                    {selectedNotice.category}
                  </span>
                  <span className="text-xs text-slate-500 font-mono">
                    {selectedNotice.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  {selectedNotice.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNotice(null)}
                className="p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
              {selectedNotice.details}
            </p>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-red-600" />
                <span className="text-slate-800 font-bold">Official Document Attachment</span>
              </div>
              <span className="text-slate-500 font-mono">{selectedNotice.fileSize}</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              <button
                onClick={() => setSelectedNotice(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleDownloadNotice(selectedNotice);
                  setSelectedNotice(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white flex items-center gap-1.5 shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Circular</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* RSVP Modal */}
      {rsvpEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
          <div 
            className="bg-white border border-slate-300 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider">Event RSVP</span>
                <h3 className="text-base font-bold text-slate-900">{rsvpEvent.title}</h3>
                <p className="text-xs text-slate-500">{rsvpEvent.date} • {rsvpEvent.time}</p>
              </div>
              <button onClick={() => setRsvpEvent(null)} className="p-1 text-slate-500 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            {rsvpSuccess ? (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Seat reserved successfully! Confirmation sent to your contact phone number.</span>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3 pt-2">
                <input
                  type="text"
                  placeholder="Your Full Name"
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:border-red-500 focus:outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:border-red-500 focus:outline-none"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-900 focus:border-red-500 focus:outline-none"
                />
                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setRsvpEvent(null)}
                    className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white shadow-xs"
                  >
                    Confirm RSVP
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </section>
  );
};
