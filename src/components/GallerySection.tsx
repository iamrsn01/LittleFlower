import React, { useState } from 'react';
import { 
  Camera, 
  Maximize2, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Play
} from 'lucide-react';
import { galleryItems } from '../data/schoolData';

interface GallerySectionProps {
  onOpenVirtualTour: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onOpenVirtualTour }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ['All', 'STEM & Labs', 'Sports', 'Arts & Culture', 'Campus'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const handlePrev = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === 0 ? filteredItems.length - 1 : lightboxIndex - 1);
    }
  };

  const handleNext = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex(lightboxIndex === filteredItems.length - 1 ? 0 : lightboxIndex + 1);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="space-y-4 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
              <Camera className="w-3.5 h-3.5 text-red-600" />
              <span>Campus Life & Moments</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
              Life at Little Flower Secondary School
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Memorable snapshots of daily assemblies, science experiments, sports competitions, and cultural celebrations on campus.
            </p>
          </div>

          <button
            onClick={onOpenVirtualTour}
            className="px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold text-white bg-red-600 hover:bg-red-500 shadow-lg shadow-red-500/20 transition-all flex items-center gap-2 self-start md:self-auto cursor-pointer"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Virtual Campus Tour</span>
          </button>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/20 border border-red-600'
                  : 'bg-slate-50 text-slate-700 hover:text-red-600 hover:bg-red-50/50 border border-slate-200 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setLightboxIndex(idx)}
              className="group relative aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer shadow-md hover:shadow-xl transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

              {/* Overlay Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white text-red-600 shadow">
                    {item.category}
                  </span>
                  <div className="p-2 rounded-full bg-white/90 text-red-600 shadow">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>

                <div className="space-y-1 text-white">
                  <h4 className="text-base font-bold leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-rose-100 line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/90 text-slate-700 hover:text-red-600 border border-slate-200 transition-colors z-10 cursor-pointer shadow-md"
          >
            <X className="w-5 h-5" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrev();
            }}
            className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-800 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer z-10 shadow-md"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
            className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-800 hover:text-red-600 border border-slate-200 transition-colors cursor-pointer z-10 shadow-md"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl w-full bg-white border border-slate-300 rounded-3xl overflow-hidden shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[16/10] w-full bg-slate-900">
              <img
                src={filteredItems[lightboxIndex].imageUrl}
                alt={filteredItems[lightboxIndex].title}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-6 pt-0 space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-red-600">
                  {filteredItems[lightboxIndex].category}
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">
                  {lightboxIndex + 1} / {filteredItems.length}
                </span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-medium">
                {filteredItems[lightboxIndex].description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
