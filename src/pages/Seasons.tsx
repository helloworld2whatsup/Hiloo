import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Calendar, ChevronLeft, ChevronRight, Users, Shield } from 'lucide-react';
import { drivers } from '../data';
import DriverCard from '../components/DriverCard';
import { Link } from 'react-router-dom';
import { teams } from '../teamsData';

export default function Seasons() {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState<number>(currentYear);
  const [seasonData, setSeasonData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSeasonData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`https://api.jolpi.ca/ergast/f1/${selectedYear}/driverStandings.json?limit=100`);
        const data = await res.json();
        const standings = data.MRData.StandingsTable.StandingsLists[0]?.DriverStandings || [];
        setSeasonData(standings);
      } catch (error) {
        console.error("Failed to fetch season data", error);
        setSeasonData([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSeasonData();
  }, [selectedYear]);

  // Group by constructor
  const groupedDrivers = useMemo(() => {
    const groups: Record<string, { constructorId: string, constructorName: string, drivers: any[] }> = {};
    
    // If we have API data, use it
    if (seasonData.length > 0) {
      seasonData.forEach(standing => {
        const constructor = standing.Constructors[0];
        const constructorName = constructor?.name || 'Unbekannt';
        const constructorId = constructor?.constructorId || 'unknown';
        
        if (!groups[constructorName]) {
          groups[constructorName] = {
            constructorId,
            constructorName,
            drivers: []
          };
        }
        
        // Find local driver
        const driverId = standing.Driver.driverId;
        const localDriver = drivers.find(d => d.id === driverId || d.name.toLowerCase() === `${standing.Driver.givenName} ${standing.Driver.familyName}`.toLowerCase());
        
        const driverObj = localDriver || {
          id: driverId,
          name: `${standing.Driver.givenName} ${standing.Driver.familyName}`,
          nationality: standing.Driver.nationality,
          f1Start: selectedYear,
          f1End: selectedYear,
          teams: [constructorName],
          stats: { races: 0, wins: parseInt(standing.wins) || 0, podiums: 0, poles: 0, titles: 0 },
          highlights: [],
          imageUrl: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(standing.Driver.givenName + ' ' + standing.Driver.familyName)}&backgroundColor=18181b&textColor=ffffff`
        };
        
        groups[constructorName].drivers.push(driverObj);
      });
    } else {
      // Fallback to local data if API fails or is empty
      const activeDrivers = drivers.filter(driver => {
        const start = driver.f1Start;
        const end = driver.f1End === 'aktiv' ? currentYear : (driver.f1End as number);
        return selectedYear >= start && selectedYear <= end;
      });
      
      groups['Alle Fahrer (API nicht verfügbar)'] = {
        constructorId: 'all',
        constructorName: 'Alle Fahrer',
        drivers: activeDrivers
      };
    }
    
    // Sort groups by constructor name
    return Object.values(groups).sort((a, b) => a.constructorName.localeCompare(b.constructorName));
  }, [seasonData, selectedYear, currentYear]);

  const getMatchingTeam = (constructorName: string) => {
    return teams.find(t => 
      t.name.toLowerCase() === constructorName.toLowerCase() || 
      t.name.toLowerCase().includes(constructorName.toLowerCase()) ||
      constructorName.toLowerCase().includes(t.name.toLowerCase())
    );
  };

  const handlePrevYear = () => {
    if (selectedYear > 1950) setSelectedYear(prev => prev - 1);
  };

  const handleNextYear = () => {
    if (selectedYear < currentYear) setSelectedYear(prev => prev + 1);
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative py-20 bg-zinc-950 border-b border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532906619149-163e5270c29c?q=80&w=2000')] bg-cover bg-center opacity-20 mix-blend-luminosity" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 text-red-500 border border-red-500/20 mb-6">
              <Calendar size={16} />
              <span className="text-sm font-bold uppercase tracking-widest">Saisons & Startaufstellung</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black italic uppercase text-white tracking-tighter leading-none mb-6">
              Die Grid <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-800">
                Historie
              </span>
            </h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Entdecke die Startaufstellungen aller Formel-1-Saisons seit 1950. Wähle ein Jahr und sieh dir an, welche Legenden in dieser Saison auf der Strecke waren.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12">
        {/* Year Selector */}
        <div className="bg-zinc-900/50 border border-white/10 rounded-2xl p-6 mb-12">
          <div className="flex flex-col items-center gap-8">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handlePrevYear}
                disabled={selectedYear <= 1950}
                className="p-3 rounded-full bg-zinc-800 hover:bg-red-600 text-white disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              
              <div className="text-center w-48">
                <div className="text-sm text-red-500 font-bold uppercase tracking-widest mb-1">Saison</div>
                <div className="text-5xl font-black italic text-white">{selectedYear}</div>
              </div>

              <button 
                onClick={handleNextYear}
                disabled={selectedYear >= currentYear}
                className="p-3 rounded-full bg-zinc-800 hover:bg-red-600 text-white disabled:opacity-50 disabled:hover:bg-zinc-800 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            {/* Quick Year Jump */}
            <div className="w-full overflow-x-auto pb-2 scrollbar-hide">
              <div className="flex gap-2 min-w-max px-2">
                {Array.from({ length: currentYear - 1950 + 1 }, (_, i) => currentYear - i).map(year => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`px-4 py-2 rounded-full text-sm font-bold transition-colors ${
                      selectedYear === year
                        ? 'bg-red-600 text-white'
                        : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Grid Display */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-black italic uppercase text-white flex items-center">
            <Users className="mr-3 text-red-500" size={28} />
            Startaufstellung {selectedYear}
          </h2>
          <div className="text-gray-400 font-medium">
            {groupedDrivers.reduce((acc, group) => acc + group.drivers.length, 0)} Fahrer
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-600"></div>
          </div>
        ) : groupedDrivers.length > 0 && groupedDrivers[0].drivers.length > 0 ? (
          <div className="space-y-12">
            {groupedDrivers.map((group) => {
              const matchingTeam = getMatchingTeam(group.constructorName);
              
              return (
                <div key={group.constructorName} className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-4">
                      {matchingTeam ? (
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center p-2">
                          <img 
                            src={matchingTeam.imageUrl} 
                            alt={matchingTeam.name} 
                            className="max-w-full max-h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(matchingTeam.name)}&backgroundColor=${matchingTeam.color.replace('#', '')}&textColor=ffffff`;
                            }}
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-zinc-800 flex items-center justify-center text-gray-500">
                          <Shield size={24} />
                        </div>
                      )}
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          {matchingTeam ? (
                            <Link to={`/teams/${matchingTeam.id}`} className="hover:text-red-500 transition-colors">
                              {group.constructorName}
                            </Link>
                          ) : (
                            group.constructorName
                          )}
                        </h3>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6"
                  >
                    {group.drivers.map(driver => (
                      <DriverCard key={driver.id} driver={driver} />
                    ))}
                  </motion.div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-zinc-900/30 rounded-2xl border border-white/5">
            <Users size={48} className="mx-auto text-zinc-700 mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Keine Fahrer gefunden</h3>
            <p className="text-gray-500">
              Für die Saison {selectedYear} haben wir aktuell keine Fahrer in unserem Archiv.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
