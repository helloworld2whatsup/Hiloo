import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Calendar, Ruler, Zap, ArrowLeft, ChevronRight, ChevronLeft, Info, Globe } from 'lucide-react';
import { tracks } from '../data';
import { PointOfInterest } from '../types';
import MapChart from '../components/MapChart';

export default function TrackDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const track = tracks.find(t => t.id === id);
  const [activeLayoutIndex, setActiveLayoutIndex] = useState(0);
  const [activePoi, setActivePoi] = useState<PointOfInterest | null>(null);

  // Reset active POI when layout changes
  React.useEffect(() => {
    setActivePoi(null);
  }, [activeLayoutIndex]);

  if (!track) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white">Strecke nicht gefunden</h2>
        <button onClick={() => navigate('/tracks')} className="text-red-500 mt-4 inline-block bg-transparent border-none cursor-pointer">Zurück zur Übersicht</button>
      </div>
    );
  }

  const activeLayout = track.layouts[activeLayoutIndex];

  return (
    <div className="pb-20">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-white/5 py-12">
        <div className="container mx-auto px-4">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors bg-transparent border-none cursor-pointer"
          >
            <ArrowLeft size={20} className="mr-2" /> Zurück
          </button>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-[10px] font-black uppercase tracking-widest">
                  {track.country}
                </span>
                <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest ${
                  track.active ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}>
                  {track.active ? 'Aktueller Kalender' : 'Historisch'}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic uppercase text-white tracking-tighter">
                {track.name}
              </h1>
            </div>
            
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Erster GP</div>
                <div className="text-2xl font-black text-white">{track.firstRace}</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Typ</div>
                <div className="text-2xl font-black text-white">{track.type}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        
        {/* Layout Selector */}
        <div className="flex flex-col items-center mb-12">
          <h2 className="text-2xl font-black italic uppercase text-white mb-6">Layout Evolution</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide max-w-full">
            {track.layouts.map((layout, i) => (
              <button
                key={i}
                onClick={() => setActiveLayoutIndex(i)}
                className={`px-6 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                  activeLayoutIndex === i 
                    ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' 
                    : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white'
                }`}
              >
                {layout.yearFrom} - {layout.yearTo}
              </button>
            ))}
          </div>
        </div>

        {/* Centered Interactive Map */}
        <div className="flex flex-col items-center justify-center mb-16">
          <div className="w-full max-w-5xl bg-zinc-900/50 rounded-3xl p-8 border border-white/5 relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeLayoutIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                className="relative w-full flex justify-center items-center min-h-[400px]"
              >
                <div className="relative w-full max-w-4xl bg-white rounded-2xl p-4 shadow-inner">
                  <img
                    src={activeLayout.layoutImage}
                    alt={`${track.name} Layout ${activeLayout.yearFrom}`}
                    className="w-full h-auto object-contain max-h-[500px]"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Points of Interest */}
                  {activeLayout.pointsOfInterest?.map((poi, index) => (
                    <button
                      key={poi.id}
                      onClick={() => setActivePoi(poi)}
                      className={`absolute w-10 h-10 -ml-5 -mt-5 rounded-full flex items-center justify-center transition-all z-10 ${
                        activePoi?.id === poi.id 
                          ? 'bg-red-600 text-white scale-110 shadow-[0_0_30px_rgba(220,38,38,0.8)]' 
                          : 'bg-zinc-800 text-white hover:bg-red-600 hover:scale-110 shadow-lg border-2 border-zinc-900'
                      }`}
                      style={{ left: `${poi.x}%`, top: `${poi.y}%` }}
                      title={poi.title}
                    >
                      <span className="text-sm font-bold">{index + 1}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Layout Stats Overlay */}
            <div className="absolute bottom-8 left-8 flex gap-4 z-20">
              <div className="bg-black/80 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10 flex items-center gap-6">
                <div className="flex items-center text-gray-300">
                  <Ruler size={20} className="mr-3 text-red-500" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Länge</div>
                    <div className="font-bold text-white">{activeLayout.length}</div>
                  </div>
                </div>
                <div className="w-px h-8 bg-white/10"></div>
                <div className="flex items-center text-gray-300">
                  <Zap size={20} className="mr-3 text-red-500" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">Kurven</div>
                    <div className="font-bold text-white">{activeLayout.turns}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex gap-2 z-20">
              <button 
                onClick={() => setActiveLayoutIndex(prev => Math.max(0, prev - 1))}
                disabled={activeLayoutIndex === 0}
                className="p-4 bg-black/80 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-colors border border-white/10"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={() => setActiveLayoutIndex(prev => Math.min(track.layouts.length - 1, prev + 1))}
                disabled={activeLayoutIndex === track.layouts.length - 1}
                className="p-4 bg-black/80 hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed rounded-full text-white transition-colors border border-white/10"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: POI Details & Layout Description */}
          <div className="lg:col-span-8 space-y-8">
            {/* Point of Interest Details */}
            <div className="min-h-[200px]">
              <AnimatePresence mode="wait">
                {activePoi ? (
                  <motion.div
                    key={activePoi.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="p-8 rounded-3xl bg-gradient-to-br from-zinc-900 to-black border border-red-900/30 relative overflow-hidden h-full"
                  >
                    <div className="absolute top-0 left-0 w-1 h-full bg-red-600" />
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-red-600/20 flex items-center justify-center shrink-0 mt-1">
                        <MapPin className="text-red-500" size={24} />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-red-500 uppercase tracking-widest mb-1">Point of Interest</div>
                        <h3 className="text-2xl font-bold text-white mb-3">{activePoi.title}</h3>
                        <p className="text-gray-400 leading-relaxed text-lg">
                          {activePoi.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty-poi"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full flex items-center justify-center p-12 rounded-3xl border border-dashed border-white/10 bg-zinc-900/20"
                  >
                    <div className="text-center text-gray-500">
                      <MapPin size={32} className="mx-auto mb-4 opacity-50" />
                      <p>Klicke auf einen Punkt auf der Karte, um Details zu sehen.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-4">Über dieses Layout ({activeLayout.yearFrom} - {activeLayout.yearTo})</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {activeLayout.description}
              </p>
            </div>
          </div>

          {/* Right Column: Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <section className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-red-500">Strecken-Info</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                {track.description}
              </p>
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Land</span>
                  <span className="text-white font-bold">{track.country}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Erstes Rennen</span>
                  <span className="text-white font-bold">{track.firstRace}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-white/5">
                  <span className="text-gray-500 text-sm">Letztes Rennen</span>
                  <span className="text-white font-bold">{track.lastRace}</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-500 text-sm">Typ</span>
                  <span className="text-white font-bold">{track.type}</span>
                </div>
              </div>
            </section>

            <section className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-red-500 flex items-center">
                <Globe className="mr-2" size={20} />
                Weltkarte
              </h3>
              <div className="w-full h-[250px] bg-zinc-950 rounded-xl overflow-hidden border border-white/5">
                <MapChart lat={track.location.lat} lng={track.location.lng} name={track.name} />
              </div>
            </section>

            <div className="p-8 rounded-3xl bg-gradient-to-br from-red-600 to-red-900 text-white">
              <h3 className="text-2xl font-black italic uppercase mb-4">Wusstest du schon?</h3>
              <p className="text-white/80 text-sm leading-relaxed">
                {track.name} ist eine der ikonischsten Strecken im Kalender und hat im Laufe der Jahre zahlreiche historische Momente erlebt.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
