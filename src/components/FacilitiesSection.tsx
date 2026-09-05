import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  FlaskConical, 
  BookOpen, 
  Trophy, 
  Palette, 
  ShieldCheck, 
  Maximize2,
  MapPin,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Facility } from '../data/schoolData';
import { useSchoolData } from '../context/SchoolDataContext';

export const FacilitiesSection: React.FC = () => {
  const { facilities } = useSchoolData();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedFacilityModal, setSelectedFacilityModal] = useState<Facility | null>(null);
  const [direction, setDirection] = useState<number>(0);
  const thumbnailScrollRef = useRef<HTMLDivElement>(null);

  const categories = [
    { label: 'All', icon: Sparkles },
    { label: 'Laboratories', icon: FlaskConical },
    { label: 'Academics', icon: BookOpen },
    { label: 'Sports & Fitness', icon: Trophy },
    { label: 'Arts & Culture', icon: Palette },
    { label: 'Campus Life', icon: Building2 },
    { label: 'Services & Health', icon: ShieldCheck }
  ];

  // Filter facilities by active category
  const filteredFacilities = useMemo(() => {
    return activeCategory === 'All'
      ? facilities
      : facilities.filter(f => f.category === activeCategory);
  }, [activeCategory, facilities]);

  // Reset current index when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setCurrentIndex(0);
    setDirection(0);
  };

  // Safe navigation
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? filteredFacilities.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === filteredFacilities.length - 1 ? 0 : prev + 1));
  };

  const currentItem: Facility = filteredFacilities[currentIndex] || filteredFacilities[0] || facilities[0];

  const isInitialMount = useRef(true);

  // Auto scroll active thumbnail into view within the horizontal strip ONLY (without scrolling window)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const container = thumbnailScrollRef.current;
    if (container) {
      const activeThumb = container.children[currentIndex] as HTMLElement;
      if (activeThumb) {
        const thumbLeft = activeThumb.offsetLeft;
        const thumbWidth = activeThumb.offsetWidth;
        const containerWidth = container.offsetWidth;
        const targetScrollLeft = thumbLeft - (containerWidth / 2) + (thumbWidth / 2);

        container.scrollTo({
          left: Math.max(0, targetScrollLeft),
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedFacilityModal) {
        if (e.key === 'ArrowLeft') {
          handlePrev();
        } else if (e.key === 'ArrowRight') {
          handleNext();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [filteredFacilities.length, selectedFacilityModal]);

  // Animation variants
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : dir < 0 ? -100 : 0,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 }
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -100 : dir < 0 ? 100 : 0,
      opacity: 0,
      scale: 0.98,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 }
      }
    })
  };

  return (
    <section id="facilities" className="py-12 sm:py-24 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      
      {/* Cinematic Ambient Glow Background */}
      <div className="absolute -top-32 left-1/4 w-[500px] h-[500px] bg-red-600/15 blur-[120px] pointer-events-none" />
      <div className="absolute -bottom-32 right-1/4 w-[500px] h-[500px] bg-rose-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-6 sm:mb-10">
          <div className="space-y-2.5 sm:space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 bg-red-500/10 border border-red-500/30 text-red-400 text-[11px] sm:text-xs font-bold uppercase tracking-wider">
              <Building2 className="w-3.5 h-3.5 text-red-400" />
              <span>Campus Infrastructure Showcase</span>
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight font-display">
              Purpose-Built Facilities for <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-400 to-amber-300">
                Holistic Student Development
              </span>
            </h2>

            <p className="text-slate-400 text-xs sm:text-base leading-relaxed line-clamp-2 sm:line-clamp-none">
              Explore purpose-built spaces crafted for academic excellence, scientific experimentation, physical fitness, and joyful creative discovery at Little Flower.
            </p>
          </div>

          {/* Slider Controls (Sharp square buttons) */}
          <div className="flex items-center gap-2 sm:gap-3 self-start md:self-auto">
            <div className="text-right hidden sm:block mr-2">
              <div className="text-xs text-slate-400 font-mono">
                Facility <strong className="text-white">{currentIndex + 1}</strong> of {filteredFacilities.length}
              </div>
              <div className="text-[10px] text-slate-500">
                Use Arrow Keys ← → to navigate
              </div>
            </div>

            <button
              onClick={handlePrev}
              className="w-9 h-9 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95"
              title="Previous Facility (Left Arrow)"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={handleNext}
              className="w-9 h-9 sm:w-12 sm:h-12 bg-red-600 hover:bg-red-500 text-white transition-all flex items-center justify-center cursor-pointer hover:scale-105 active:scale-95 shadow-lg shadow-red-600/30"
              title="Next Facility (Right Arrow)"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Category Filter Tabs (Sharp edges) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-3 sm:pb-4 mb-5 sm:mb-8 scrollbar-none no-scrollbar">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.label;
            const count = cat.label === 'All' 
              ? facilities.length 
              : facilities.filter(f => f.category === cat.label).length;

            return (
              <button
                key={cat.label}
                onClick={() => handleCategoryChange(cat.label)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2.5 text-[11px] sm:text-xs font-bold transition-all duration-200 flex items-center gap-1.5 sm:gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md shadow-red-600/30 border border-red-500'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                <Icon className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{cat.label}</span>
                <span className={`text-[9px] sm:text-[10px] px-1 sm:px-1.5 py-0.5 font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-white/10 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Panoramic Slider Stage (Sharp Box) - Scaled down height on mobile */}
        <div className="relative overflow-hidden border border-white/15 bg-slate-950 shadow-2xl">
          
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentItem.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="relative min-h-[280px] xs:min-h-[320px] sm:min-h-[480px] lg:min-h-[580px] w-full flex flex-col justify-between p-3.5 xs:p-5 sm:p-10 overflow-hidden"
            >
              {/* Panoramic Background Image with Vignette */}
              <div className="absolute inset-0 z-0">
                <img
                  src={currentItem.imageUrl}
                  alt={currentItem.name}
                  className="w-full h-full object-cover scale-105 transition-transform duration-1000 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/20" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/40 to-transparent" />
              </div>

              {/* Stage Top Bar Overlay (Sharp tags) */}
              <div className="relative z-10 flex items-center justify-between gap-2">
                
                {/* Category & Block Badges */}
                <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                  <span className="px-2.5 py-1 sm:px-3.5 sm:py-1.5 text-[10px] sm:text-xs font-bold backdrop-blur-md bg-white/20 text-white border border-white/30 shadow-md flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 animate-pulse" />
                    {currentItem.category}
                  </span>

                  {currentItem.block && (
                    <span className="hidden sm:inline-flex px-3 py-1.5 text-xs font-medium backdrop-blur-md bg-black/50 text-rose-100 border border-white/20 items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-red-400" />
                      {currentItem.block.split(':')[0]} • {currentItem.floor || 'Ground'}
                    </span>
                  )}
                </div>

                {/* Capacity Pill & Counter (Sharp tags) */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <div className="px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-md bg-black/60 text-white text-[10px] sm:text-xs font-bold border border-white/20 flex items-center gap-1.5 font-mono">
                    <Users className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-red-400" />
                    <span>{currentItem.capacity}</span>
                  </div>

                  <span className="px-2 py-1 sm:px-2.5 sm:py-1.5 bg-red-600 text-white text-[10px] sm:text-xs font-mono font-bold">
                    {String(currentIndex + 1).padStart(2, '0')} / {String(filteredFacilities.length).padStart(2, '0')}
                  </span>
                </div>

              </div>

              {/* Stage Bottom Content - Compact text on mobile */}
              <div className="relative z-10 space-y-2.5 sm:space-y-6 max-w-3xl mt-6 xs:mt-8 sm:mt-32">
                
                <div className="space-y-1 sm:space-y-3">
                  <h3 className="text-lg xs:text-xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-display tracking-tight drop-shadow-md">
                    {currentItem.name}
                  </h3>

                  <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium drop-shadow-sm max-w-2xl line-clamp-2 sm:line-clamp-none">
                    {currentItem.description}
                  </p>
                </div>

                {/* Highlights & Equipment Pills (Hidden on mobile to reduce content & height) */}
                <div className="space-y-3 hidden sm:block">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Specifications & Infrastructure
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {(currentItem.equipment ? currentItem.equipment.slice(0, 3) : currentItem.highlights).map((hl, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 text-xs font-semibold backdrop-blur-md bg-white/10 text-white border border-white/20 flex items-center gap-1.5 shadow-sm"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{hl}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons Row (Sharp buttons) */}
                <div className="pt-1 sm:pt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => setSelectedFacilityModal(currentItem)}
                    className="px-3.5 py-2 sm:px-6 sm:py-3.5 text-xs sm:text-sm font-bold bg-white hover:bg-slate-100 text-slate-900 transition-all flex items-center gap-1.5 sm:gap-2 cursor-pointer shadow-lg hover:scale-105 active:scale-95"
                  >
                    <Maximize2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-600" />
                    <span>View Specifications</span>
                  </button>

                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <button
                      onClick={handlePrev}
                      className="p-2 sm:p-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      title="Previous"
                    >
                      <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-2 sm:p-3.5 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer"
                      title="Next"
                    >
                      <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Progress Bar Indicator */}
          <div className="h-1 w-full bg-white/10 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-red-600 to-rose-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / filteredFacilities.length) * 100}%` }}
            />
          </div>

        </div>

        {/* Panoramic Thumbnail Strip (Sharp boxes) */}
        <div className="mt-4 sm:mt-6">
          <div className="flex items-center justify-between mb-2 sm:mb-3 text-xs text-slate-400">
            <span className="font-semibold uppercase tracking-wider text-[10px] sm:text-[11px]">
              Explore All Facilities ({filteredFacilities.length})
            </span>
            <span className="text-[10px] sm:text-[11px] text-slate-500 hidden xs:inline">
              Click any slide below to switch
            </span>
          </div>

          <div 
            ref={thumbnailScrollRef}
            className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 scrollbar-none no-scrollbar"
          >
            {filteredFacilities.map((fac, idx) => {
              const isActive = currentIndex === idx;

              return (
                <button
                  key={fac.id}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`relative shrink-0 w-28 xs:w-32 sm:w-44 aspect-[16/10] overflow-hidden border-2 transition-all duration-300 text-left group cursor-pointer ${
                    isActive
                      ? 'border-red-500 ring-2 ring-red-500/40 shadow-lg shadow-red-500/20'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:border-white/30'
                  }`}
                >
                  <img
                    src={fac.imageUrl}
                    alt={fac.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />
                  
                  {/* Thumbnail Label */}
                  <div className="absolute inset-x-2 bottom-2 space-y-0.5">
                    <span className="text-[9px] font-mono text-red-400 block font-bold">
                      0{idx + 1}
                    </span>
                    <p className="text-[11px] font-bold text-white line-clamp-1 leading-tight">
                      {fac.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Comprehensive Specifications Modal (Sharp corners) */}
      {selectedFacilityModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto"
          onClick={() => setSelectedFacilityModal(null)}
        >
          <div 
            className="bg-slate-900 border border-slate-700 max-w-2xl w-full overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200 text-white"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative aspect-[16/9] w-full bg-slate-950">
              <img 
                src={selectedFacilityModal.imageUrl} 
                alt={selectedFacilityModal.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              
              <button
                onClick={() => setSelectedFacilityModal(null)}
                className="absolute top-4 right-4 p-2.5 bg-white/20 hover:bg-white text-white hover:text-slate-900 backdrop-blur-md border border-white/30 transition-colors cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-5 left-5 right-5 space-y-1.5">
                <span className="px-3 py-1 text-[10px] font-extrabold bg-red-600 text-white uppercase tracking-wider shadow">
                  {selectedFacilityModal.category}
                </span>
                <h3 className="text-xl sm:text-2xl font-black">
                  {selectedFacilityModal.name}
                </h3>
              </div>
            </div>

            {/* Modal Body (Sharp sub-boxes) */}
            <div className="p-6 sm:p-8 space-y-6 max-h-[60vh] overflow-y-auto">
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Overview</h4>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {selectedFacilityModal.description}
                </p>
              </div>

              {/* Equipment / Highlights */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                  <FlaskConical className="w-3.5 h-3.5 text-red-400" />
                  <span>Equipment & Infrastructure Details</span>
                </h4>
                <div className="grid sm:grid-cols-2 gap-2">
                  {(selectedFacilityModal.equipment || selectedFacilityModal.highlights).map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2.5 bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Safety Standards if present */}
              {selectedFacilityModal.safetyFeatures && selectedFacilityModal.safetyFeatures.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Safety, Supervision & Hygiene Standards</span>
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {selectedFacilityModal.safetyFeatures.map((sf, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2.5 bg-emerald-950/40 border border-emerald-800/60 text-xs font-semibold text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{sf}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Footer Row */}
              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <div className="text-xs text-slate-400 font-medium flex items-center gap-2">
                  <Users className="w-4 h-4 text-red-400" />
                  <span>Capacity: <strong className="text-white">{selectedFacilityModal.capacity}</strong></span>
                </div>

                <button
                  onClick={() => setSelectedFacilityModal(null)}
                  className="px-6 py-2.5 text-xs font-bold bg-white hover:bg-slate-200 text-slate-900 cursor-pointer transition-colors shadow-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};
