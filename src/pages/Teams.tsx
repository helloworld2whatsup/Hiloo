import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Search, Users } from 'lucide-react';
import { teams } from '../teamsData';

export default function Teams() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTeams = teams.filter(team =>
    team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    team.fullName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Users className="w-10 h-10 text-red-600" />
            Formel 1 Teams
          </h1>
          <p className="text-gray-400 mt-2">Die legendärsten Konstrukteure der Formel-1-Geschichte</p>
        </div>

        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Suche nach Teams..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-zinc-900 text-white border border-white/10 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team, index) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02 }}
            className="group overflow-hidden rounded-xl bg-zinc-950 border border-white/5 flex flex-col"
          >
            <Link to={`/teams/${team.id}`} className="flex-1 flex flex-col">
              <div className="h-48 overflow-hidden relative bg-zinc-900 flex items-center justify-center p-4">
                <img
                  src={team.imageUrl}
                  alt={team.name}
                  className="max-h-full max-w-full object-contain saturate-75 group-hover:scale-110 group-hover:saturate-100 transition-all duration-500"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(team.name)}&backgroundColor=${team.color.replace('#', '')}&textColor=ffffff`;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-80" />
                <div 
                  className="absolute bottom-0 left-0 w-full h-1" 
                  style={{ backgroundColor: team.color }}
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-bold text-white mb-1">{team.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{team.fullName}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <span className="text-gray-500 block">Gegründet</span>
                    <span className="text-white font-medium">{team.founded}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Status</span>
                    <span className="text-white font-medium">
                      {team.f1End === 'aktiv' ? 'Aktiv' : `${team.f1Start} - ${team.f1End}`}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">WM-Titel</span>
                    <span className="text-white font-medium">{team.championships}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block">Siege</span>
                    <span className="text-white font-medium">{team.wins}</span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {filteredTeams.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          Keine Teams für diese Suche gefunden.
        </div>
      )}
    </div>
  );
}
