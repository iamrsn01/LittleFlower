import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'motion/react';
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
  MapPin,
  Award,
  ShieldCheck,
  GraduationCap
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

const StudentDoodle: React.FC = () => (
  <svg 
    viewBox="0 0 64 64" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg" 
    className="w-8 h-8 xs:w-9 xs:h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 drop-shadow-sm select-none"
  >
    {/* Backpack */}
    <rect x="13" y="23" width="9" height="13" rx="2.5" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
    <circle cx="17.5" cy="29.5" r="1.5" fill="#fbbf24" />
    
    {/* Torso / School Uniform */}
    <path d="M22 23h12l-1.5 15h-9L22 23z" fill="#ffffff" stroke="#0f172a" strokeWidth="2" strokeLinejoin="round" />
    <path d="M25 23l3 5 3-5" stroke="#dc2626" strokeWidth="1.5" />

    {/* Head & Hair */}
    <circle cx="29" cy="13" r="7.5" fill="#fde68a" stroke="#0f172a" strokeWidth="2" />
    <path d="M21.5 12.5c1-3.5 3.5-5.5 8-5.5 4 0 6.5 2 7.5 4.5-2-.8-4.5-.8-7 0-3 .9-5.5 1.8-8.5 1z" fill="#1e293b" />
    
    {/* Student Cap with Golden Tassel */}
    <path d="M26 6l9-2.5 4.5 2.5-9 2.5L26 6z" fill="#dc2626" stroke="#991b1b" strokeWidth="1" />
    <path d="M35 5v4" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" />

    {/* Cheerful Expression */}
    <circle cx="32" cy="12" r="1" fill="#0f172a" />
    <path d="M30 16c1 1 3 1 4 0" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="34" cy="14" r="1.2" fill="#f87171" opacity="0.6" />

    {/* Arms swinging in motion */}
    <path d="M22 25l-5 5 3 2" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M32 25l5 4 4-2" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    
    {/* Pencil held forward */}
    <path d="M41 27l4-3 1 2-4 3z" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />

    {/* Running Stride Legs */}
    <path d="M25 38l5 8 5-1" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M35 45h3.5a1 1 0 0 1 1 1v1h-5v-2z" fill="#dc2626" />
    <path d="M26 38l-4 5-4-2" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M18 41l-3 1a1 1 0 0 0-.5 1v1h4.5l-.5-2a1 1 0 0 0-.5-.5z" fill="#dc2626" />

    {/* Dust speed trails */}
    <path d="M10 32H6M8 36H3M12 40H8" stroke="#cbd5e1" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

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

  // Measurement ref and dynamic unified trajectory
  const statsSectionRef = useRef<HTMLDivElement>(null);
  const [trajectory, setTrajectory] = useState<{
    xKeyframes: number[];
    yKeyframes: number[];
    rotateKeyframes: number[];
    timesKeyframes: number[];
  }>({
    xKeyframes: [-60, 200, 400, 600, 800, 1000, 1300],
    yKeyframes: [0, 0, 0, 0, 0, 0, 0],
    rotateKeyframes: [0, 0, 0, 0, 0, 0, 0],
    timesKeyframes: [0, 0.16, 0.33, 0.5, 0.66, 0.83, 1.0]
  });

  useEffect(() => {
    const computeTrajectory = () => {
      if (!statsSectionRef.current) return;
      const sectionRect = statsSectionRef.current.getBoundingClientRect();
      const circleNodes = statsSectionRef.current.querySelectorAll('.circle-node-anchor');

      if (circleNodes.length === 5 && sectionRect.width > 0) {
        const W = sectionRect.width;
        const startX = -60;
        const endX = W + 60;
        const totalDist = endX - startX;

        const points: { x: number; y: number; rotate: number }[] = [];

        // Point 0: Start offscreen left on the line
        points.push({ x: startX, y: 0, rotate: 0 });

        circleNodes.forEach(node => {
          const rect = node.getBoundingClientRect();
          const cx = rect.left + rect.width / 2 - sectionRect.left;
          const r = rect.width / 2;
          const margin = r > 35 ? 26 : 16;
          const h = r + (r > 35 ? 18 : 12); // Clean clearance above the circle

          // 1. Takeoff stride right before reaching circle
          points.push({ x: cx - r - margin, y: 0, rotate: -6 });

          // 2. Ascending arc crossing into circle boundary
          points.push({ x: cx - r * 0.5, y: -h * 0.8, rotate: -12 });

          // 3. Peak apex directly ABOVE top center of circle
          points.push({ x: cx, y: -h, rotate: 0 });

          // 4. Descending arc leaving circle boundary
          points.push({ x: cx + r * 0.5, y: -h * 0.8, rotate: 8 });

          // 5. Land smoothly back onto the straight line path
          points.push({ x: cx + r + margin, y: 0, rotate: 0 });
        });

        // Point End: Run offscreen right on the line
        points.push({ x: endX, y: 0, rotate: 0 });

        // Build keyframes & normalized times strictly increasing from 0 to 1
        const xArr = points.map(p => p.x);
        const yArr = points.map(p => p.y);
        const rArr = points.map(p => p.rotate);
        const tArr = points.map(p => Math.max(0, Math.min(1, (p.x - startX) / totalDist)));

        setTrajectory({
          xKeyframes: xArr,
          yKeyframes: yArr,
          rotateKeyframes: rArr,
          timesKeyframes: tArr
        });
      }
    };

    computeTrajectory();
    const t1 = setTimeout(computeTrajectory, 150);
    const t2 = setTimeout(computeTrajectory, 600);
    window.addEventListener('resize', computeTrajectory);
    const observer = new ResizeObserver(computeTrajectory);
    if (statsSectionRef.current) {
      observer.observe(statsSectionRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', computeTrajectory);
      observer.disconnect();
    };
  }, []);

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

      {/* 3. METRICS & STATISTICS BAR - CONNECTED CIRCLE DESIGN */}
      <div 
        ref={statsSectionRef}
        className="relative py-6 sm:py-9 bg-white border-y border-slate-200 overflow-hidden"
      >
        
        {/* Subtle dot pattern background */}
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] opacity-60 pointer-events-none" />

        {/* The Connecting Line running edge-to-edge across the entire page (Desktop only) */}
        <div className="hidden sm:block absolute top-[76px] md:top-[83px] lg:top-[87px] left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-red-300 via-red-500 to-red-300 -translate-y-1/2 z-0 pointer-events-none" />

        {/* Animated Student Doodle Running From One End of the Page to the Other End in 10s (Desktop only) */}
        <div className="hidden sm:block absolute inset-0 pointer-events-none z-30 overflow-hidden">
          <motion.div
            key={trajectory.xKeyframes.length}
            className="absolute top-[50px] xs:top-[55px] sm:top-[76px] md:top-[83px] lg:top-[87px] left-0 -translate-x-1/2 -translate-y-[88%]"
            animate={{ 
              x: trajectory.xKeyframes,
              y: trajectory.yKeyframes,
              rotate: trajectory.rotateKeyframes
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
              times: trajectory.timesKeyframes
            }}
          >
            {/* Joyful running footstep stride */}
            <motion.div
              animate={{ 
                y: [0, -2.5, 0],
                rotate: [-2, 2, -2]
              }}
              transition={{ 
                duration: 0.22, 
                repeat: Infinity, 
                ease: 'easeInOut' 
              }}
            >
              <StudentDoodle />
            </motion.div>
          </motion.div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 1. MOBILE VIEW: 1-2-2 LAYOUT WITH CONNECTING WAVY LINE (sm:hidden) */}
          <div className="sm:hidden relative flex flex-col items-center gap-5 w-full max-w-[340px] mx-auto py-2">
            
            {/* The Connecting Wavy Line SVG */}
            <svg 
              className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              fill="none"
            >
              <defs>
                <linearGradient id="mobileWavyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fca5a5" />
                  <stop offset="25%" stopColor="#ef4444" />
                  <stop offset="75%" stopColor="#dc2626" />
                  <stop offset="100%" stopColor="#fca5a5" />
                </linearGradient>
              </defs>
              
              {/* Left Column Wavy Line: from Top Circle -> Middle Left -> Bottom Left */}
              <path
                d="M 50 11 C 48 24, 28 32, 25 50 C 21 59, 29 69, 25 75 C 21 80, 29 85, 25 88"
                stroke="url(#mobileWavyGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="opacity-85"
              />

              {/* Right Column Wavy Line: from Top Circle -> Middle Right -> Bottom Right */}
              <path
                d="M 50 11 C 52 24, 72 32, 75 50 C 79 59, 71 69, 75 75 C 79 80, 71 85, 75 88"
                stroke="url(#mobileWavyGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
                className="opacity-85"
              />
            </svg>
            
            {/* Row 1: 1 Circle at Top Apex (20+ Yrs Educational Legacy) */}
            <div className="flex justify-center w-full relative z-10">
              <div className="flex flex-col items-center group cursor-pointer relative z-10">
                <div className="w-[78px] h-[78px] xs:w-[84px] xs:h-[84px] rounded-full bg-white border-2 border-red-600 ring-4 ring-red-50 group-hover:ring-red-100 group-hover:border-red-500 group-hover:scale-105 shadow-md transition-all duration-300 flex flex-col items-center justify-center p-1.5 text-center relative z-10">
                  <ShieldCheck className="w-3.5 h-3.5 text-red-600 mb-0.5" />
                  <span className="text-xs xs:text-sm font-black text-slate-900 group-hover:text-red-600 font-display leading-tight tracking-tight">
                    20+ Yrs
                  </span>
                  <span className="text-[8px] xs:text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none mt-0.5">
                    Legacy
                  </span>
                </div>
                <div className="relative z-20 mt-1.5 text-center px-1.5 py-0.5 rounded-md bg-white/95 max-w-[130px] shadow-xs">
                  <p className="text-xs font-bold text-slate-800 leading-tight">
                    Educational Legacy
                  </p>
                  <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                    Since 2005
                  </p>
                </div>
              </div>
            </div>

            {/* Row 2: 2 Circles (100% SEE Pass Rate & 1,200+ Students) */}
            <div className="grid grid-cols-2 gap-4 xs:gap-8 w-full max-w-[340px] px-2 relative z-10">
              {[
                {
                  value: '100%',
                  short: 'SEE Pass',
                  label: 'SEE Pass Rate',
                  subtext: 'Distinction Legacy',
                  icon: Award
                },
                {
                  value: '1,200+',
                  short: 'Students',
                  label: 'Active Students',
                  subtext: 'Nursery to 10',
                  icon: Users
                }
              ].map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer relative z-10">
                    <div className="w-[74px] h-[74px] xs:w-[80px] xs:h-[80px] rounded-full bg-white border-2 border-red-600 ring-4 ring-red-50 group-hover:ring-red-100 group-hover:border-red-500 group-hover:scale-105 shadow-md transition-all duration-300 flex flex-col items-center justify-center p-1.5 text-center relative z-10">
                      <IconComp className="w-3.5 h-3.5 text-red-600 mb-0.5" />
                      <span className="text-xs xs:text-sm font-black text-slate-900 group-hover:text-red-600 font-display leading-tight tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-[8px] xs:text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none mt-0.5">
                        {stat.short}
                      </span>
                    </div>
                    <div className="relative z-20 mt-1.5 text-center px-1.5 py-0.5 rounded-md bg-white/95 max-w-[130px] shadow-xs">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                        {stat.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Row 3: 2 Circles (52+ Teachers & Eco Haven) */}
            <div className="grid grid-cols-2 gap-4 xs:gap-8 w-full max-w-[340px] px-2 relative z-10">
              {[
                {
                  value: '52+',
                  short: 'Mentors',
                  label: 'Expert Teachers',
                  subtext: 'Qualified Faculty',
                  icon: GraduationCap
                },
                {
                  value: 'Eco Haven',
                  short: 'Campus',
                  label: 'Lush Green Haven',
                  subtext: 'Serene & Safe',
                  icon: Sparkles
                }
              ].map((stat, idx) => {
                const IconComp = stat.icon;
                return (
                  <div key={idx} className="flex flex-col items-center group cursor-pointer relative z-10">
                    <div className="w-[74px] h-[74px] xs:w-[80px] xs:h-[80px] rounded-full bg-white border-2 border-red-600 ring-4 ring-red-50 group-hover:ring-red-100 group-hover:border-red-500 group-hover:scale-105 shadow-md transition-all duration-300 flex flex-col items-center justify-center p-1.5 text-center relative z-10">
                      <IconComp className="w-3.5 h-3.5 text-red-600 mb-0.5" />
                      <span className="text-xs xs:text-sm font-black text-slate-900 group-hover:text-red-600 font-display leading-tight tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-[8px] xs:text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none mt-0.5">
                        {stat.short}
                      </span>
                    </div>
                    <div className="relative z-20 mt-1.5 text-center px-1.5 py-0.5 rounded-md bg-white/95 max-w-[130px] shadow-xs">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {stat.label}
                      </p>
                      <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">
                        {stat.subtext}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 2. TABLET & DESKTOP VIEW: 5 CONNECTED CIRCLES IN A ROW (hidden sm:block) */}
          <div className="hidden sm:block relative">
            
            {/* 5 Connected Circle Nodes */}
            <div className="relative z-10 flex items-start justify-between gap-4 md:gap-6">
              {[
                {
                  value: '100%',
                  short: 'SEE Pass',
                  label: 'SEE Pass Rate',
                  subtext: 'Distinction Legacy',
                  icon: Award
                },
                {
                  value: '20+ Yrs',
                  short: 'Legacy',
                  label: 'Educational Legacy',
                  subtext: 'Since 2005',
                  icon: ShieldCheck
                },
                {
                  value: '1,200+',
                  short: 'Students',
                  label: 'Active Students',
                  subtext: 'Nursery to 10',
                  icon: Users
                },
                {
                  value: '52+',
                  short: 'Mentors',
                  label: 'Expert Teachers',
                  subtext: 'Qualified Faculty',
                  icon: GraduationCap
                },
                {
                  value: 'Eco Haven',
                  short: 'Campus',
                  label: 'Lush Green Haven',
                  subtext: 'Serene & Safe',
                  icon: Sparkles
                }
              ].map((stat, idx) => {
                const IconComp = stat.icon;

                return (
                  <div key={idx} className="flex flex-col items-center flex-1 min-w-0 group cursor-pointer">
                    
                    {/* Circle Node with Ring and Connecting Anchors */}
                    <div className="circle-node-anchor sm:w-[80px] sm:h-[80px] md:w-[94px] md:h-[94px] lg:w-[102px] lg:h-[102px] rounded-full bg-white border-2 sm:border-2.5 border-red-600 ring-4 md:ring-6 ring-red-50 group-hover:ring-red-100 group-hover:border-red-500 group-hover:scale-105 shadow-md group-hover:shadow-lg group-hover:shadow-red-500/20 transition-all duration-300 flex flex-col items-center justify-center p-1 sm:p-1.5 text-center relative z-10">
                      
                      {/* Icon */}
                      <IconComp className="sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-red-600 group-hover:scale-110 transition-transform mb-0.5" />

                      {/* Metric Value */}
                      <span className="sm:text-xs md:text-base lg:text-lg font-black text-slate-900 group-hover:text-red-600 font-display leading-tight tracking-tight transition-colors">
                        {stat.value}
                      </span>

                      {/* Short Tag inside Circle */}
                      <span className="sm:text-[8px] md:text-[9px] font-bold text-slate-500 uppercase tracking-wider leading-none mt-0.5">
                        {stat.short}
                      </span>
                    </div>

                    {/* Text Below Circle */}
                    <div className="mt-2 sm:mt-2.5 text-center px-0.5 sm:px-1 max-w-[120px]">
                      <p className="sm:text-xs md:text-[13px] font-bold text-slate-800 leading-tight">
                        {stat.label}
                      </p>
                      <p className="sm:text-[10px] md:text-[11px] text-slate-500 font-medium leading-tight mt-0.5">
                        {stat.subtext}
                      </p>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>

    </section>
  );
};
