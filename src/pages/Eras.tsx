import { motion } from 'motion/react';
import { History, Zap, Trophy, Settings } from 'lucide-react';
import { eras } from '../data';

export default function Eras() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-16">
        <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">
          F1 <span className="text-red-600">Epochen</span>
        </h1>
        <p className="text-gray-400 mt-2 max-w-2xl">
          Die Geschichte der Formel 1 ist geprägt von technologischen Revolutionen, legendären Rivalitäten und dem ständigen Streben nach Perfektion.
        </p>
      </div>

      <div className="space-y-24">
        {eras.map((era, i) => (
          <motion.section
            key={era.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
          >
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-4">
                <span className="text-6xl font-black text-white/10 italic leading-none">{era.years.split('–')[0]}</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>
              
              <h2 className="text-4xl font-black italic uppercase text-white tracking-tighter">
                {era.title}
              </h2>
              
              <p className="text-lg text-gray-400 leading-relaxed">
                {era.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                  <div className="flex items-center text-red-500 font-bold text-xs uppercase tracking-widest mb-2">
                    <Settings size={14} className="mr-2" /> Technik-Fokus
                  </div>
                  <p className="text-white font-medium">{era.techFocus}</p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900 border border-white/5">
                  <div className="flex items-center text-yellow-500 font-bold text-xs uppercase tracking-widest mb-2">
                    <Trophy size={14} className="mr-2" /> Dominante Fahrer
                  </div>
                  <p className="text-white font-medium">{era.dominantDrivers.join(', ')}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 w-full aspect-video rounded-3xl overflow-hidden relative group">
              <img
                src={`https://picsum.photos/seed/era${era.id}/800/450`}
                alt={era.title}
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8">
                <span className="px-4 py-2 bg-red-600 text-white font-black italic uppercase tracking-widest">
                  {era.years}
                </span>
              </div>
            </div>
          </motion.section>
        ))}
      </div>
    </div>
  );
}
