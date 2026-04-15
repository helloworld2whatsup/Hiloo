import React, { useState } from 'react';
import { Trophy, Search, ArrowUpDown } from 'lucide-react';
import { constructorChampions, ConstructorChampion } from '../constructorsData';

type SortField = 'year' | 'constructor' | 'engine' | 'wins' | 'points';
type SortOrder = 'asc' | 'desc';

const Constructors = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<SortField>('year');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const filteredAndSortedChampions = constructorChampions
    .filter((champion) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        champion.constructor.toLowerCase().includes(searchLower) ||
        champion.engine.toLowerCase().includes(searchLower) ||
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
            Konstrukteurs-Weltmeister
          </h1>
          <p className="text-gray-600 mt-2">Alle Formel 1 Konstrukteurs-Weltmeister seit 1958</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Suche nach Konstrukteur, Motor oder Jahr..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white text-gray-900 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all shadow-sm"
          />
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
                  onClick={() => handleSort('constructor')}
                >
                  <div className="flex items-center">Konstrukteur <SortIcon field="constructor" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('engine')}
                >
                  <div className="flex items-center">Motor <SortIcon field="engine" /></div>
                </th>
                <th 
                  className="p-4 font-semibold text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleSort('wins')}
                >
                  <div className="flex items-center">Siege <SortIcon field="wins" /></div>
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
              {filteredAndSortedChampions.map((champion, index) => (
                <tr 
                  key={champion.year} 
                  className={`border-b border-gray-50 hover:bg-red-50/50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'}`}
                >
                  <td className="p-4 font-medium text-gray-900">{champion.year}</td>
                  <td className="p-4 font-semibold text-red-600">{champion.constructor}</td>
                  <td className="p-4 text-gray-700">{champion.engine}</td>
                  <td className="p-4 text-gray-700">{champion.wins}</td>
                  <td className="p-4 font-medium text-gray-900">{champion.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredAndSortedChampions.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              Keine Konstrukteure für diese Suche gefunden.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Constructors;
