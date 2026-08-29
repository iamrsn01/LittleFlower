import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Compass, 
  Sparkles, 
  Heart, 
  CheckCircle2, 
  Download, 
  ArrowRight,
  FlaskConical,
  Award,
  Layers,
  Flame
} from 'lucide-react';
import { academicLevels, AcademicLevel } from '../data/schoolData';

interface AcademicsSectionProps {
  onOpenAdmissions: () => void;
}

export const AcademicsSection: React.FC<AcademicsSectionProps> = ({ onOpenAdmissions }) => {
  const [selectedLevelId, setSelectedLevelId] = useState<string>(academicLevels[0].id);
  const [downloadedSyllabus, setDownloadedSyllabus] = useState<string | null>(null);

  const currentLevel: AcademicLevel = academicLevels.find(l => l.id === selectedLevelId) || academicLevels[0];

  const getLevelIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Heart': return <Heart className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const handleDownloadSyllabus = (levelName: string) => {
    setDownloadedSyllabus(levelName);
    setTimeout(() => {
      setDownloadedSyllabus(null);
    }, 3500);
  };

  return (
    <section id="academics" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Layers className="w-3.5 h-3.5 text-red-600" />
            <span>Academic Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Excellence from <span className="text-red-600">Kindergarten</span> to <span className="text-red-600">SEE Board</span>
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Structured national curriculum enriched with practical science labs, digital computer education, and comprehensive character building.
          </p>
        </div>

        {/* Academic Level Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 mb-12">
          {academicLevels.map((lvl) => {
            const isSelected = lvl.id === selectedLevelId;
            return (
              <button
                key={lvl.id}
                onClick={() => setSelectedLevelId(lvl.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-3 cursor-pointer shadow-xs ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-md shadow-red-500/25 border border-red-600 scale-[1.02]'
                    : 'bg-white text-slate-700 hover:text-red-600 hover:bg-red-50/50 border border-slate-200'
                }`}
              >
                <div className={`p-1.5 rounded-xl ${isSelected ? 'bg-white/20 text-white' : 'bg-red-50 text-red-600'}`}>
                  {getLevelIcon(lvl.iconName)}
                </div>
                <div className="text-left">
                  <div className="font-extrabold leading-tight">{lvl.name}</div>
                  <div className={`text-[11px] font-semibold ${isSelected ? 'text-red-100' : 'text-slate-500'}`}>
                    {lvl.gradeRange}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Academic Level Detailed Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-lg relative overflow-hidden">
          
          {/* Top Level Info */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-8 border-b border-slate-200">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                  {currentLevel.badge}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  {currentLevel.gradeRange}
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-display">
                {currentLevel.name}
              </h3>
              <p className="text-red-600 text-sm font-bold">
                {currentLevel.tagline}
              </p>
              <p className="text-slate-600 text-sm max-w-3xl leading-relaxed pt-1 font-normal">
                {currentLevel.description}
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 lg:flex-col lg:items-end shrink-0">
              <button
                onClick={onOpenAdmissions}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-red-600 hover:bg-red-500 transition-all shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Apply for this Level</span>
              </button>

              <button
                onClick={() => handleDownloadSyllabus(currentLevel.name)}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-bold text-slate-700 hover:text-red-600 bg-slate-50 hover:bg-red-50 border border-slate-300 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
              >
                <Download className="w-3.5 h-3.5 text-red-600" />
                <span>Download Curriculum PDF</span>
              </button>
            </div>
          </div>

          {/* Download Toast Notification */}
          {downloadedSyllabus && (
            <div className="my-4 p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-bounce">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Curriculum specification for <strong>{downloadedSyllabus}</strong> downloaded successfully!</span>
            </div>
          )}

          {/* Core Structure Grid */}
          <div className="grid lg:grid-cols-3 gap-8 pt-8">
            
            {/* Subjects & Credit Breakdown */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-red-600" />
                  Key Subjects & Coursework
                </h4>
                <span className="text-[11px] text-slate-500 font-semibold">Standard Academic Session</span>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {currentLevel.subjects.map((sub, idx) => (
                  <div 
                    key={idx}
                    className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-red-400 transition-all flex items-center justify-between gap-3 group hover:bg-white shadow-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-red-600 bg-red-50/70 px-1.5 py-0.5 rounded border border-red-200">
                          {sub.code}
                        </span>
                        {sub.isPractical && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                            <FlaskConical className="w-2.5 h-2.5" />
                            Practical Lab
                          </span>
                        )}
                      </div>
                      <p className="text-xs font-bold text-slate-800 group-hover:text-red-600 transition-colors">
                        {sub.name}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">
                        {sub.credits} Credits
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pedagogical Highlights */}
              <div className="pt-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  Distinctive Academic Highlights
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {currentLevel.keyHighlights.map((hl, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Admission & Eligibility Box */}
            <div className="p-6 rounded-2xl bg-red-50/40 border border-red-200 space-y-5 flex flex-col justify-between shadow-xs">
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span>Admission Criteria & Guidelines</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-700 font-medium">
                  {currentLevel.admissionRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>

                <div className="p-3.5 rounded-xl bg-white border border-red-200 text-[11px] text-slate-700 space-y-1 shadow-xs">
                  <p className="font-bold text-red-600 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-500 fill-current" />
                    Merit Scholarship Policy:
                  </p>
                  <p>Students with outstanding scholastic merit and BLE scores receive tuition fee waivers.</p>
                </div>
              </div>

              <button
                onClick={onOpenAdmissions}
                className="w-full py-3 rounded-xl text-xs font-bold bg-red-600 hover:bg-red-500 text-white transition-all shadow-md shadow-red-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Register for {currentLevel.name}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
