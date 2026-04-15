import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker,
  ZoomableGroup
} from 'react-simple-maps';
import { motion, AnimatePresence } from 'motion/react';
import { tracks } from '../data';
import { Flag, MapPin, Info, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

export default function Map() {
  const navigate = useNavigate();
  const [hoveredTrack, setHoveredTrack] = React.useState<any>(null);
  const [tooltipPos, setTooltipPos] = React.useState({ x: 0, y: 0 });

  const handleMarkerClick = (id: string) => {
    navigate(`/tracks/${id}`);
  };

  const handleMouseEnter = (track: any, e: React.MouseEvent) => {
    setHoveredTrack(track);
    updateTooltipPosition(e);
  };

  const updateTooltipPosition = (e: React.MouseEvent) => {
    const x = e.clientX;
    const y = e.clientY;
    const padding = 20;
    const tooltipWidth = 256; // w-64
    const tooltipHeight = 160; // approximate height

    let left = x + padding;
    let top = y - tooltipHeight - padding;

    // Adjust if tooltip goes off screen
    if (left + tooltipWidth > window.innerWidth) {
      left = x - tooltipWidth - padding;
    }
    if (top < 0) {
      top = y + padding;
    }

    setTooltipPos({ x: left, y: top });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    updateTooltipPosition(e);
  };

  return (
    <div className="relative w-full h-[calc(100vh-64px)] bg-zinc-950 overflow-hidden flex flex-col selection:none">
      <div className="absolute top-8 left-8 z-10 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">
            F1 Welt<span className="text-red-600">karte</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-md font-medium">
            Entdecke alle legendären Rennstrecken der Formel-1-Geschichte. 
            Klicke auf eine Markierung, um mehr über die Strecke zu erfahren.
          </p>
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center cursor-grab active:cursor-grabbing bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-zinc-900/20">
        <ComposableMap
          projectionConfig={{
            scale: 200,
          }}
          className="w-full h-full"
        >
          <ZoomableGroup center={[20, 10]} zoom={1} maxZoom={8}>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map((geo) => (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#111114"
                    stroke="#27272a"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#1c1c21", outline: "none", transition: "all 0.3s" },
                      pressed: { outline: "none" },
                    }}
                  />
                ))
              }
            </Geographies>

            {tracks.map((track) => (
              <Marker 
                key={track.id} 
                coordinates={[track.location.lng, track.location.lat]}
                onMouseEnter={(e) => handleMouseEnter(track, e)}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => setHoveredTrack(null)}
                onClick={() => handleMarkerClick(track.id)}
              >
                <g className="cursor-pointer group">
                  <motion.circle
                    r={track.active ? 5 : 4}
                    fill={track.active ? "#dc2626" : "#52525b"}
                    stroke="#fff"
                    strokeWidth={1}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    whileHover={{ scale: 1.4, strokeWidth: 2 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                  {track.active && (
                    <circle
                      r={10}
                      fill="none"
                      stroke="#dc2626"
                      strokeWidth={1}
                      className="animate-ping opacity-20"
                    />
                  )}
                </g>
              </Marker>
            ))}
          </ZoomableGroup>
        </ComposableMap>
      </div>

      <AnimatePresence>
        {hoveredTrack && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              position: 'fixed',
              left: tooltipPos.x,
              top: tooltipPos.y,
              pointerEvents: 'none',
            }}
            className="z-50 w-64 bg-zinc-900/90 border border-white/10 rounded-xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Flag size={14} className="text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  {hoveredTrack.country}
                </span>
              </div>
              <span className={cn(
                "text-[8px] font-black px-1.5 py-0.5 rounded uppercase italic",
                hoveredTrack.active ? "bg-red-600 text-white" : "bg-zinc-700 text-gray-400"
              )}>
                {hoveredTrack.active ? 'Aktiv' : 'Historisch'}
              </span>
            </div>
            
            <h3 className="text-lg font-bold text-white leading-tight mb-1">
              {hoveredTrack.name}
            </h3>
            
            <div className="flex items-center space-x-3 text-[10px] text-gray-400 font-bold uppercase tracking-tighter mb-3">
              <div className="flex items-center">
                <MapPin size={10} className="mr-1 text-red-500" />
                {hoveredTrack.type}
              </div>
              <div className="flex items-center">
                <Info size={10} className="mr-1 text-red-500" />
                {hoveredTrack.firstRace} - {hoveredTrack.lastRace}
              </div>
            </div>

            <p className="text-xs text-gray-400 line-clamp-2 mb-3 italic leading-relaxed">
              {hoveredTrack.description}
            </p>

            <div className="flex items-center text-red-500 text-[10px] font-black uppercase tracking-widest pt-2 border-t border-white/5">
              Details ansehen <ArrowRight size={10} className="ml-1" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-8 left-8 flex flex-col space-y-4">
        <div className="flex items-center space-x-6 bg-black/60 backdrop-blur-md p-4 rounded-xl border border-white/10 shadow-xl">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600 border border-white shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Aktuelle Strecke</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-zinc-500 border border-white" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Historische Strecke</span>
          </div>
        </div>
        
        <div className="px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/5 self-start">
          <span className="text-[9px] font-bold uppercase tracking-widest text-gray-500 italic">
            Mausrad zum Zoomen • Klicken & Ziehen zum Bewegen
          </span>
        </div>
      </div>
    </div>
  );
}
