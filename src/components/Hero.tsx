import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  CheckCircle2, 
  Flame, 
  Users, 
  ChevronLeft, 
  ChevronRight, 
  Camera 
} from 'lucide-react';
import { schoolStats } from '../data/schoolData';
import campusBuildingImg from '../assets/campus-building.jpg';

interface HeroProps {
  onOpenAdmissions: () => void;
  onOpenVirtualTour: () => void;
  onOpenPortal: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAdmissions,
  onOpenVirtualTour,
  onOpenPortal
}) => {
  const slides = [
    {
      id: 1,
      image: campusBuildingImg,
      caption: 'Little Flower Secondary School — Main Academic Campus & Lush Green Ground',
      location: 'Birgunj-21, Parwanipur, Parsa (Estd. 2005)'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1800&q=85',
      caption: 'Well-Equipped Physics, Chemistry & Biology Practical Labs',
      location: 'Science & STEM Facilities'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto advance every 4.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(timer);
  }, [isAutoPlaying, slides.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="hero" className="relative pt-[70px] sm:pt-[76px] md:pt-[100px] bg-white">
      
      {/* 1. CLEAN CAMPUS PHOTO SLIDER */}
      <div className="relative w-full bg-slate-900 border-b border-slate-200">
        <div 
          className="relative w-full h-[380px] sm:h-[460px] md:h-[540px] lg:h-[600px] overflow-hidden group"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Slide Images */}
          {slides.map((slide, idx) => (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={slide.image} 
                alt={slide.caption} 
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-black/20" />
            </div>
          ))}

          {/* Top-Left: Category Badge */}
          <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md text-xs font-black text-red-600 shadow-md flex items-center gap-1.5 border border-red-100">
              <Camera className="w-3.5 h-3.5 text-red-600" />
              <span>Campus Preview</span>
            </span>
          </div>

          {/* Top-Right: Slide Counter */}
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
            <span className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs font-mono font-bold text-white border border-white/20 shadow">
              {currentSlide + 1} / {slides.length}
            </span>
          </div>

          {/* Previous & Next Buttons */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-slate-900 hover:text-red-600 border border-slate-200 shadow-xl transition-all cursor-pointer hover:scale-110"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/90 hover:bg-white text-slate-900 hover:text-red-600 border border-slate-200 shadow-xl transition-all cursor-pointer hover:scale-110"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Caption & Pagination Dots */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-white">
            <div className="px-4 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 max-w-xl">
              <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                {slides[currentSlide].caption}
              </p>
              <p className="text-[11px] text-amber-300 font-semibold">
                {slides[currentSlide].location}
              </p>
            </div>

            {/* Pagination Dots */}
            <div className="flex items-center gap-2 self-center sm:self-auto bg-black/50 backdrop-blur-md px-3 py-2 rounded-full border border-white/10">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    idx === currentSlide 
                      ? 'w-7 bg-red-500 shadow' 
                      : 'w-2.5 bg-white/60 hover:bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. INTRODUCTION CONTENT (CLEAN & ELEGANT) */}
      <div className="py-16 sm:py-20 lg:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-4xl mx-auto space-y-6">
            
            {/* Primary Headline */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-[1.15] font-display">
              Welcome to <span className="text-red-600">Little Flower</span> Secondary School
            </h1>

            {/* Introduction Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed">
              Dedicated to delivering quality foundational to secondary education in Birgunj-21, Parwanipur, Parsa. We provide modern science laboratories, high-speed computer education, disciplined mentorship, and consistent 100% SEE Board pass results.
            </p>

            {/* Action CTAs */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 pt-2">
              <button
                onClick={onOpenAdmissions}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/25 hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Apply for Admission (2026/27)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenVirtualTour}
                className="px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base text-slate-800 bg-slate-50 hover:bg-red-50 border border-slate-300 hover:border-red-400 hover:text-red-600 shadow-xs hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer flex items-center gap-2"
              >
                <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Campus Walkthrough</span>
              </button>

              <button
                onClick={onOpenPortal}
                className="px-5 py-3.5 rounded-2xl font-bold text-sm text-slate-700 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Users className="w-4 h-4 text-red-600" />
                <span>Student / Parent Portal</span>
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-bold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Government Recognized &amp; NEB Affiliated</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-red-600" />
                <span>100% SEE Board Pass Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600" />
                <span>Merit Scholarships Available</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-slate-700" />
                <span>3.5 Bigha Green Campus</span>
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* 3. METRICS & STATISTICS BAR */}
      <div className="border-y border-slate-200 bg-slate-50 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-y md:divide-y-0 md:divide-x divide-slate-200 py-6">
            {schoolStats.map((stat, idx) => (
              <div key={idx} className="p-3 text-center space-y-0.5">
                <p className="text-2xl sm:text-3xl font-black text-red-600 font-display">
                  {stat.value}
                </p>
                <p className="text-xs font-bold text-slate-800">
                  {stat.label}
                </p>
                <p className="text-[11px] text-slate-500 font-medium">
                  {stat.subtext}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};
