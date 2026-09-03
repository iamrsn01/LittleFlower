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
          className="relative w-full h-[280px] xs:h-[320px] sm:h-[580px] md:h-[680px] lg:h-[760px] xl:h-[820px] overflow-hidden group"
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

          {/* Top-Left: Modern Glass Category Pill */}
          <div className="absolute top-2 left-2 sm:top-6 sm:left-6 z-20 flex items-center gap-2">
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl bg-slate-950/65 border border-white/15 text-white shadow-xl flex items-center gap-1.5 sm:gap-2">
              <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-red-500"></span>
              </span>
              <span className="text-[10px] sm:text-xs font-bold tracking-wide text-white">Campus Showcase</span>
            </div>
          </div>

          {/* Top-Right: Modern Glass Quick Info Pill */}
          <div className="absolute top-2 right-2 sm:top-6 sm:right-6 z-20">
            <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-xl bg-slate-950/65 border border-white/15 text-white/90 shadow-xl flex items-center gap-1.5">
              <span className="text-[9px] sm:text-xs font-mono font-medium tracking-wider text-slate-300">
                Estd. 2005 • Parsa
              </span>
            </div>
          </div>

          {/* Previous & Next Floating Glass Arrows */}
          <button
            onClick={handlePrev}
            aria-label="Previous Slide"
            className="absolute left-1.5 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-3.5 rounded-full backdrop-blur-xl bg-slate-950/50 hover:bg-red-600 text-white/90 hover:text-white border border-white/15 hover:border-red-500 shadow-2xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group"
          >
            <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:-translate-x-0.5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Slide"
            className="absolute right-1.5 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-1.5 sm:p-3.5 rounded-full backdrop-blur-xl bg-slate-950/50 hover:bg-red-600 text-white/90 hover:text-white border border-white/15 hover:border-red-500 shadow-2xl transition-all duration-200 cursor-pointer hover:scale-110 active:scale-95 group"
          >
            <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-0.5" />
          </button>

          {/* Modern Floating Cinematic HUD Deck */}
          <div className="absolute bottom-2 sm:bottom-6 left-2 right-2 sm:left-6 sm:right-6 z-20 flex flex-col items-center pointer-events-none">
            <div className="pointer-events-auto backdrop-blur-2xl bg-slate-950/80 border border-white/15 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 shadow-[0_12px_35px_rgba(0,0,0,0.6)] w-full max-w-[310px] xs:max-w-[340px] sm:max-w-lg transition-all duration-300 hover:border-red-500/50 hover:bg-slate-950/90 group">
              
              {/* Header: Tag + Location */}
              <div className="flex items-center justify-between gap-2 mb-1 sm:mb-2">
                <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-500/15 border border-red-500/30 text-red-400 text-[9px] sm:text-xs font-bold tracking-wider uppercase">
                  <Sparkles className="w-2.5 h-2.5 text-amber-400" />
                  <span>Campus Landmark</span>
                </div>

                <div className="flex items-center gap-1 text-[9px] sm:text-xs text-slate-300 font-medium">
                  <MapPin className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400 shrink-0" />
                  <span className="truncate max-w-[130px] sm:max-w-[220px]">{slides[currentSlide].location}</span>
                </div>
              </div>

              {/* Title / Caption */}
              <h2 className="text-[11px] sm:text-sm md:text-base font-bold text-white leading-snug tracking-tight font-display mb-1.5 sm:mb-2.5 line-clamp-1 sm:line-clamp-none group-hover:text-rose-100 transition-colors">
                {slides[currentSlide].caption}
              </h2>

              {/* Seamless Bottom Progress Track & Counter */}
              <div className="flex items-center justify-between gap-2.5 sm:gap-3 pt-1.5 sm:pt-2 border-t border-white/10">
                <div className="flex items-center gap-1 sm:gap-1.5 flex-1">
                  {slides.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentSlide(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                      className={`h-1 sm:h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === currentSlide
                          ? 'flex-[2.5] bg-gradient-to-r from-red-500 via-rose-500 to-red-400 shadow-[0_0_8px_rgba(239,68,68,0.7)]'
                          : 'flex-1 bg-white/20 hover:bg-white/40'
                      }`}
                    />
                  ))}
                </div>

                <div className="text-[9px] sm:text-xs font-mono font-bold text-slate-400 shrink-0 pl-1">
                  <span className="text-white font-black">{String(currentSlide + 1).padStart(2, '0')}</span>
                  <span className="text-slate-500 mx-0.5">/</span>
                  <span>{String(slides.length).padStart(2, '0')}</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 2. WELCOME & ABOUT SCHOOL: HERITAGE, VISION, MISSION & SPOTLIGHT */}
      <AboutSection
        onOpenAdmissions={onOpenAdmissions}
        onOpenVirtualTour={onOpenVirtualTour}
        onOpenPortal={onOpenPortal}
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
