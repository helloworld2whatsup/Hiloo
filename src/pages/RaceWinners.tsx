import React, { useState, useMemo } from 'react';
import { Flag, Search, ArrowUpDown, Filter } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { raceWinners, RaceWinner } from '../raceWinnersData';
import { drivers } from '../data';

type SortField = 'year' | 'grandPrix' | 'driver' | 'constructor';
type SortOrder = 'asc' | 'desc';

const RaceWinners = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const years = Array.from(new Set(raceWinners.map(w => w.year))).sort((a, b) => b - a);

  const uniqueSuggestions = useMemo(() => {
    const items = new Set<string>();
    raceWinners.forEach(w => {
      items.add(w.driver);
      items.add(w.constructor);
      items.add(w.grandPrix);
    });
    return Array.from(items).sort();
  }, []);

  const suggestions = useMemo(() => {
    if (!searchTerm.trim()) return [];
    const lowerTerm = searchTerm.toLowerCase();
    return uniqueSuggestions.filter(item => item.toLowerCase().includes(lowerTerm)).slice(0, 8);
  }, [searchTerm, uniqueSuggestions]);

  const getDriverId = (driverName: string) => {
    const found = drivers.find(d => d.name.toLowerCase() === driverName.toLowerCase());
    return found ? found.id : null;
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchTerm(suggestion);
    setShowSuggestions(false);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedWinners = raceWinners
    .filter((winner) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = (
        winner.driver.toLowerCase().includes(searchLower) ||
        winner.constructor.toLowerCase().includes(searchLower) ||
        winner.grandPrix.toLowerCase().includes(searchLower) ||
        winner.year.toString().includes(searchLower)
      );
      const matchesYear = selectedYear === 'all' || winner.year.toString() === selectedYear;
      return matchesSearch && matchesYear;
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    return <ArrowUpDown className={`w-4 h-4 ml-1 ${sortOrder === 'asc' ? 'text-red-600' : 'text-red-600 transform rotate-180'}`} />;
  };

  let currentYear: number | null = null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Flag className="w-10 h-10 text-red-600" />
            Rennsieger
          </h1>
          <p className="text-gray-600 mt-2">Die Formel-1-Sieger für jedes Rennen (Auszug 2020-2024)</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Suche nach Fahrer, Grand Prix..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all shadow-sm"
            />
            
            <AnimatePresence>
              {showSuggestions && suggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden"
                >
                  <ul className="py-2">
                    {suggestions.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                        >
                          {suggestion}
                        </button>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all shadow-sm appearance-none cursor-pointer"
            >
              <option value="all">Alle Jahre</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('year')}
                >
                  <div className="flex items-center">Jahr <SortIcon field="year" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('grandPrix')}
                >
                  <div className="flex items-center">Grand Prix <SortIcon field="grandPrix" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('driver')}
                >
                  <div className="flex items-center">Sieger <SortIcon field="driver" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('constructor')}
                >
                  <div className="flex items-center">Konstrukteur <SortIcon field="constructor" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedWinners.map((winner, index) => {
                const showYearHeader = sortField === 'year' && winner.year !== currentYear;
                if (showYearHeader) {
                  currentYear = winner.year;
                }
                
                const driverId = getDriverId(winner.driver);

                return (
                  <React.Fragment key={`${winner.year}-${winner.grandPrix}-${index}`}>
                    {showYearHeader && (
                      <tr className="bg-gray-100 border-b border-gray-200">
                        <td colSpan={4} className="p-4 font-black text-xl text-gray-900 uppercase tracking-wider">
                          Saison {winner.year}
                        </td>
                      </tr>
                    )}
                    <tr 
                      className={`border-b border-gray-50 hover:bg-red-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                    >
                      <td className="p-4 font-medium text-gray-900">{winner.year}</td>
                      <td className="p-4 font-semibold text-gray-900">{winner.grandPrix}</td>
                      <td className="p-4 font-semibold text-red-600">
                        {driverId ? (
                          <Link to={`/drivers/${driverId}`} className="hover:underline hover:text-red-700">
                            {winner.driver}
                          </Link>
                        ) : (
                          winner.driver
                        )}
                      </td>
                      <td className="p-4 text-gray-700">{winner.constructor}</td>
                    </tr>
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
          {filteredAndSortedWinners.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Keine Rennsieger für diese Suche gefunden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RaceWinners;
