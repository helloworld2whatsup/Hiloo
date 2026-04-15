import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Drivers from './pages/Drivers';
import DriverDetail from './pages/DriverDetail';
import Tracks from './pages/Tracks';
import TrackDetail from './pages/TrackDetail';
import Eras from './pages/Eras';
import Map from './pages/Map';
import Seasons from './pages/Seasons';
import Cars from './pages/Cars';
import CarDetail from './pages/CarDetail';
import Champions from './pages/Champions';
import Constructors from './pages/Constructors';
import RaceWinners from './pages/RaceWinners';
import Teams from './pages/Teams';
import TeamDetail from './pages/TeamDetail';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/drivers" element={<Drivers />} />
            <Route path="/drivers/:id" element={<DriverDetail />} />
            <Route path="/tracks" element={<Tracks />} />
            <Route path="/tracks/:id" element={<TrackDetail />} />
            <Route path="/cars" element={<Cars />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/teams/:id" element={<TeamDetail />} />
            <Route path="/champions" element={<Champions />} />
            <Route path="/constructors" element={<Constructors />} />
            <Route path="/race-winners" element={<RaceWinners />} />
            <Route path="/map" element={<Map />} />
            <Route path="/eras" element={<Eras />} />
            <Route path="/seasons" element={<Seasons />} />
          </Routes>
        </main>
        
        <footer className="border-t border-white/10 py-12 bg-zinc-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8">
              <div className="flex items-center space-x-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-red-600 font-black text-white italic">
                  F1
                </div>
                <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
                  Legends
                </span>
              </div>
              
              <div className="text-gray-500 text-sm font-medium">
                © {new Date().getFullYear()} F1 Legends Archive. Alle Rechte vorbehalten.
              </div>
              
              <div className="flex space-x-6 text-gray-400 text-sm font-bold uppercase tracking-widest">
                <a href="#" className="hover:text-white transition-colors">Impressum</a>
                <a href="#" className="hover:text-white transition-colors">Datenschutz</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}
