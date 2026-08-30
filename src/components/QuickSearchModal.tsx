import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  X, 
  GraduationCap, 
  Building2, 
  Bell, 
  ArrowRight,
  BookOpen,
  Bus,
  Sparkles,
  Layers,
  ChevronRight,
  CornerDownLeft
} from 'lucide-react';
import { academicLevels, facultyMembers, facilitiesList, schoolNotices, busRoutesList } from '../data/schoolData';

interface QuickSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (sectionId: string) => void;
}

export const QuickSearchModal: React.FC<QuickSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectAction
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setActiveCategory('All');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const allSearchItems = [
    ...academicLevels.map(a => ({
      title: a.name,
      subtitle: `${a.gradeRange} • ${a.tagline}`,
      category: 'Academics',
      sectionId: 'academics',
      icon: BookOpen,
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200'
    })),
    ...facultyMembers.map(f => ({
      title: f.name,
      subtitle: `${f.role} — ${f.department}`,
      category: 'Faculty',
      sectionId: 'faculty',
      icon: GraduationCap,
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    })),
    ...facilitiesList.map(fac => ({
      title: fac.name,
      subtitle: `${fac.category} • Capacity: ${fac.capacity}`,
      category: 'Facilities',
      sectionId: 'facilities',
      icon: Building2,
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200'
    })),
    ...schoolNotices.map(n => ({
      title: n.title,
      subtitle: `${n.category} • Date: ${n.date}`,
      category: 'Notices',
      sectionId: 'notices',
      icon: Bell,
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-200'
    })),
    ...busRoutesList.map(b => ({
      title: `${b.routeNumber}: ${b.routeName}`,
      subtitle: `Via ${b.stops.slice(0, 3).join(', ')}... (Driver: ${b.driverName})`,
      category: 'Transport',
      sectionId: 'transport',
      icon: Bus,
      badgeColor: 'bg-rose-100 text-rose-800 border-rose-200'
    })),
    {
      title: 'Online Admissions & Scholarship Estimator',
      subtitle: 'Apply for Nursery to Grade 9 (Academic Session 2026/27)',
      category: 'Admissions',
      sectionId: 'admissions',
      icon: Sparkles,
      badgeColor: 'bg-red-100 text-red-800 border-red-200'
    }
  ];

  const categories = ['All', 'Academics', 'Faculty', 'Facilities', 'Notices', 'Transport'];

  const filteredResults = allSearchItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesQuery = !query.trim() || 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white border-t-4 border-t-red-600 border-x border-b border-slate-700 max-w-2xl w-full rounded-none shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Bar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 rounded-none bg-red-950/80 border border-red-700 text-red-400 shrink-0">
            <Search className="w-5 h-5 animate-pulse" />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search school programs, teachers, labs, notices, bus routes..."
            className="w-full text-sm sm:text-base font-bold bg-transparent text-white placeholder-slate-400 focus:outline-none"
          />

          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-none text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            onClick={onClose}
            className="px-2.5 py-1 rounded-none bg-slate-800 hover:bg-red-600 hover:text-white text-slate-400 text-xs font-mono border border-slate-700 transition-all cursor-pointer shrink-0"
            title="Close modal (ESC)"
          >
            ESC
          </button>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4 py-2.5 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1 text-xs font-bold rounded-none transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-red-600 text-white border border-red-600 shadow-xs'
                    : 'bg-white text-slate-600 hover:text-red-600 hover:bg-red-50 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            );
          })}
          <span className="text-[11px] font-mono font-semibold text-slate-400 ml-auto hidden sm:inline">
            {filteredResults.length} Result{filteredResults.length === 1 ? '' : 's'}
          </span>
        </div>

        {/* Results List */}
        <div className="max-h-[380px] overflow-y-auto p-2 space-y-1.5 bg-slate-50 divide-y divide-slate-100">
          {filteredResults.length > 0 ? (
            filteredResults.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectAction(item.sectionId);
                    onClose();
                  }}
                  className="p-3 bg-white rounded-none border border-slate-200/80 hover:border-red-500 hover:border-l-4 hover:border-l-red-600 hover:bg-red-50/50 transition-all flex items-center justify-between gap-3 cursor-pointer group shadow-xs"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <div className="w-10 h-10 rounded-none bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700 group-hover:bg-red-600 group-hover:text-white group-hover:border-red-600 transition-all duration-200 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs sm:text-sm font-extrabold text-slate-900 group-hover:text-red-600 transition-colors truncate">
                          {item.title}
                        </span>
                        <span className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-none border ${item.badgeColor}`}>
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0 text-slate-400 group-hover:text-red-600 group-hover:translate-x-1 transition-all">
                    <span className="text-[10px] font-bold uppercase hidden sm:inline">Jump</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-10 text-center space-y-2">
              <div className="w-12 h-12 rounded-none bg-red-50 border border-red-200 text-red-500 flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">No matching campus records found</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try searching for keywords like <span className="font-semibold text-red-600">"SEE"</span>, <span className="font-semibold text-red-600">"Science"</span>, <span className="font-semibold text-red-600">"Admission"</span>, or <span className="font-semibold text-red-600">"Bus"</span>.
              </p>
            </div>
          )}
        </div>

        {/* Keyboard Shortcuts Footer */}
        <div className="p-3 bg-slate-900 text-slate-400 border-t border-slate-800 flex items-center justify-between text-[11px] font-medium">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-none bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                <CornerDownLeft className="w-3 h-3 inline" /> Enter
              </kbd>
              <span>to Select</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 rounded-none bg-slate-800 border border-slate-700 text-slate-300 font-mono text-[10px]">
                ESC
              </kbd>
              <span>to Exit</span>
            </span>
          </div>

          <span className="text-[10px] text-red-400 font-bold uppercase tracking-wider">
            Little Flower Instant Index
          </span>
        </div>
      </div>
    </div>
  );
};
