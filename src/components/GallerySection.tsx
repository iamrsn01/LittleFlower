import React, { useState, useEffect, useMemo } from 'react';
import { 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play,
  Grid3X3,
  Columns3,
  Sparkles,
  FlaskConical,
  Trophy,
  Palette,
  Building2,
  Calendar,
  Search,
  CheckCircle2,
  Share2,
  Eye
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { galleryItems, GalleryItem } from '../data/schoolData';

interface GallerySectionProps {
  onOpenVirtualTour: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenVirtualTour }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [layoutMode, setLayoutMode] = useState<'masonry' | 'grid'>('masonry');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  // Available categories with custom icons
  const categoryConfigs = [
    { label: 'All', icon: Sparkles },
    { label: 'Campus', icon: Building2 },
    { label: 'STEM & Labs', icon: FlaskConical },
    { label: 'Sports', icon: Trophy },
    { label: 'Arts & Culture', icon: Palette },
    { label: 'Events', icon: Calendar },
  ];

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: galleryItems.length };
    galleryItems.forEach(item => {
      counts[item.category] = (counts[item.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter items based on active tab and search query
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
      const matchesSearch = searchQuery.trim() === '' || 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.tag && item.tag.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxIndex(null);
      } else if (e.key === 'ArrowLeft') {
        setLightboxIndex(prev => 
          prev === null ? null : (prev === 0 ? filteredItems.length - 1 : prev - 1)
        );
      } else if (e.key === 'ArrowRight') {
        setLightboxIndex(prev => 
          prev === null ? null : (prev === filteredItems.length - 1 ? 0 : prev + 1)
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, filteredItems.length]);

  const handlePrev = () => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null && filteredItems.length > 0) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  const handleShare = (item: GalleryItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.title,
        text: item.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 relative border-t border-slate-200 overflow-hidden">
      {/* Background Decorative Glows */}
      <div className="absolute top-12 left-1/4 w-96 h-96 bg-red-100/40 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-12 right-1/4 w-96 h-96 bg-rose-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 border border-red-200/80 text-red-700 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Camera className="w-3.5 h-3.5 text-red-600 animate-pulse" />
              <span>Campus Life & Visual Showcase</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              Moments of Discovery, <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-red-700">
                Creativity & Champions
              </span>
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore vibrant scenes from everyday classroom discovery, practical science investigations, inter-house sports competitions, and colorful cultural festivals at Little Flower Secondary School.
            </p>
          </div>

          {/* Right Action / Virtual Tour Button */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenVirtualTour}
              className="group px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-500 hover:to-rose-500 shadow-lg shadow-red-500/25 transition-all duration-300 flex items-center gap-2.5 cursor-pointer hover:-translate-y-0.5"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-3.5 h-3.5 fill-current ml-0.5 text-white" />
              </div>
              <span>Launch Virtual Tour</span>
            </button>
          </div>
        </div>

        {/* Filter and Control Bar */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-3 sm:p-4 border border-slate-200/80 shadow-sm mb-10 space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none no-scrollbar">
              {categoryConfigs.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.label;
                const count = categoryCounts[cat.label] || 0;

                return (
                  <button
                    key={cat.label}
                    onClick={() => setActiveCategory(cat.label)}
                    className={`relative px-4 py-2 rounded-xl text-xs font-bold transition-all duration-300 flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                      isActive
                        ? 'text-white shadow-md shadow-red-500/25'
                        : 'text-slate-700 hover:text-red-600 hover:bg-red-50/60 bg-slate-100/80 border border-slate-200/60'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        className="absolute inset-0 bg-gradient-to-r from-red-600 to-rose-600 rounded-xl"
                        transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-1.5">
                      <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                      <span>{cat.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                        isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {count}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Right Controls: Search & Layout Mode */}
            <div className="flex items-center gap-3 self-end md:self-auto shrink-0">
              
              {/* Quick Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search photos..."
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100/80 focus:bg-white rounded-xl border border-slate-200 focus:border-red-400 focus:ring-2 focus:ring-red-500/10 outline-none transition-all w-36 sm:w-44 text-slate-800 placeholder-slate-400"
                />
                {searchQuery && (
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Layout Switcher */}
              <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200/80 text-slate-600">
                <button
                  onClick={() => setLayoutMode('masonry')}
                  title="Dynamic Editorial Layout"
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    layoutMode === 'masonry'
                      ? 'bg-white text-red-600 shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <Columns3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Masonry</span>
                </button>
                
                <button
                  onClick={() => setLayoutMode('grid')}
                  title="Uniform Grid Layout"
                  className={`p-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    layoutMode === 'grid'
                      ? 'bg-white text-red-600 shadow-xs'
                      : 'hover:text-slate-900'
                  }`}
                >
                  <Grid3X3 className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline text-[11px]">Grid</span>
                </button>
              </div>

            </div>

          </div>
        </div>

        {/* Gallery Content Area */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-slate-200 p-8 space-y-3">
            <Camera className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-lg font-bold text-slate-700">No photos match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try clearing your search term or switching to a different category tab.
            </p>
            <button
              onClick={() => { setActiveCategory('All'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div 
            layout
            className={
              layoutMode === 'masonry'
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[280px]'
                : 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6'
            }
          >
            <AnimatePresence>
              {filteredItems.map((item, idx) => {
                // In masonry mode, vary heights/spans for visual delight
                const isFeatured = item.featured;
                const isWide = item.aspect === 'wide';
                const isPortrait = item.aspect === 'portrait';

                const masonryClasses = layoutMode === 'masonry'
                  ? `${isFeatured ? 'sm:col-span-2 row-span-2' : isPortrait ? 'row-span-2' : isWide ? 'sm:col-span-2' : 'row-span-1'}`
                  : 'aspect-[4/3]';

                return (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    onClick={() => setLightboxIndex(idx)}
                    className={`group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-200/90 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 ${masonryClasses}`}
                  >
                    {/* Background Image with Zoom Effect */}
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-108 group-hover:rotate-[0.5deg] transition-all duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/10 opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

                    {/* Top Floating Chips */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 rounded-xl text-[11px] font-bold backdrop-blur-md bg-white/90 text-slate-900 shadow-sm border border-white/40 flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
                          {item.category}
                        </span>
                        {item.tag && (
                          <span className="hidden sm:inline-flex px-2.5 py-1 rounded-xl text-[10px] font-semibold backdrop-blur-md bg-black/40 text-rose-100 border border-white/20">
                            #{item.tag}
                          </span>
                        )}
                      </div>

                      {/* Zoom Icon Button */}
                      <div className="w-9 h-9 rounded-2xl backdrop-blur-md bg-white/20 text-white border border-white/30 flex items-center justify-center opacity-80 group-hover:opacity-100 group-hover:bg-red-600 group-hover:border-red-500 group-hover:scale-110 transition-all duration-300 shadow-lg">
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>

                    {/* Bottom Content / Caption Reveal */}
                    <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 z-10 space-y-2 flex flex-col justify-end">
                      <div className="transform transition-transform duration-300 group-hover:-translate-y-1">
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug drop-shadow-sm line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-xs text-rose-100/90 mt-1 line-clamp-2 opacity-80 group-hover:opacity-100 transition-opacity duration-300 font-medium">
                          {item.description}
                        </p>
                      </div>

                      {/* Quick Meta Row on Hover */}
                      <div className="flex items-center justify-between pt-2 border-t border-white/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="text-[11px] text-white/70 font-mono">
                          Little Flower Archives
                        </span>
                        <span className="text-[11px] font-bold text-rose-300 flex items-center gap-1">
                          <Eye className="w-3 h-3" />
                          <span>View Fullscreen</span>
                        </span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}

      </div>

      {/* Modern Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && filteredItems[lightboxIndex] && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-xl"
            onClick={() => setLightboxIndex(null)}
          >
            {/* Top Toolbar */}
            <div className="absolute top-4 sm:top-6 inset-x-4 sm:inset-x-8 flex items-center justify-between z-20 pointer-events-none">
              <div className="pointer-events-auto px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs font-bold flex items-center gap-2 shadow-lg">
                <Camera className="w-4 h-4 text-red-400" />
                <span>{filteredItems[lightboxIndex].category}</span>
                <span className="text-white/40">•</span>
                <span className="font-mono text-rose-200">
                  {lightboxIndex + 1} of {filteredItems.length}
                </span>
              </div>

              <div className="pointer-events-auto flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(filteredItems[lightboxIndex]);
                  }}
                  className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer shadow-lg"
                  title="Share Photo"
                >
                  {copiedLink ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                </button>

                <button
                  onClick={() => setLightboxIndex(null)}
                  className="p-2.5 sm:p-3 rounded-full bg-white/10 hover:bg-red-600 text-white backdrop-blur-md border border-white/20 hover:border-red-500 transition-all cursor-pointer shadow-lg"
                  title="Close (Esc)"
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Left Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePrev();
              }}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-20 shadow-xl hover:scale-110 active:scale-95"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Right Nav Arrow */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/10 hover:bg-white/25 text-white backdrop-blur-md border border-white/20 transition-all cursor-pointer z-20 shadow-xl hover:scale-110 active:scale-95"
              title="Next (Right Arrow)"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            {/* Central Modal Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="max-w-5xl w-full max-h-[90vh] bg-slate-900 border border-slate-700/80 rounded-3xl overflow-hidden shadow-2xl flex flex-col my-auto z-10"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image Container */}
              <div className="relative flex-1 min-h-[300px] sm:min-h-[460px] max-h-[62vh] bg-black flex items-center justify-center overflow-hidden">
                <img
                  src={filteredItems[lightboxIndex].imageUrl}
                  alt={filteredItems[lightboxIndex].title}
                  className="w-full h-full object-contain select-none"
                />
              </div>

              {/* Bottom Caption and Thumbnail Strip */}
              <div className="p-5 sm:p-6 bg-slate-950 border-t border-slate-800 text-white space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-red-400 uppercase tracking-wider">
                        {filteredItems[lightboxIndex].category}
                      </span>
                      {filteredItems[lightboxIndex].tag && (
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-white/10 text-rose-200">
                          #{filteredItems[lightboxIndex].tag}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold leading-tight">
                      {filteredItems[lightboxIndex].title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-3xl">
                      {filteredItems[lightboxIndex].description}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setLightboxIndex(null);
                      onOpenVirtualTour();
                    }}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-red-600 text-white transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto cursor-pointer border border-white/20 hover:border-red-500"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>View 360° Tour</span>
                  </button>
                </div>

                {/* Thumbnails Navigation Row */}
                <div className="pt-3 border-t border-slate-800/80 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none no-scrollbar">
                  {filteredItems.map((item, idx) => (
                    <button
                      key={item.id}
                      onClick={() => setLightboxIndex(idx)}
                      className={`relative w-16 h-12 rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                        lightboxIndex === idx
                          ? 'border-red-500 scale-105 shadow-md shadow-red-500/30'
                          : 'border-transparent opacity-50 hover:opacity-100 hover:scale-100'
                      }`}
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
