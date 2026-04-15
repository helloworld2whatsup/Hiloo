import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Calendar, Settings, User } from 'lucide-react';
import { cars } from '../carsData';

export default function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = cars.find(c => c.id === id);

  if (!car) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white">Auto nicht gefunden</h2>
        <button onClick={() => navigate('/cars')} className="text-red-500 mt-4 inline-block bg-transparent border-none cursor-pointer">Zurück zur Übersicht</button>
      </div>
    );
  }

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
                <span className="px-3 py-1 bg-red-600 text-white text-[10px] font-black uppercase tracking-widest rounded">
                  {car.team}
                </span>
                <span className="px-3 py-1 bg-zinc-800 text-gray-300 text-[10px] font-black uppercase tracking-widest rounded">
                  {car.year}
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-black italic uppercase text-white tracking-tighter">
                {car.name}
              </h1>
            </div>
            
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Siege</div>
                <div className="text-3xl font-black text-white">{car.wins}</div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Titel</div>
                <div className="text-3xl font-black text-white">{car.championships}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Main Image */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl"
        >
          <img 
            src={car.image} 
            alt={car.name} 
            className="w-full h-auto max-h-[600px] object-cover"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column: Description */}
          <div className="lg:col-span-2 space-y-8">
            <section className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
              <h3 className="text-2xl font-black italic uppercase text-white mb-6">Über das Auto</h3>
              <p className="text-gray-400 leading-relaxed text-lg">
                {car.description}
              </p>
            </section>
          </div>

          {/* Right Column: Specs */}
          <div className="space-y-8">
            <section className="p-8 rounded-3xl bg-zinc-900 border border-white/5">
              <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest text-red-500 flex items-center">
                <Settings className="mr-2" size={20} />
                Spezifikationen
              </h3>
              
              <div className="space-y-4">
                <div className="py-3 border-b border-white/5">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Motor</div>
                  <div className="text-white">{car.engine}</div>
                </div>
                <div className="py-3 border-b border-white/5">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Chassis</div>
                  <div className="text-white">{car.specs.chassis}</div>
                </div>
                <div className="py-3 border-b border-white/5">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Aufhängung</div>
                  <div className="text-white">{car.specs.suspension}</div>
                </div>
                <div className="py-3 border-b border-white/5">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Getriebe</div>
                  <div className="text-white">{car.specs.transmission}</div>
                </div>
                <div className="py-3 border-b border-white/5">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">Gewicht</div>
                  <div className="text-white">{car.specs.weight}</div>
                </div>
                <div className="py-3">
                  <div className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1 flex items-center">
                    <User size={12} className="mr-1" /> Designer
                  </div>
                  <div className="text-white">{car.designer}</div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
