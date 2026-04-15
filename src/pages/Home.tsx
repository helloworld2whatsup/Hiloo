import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Flag, Timer, Zap, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { drivers, tracks } from '../data';
import DriverCard from '../components/DriverCard';
import TrackCard from '../components/TrackCard';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = {
    drivers: searchQuery ? drivers.filter(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : [],
    tracks: searchQuery ? tracks.filter(t => t.name.toLowerCase().includes(searchQuery.toLowerCase()) || t.country.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 5) : []
  };

  const featuredDrivers = drivers.filter(d => 
    ['michael-schumacher', 'ayrton-senna', 'lewis-hamilton'].includes(d.id)
  );
  const featuredTracks = tracks.slice(0, 3);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1541343672885-9be56236302a?q=80&w=2000&auto=format&fit=crop"
            alt="F1 Background"
            className="h-full w-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter text-white uppercase leading-[0.9]">
              Legenden <br />
              <span className="text-red-600">des Speeds</span>
            </h1>
            <p className="mt-6 text-xl text-gray-300 max-w-xl font-medium leading-relaxed">
              Entdecke die faszinierende Geschichte der Formel 1. Von den wagemutigen Pionieren der 50er Jahre bis zu den High-Tech-Wundern von heute.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/drivers" className="px-8 py-4 bg-red-600 text-white font-bold uppercase tracking-widest hover:bg-red-700 transition-colors skew-x-[-12deg]">
                <span className="inline-block skew-x-[12deg]">Fahrer entdecken</span>
              </Link>
              <Link to="/tracks" className="px-8 py-4 border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/10 transition-colors skew-x-[-12deg]">
                <span className="inline-block skew-x-[12deg]">Strecken-Evolution</span>
              </Link>
            </div>

            <div className="mt-12 relative max-w-2xl">
              <div className="relative flex items-center">
                <Search className="absolute left-4 text-gray-400" size={24} />
                <input
                  type="text"
                  placeholder="Suche nach Fahrern oder Strecken..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-zinc-900/80 border border-white/10 text-white px-12 py-4 rounded-xl focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all text-lg placeholder:text-gray-500 backdrop-blur-sm"
                />
              </div>

              {searchQuery && (searchResults.drivers.length > 0 || searchResults.tracks.length > 0) && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-xl overflow-hidden shadow-2xl z-50 max-h-96 overflow-y-auto">
                  {searchResults.drivers.length > 0 && (
                    <div className="p-4">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Fahrer</h3>
                      <div className="space-y-2">
                        {searchResults.drivers.map(driver => (
                          <Link
                            key={driver.id}
                            to={`/drivers/${driver.id}`}
                            className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <img src={driver.imageUrl} alt={driver.name} className="w-10 h-10 rounded-full object-cover" />
                            <div>
                              <div className="font-bold text-white">{driver.name}</div>
                              <div className="text-sm text-gray-400">{driver.nationality}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.tracks.length > 0 && (
                    <div className="p-4 border-t border-white/5">
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Strecken</h3>
                      <div className="space-y-2">
                        {searchResults.tracks.map(track => (
                          <Link
                            key={track.id}
                            to={`/tracks/${track.id}`}
                            className="flex items-center gap-4 p-2 hover:bg-white/5 rounded-lg transition-colors"
                          >
                            <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                              <Flag size={20} className="text-red-500" />
                            </div>
                            <div>
                              <div className="font-bold text-white">{track.name}</div>
                              <div className="text-sm text-gray-400">{track.country}</div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Weltmeister', value: '34', icon: Trophy },
            { label: 'Rennstrecken', value: '77', icon: Flag },
            { label: 'Jahrzehnte', value: '8', icon: Timer },
            { label: 'Legenden', value: '1000+', icon: Zap },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-center p-6 rounded-2xl bg-zinc-900/50 border border-white/5"
            >
              <stat.icon className="mx-auto mb-4 text-red-500" size={32} />
              <div className="text-4xl font-black text-white mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Drivers */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
              Legendäre Fahrer
            </h2>
            <div className="h-1 w-20 bg-red-600 mt-2" />
          </div>
          <Link to="/drivers" className="text-sm font-bold text-red-500 uppercase tracking-widest hover:text-red-400">
            Alle Fahrer anzeigen
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))}
        </div>
      </section>

      {/* Featured Tracks */}
      <section className="container mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter">
              Ikonische Strecken
            </h2>
            <div className="h-1 w-20 bg-red-600 mt-2" />
          </div>
          <button className="text-sm font-bold text-red-500 uppercase tracking-widest hover:text-red-400">
            Alle Strecken anzeigen
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredTracks.map((track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </section>
    </div>
  );
}
