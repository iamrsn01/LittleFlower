import React, { useState } from 'react';
import { 
  X,
  BookOpen, 
  Sparkles, 
  CheckCircle2, 
  Download, 
  ArrowRight, 
  FlaskConical,
  Award,
  Flame,
  ShieldCheck,
  Layers
} from 'lucide-react';
import { academicLevels, AcademicLevel } from '../data/schoolData';
import scienceLabImg from '../assets/science-lab-students.jpg';

interface AcademicsSectionProps {
  onOpenAdmissions: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenAdmissions }) => {
  // 4 Academic program cards
  const programCards = [
    {
      id: 'kindergarten',
      title: 'Playgroup',
      subtitle: '',
      description: 'Nurturing young minds through play and care.',
      icon: (
        <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5.5" r="3" />
          <path d="M7 20a5 5 0 0 1 10 0" />
          <path d="M12 11v4" />
          <path d="M8.5 13.5l-2 2" />
          <path d="M15.5 13.5l2 2" />
          <path d="M18.8 6.8a1.6 1.6 0 0 1 2.2 2.2l-2.2 2.2-2.2-2.2a1.6 1.6 0 0 1 2.2-2.2z" strokeWidth="1.3" />
        </svg>
      )
    },
    {
      id: 'primary-school',
      title: 'Primary Level',
      subtitle: '(1 - 5)',
      description: 'Building strong basics for a lifelong learning.',
      icon: (
        <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
          <path d="M7 8.5h10" />
          <path d="M7 12h5.5" />
          <circle cx="16" cy="12" r="1.3" />
          <path d="M10 17.5v3" />
          <path d="M14 17.5v3" />
          <path d="M7 20.5h10" />
        </svg>
      )
    },
    {
      id: 'lower-secondary',
      title: 'Lower Secondary',
      subtitle: '(6 - 8)',
      description: 'Developing knowledge, skills and confidence.',
      icon: (
        <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4.5h16" />
          <path d="M5.5 4.5v15" />
          <path d="M18.5 4.5v15" />
          <path d="M3.5 19.5h17" />
          <path d="M9.5 4.5v15" />
          <path d="M14.5 4.5v15" />
          <path d="M7.5 7.5h2" />
          <path d="M7.5 11.5h2" />
          <path d="M7.5 15.5h2" />
        </svg>
      )
    },
    {
      id: 'secondary-school',
      title: 'Secondary Level',
      subtitle: '(9 - 10)',
      description: 'Preparing students for SEE and beyond.',
      icon: (
        <svg className="w-10 h-10 text-red-600 transition-transform duration-300 group-hover:scale-110" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="7.5" r="4.5" />
          <path d="M8 11.5L6.5 20l5.5-2.5 5.5 2.5-1.5-8.5" />
          <circle cx="12" cy="7.5" r="1.8" />
        </svg>
      )
    }
  ];

  const [selectedCardId, setSelectedCardId] = useState<string>('secondary-school');
  const [isCurriculumModalOpen, setIsCurriculumModalOpen] = useState<boolean>(false);
  const [downloadedSyllabus, setDownloadedSyllabus] = useState<string | null>(null);

  const activeLevelData: AcademicLevel = 
    academicLevels.find(l => l.id === selectedCardId) || academicLevels[0];

  const handleCardClick = (levelId: string) => {
    setSelectedCardId(levelId);
    setIsCurriculumModalOpen(true);
  };

  const handleDownloadSyllabus = (levelName: string) => {
    setDownloadedSyllabus(levelName);
    setTimeout(() => {
      setDownloadedSyllabus(null);
    }, 3500);
  };

  return (
    <section id="academics" className="w-full bg-white relative overflow-hidden border-t border-slate-200/80">
      
      {/* 1. TOP HEADER: "Excellence from Kindergarten to SEE Board" */}
      <div className="text-center max-w-4xl mx-auto px-4 pt-14 sm:pt-18 pb-8 sm:pb-12">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 border border-red-200/80 text-red-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-xs">
          <Layers className="w-3.5 h-3.5 text-red-600" />
          <span>ACADEMIC PROGRAMS</span>
        </div>

        {/* Primary Title */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] font-display">
          Excellence from <span className="text-red-600">Kindergarten</span> to <br className="hidden sm:inline" />
          <span className="text-red-600">SEE Board</span>
        </h2>

        {/* Header Subtitle */}
        <p className="mt-3.5 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Structured national curriculum enriched with practical science labs, digital computer education, and comprehensive character building.
        </p>

      </div>

      {/* 2. FULL WIDTH SHOWCASE: Left cards + Right photo */}
      <div className="w-full flex flex-col lg:flex-row items-stretch border-t border-slate-100/90">
        
        {/* LEFT COLUMN: Academic Programs Content with generous screen padding */}
        <div className="w-full lg:w-[56%] xl:w-[58%] 2xl:w-[60%] py-10 sm:py-14 lg:py-16 xl:py-20 pl-4 sm:pl-8 lg:pl-12 xl:pl-16 2xl:pl-24 pr-4 sm:pr-8 lg:pr-8 xl:pr-12 flex flex-col justify-center z-10">
          
          {/* Section Sub-heading */}
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-2.5 font-display">
            A Strong Foundation for a <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">Bright Future</span>
          </h3>

          {/* Introductory Subtitle */}
          <p className="text-slate-600 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 sm:mb-8 max-w-2xl font-normal">
            We offer a comprehensive curriculum from Playgroup to Grade 10 following the latest education standards.
          </p>

          {/* 4 Cards in Horizontal Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-3.5 xl:gap-4 mb-6 sm:mb-8">
            {programCards.map((card) => {
              const isSelected = card.id === selectedCardId;
              return (
                <div
                  key={card.id}
                  onClick={() => handleCardClick(card.id)}
                  className={`bg-white rounded-xl sm:rounded-2xl border p-3.5 sm:p-4 text-center flex flex-col items-center justify-between min-h-[165px] sm:min-h-[190px] transition-all duration-300 cursor-pointer group hover:-translate-y-1 ${
                    isSelected
                      ? 'border-red-600 shadow-md shadow-red-500/10 ring-1 ring-red-600/20'
                      : 'border-slate-200/90 hover:border-red-400 hover:shadow-lg hover:shadow-red-500/10 shadow-xs'
                  }`}
                >
                  {/* Centered Icon in Brand Red */}
                  <div className="h-10 flex items-center justify-center">
                    {card.icon}
                  </div>

                  {/* Program Title & Grade Specifier */}
                  <div className="my-1.5 space-y-0.5">
                    <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-red-600 transition-colors font-display">
                      {card.title}
                    </h4>
                    {card.subtitle && (
                      <div className="text-[11px] sm:text-xs font-semibold text-slate-500">
                        {card.subtitle}
                      </div>
                    )}
                  </div>

                  {/* Short Description */}
                  <p className="text-[11px] sm:text-xs text-slate-500 leading-snug">
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Brand Red Action CTA Button */}
          <div>
            <button
              onClick={() => setIsCurriculumModalOpen(true)}
              className="px-6 sm:px-8 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-bold shadow-lg shadow-red-600/25 hover:shadow-red-600/35 transition-all inline-flex items-center gap-2 cursor-pointer group"
            >
              <span>View Curriculum</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>

        {/* RIGHT COLUMN: Full-width science lab students photo extending to screen edge */}
        <div className="w-full lg:w-[44%] xl:w-[42%] 2xl:w-[40%] relative min-h-[300px] sm:min-h-[380px] lg:min-h-[480px] xl:min-h-[520px] bg-slate-100 overflow-hidden">
          <img
            src={scienceLabImg}
            alt="Little Flower Secondary School students conducting practical experiments in science laboratory"
            className="w-full h-full object-cover object-center"
          />

          {/* Smooth left gradient overlay to blend photo seamlessly into section background */}
          <div className="hidden lg:block absolute inset-y-0 left-0 w-28 xl:w-44 bg-gradient-to-r from-white via-white/60 to-transparent pointer-events-none" />
          
          {/* Top gradient on mobile */}
          <div className="lg:hidden absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white to-transparent pointer-events-none" />
        </div>

      </div>

      {/* DETAILED CURRICULUM MODAL */}
      {isCurriculumModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsCurriculumModalOpen(false)}
        >
          <div 
            className="bg-white border border-slate-200 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 sm:p-8 space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Academic Curriculum & Coursework</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
                  {activeLevelData.name}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  {activeLevelData.gradeRange} • {activeLevelData.tagline}
                </p>
              </div>

              <button
                onClick={() => setIsCurriculumModalOpen(false)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                title="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Level Selector Tabs Inside Modal */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {programCards.map((c) => {
                const isCurrent = c.id === selectedCardId;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCardId(c.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                      isCurrent
                        ? 'bg-red-600 text-white shadow-md shadow-red-600/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.title} {c.subtitle}
                  </button>
                );
              })}
            </div>

            {/* Download Toast */}
            {downloadedSyllabus && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in duration-150">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Curriculum PDF for <strong>{downloadedSyllabus}</strong> downloaded successfully!</span>
              </div>
            )}

            {/* Coursework & Subjects Grid */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  Key Subjects & Credit Hours
                </h4>
                <span className="text-[11px] text-slate-500 font-medium">SEE & Curriculum Development Centre (CDC) Aligned</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-2.5">
                {activeLevelData.subjects.map((sub, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-2 hover:border-red-300 transition-colors"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-mono font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded border border-red-200">
                          {sub.code}
                        </span>
                        {sub.isPractical && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            <FlaskConical className="w-2.5 h-2.5" />
                            Practical Lab
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-800">
                        {sub.name}
                      </p>
                    </div>

                    <span className="text-[11px] font-mono text-slate-500 shrink-0 font-medium">
                      {sub.credits} Credits
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Distinctive Pedagogical Highlights */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                Distinctive Academic Highlights
              </h4>
              <div className="grid sm:grid-cols-2 gap-2">
                {activeLevelData.keyHighlights.map((hl, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Admission & Guidelines Box */}
            <div className="p-4 rounded-2xl bg-red-50/40 border border-red-200/80 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
                <ShieldCheck className="w-4 h-4 text-red-600" />
                <span>Eligibility & Admission Criteria</span>
              </div>
              <ul className="grid sm:grid-cols-2 gap-2 text-xs text-slate-600">
                {activeLevelData.admissionRequirements.map((req, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
              <div className="p-2.5 rounded-xl bg-white border border-red-200 text-[11px] text-slate-700 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0 fill-current" />
                <span>Merit scholarship waivers available for high-scoring students and BLE distinction holders.</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDownloadSyllabus(activeLevelData.name)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-red-600 bg-slate-100 hover:bg-red-50 border border-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-red-600" />
                <span>Download Curriculum PDF</span>
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setIsCurriculumModalOpen(false)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 border border-slate-200 cursor-pointer"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setIsCurriculumModalOpen(false);
                    onOpenAdmissions();
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 shadow-md shadow-red-600/20 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
