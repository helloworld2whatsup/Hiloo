import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Trophy, ChevronRight } from 'lucide-react';
import { Driver } from '../types';

interface DriverCardProps {
  driver: Driver;
  key?: string | number;
}

export default function DriverCard({ driver }: DriverCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-xl bg-zinc-950 border border-white/5 transition-all hover:border-red-500/50"
    >
      <Link to={`/drivers/${driver.id}`}>
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src={driver.imageUrl}
            alt={driver.name}
            className="h-full w-full object-cover saturate-75 transition-all duration-500 group-hover:scale-110 group-hover:saturate-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        </div>
        
        <div className="absolute bottom-0 p-4 w-full">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-red-500 uppercase tracking-widest">
              {driver.nationality}
            </span>
            {driver.stats.titles > 0 && (
              <div className="flex items-center text-yellow-500">
                <Trophy size={12} className="mr-1" />
                <span className="text-xs font-bold">{driver.stats.titles}</span>
              </div>
            )}
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
            {driver.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">
            {driver.f1Start} – {driver.f1End}
          </p>
          
          <div className="mt-4 flex items-center text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100 uppercase tracking-tighter">
            Profil ansehen <ChevronRight size={14} className="ml-1" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
