import React, { useState } from 'react';
import { 
  Bus, 
  Clock, 
  Phone, 
  ShieldCheck, 
  Navigation, 
  CheckCircle2, 
  Radio
} from 'lucide-react';
import { busRoutesList, BusRoute } from '../data/schoolData';

export const TransportSection: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute>(busRoutesList[0]);

  return (
    <section id="transport" className="py-24 bg-slate-50 relative border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-200 text-red-600 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Bus className="w-3.5 h-3.5 text-red-600" />
            <span>Safe Student Transit</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-display">
            School Bus Routes & Coverage
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Covering Parwanipur, Gandak, Birgunj Ghantaghar, Murli, Powerhouse, Pipra, Jitpur, and Chhapkaiya with dedicated drivers, safety caretakers, and punctuality.
          </p>
        </div>

        {/* Route Selector & Live Tracking Container */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Routes List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-2">
              Select Bus Route & Coverage Area
            </h3>

            {busRoutesList.map((route) => {
              const isSelected = route.id === selectedRoute.id;
              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-white border-red-500 shadow-md shadow-red-500/10 scale-[1.01]'
                      : 'bg-white border-slate-200 hover:border-red-300 hover:bg-red-50/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-bold ${isSelected ? 'text-red-600 font-extrabold' : 'text-slate-800'}`}>
                      {route.routeNumber}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-200">
                      <Radio className="w-2.5 h-2.5 animate-pulse text-emerald-600" />
                      {route.status}
                    </span>
                  </div>

                  <p className="text-xs font-bold text-slate-900">
                    {route.routeName}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 font-semibold">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-red-600" />
                      {route.morningTime}
                    </span>
                    <span className="font-mono text-red-600 font-bold">{route.vehicleNumber}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Selected Route Live Tracker Display (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6">
            
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="space-y-1">
                <span className="text-xs font-bold text-red-600 uppercase tracking-wider">
                  Route Timetable & Driver Contact
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedRoute.routeNumber}
                </h3>
                <p className="text-xs text-slate-600 font-semibold">
                  {selectedRoute.routeName}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-red-50/50 border border-red-100 space-y-1 shrink-0">
                <div className="flex items-center gap-1.5 text-xs text-slate-800 font-bold">
                  <Phone className="w-3.5 h-3.5 text-red-600" />
                  <span>{selectedRoute.driverName}</span>
                </div>
                <p className="text-[11px] font-mono text-red-600 font-extrabold pl-5">
                  {selectedRoute.driverPhone}
                </p>
              </div>
            </div>

            {/* Route Stops Timeline */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <Navigation className="w-3.5 h-3.5 text-red-600" />
                <span>Designated Route Stops & Timetable</span>
              </h4>

              <div className="relative pl-6 space-y-5 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-gradient-to-b before:from-red-500 before:via-rose-300 before:to-slate-300">
                {selectedRoute.stops.map((stop, idx) => {
                  const isCurrent = idx === selectedRoute.currentStopIndex;
                  const isPassed = idx < selectedRoute.currentStopIndex;

                  return (
                    <div key={idx} className="relative flex items-center justify-between group">
                      {/* Node Dot */}
                      <span className={`absolute -left-6 w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all ${
                        isCurrent
                          ? 'bg-red-500 border-white ring-4 ring-red-500/20'
                          : isPassed
                          ? 'bg-emerald-600 border-emerald-500'
                          : 'bg-white border-slate-300'
                      }`}>
                        {isPassed && <CheckCircle2 className="w-2.5 h-2.5 text-white" />}
                      </span>

                      <div className="pl-2 space-y-0.5">
                        <p className={`text-xs font-bold ${isCurrent ? 'text-red-600 font-extrabold' : isPassed ? 'text-slate-800' : 'text-slate-500'}`}>
                          {stop}
                        </p>
                        <p className="text-[10px] text-slate-400 font-semibold">
                          Stop #{idx + 1}
                        </p>
                      </div>

                      <div className="text-right">
                        {isCurrent && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700 border border-red-200">
                            Current Active Zone
                          </span>
                        )}
                        {isPassed && (
                          <span className="text-[10px] text-emerald-700 font-bold">
                            Covered
                          </span>
                        )}
                        {!isCurrent && !isPassed && (
                          <span className="text-[10px] text-slate-400 font-medium">
                            En Route
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Safety Assurance Bar */}
            <div className="p-4 rounded-2xl bg-red-50/40 border border-red-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-800">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-600 shrink-0" />
                <span className="font-semibold">Safe transport equipped with speed control & female care attendants</span>
              </div>
              <span className="text-red-600 font-black font-mono shrink-0">Helpline: +977 51-580123</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
