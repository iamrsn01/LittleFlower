import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Users, 
  Compass, 
  Target, 
  Quote
} from 'lucide-react';
import studentImg from '../assets/welcome-student.jpg';

interface AboutSectionProps {
  onOpenAdmissions: () => void;
  onOpenVirtualTour: () => void;
  onOpenPortal: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onOpenAdmissions,
  onOpenVirtualTour,
  onOpenPortal
}) => {
  return (
    <section id="about" className="py-10 sm:py-14 lg:py-16 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden">
      
      {/* Subtle ambient decorative glows */}
      <div className="absolute top-1/4 right-0 w-80 h-80 bg-red-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Eyebrow & Primary Title (Sharp Pill) */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-none bg-red-50 border border-red-200/80 text-red-600 text-xs font-bold tracking-wider uppercase mb-3 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-red-600" />
            <span>Estd. 2005 • Birgunj–21, Parwanipur, Parsa, Nepal</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15] font-display">
            Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">Little Flower</span> Secondary School
          </h2>
          
          <p className="mt-2.5 text-sm sm:text-base text-slate-600 font-normal max-w-3xl mx-auto leading-relaxed">
            Dedicated to delivering quality foundational to secondary education with modern science laboratories, high-speed computer education, disciplined mentorship, and consistent 100% SEE Board pass results.
          </p>
        </div>

        {/* Main 2-Column Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-stretch">
          
          {/* Left Column: Founding Heritage, Vision, Mission, CTAs & Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-3.5">
            
            {/* 1. Founding Heritage & Memorial Card (Sharp Corners: rounded-none) */}
            <div className="relative bg-white rounded-none p-5 sm:p-5.5 border-l-4 border-red-600 border-y border-r border-slate-200/80 shadow-xs hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-none bg-red-50 text-red-700 text-[10.5px] font-bold uppercase tracking-wider border border-red-200/50">
                  Heritage &amp; Foundation
                </span>
                <span className="text-xs font-semibold text-slate-500">
                  Nepal Little Flower Society (Reg. No. 724/053/54)
                </span>
              </div>
              <p className="text-xs sm:text-[13.5px] text-slate-700 leading-relaxed font-normal text-justify sm:text-left">
                Little Flower Sec. School, Parwanipur, Parsa, Nepal was established in the year 2005, the Platinum Jubliee Year of Little Flower Congregation, and is managed and administered by Nepal Little Flower Society (Reg. No. 724/053/54). This educational institution was founded through the initiative and generous support of the Jyoti Group of Companies, Nepal in memory of the late Mr. Mani Harsh Jyoti who had a special love and concern for children and took keen interest in their welfare.
              </p>
            </div>

            {/* 2. OUR VISION & OUR MISSION: Kept Rounded as Requested */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
              
              {/* === CARD 1: OUR VISION (Rounded-2xl Preserved) === */}
              <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-400 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between cursor-default">
                
                {/* Ambient Soft Blue Radial Hover Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                
                {/* Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-50/60 to-transparent pointer-events-none" />
                
                {/* Subtle Background Watermark Icon */}
                <Compass className="absolute -bottom-4 -right-4 w-28 h-28 text-slate-100 group-hover:text-blue-50 group-hover:rotate-45 group-hover:scale-110 transition-all duration-700 pointer-events-none -z-0" />

                {/* Card Header Row */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 border border-blue-200/80 flex items-center justify-center shadow-xs group-hover:bg-gradient-to-br group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white group-hover:rotate-12 group-hover:scale-110 transition-all duration-300">
                      <Compass className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Guiding Light</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-wider uppercase font-display leading-tight">
                        OUR VISION
                      </h3>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-slate-300 group-hover:text-blue-400 transition-colors" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 pl-3 border-l-2 border-blue-400/80 group-hover:border-blue-600 transition-colors py-0.5 my-1">
                  <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed italic font-medium">
                    “An Empowered Nation that soars on the shoulders of Enlightened Leaders toward an Invincible Future.”
                  </p>
                </div>

                {/* Bottom Interactive Accent */}
                <div className="relative z-10 pt-2.5 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-blue-600 font-semibold">
                  <span>Leadership &amp; Excellence</span>
                  <span className="font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Inspire &rarr;
                  </span>
                </div>

                {/* Bottom Border Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              {/* === CARD 2: OUR MISSION (Rounded-2xl Preserved) === */}
              <div className="group relative overflow-hidden rounded-2xl bg-white p-5 border border-slate-200/90 shadow-xs hover:shadow-xl hover:shadow-red-500/10 hover:border-red-400 hover:-translate-y-1.5 transition-all duration-500 flex flex-col justify-between cursor-default">
                
                {/* Ambient Soft Red Radial Hover Glow */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-red-500/10 rounded-full blur-2xl group-hover:bg-red-500/20 group-hover:scale-150 transition-all duration-700 pointer-events-none" />
                
                {/* Shimmer Light Sweep on Hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-red-50/60 to-transparent pointer-events-none" />
                
                {/* Subtle Background Watermark Icon */}
                <Target className="absolute -bottom-4 -right-4 w-28 h-28 text-slate-100 group-hover:text-red-50 group-hover:-rotate-45 group-hover:scale-110 transition-all duration-700 pointer-events-none -z-0" />

                {/* Card Header Row */}
                <div className="relative z-10 flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-red-50 text-red-600 border border-red-200/80 flex items-center justify-center shadow-xs group-hover:bg-gradient-to-br group-hover:from-red-600 group-hover:to-rose-600 group-hover:text-white group-hover:-rotate-12 group-hover:scale-110 transition-all duration-300">
                      <Target className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-red-600 uppercase tracking-wider block">Core Purpose</span>
                      <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-wider uppercase font-display leading-tight">
                        OUR MISSION
                      </h3>
                    </div>
                  </div>
                  <Quote className="w-5 h-5 text-slate-300 group-hover:text-red-400 transition-colors" />
                </div>

                {/* Card Content */}
                <div className="relative z-10 pl-3 border-l-2 border-red-400/80 group-hover:border-red-600 transition-colors py-0.5 my-1">
                  <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed font-normal">
                    To help every child become powerful Nation-builders, facilitating integral development, character-building and an enjoyable learning environment.
                  </p>
                </div>

                {/* Bottom Interactive Accent */}
                <div className="relative z-10 pt-2.5 mt-1 border-t border-slate-100 flex items-center justify-between text-[11px] text-red-600 font-semibold">
                  <span>Character &amp; Nation-Building</span>
                  <span className="font-bold group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                    Achieve &rarr;
                  </span>
                </div>

                {/* Bottom Border Glow Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

            </div>

            {/* 3. Action CTAs (Sharp Corners: rounded-none) */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1">
              <button
                onClick={onOpenAdmissions}
                className="px-5 py-3 rounded-none font-bold text-xs sm:text-sm text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-md shadow-red-500/25 hover:shadow-red-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Apply for Admission (2026/27)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVirtualTour}
                className="px-4.5 py-3 rounded-none font-bold text-xs sm:text-sm text-slate-800 bg-white hover:bg-red-50 border border-slate-300 hover:border-red-400 hover:text-red-600 shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <div className="w-5 h-5 rounded-none bg-red-100 flex items-center justify-center text-red-600">
                  <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                </div>
                <span>Campus Walkthrough</span>
              </button>

              <button
                onClick={onOpenPortal}
                className="px-4 py-3 rounded-none font-bold text-xs sm:text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-red-600" />
                <span>Student / Parent Portal</span>
              </button>
            </div>

            {/* 4. Trust Badges Grid (Sharp Corners: rounded-none) */}
            <div className="pt-0.5 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="bg-slate-50/90 rounded-none p-2.5 border border-slate-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="text-[11.5px] font-bold text-slate-700 leading-tight">Govt. Recognized &amp; NEB</span>
              </div>
              <div className="bg-slate-50/90 rounded-none p-2.5 border border-slate-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                <span className="text-[11.5px] font-bold text-slate-700 leading-tight">100% SEE Board Results</span>
              </div>
              <div className="bg-slate-50/90 rounded-none p-2.5 border border-slate-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="text-[11.5px] font-bold text-slate-700 leading-tight">Merit Scholarships</span>
              </div>
              <div className="bg-slate-50/90 rounded-none p-2.5 border border-slate-200/80 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-[11.5px] font-bold text-slate-700 leading-tight">A Green Haven for Learning</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Student Showcase Card (Sharp Corners: rounded-none) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-lg lg:max-w-none rounded-none overflow-hidden shadow-xl border-4 border-white ring-1 ring-slate-200/90 group flex flex-col">
              
              {/* Main Student Image */}
              <img 
                src={studentImg} 
                alt="Little Flower Secondary School Student in Cultural Attire" 
                className="w-full h-[480px] sm:h-[540px] lg:h-[580px] object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out flex-grow"
                loading="lazy"
              />

              {/* Floating Top Badge (Sharp Corners: rounded-none) */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex justify-between items-center pointer-events-none">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-white/95 backdrop-blur-md text-slate-900 text-xs font-bold border border-slate-200/80 shadow-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Cultural Heritage &amp; Values</span>
                </div>
                <div className="px-2.5 py-0.5 rounded-none bg-red-600 text-white text-[11px] font-black uppercase tracking-wider shadow-sm">
                  LFSS
                </div>
              </div>

              {/* Glassmorphic Bottom Card */}
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950/90 via-slate-900/60 to-transparent p-5 sm:p-6 text-white rounded-none">
                <p className="text-base sm:text-lg font-black text-white leading-snug font-display">
                  Holistic Growth &amp; Character Building
                </p>
                <p className="text-xs text-slate-200 mt-0.5 leading-relaxed">
                  Inspiring confidence, character, and lifelong leadership in every child since 2005.
                </p>
                
                <div className="mt-2.5 pt-2.5 border-t border-white/15 flex items-center justify-between text-[10.5px] text-slate-300 font-medium">
                  <span>Birgunj–21, Parwanipur</span>
                  <span className="text-amber-300 font-bold">Little Flower School</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
