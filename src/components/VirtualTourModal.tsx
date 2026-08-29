import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  MapPin, 
  Compass, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';
import logoImg from '../assets/logo.png';

interface VirtualTourModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAdmissions: () => void;
}

export const VirtualTourModal: React.FC<VirtualTourModalProps> = ({
  isOpen,
  onClose,
  onOpenAdmissions
}) => {
  const tourSpots = [
    {
      id: 'spot-main',
      title: 'Main Academic Building & Assembly Courtyard',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1400&q=80',
      description: 'The central academic block featuring spacious smart classrooms, administrative reception, and daily moral assembly podium.',
      highlights: ['CCTV-monitored entrance', 'Lush green flowering gardens', 'Reception & Principal Desk']
    },
    {
      id: 'spot-science',
      title: 'Senior Science Practical Laboratory',
      image: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=1400&q=80',
      description: 'Equipped with optical microscopes, chemistry titration benches, and physics mechanics equipment for SEE practicals.',
      highlights: ['Individual practical kits', 'Safety fume apparatus', 'Biology specimen collection']
    },
    {
      id: 'spot-computer',
      title: 'High-Tech Computer & ICT Laboratory',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1400&q=80',
      description: 'Networked computer systems for learning office productivity, typing skills, coding fundamentals, and audio-visual education.',
      highlights: ['40+ Modern PC workstations', 'Fiber internet connectivity', 'Interactive projector screen']
    },
    {
      id: 'spot-playground',
      title: 'Spacious Sports Ground & Athletics Arena',
      image: 'https://images.unsplash.com/photo-1526232761682-d26e03ac148e?auto=format&fit=crop&w=1400&q=80',
      description: 'Expansive natural playground for cricket, football, volleyball, badminton, and annual inter-house athletics tournaments.',
      highlights: ['Cricket pitch & goalposts', 'Volleyball court', 'Daily physical PT assembly']
    }
  ];

  const [currentSpotIndex, setCurrentSpotIndex] = useState(0);

  if (!isOpen) return null;

  const currentSpot = tourSpots[currentSpotIndex];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/75 backdrop-blur-md overflow-y-auto">
      <div 
        className="bg-white border-2 border-rose-200 rounded-3xl max-w-5xl w-full overflow-hidden shadow-2xl flex flex-col my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-gradient-to-r from-red-600 via-rose-500 to-red-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white p-0.5 shadow shrink-0">
              <img src={logoImg} alt="Logo" className="w-full h-full object-contain rounded-full" />
            </div>
            <div>
              <span className="text-base font-black tracking-wide flex items-center gap-2">
                Little Flower Campus Tour
              </span>
              <p className="text-xs text-rose-200">Birgunj-21, Parwanipur, Parsa</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tour Visual Stage */}
        <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden group">
          <img
            src={currentSpot.image}
            alt={currentSpot.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-red-950/90 via-transparent to-transparent" />

          {/* Compass Waypoint Badge */}
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-rose-200 text-xs font-bold text-red-950 flex items-center gap-2 shadow-md">
            <MapPin className="w-3.5 h-3.5 text-red-700" />
            <span>Campus Spot {currentSpotIndex + 1} of {tourSpots.length}</span>
          </div>

          {/* Controls */}
          <button
            onClick={() => setCurrentSpotIndex(currentSpotIndex === 0 ? tourSpots.length - 1 : currentSpotIndex - 1)}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-900 border border-rose-200 hover:bg-red-800 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={() => setCurrentSpotIndex(currentSpotIndex === tourSpots.length - 1 ? 0 : currentSpotIndex + 1)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-900 border border-rose-200 hover:bg-red-800 hover:text-white transition-all cursor-pointer shadow-lg"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Spot Bottom Caption */}
          <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 space-y-1 text-white">
            <h3 className="text-xl sm:text-2xl font-black drop-shadow">
              {currentSpot.title}
            </h3>
            <p className="text-xs sm:text-sm text-rose-100 drop-shadow max-w-2xl font-medium">
              {currentSpot.description}
            </p>
          </div>
        </div>

        {/* Thumbnails Navigation Row */}
        <div className="p-4 sm:p-6 bg-white border-t border-rose-100 space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {tourSpots.map((spot, idx) => (
              <button
                key={spot.id}
                onClick={() => setCurrentSpotIndex(idx)}
                className={`flex-1 min-w-[140px] p-2.5 rounded-xl text-left border-2 transition-all cursor-pointer ${
                  currentSpotIndex === idx
                    ? 'bg-rose-50 border-red-800 text-red-900 shadow-xs'
                    : 'bg-white border-rose-100 text-slate-600 hover:border-rose-300'
                }`}
              >
                <span className="text-[10px] font-mono font-bold block text-red-700">Area 0{idx + 1}</span>
                <span className="text-xs font-bold line-clamp-1">{spot.title}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-rose-100">
            <div className="flex flex-wrap items-center gap-2">
              {currentSpot.highlights.map((hl, idx) => (
                <span key={idx} className="text-[11px] text-slate-700 font-medium bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  {hl}
                </span>
              ))}
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenAdmissions();
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-red-800 to-rose-800 hover:from-red-700 hover:to-rose-700 text-white flex items-center justify-center gap-1.5 shadow"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Apply for 2026/27 Admission</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
