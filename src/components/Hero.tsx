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
  Camera,
  MapPin
} from 'lucide-react';
import { schoolStats } from '../data/schoolData';
import { AboutSection } from './AboutSection';
import coverImg from '../assets/slider/cover.jpg';
import slider1 from '../assets/slider/1.jpg';
import slider2 from '../assets/slider/2.JPG';
import slider3 from '../assets/slider/3.JPG';
import slider4 from '../assets/slider/4.JPG';
import slider5 from '../assets/slider/5.JPG';
import slider6 from '../assets/slider/6.JPG';
import slider7 from '../assets/slider/7.JPG';

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
      image: coverImg,
      caption: 'Little Flower Secondary School — Welcome & Campus Overview',
      location: 'Birgunj-21, Parwanipur, Parsa (Estd. 2005)'
    },
    {
      id: 2,
      image: slider1,
      caption: 'Little Flower Secondary School — Campus Life & Student Activities',
      location: 'Parwanipur, Parsa'
    },
    {
      id: 3,
      image: slider2,
      caption: 'Little Flower Secondary School — Annual Event & Campus Showcase',
      location: 'Auditorium & Parade Grounds'
    },
    {
      id: 4,
      image: slider3,
      caption: 'Little Flower Secondary School — Student Leadership & Assembly',
      location: 'Parwanipur, Parsa'
    },
    {
      id: 5,
      image: slider4,
      caption: 'Little Flower Secondary School — Sports & Co-Curricular Excellence',
      location: 'Green Playground & Sports Grounds'
    },
    {
      id: 6,
      image: slider5,
      caption: 'Little Flower Secondary School — Cultural Festivities & Performances',
      location: 'School Auditorium Stage'
    },
    {
      id: 7,
      image: slider6,
      caption: 'Little Flower Secondary School — Mentorship & Graduation Honor',
      location: 'Parwanipur, Parsa'
    },
    {
      id: 8,
      image: slider7,
      caption: 'Little Flower Secondary School — School Community & Celebrations',
      location: 'Parwanipur, Parsa'
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
          className="relative w-full h-[480px] sm:h-[580px] md:h-[680px] lg:h-[760px] xl:h-[820px] overflow-hidden group"
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

          {/* Compact Centered Badge & Controls (Navbar Palette & Hover Animation) */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 z-20 flex flex-col items-center justify-center gap-2 pointer-events-none">
            
            {/* Sharp Navbar-Themed Card with Animated Expansion Line */}
            <div className="group relative px-4 py-2.5 sm:px-5 sm:py-3 rounded-none bg-white/95 backdrop-blur-md border-t-2 border-t-red-600 border-x border-b border-slate-200/90 shadow-2xl text-center max-w-md mx-auto pointer-events-auto transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:border-slate-300 hover:shadow-[0_20px_35px_rgba(0,0,0,0.25)] overflow-hidden cursor-pointer">
              
              {/* Landmark Tag with Navbar-style Hover Flip */}
              <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-none bg-red-50 border border-red-200/80 text-red-600 text-[10px] font-black tracking-widest uppercase mb-1.5 transition-all duration-200 group-hover:bg-red-600 group-hover:text-white">
                <Sparkles className="w-2.5 h-2.5 text-amber-500 group-hover:text-amber-300" />
                <span>Campus Landmark</span>
              </div>

              {/* Headline (Switches to red-600 on hover like Navbar links) */}
              <h2 className="text-xs sm:text-sm font-black text-slate-900 leading-snug tracking-tight transition-colors duration-200 group-hover:text-red-600 font-display">
                {slides[currentSlide].caption}
              </h2>

              {/* Location Tag */}
              <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-slate-500 font-semibold tracking-wide">
                <MapPin className="w-3 h-3 text-red-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span>{slides[currentSlide].location}</span>
              </div>

              {/* Animated Bottom Accent Line (Exact Navbar Hover Effect) */}
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-red-600 via-rose-500 to-red-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left ease-out" />
            </div>

            {/* Sharp Indicator Bars (Navbar Matching Style) */}
            <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-none border border-slate-200/90 pointer-events-auto shadow-md">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-none transition-all duration-200 cursor-pointer hover:scale-110 ${
                    idx === currentSlide 
                      ? 'w-6 bg-red-600 shadow-xs' 
                      : 'w-2 bg-slate-300 hover:bg-red-400'
                  }`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 2. WELCOME & ABOUT SCHOOL: HERITAGE, VISION, MISSION & SPOTLIGHT */}
      <AboutSection
        onOpenAdmissions={onOpenAdmissions}
        onOpenVirtualTour={onOpenVirtualTour}
        onOpenPortal={() => onOpenPortal('student')}
      />

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
