import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Trophy, Calendar, MapPin, ArrowLeft, Star, Activity, Globe } from 'lucide-react';
import { drivers, tracks } from '../data';
import { teams } from '../teamsData';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useState, useEffect } from 'react';

export default function DriverDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const driver = drivers.find(d => d.id === id);
  
  const [drivenCircuits, setDrivenCircuits] = useState<any[]>([]);
  const [isLoadingCircuits, setIsLoadingCircuits] = useState(true);

  useEffect(() => {
    if (!driver) return;
    
    const fetchCircuits = async () => {
      try {
        setIsLoadingCircuits(true);
        // Try to fetch circuits for this driver from Ergast API
        // We use the driver's last name or ID as a best-effort match
        const searchId = driver.id.split('_').pop() || driver.id;
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/drivers/${searchId}/circuits.json?limit=100`);
        
        if (!res.ok) {
          throw new Error(`API error: ${res.status} ${res.statusText}`);
        }
        
        const data = await res.json();
        
        if (!data || !data.MRData || !data.MRData.CircuitTable || !Array.isArray(data.MRData.CircuitTable.Circuits)) {
          throw new Error("Invalid data format received from API");
        }
        
        setDrivenCircuits(data.MRData.CircuitTable.Circuits);
      } catch (error) {
        console.error("Failed to fetch circuits:", error);
        setDrivenCircuits([]); // Fallback to empty array on error
      } finally {
        setIsLoadingCircuits(false);
      }
    };

    fetchCircuits();
  }, [driver]);

  if (!driver) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl text-white">Fahrer nicht gefunden</h2>
        <Link to="/drivers" className="text-red-500 mt-4 inline-block">Zurück zur Übersicht</Link>
      </div>
    );
  }

  const statsData = [
    { name: 'Siege', value: driver.stats.wins, color: '#ef4444' },
    { name: 'Podien', value: driver.stats.podiums, color: '#f97316' },
    { name: 'Poles', value: driver.stats.poles, color: '#3b82f6' },
    { name: 'Titel', value: driver.stats.titles, color: '#eab308' },
  ];

  const getMatchingTrack = (teamString: string) => {
    // Extract team name (e.g. "Ferrari" from "Ferrari (1952–1955)")
    const teamName = teamString.split(' (')[0].trim();
    // Find a track that matches the team name (exact or contained)
    return tracks.find(t => 
      t.name.toLowerCase() === teamName.toLowerCase() || 
      t.name.toLowerCase().includes(teamName.toLowerCase())
    );
  };

  const getMatchingTeam = (teamName: string) => {
    return teams.find(t => 
      t.name.toLowerCase() === teamName.toLowerCase() || 
      t.name.toLowerCase().includes(teamName.toLowerCase()) ||
      teamName.toLowerCase().includes(t.name.toLowerCase())
    );
  };

  const getTeamDomain = (teamName: string) => {
    const name = teamName.toLowerCase().trim();
    if (name.includes('red bull')) return 'redbullracing.com';
    if (name.includes('mercedes')) return 'mercedesamgf1.com';
    if (name.includes('williams')) return 'williamsf1.com';
    if (name.includes('lotus')) return 'lotuscars.com';
    if (name.includes('aston martin')) return 'astonmartinf1.com';
    if (name.includes('alpine')) return 'alpinecars.com';
    if (name.includes('haas')) return 'haasf1team.com';
    if (name.includes('sauber')) return 'sauber-group.com';
    if (name.includes('mclaren')) return 'mclaren.com';
    if (name.includes('ferrari')) return 'ferrari.com';
    if (name.includes('alfa romeo')) return 'alfaromeo.com';
    if (name.includes('renault')) return 'renault.com';
    if (name.includes('honda')) return 'honda.com';
    if (name.includes('toyota')) return 'toyota.com';
    if (name.includes('bmw')) return 'bmw.com';
    
    // Default fallback
    return `${name.replace(/[^a-z0-9]/g, '')}.com`;
  };

  // Calculate how many tracks from our database the driver has driven on
  // We match by country or partial name since Ergast names differ slightly
  const matchedTracksCount = tracks.filter(t => {
    return drivenCircuits.some(c => 
      c.circuitName.toLowerCase().includes(t.name.toLowerCase()) ||
      t.name.toLowerCase().includes(c.circuitName.toLowerCase()) ||
      c.Location.country.toLowerCase() === t.country.toLowerCase()
    );
  }).length;

  const totalTracks = tracks.length;
  const hasDrivenOnAll = matchedTracksCount >= totalTracks;

  return (
    <div className="pb-20">
      {/* Header / Hero */}
      <div className="relative h-[60vh] overflow-hidden">
        <img
          src={driver.imageUrl}
          alt={driver.name}
          className="w-full h-full object-cover opacity-30 blur-sm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
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
                className="w-48 h-64 md:w-64 md:h-80 rounded-xl overflow-hidden border-4 border-white/10 shadow-2xl bg-zinc-900 flex items-center justify-center"
              >
                <img src={driver.imageUrl} alt={driver.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </motion.div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <span className="px-3 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-widest italic">
                    {driver.nationality}
                  </span>
                  {driver.stats.titles > 0 && (
                    <span className="flex items-center text-yellow-500 font-bold text-sm">
                      <Trophy size={16} className="mr-1" /> {driver.stats.titles}x Weltmeister
                    </span>
                  )}
                </div>
                <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none">
                  {driver.name}
                </h1>
                <div className="mt-4 flex flex-wrap gap-6 text-gray-400 font-medium">
                  <div className="flex items-center">
                    <Calendar size={18} className="mr-2 text-red-500" />
                    {driver.f1Start} – {driver.f1End}
                  </div>
                  <div className="flex items-center">
                    <Activity size={18} className="mr-2 text-red-500" />
                    {driver.stats.races} Rennen
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-16">
            <section>
              <h2 className="text-2xl font-black italic uppercase text-white mb-6 flex items-center">
                <Star className="mr-3 text-red-500" size={24} /> Karriere-Highlights
              </h2>
              <div className="grid gap-4">
                {driver.highlights.map((highlight, i) => (
                  <div key={i} className="p-4 rounded-xl bg-zinc-900 border border-white/5 flex items-start">
                    <div className="h-2 w-2 rounded-full bg-red-500 mt-2 mr-4 shrink-0" />
                    <p className="text-gray-300 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black italic uppercase text-white mb-8 flex items-center">
                <Calendar className="mr-3 text-red-500" size={24} /> Karriere-Timeline
              </h2>
              <div className="relative pl-8 space-y-12 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-zinc-800">
                {driver.teams.map((teamStr, i) => {
                  const [teamName, yearsRaw] = teamStr.split(' (');
                  const years = yearsRaw ? yearsRaw.replace(')', '') : '';
                  const matchingTrack = getMatchingTrack(teamStr);
                  const matchingTeam = getMatchingTeam(teamName);

                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="relative group"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[-29px] top-1.5 h-4 w-4 rounded-full bg-zinc-950 border-2 border-red-600 z-10 group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(220,38,38,0.5)]" />
                      
                      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 hover:bg-zinc-900 transition-colors group-hover:border-red-500/30">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-zinc-800 border border-white/10 flex items-center justify-center overflow-hidden shrink-0 p-1">
                              <img 
                                src={`https://logo.clearbit.com/${getTeamDomain(teamName)}`}
                                onError={(e) => {
                                  e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(teamName.trim())}&backgroundColor=18181b&textColor=ef4444`;
                                  e.currentTarget.className = "w-full h-full object-cover rounded-md";
                                }}
                                alt={`${teamName} Logo`}
                                className="w-full h-full object-contain"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <span className="text-xs font-black text-red-500 uppercase tracking-[0.2em] mb-1 block">
                                {years}
                              </span>
                              {matchingTeam ? (
                                <Link to={`/teams/${matchingTeam.id}`} className="text-xl font-bold text-white hover:text-red-500 transition-colors">
                                  {teamName}
                                </Link>
                              ) : (
                                <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                                  {teamName}
                                </h3>
                              )}
                            </div>
                          </div>
                          
                          {matchingTrack && (
                            <Link
                              to={`/tracks/${matchingTrack.id}`}
                              className="inline-flex items-center space-x-2 px-4 py-2 bg-white/5 hover:bg-red-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest transition-all group/btn"
                            >
                              <MapPin size={12} className="text-red-500 group-hover/btn:text-white" />
                              <span>Heimstrecke: {matchingTrack.name}</span>
                            </Link>
                          )}
                        </div>
                        
                        <p className="mt-4 text-sm text-gray-500 italic">
                          Station {i + 1} der Formel-1-Karriere
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-black italic uppercase text-white mb-6">Statistiken</h2>
              <div className="h-[300px] w-full bg-zinc-900/50 p-6 rounded-2xl border border-white/5">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                    <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {statsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-red-600/20 to-transparent border border-red-500/20">
              <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-widest">Biografie</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Geboren am {new Date(driver.birthDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}.
                {driver.deathDate && ` Verstorben am ${new Date(driver.deathDate).toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })}.`}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-zinc-900 border border-white/5">
              <h3 className="text-lg font-bold text-white mb-4 uppercase tracking-widest flex items-center">
                <Globe className="mr-2 text-red-500" size={20} /> Strecken-Erfahrung
              </h3>
              
              {isLoadingCircuits ? (
                <div className="animate-pulse flex space-x-4">
                  <div className="flex-1 space-y-4 py-1">
                    <div className="h-2 bg-zinc-700 rounded w-3/4"></div>
                    <div className="h-2 bg-zinc-700 rounded w-1/2"></div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-3xl font-black text-white">{drivenCircuits.length > 0 ? matchedTracksCount : 0}</span>
                    <span className="text-sm text-gray-500 mb-1">von {totalTracks} Strecken</span>
                  </div>
                  
                  <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-4">
                    <div 
                      className="bg-red-600 h-2.5 rounded-full" 
                      style={{ width: `${Math.min(100, ((drivenCircuits.length > 0 ? matchedTracksCount : 0) / totalTracks) * 100)}%` }}
                    ></div>
                  </div>
                  
                  {drivenCircuits.length === 0 ? (
                    <p className="text-xs text-gray-500 italic">Keine Streckendaten für diesen Fahrer gefunden.</p>
                  ) : hasDrivenOnAll ? (
                    <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-widest">
                      Auf allen Strecken gefahren!
                    </div>
                  ) : (
                    <p className="text-xs text-gray-400 leading-relaxed">
                      Dieser Fahrer ist auf {matchedTracksCount} der {totalTracks} Strecken aus unserer Datenbank gefahren.
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
