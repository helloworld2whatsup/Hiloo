import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Track } from '../types';

interface TrackCardProps {
  track: Track;
  key?: string | number;
}

export default function TrackCard({ track }: TrackCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group overflow-hidden rounded-xl bg-zinc-950 border border-white/5"
    >
      <Link to={`/tracks/${track.id}`}>
        <div className="aspect-video overflow-hidden relative bg-white/10 flex items-center justify-center p-4">
          <img
            src={track.layouts[track.layouts.length - 1].layoutImage}
            alt={track.name}
            className="max-h-full max-w-full object-contain saturate-75 group-hover:scale-110 group-hover:saturate-100 transition-all duration-500 bg-white rounded-lg p-2"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60" />
          
          <div className="absolute top-4 left-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/50">Layout Preview</span>
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <span className={`px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded ${
              track.active ? 'bg-green-500 text-white' : 'bg-zinc-700 text-gray-300'
            }`}>
              {track.active ? 'Aktiv' : 'Historisch'}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center text-gray-400 text-xs mb-2 space-x-3">
            <div className="flex items-center">
              <MapPin size={12} className="mr-1" />
              {track.country}
            </div>
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {track.firstRace}
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
            {track.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {track.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
