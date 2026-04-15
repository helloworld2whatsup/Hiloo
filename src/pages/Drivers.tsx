import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Filter, History, X, ChevronDown, RotateCcw } from 'lucide-react';
import { drivers } from '../data';
import DriverCard from '../components/DriverCard';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { cn } from '../lib/utils';

export default function Drivers() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [statusFilter, setStatusFilter] = React.useState<'all' | 'active' | 'former'>('all');
  const [championFilter, setChampionFilter] = React.useState<'all' | 'champions'>('all');
  const [nationalityFilter, setNationalityFilter] = React.useState('all');
  const [seasonFilter, setSeasonFilter] = React.useState('all');
  const [teamFilter, setTeamFilter] = React.useState('all');
  const [showFilters, setShowFilters] = React.useState(false);
  const [showHistory, setShowHistory] = React.useState(false);
  const { history, addToHistory, removeFromHistory, clearHistory } = useSearchHistory('driver-search-history');

  const seasons = React.useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let y = currentYear; y >= 1950; y--) {
      years.push(y.toString());
    }
    return ['all', ...years];
  }, []);

  const nationalities = React.useMemo(() => {
    const all = drivers.map(d => d.nationality);
    return ['all', ...Array.from(new Set(all))].sort();
  }, []);

  const teams = React.useMemo(() => {
    const teamsSet = new Set<string>();
    drivers.forEach(driver => {
      driver.teams.forEach(team => {
        const cleanTeam = team.replace(/\s*\([^)]*\)/g, '').trim();
        teamsSet.add(cleanTeam);
      });
    });
    return ['all', ...Array.from(teamsSet)].sort();
  }, []);

  const filteredDrivers = drivers.filter(driver => {
    const matchesSearch = driver.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         driver.nationality.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' 
      ? true 
      : statusFilter === 'active' 
        ? driver.f1End === 'aktiv' 
        : driver.f1End !== 'aktiv';

    const matchesChampion = championFilter === 'all' 
      ? true 
      : driver.stats.titles > 0;

    const matchesNationality = nationalityFilter === 'all' 
      ? true 
      : driver.nationality === nationalityFilter;

    const matchesSeason = seasonFilter === 'all'
      ? true
      : (() => {
          const year = parseInt(seasonFilter);
          const start = driver.f1Start;
          const end = driver.f1End === 'aktiv' ? new Date().getFullYear() : (driver.f1End as number);
          return year >= start && year <= end;
        })();

    const matchesTeam = teamFilter === 'all'
      ? true
      : driver.teams.some(team => team.replace(/\s*\([^)]*\)/g, '').trim() === teamFilter);

    return matchesSearch && matchesStatus && matchesChampion && matchesNationality && matchesSeason && matchesTeam;
  });

  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setChampionFilter('all');
    setNationalityFilter('all');
    setSeasonFilter('all');
    setTeamFilter('all');
  };

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

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
        <div>
          <h1 className="text-5xl font-black italic uppercase text-white tracking-tighter">
            F1 Fahrer <span className="text-red-600">Archiv</span>
          </h1>
          <p className="text-gray-400 mt-2 max-w-md">
            Durchsuche die Profile der größten Legenden und aktuellen Stars der Königsklasse.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-start sm:items-center">
          <div className="relative flex-1 sm:w-64">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Fahrer suchen..."
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
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-widest transition-all border ${
              showFilters 
                ? 'bg-red-600 border-red-600 text-white' 
                : 'bg-zinc-900 border-white/10 text-gray-400 hover:border-white/20'
            }`}
          >
            <Filter size={14} />
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
            <div className="bg-zinc-900/50 border border-white/10 rounded-xl p-6 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {/* Status Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Status</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Alle' },
                    { id: 'active', label: 'Aktiv' },
                    { id: 'former', label: 'Ehemalig' }
                  ].map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setStatusFilter(s.id as any)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                        statusFilter === s.id 
                          ? 'bg-white text-black' 
                          : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Champion Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Weltmeister</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'Alle' },
                    { id: 'champions', label: 'Nur Weltmeister' }
                  ].map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setChampionFilter(c.id as any)}
                      className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest transition-all ${
                        championFilter === c.id 
                          ? 'bg-white text-black' 
                          : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Nationality Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Nationalität</label>
                <select
                  value={nationalityFilter}
                  onChange={(e) => setNationalityFilter(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/5 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-red-500"
                >
                  {nationalities.map((n) => (
                    <option key={n} value={n}>
                      {n === 'all' ? 'Alle Nationalitäten' : n}
                    </option>
                  ))}
                </select>
              </div>

              {/* Season Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Saison</label>
                <select
                  value={seasonFilter}
                  onChange={(e) => setSeasonFilter(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/5 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-red-500"
                >
                  {seasons.map((s) => (
                    <option key={s} value={s}>
                      {s === 'all' ? 'Alle Saisons' : s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Team Filter */}
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3">Team</label>
                <select
                  value={teamFilter}
                  onChange={(e) => setTeamFilter(e.target.value)}
                  className="w-full bg-zinc-800 border border-white/5 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-red-500"
                >
                  {teams.map((t) => (
                    <option key={t} value={t}>
                      {t === 'all' ? 'Alle Teams' : t}
                    </option>
                  ))}
                </select>
              </div>

              {/* Reset */}
              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition-colors"
                >
                  <RotateCcw size={12} />
                  <span>Filter zurücksetzen</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div 
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        {filteredDrivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </motion.div>

      {filteredDrivers.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg italic">Keine Fahrer gefunden, die deiner Suche entsprechen.</p>
        </div>
      )}
    </div>
  );
}
