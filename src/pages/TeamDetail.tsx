import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowLeft, Trophy, Flag, Calendar, MapPin, User } from 'lucide-react';
import { teams } from '../teamsData';
import { drivers } from '../data';

export default function TeamDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const team = teams.find(t => t.id === id);

  if (!team) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white">Team nicht gefunden</h2>
        <Link to="/teams" className="text-red-500 mt-4 inline-block">Zurück zur Übersicht</Link>
      </div>
    );
  }

  // Find drivers in our database that drove for this team
  const teamDrivers = drivers.filter(d => 
    d.teams.some(t => t.toLowerCase().includes(team.name.toLowerCase()) || team.name.toLowerCase().includes(t.toLowerCase()))
  );

  return (
    <div className="pb-20">
      {/* Header / Hero */}
      <div className="relative h-[50vh] overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{ backgroundColor: team.color }}
        />
        <img
          src={team.imageUrl}
          alt={team.name}
          className="w-full h-full object-cover opacity-40 blur-sm mix-blend-overlay"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        <div className="absolute top-6 left-4 md:left-8 z-20">
          <button 
            onClick={() => navigate(-1)} 
            className="flex items-center text-white/80 hover:text-white transition-all bg-black/40 hover:bg-black/60 backdrop-blur-md px-4 py-2 rounded-full cursor-pointer"
          >
            <ArrowLeft size={20} className="mr-2" /> Zurück
          </button>
        </div>
        
        <div className="absolute inset-0 flex items-end">
          <div className="container mx-auto px-4 pb-12">
            <div className="flex flex-col md:flex-row md:items-end gap-8">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-48 h-32 md:w-64 md:h-40 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl bg-zinc-900 flex items-center justify-center p-4"
              >
                <img 
                  src={team.imageUrl} 
                  alt={team.name} 
                  className="max-w-full max-h-full object-contain" 
                  referrerPolicy="no-referrer" 
                  onError={(e) => {
                    e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(team.name)}&backgroundColor=${team.color.replace('#', '')}&textColor=ffffff`;
                  }}
                />
              </motion.div>
              
              <div className="flex-1">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic mb-2"
                >
                  {team.name}
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-xl text-gray-300 font-medium"
                >
                  {team.fullName}
                </motion.p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-12">
            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-1 bg-red-600 mr-4"></div>
                Über das Team
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed">
                {team.description}
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <div className="w-8 h-1 bg-red-600 mr-4"></div>
                Bekannte Fahrer
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {teamDrivers.length > 0 ? (
                  teamDrivers.map(driver => (
                    <Link 
                      key={driver.id} 
                      to={`/drivers/${driver.id}`}
                      className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:bg-zinc-800 transition-colors group"
                    >
                      <img 
                        src={driver.imageUrl} 
                        alt={driver.name} 
                        className="w-12 h-12 rounded-full object-cover border-2 border-transparent group-hover:border-red-600 transition-colors"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-white font-medium group-hover:text-red-500 transition-colors">{driver.name}</span>
                    </Link>
                  ))
                ) : (
                  team.drivers.map((driverName, idx) => (
                    <div key={idx} className="bg-zinc-900 border border-white/5 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center text-gray-500">
                        <User size={20} />
                      </div>
                      <span className="text-white font-medium">{driverName}</span>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Team Info</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0" style={{ color: team.color }}>
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Basis</p>
                    <p className="text-white font-medium">{team.base}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0" style={{ color: team.color }}>
                    <User size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Teamchef</p>
                    <p className="text-white font-medium">{team.teamPrincipal}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0" style={{ color: team.color }}>
                    <Calendar size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Gegründet</p>
                    <p className="text-white font-medium">{team.founded}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center flex-shrink-0" style={{ color: team.color }}>
                    <Flag size={20} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">F1 Zeitraum</p>
                    <p className="text-white font-medium">
                      {team.f1End === 'aktiv' ? `Seit ${team.f1Start}` : `${team.f1Start} - ${team.f1End}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-white/5 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white mb-6">Statistiken</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/50 rounded-xl p-4 text-center border border-white/5">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-3xl font-black text-white mb-1">{team.championships}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">WM-Titel</div>
                </div>
                
                <div className="bg-black/50 rounded-xl p-4 text-center border border-white/5">
                  <Flag className="w-8 h-8 mx-auto mb-2" style={{ color: team.color }} />
                  <div className="text-3xl font-black text-white mb-1">{team.wins}</div>
                  <div className="text-xs text-gray-500 uppercase tracking-wider">Siege</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
