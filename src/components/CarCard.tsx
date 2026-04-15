import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Trophy, Calendar } from 'lucide-react';
import { Car } from '../carsData';

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group overflow-hidden rounded-xl bg-zinc-950 border border-white/5"
    >
      <Link to={`/cars/${car.id}`}>
        <div className="aspect-[16/10] overflow-hidden relative bg-zinc-950 flex items-center justify-center">
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover opacity-80 saturate-75 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110 group-hover:saturate-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
          
          <div className="absolute top-4 right-4">
            <span className="px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded bg-red-600 text-white shadow-lg">
              {car.team}
            </span>
          </div>
        </div>
        
        <div className="p-5">
          <div className="flex items-center text-gray-400 text-xs mb-2 space-x-3">
            <div className="flex items-center">
              <Calendar size={12} className="mr-1" />
              {car.year}
            </div>
            <div className="flex items-center">
              <Trophy size={12} className="mr-1" />
              {car.wins} Siege
            </div>
          </div>
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-red-500 transition-colors">
            {car.name}
          </h3>
          <p className="text-sm text-gray-400 line-clamp-2">
            {car.description}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
