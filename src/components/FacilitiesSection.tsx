import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  X,
  Maximize2
} from 'lucide-react';
import { facilitiesList, Facility } from '../data/schoolData';

export const FacilitiesSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  const categories = ['All', 'Laboratories', 'Sports & Fitness', 'Academics', 'Arts & Culture'];

  const filteredFacilities = activeCategory === 'All'
    ? facilitiesList
    : facilitiesList.filter(f => f.category === activeCategory);

  return (
    <section id="facilities" className="py-24 bg-white relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-red-600" />
            <span>Campus Infrastructure</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            Modern Facilities for Holistic Growth
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            A Green Haven for Learning in Parwanipur, Parsa, featuring dedicated science practical labs, a high-speed computer centre, open sports grounds, and spacious assembly auditoriums.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-red-600 text-white shadow-md shadow-red-500/20 border border-red-600'
                  : 'bg-slate-50 text-slate-700 hover:text-red-600 hover:bg-red-50/50 border border-slate-200 shadow-xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Facilities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFacilities.map((fac) => (
            <div
              key={fac.id}
              onClick={() => setSelectedFacility(fac)}
              className="group bg-white border border-slate-200 rounded-3xl overflow-hidden hover:border-red-400 transition-all duration-300 hover:-translate-y-1.5 shadow-sm hover:shadow-xl cursor-pointer flex flex-col justify-between"
            >
              {/* Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                
                {/* Category & Capacity Badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 backdrop-blur-md text-red-600 border border-red-100 shadow-xs">
                    {fac.category}
                  </span>
                </div>

                <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-white/95 backdrop-blur-md text-slate-800 border border-slate-200 shadow-xs">
                  <Users className="w-3 h-3 text-red-600" />
                  <span>{fac.capacity}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {fac.name}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                {/* Highlights Pills */}
                <div className="space-y-2 pt-3 border-t border-slate-100">
                  <div className="flex flex-wrap gap-1.5">
                    {fac.highlights.slice(0, 2).map((hl, idx) => (
                      <span key={idx} className="text-[10px] font-semibold bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                        {hl}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs text-red-600 font-bold group-hover:underline">
                    <span>View Specifications</span>
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Facility Detail Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/60 backdrop-blur-md">
          <div 
            className="bg-white border border-slate-300 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-100">
              <img 
                src={selectedFacility.imageUrl} 
                alt={selectedFacility.name}
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
              
              <button
                onClick={() => setSelectedFacility(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white text-slate-700 hover:text-red-600 border border-slate-200 hover:bg-red-50 transition-colors cursor-pointer shadow-md"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-extrabold bg-red-600 text-white shadow">
                  {selectedFacility.category}
                </span>
                <h3 className="text-2xl font-black mt-2">
                  {selectedFacility.name}
                </h3>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm text-slate-700 leading-relaxed font-medium">
                {selectedFacility.description}
              </p>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                  Key Specifications & Infrastructure
                </h4>
                <div className="grid sm:grid-cols-2 gap-2.5">
                  {selectedFacility.highlights.map((h, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-800 font-semibold bg-red-50/50 p-2.5 rounded-xl border border-red-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                <div className="text-xs text-slate-600 font-medium flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-red-600" />
                  <span>Student Capacity: <strong className="text-slate-900">{selectedFacility.capacity}</strong></span>
                </div>
                
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 cursor-pointer"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
