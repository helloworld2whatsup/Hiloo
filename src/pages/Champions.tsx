import React, { useState, useMemo } from 'react';
import { Trophy, Search, ArrowUpDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { champions, Champion } from '../championsData';
import { drivers } from '../data';

type SortField = 'year' | 'driver' | 'team' | 'wins' | 'age' | 'points';
type SortOrder = 'asc' | 'desc';

const Champions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const navigate = useNavigate();

  const uniqueSuggestions = useMemo(() => {
    const items = new Set<string>();
    champions.forEach(c => {
      items.add(c.driver);
      items.add(c.team);
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
    const driverId = getDriverId(suggestion);
    if (driverId) {
      navigate(`/drivers/${driverId}`);
    } else {
      setSearchTerm(suggestion);
      setShowSuggestions(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedChampions = champions
    .filter((champion) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        champion.driver.toLowerCase().includes(searchLower) ||
        champion.team.toLowerCase().includes(searchLower) ||
        champion.year.toString().includes(searchLower)
      );
    })
    .sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === 'points') {
        // Extract the main points value (before parenthesis) for sorting
        aValue = parseFloat(a.points.split(' ')[0].replace(',', '.'));
        bValue = parseFloat(b.points.split(' ')[0].replace(',', '.'));
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown className="w-4 h-4 ml-1 text-gray-400" />;
    return <ArrowUpDown className={`w-4 h-4 ml-1 ${sortOrder === 'asc' ? 'text-red-600' : 'text-red-600 transform rotate-180'}`} />;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <Trophy className="w-10 h-10 text-red-600" />
            Weltmeister
          </h1>
          <p className="text-gray-600 mt-2">Alle Formel 1 Weltmeister von 1950 bis 2024</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Suche nach Fahrer, Team oder Jahr..."
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
                  onClick={() => handleSort('driver')}
                >
                  <div className="flex items-center">Weltmeister <SortIcon field="driver" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('team')}
                >
                  <div className="flex items-center">Team <SortIcon field="team" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('wins')}
                >
                  <div className="flex items-center">Siege <SortIcon field="wins" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('age')}
                >
                  <div className="flex items-center">Alter <SortIcon field="age" /></div>
                </th>
                <th className="p-4 font-semibold text-gray-600">
                  Ort des WM-Sieges
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('points')}
                >
                  <div className="flex items-center">WM-Punkte <SortIcon field="points" /></div>
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedChampions.map((champion, index) => {
                const driverId = getDriverId(champion.driver);
                
                return (
                  <tr 
                    key={champion.year} 
                    className={`border-b border-gray-50 hover:bg-red-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                  >
                    <td className="p-4 font-medium text-gray-900">{champion.year}</td>
                    <td className="p-4 font-semibold text-red-600">
                      {driverId ? (
                        <Link to={`/drivers/${driverId}`} className="hover:underline hover:text-red-700">
                          {champion.driver}
                        </Link>
                      ) : (
                        champion.driver
                      )}
                    </td>
                    <td className="p-4 text-gray-700">{champion.team}</td>
                    <td className="p-4 text-gray-700">{champion.wins}</td>
                    <td className="p-4 text-gray-700">{champion.age}</td>
                    <td className="p-4 text-gray-700">{champion.location}</td>
                    <td className="p-4 font-medium text-gray-900">{champion.points}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {filteredAndSortedChampions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Keine Weltmeister für diese Suche gefunden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Champions;
