import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, MapPin, History, X, Filter, ChevronDown } from 'lucide-react';
import { tracks } from '../data';
import TrackCard from '../components/TrackCard';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { cn } from '../lib/utils';

export default function Tracks() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [showHistory, setShowHistory] = React.useState(false);
  const [activeFilter, setActiveFilter] = React.useState<'all' | 'active' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = React.useState<'all' | 'Permanent' | 'Street' | 'Hybrid'>('all');
  const [countryFilter, setCountryFilter] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);

  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory('track-search-history');

  const countries = React.useMemo(() => {
    const uniqueCountries = Array.from(new Set(tracks.map(t => t.country))).sort();
    return ['all', ...uniqueCountries];
  }, []);

  const filteredTracks = tracks.filter(track => {
    const matchesSearch = track.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         track.country.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesActive = activeFilter === 'all' || 
                         (activeFilter === 'active' ? track.active : !track.active);
    const matchesType = typeFilter === 'all' || track.type === typeFilter;
    const matchesCountry = countryFilter === 'all' || track.country === countryFilter;

    return matchesSearch && matchesActive && matchesType && matchesCountry;
  });

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      addToHistory(searchTerm.trim());
      setShowHistory(false);
    }
  };

  const handleHistoryClick = (term: string) => {
    setSearchTerm(term);
    setShowHistory(false);
  };

  const resetFilters = () => {
    setActiveFilter('all');
    setTypeFilter('all');
    setCountryFilter('all');
    setSearchTerm('');
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">
            F1 Strecken <span className="text-red-600">Evolution</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-md font-medium">
            Entdecke die legendärsten Kurse der Welt und wie sie sich über die Jahrzehnte verändert haben.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full lg:w-auto">
          <div className="relative flex-1 md:w-80">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Strecke suchen..."
                className="w-full bg-zinc-900 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-red-500 transition-colors"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowHistory(true)}
                onBlur={() => setTimeout(() => setShowHistory(false), 200)}
              />
            </form>

            <AnimatePresence>
              {showHistory && history.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden"
                >
                  <div className="p-2 border-b border-white/5 flex justify-between items-center bg-zinc-950/50">
                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 flex items-center">
                      <History size={10} className="mr-1" /> Letzte Suchen
                    </span>
                    <button 
                      onClick={clearHistory}
                      className="text-[10px] font-bold uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                    >
                      Löschen
                    </button>
                  </div>
                  <ul>
                    {history.map((term, index) => (
                      <li key={index} className="flex items-center justify-between hover:bg-white/5 transition-colors group">
                        <button
                          onClick={() => handleHistoryClick(term)}
                          className="flex-1 text-left px-4 py-2 text-sm text-gray-300 hover:text-white"
                        >
                          {term}
                        </button>
                        <button
                          onClick={() => removeFromHistory(term)}
                          className="p-2 text-gray-600 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                        >
                          <X size={14} />
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={cn(
              "flex items-center justify-center space-x-2 px-6 py-3 rounded-lg border transition-all font-bold uppercase tracking-widest text-xs",
              showFilters || activeFilter !== 'all' || typeFilter !== 'all' || countryFilter !== 'all'
                ? "bg-red-600 border-red-600 text-white"
                : "bg-zinc-900 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
            )}
          >
            <Filter size={16} />
            <span>Filter</span>
            <ChevronDown size={14} className={cn("transition-transform", showFilters && "rotate-180")} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-12"
          >
            <div className="p-6 bg-zinc-900/50 border border-white/5 rounded-2xl grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Country Filter */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Land</label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full bg-zinc-950 border border-white/10 rounded-lg py-2.5 px-4 text-sm text-white focus:outline-none focus:border-red-500 transition-colors appearance-none cursor-pointer"
                >
                  <option value="all">Alle Länder</option>
                  {countries.filter(c => c !== 'all').map(country => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Status</label>
                <div className="flex bg-zinc-950 p-1 rounded-lg border border-white/10">
                  {(['all', 'active', 'inactive'] as const).map((status) => (
                    <button
                      key={status}
                      onClick={() => setActiveFilter(status)}
                      className={cn(
                        "flex-1 py-1.5 px-3 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                        activeFilter === status ? "bg-red-600 text-white" : "text-gray-500 hover:text-gray-300"
                      )}
                    >
                      {status === 'all' ? 'Alle' : status === 'active' ? 'Aktiv' : 'Historisch'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Streckentyp</label>
                <div className="flex bg-zinc-950 p-1 rounded-lg border border-white/10">
                  {(['all', 'Permanent', 'Street', 'Hybrid'] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setTypeFilter(type)}
                      className={cn(
                        "flex-1 py-1.5 px-3 rounded-md text-[10px] font-black uppercase tracking-widest transition-all",
                        typeFilter === type ? "bg-red-600 text-white" : "text-gray-500 hover:text-gray-300"
                      )}
                    >
                      {type === 'all' ? 'Alle' : type === 'Permanent' ? 'Permanent' : type === 'Street' ? 'Stadt' : 'Hybrid'}
                    </button>
                  ))}
                </div>
              </div>

              <div className="md:col-span-3 flex justify-end pt-4 border-t border-white/5">
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-black uppercase tracking-widest text-gray-500 hover:text-red-500 transition-colors flex items-center"
                >
                  <X size={12} className="mr-1" /> Filter zurücksetzen
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTracks.map((track) => (
          <TrackCard key={track.id} track={track} />
        ))}
      </div>

      {filteredTracks.length === 0 && (
        <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-white/5">
          <p className="text-gray-500 text-lg italic">Keine Strecken gefunden, die den Filtern entsprechen.</p>
          <button 
            onClick={resetFilters}
            className="mt-4 text-red-500 font-bold uppercase tracking-widest text-xs hover:underline"
          >
            Alle Filter löschen
          </button>
        </div>
      )}
    </div>
  );
}
