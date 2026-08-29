import React, { useState, useEffect } from 'react';
import { 
  Search, 
  X, 
  GraduationCap, 
  Building2, 
  Bell, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { academicLevels, facultyMembers, facilitiesList, schoolNotices } from '../data/schoolData';

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

  if (!isOpen) return null;

  const results = [
    ...academicLevels.map(a => ({
      title: a.name,
      subtitle: `${a.gradeRange} • ${a.tagline}`,
      category: 'Academics',
      sectionId: 'academics',
      icon: BookOpen
    })),
    ...facultyMembers.map(f => ({
      title: f.name,
      subtitle: `${f.role} (${f.department})`,
      category: 'Faculty',
      sectionId: 'faculty',
      icon: GraduationCap
    })),
    ...facilitiesList.map(fac => ({
      title: fac.name,
      subtitle: `${fac.category} • Capacity: ${fac.capacity}`,
      category: 'Facilities',
      sectionId: 'facilities',
      icon: Building2
    })),
    ...schoolNotices.map(n => ({
      title: n.title,
      subtitle: `${n.category} • ${n.date}`,
      category: 'Notice',
      sectionId: 'notices',
      icon: Bell
    }))
  ].filter(item => 
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.subtitle.toLowerCase().includes(query.toLowerCase()) ||
    item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-20 bg-slate-950/70 backdrop-blur-md">
      <div 
        className="bg-white border-2 border-rose-200 rounded-3xl max-w-2xl w-full shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Box */}
        <div className="p-4 bg-rose-50/80 border-b border-rose-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-red-700 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search programs, teachers, labs, notices..."
            className="w-full text-sm bg-transparent text-slate-900 placeholder-slate-400 focus:outline-none font-medium"
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-white text-slate-500 hover:text-red-800 border border-rose-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-1">
          {results.length > 0 ? (
            results.slice(0, 8).map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => {
                    onSelectAction(item.sectionId);
                    onClose();
                  }}
                  className="p-3 rounded-2xl hover:bg-rose-50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-rose-100 border border-rose-200 flex items-center justify-center text-red-800 group-hover:border-red-400">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 group-hover:text-red-800 transition-colors">
                          {item.title}
                        </span>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-rose-100/80 text-red-900 border border-rose-200">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium line-clamp-1">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-red-800 group-hover:translate-x-1 transition-all" />
                </div>
              );
            })
          ) : (
            <div className="p-8 text-center text-xs text-slate-500">
              No results found matching "{query}".
            </div>
          )}
        </div>

        {/* Keyboard Footer */}
        <div className="p-3 bg-rose-50/50 border-t border-rose-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
          <span>Navigate with mouse or arrow keys</span>
          <span className="font-mono">ESC to close</span>
        </div>
      </div>
    </div>
  );
};
