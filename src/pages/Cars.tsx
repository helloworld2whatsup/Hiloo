import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter } from 'lucide-react';
import { cars } from '../carsData';
import CarCard from '../components/CarCard';

export default function Cars() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDecade, setSelectedDecade] = useState<string>('all');

  const decades = ['all', '1950s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.team.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedDecade === 'all') return matchesSearch;
    
    const decadeStart = parseInt(selectedDecade.substring(0, 4));
    const matchesDecade = car.year >= decadeStart && car.year < decadeStart + 10;
    
    return matchesSearch && matchesDecade;
  });

  return (
    <div className="pt-24 pb-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter mb-4">
              F1 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-900">Autos</span>
            </h1>
            <p className="text-gray-400 max-w-xl text-lg">
              Entdecke die legendärsten und innovativsten Fahrzeuge der Formel-1-Geschichte.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Auto oder Team suchen..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 bg-zinc-900 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white placeholder-gray-500 focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
              <select
                value={selectedDecade}
                onChange={(e) => setSelectedDecade(e.target.value)}
                className="w-full sm:w-48 bg-zinc-900 border border-white/10 rounded-full py-3 pl-12 pr-6 text-white appearance-none focus:outline-none focus:border-red-500 transition-colors cursor-pointer"
              >
                <option value="all">Alle Jahrzehnte</option>
                <option value="1950s">1950er</option>
                <option value="1970s">1970er</option>
                <option value="1980s">1980er</option>
                <option value="1990s">1990er</option>
                <option value="2000s">2000er</option>
                <option value="2010s">2010er</option>
                <option value="2020s">2020er</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <CarCard car={car} />
            </motion.div>
          ))}
        </div>

        {filteredCars.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">Keine Autos gefunden, die deinen Kriterien entsprechen.</p>
          </div>
        )}
      </div>
    </div>
  );
}
