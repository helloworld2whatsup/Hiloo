import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Trophy, Flag, History, Search, Menu, X, Car, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const navItems = [
  { name: 'Home', path: '/', icon: History },
  { name: 'Fahrer', path: '/drivers', icon: Trophy },
  { name: 'Teams', path: '/teams', icon: Users },
  { name: 'Weltmeister', path: '/champions', icon: Trophy },
  { name: 'Konstrukteure', path: '/constructors', icon: Trophy },
  { name: 'Rennsieger', path: '/race-winners', icon: Flag },
  { name: 'Strecken', path: '/tracks', icon: Flag },
  { name: 'Autos', path: '/cars', icon: Car },
  { name: 'Saisons', path: '/seasons', icon: History },
  { name: 'Weltkarte', path: '/map', icon: Flag },
  { name: 'Epochen', path: '/eras', icon: History },
];

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-red-600 font-black text-white italic">
              F1
            </div>
            <span className="text-xl font-bold tracking-tighter text-white uppercase italic">
              Legends
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-red-500",
                  location.pathname === item.path ? "text-red-500" : "text-gray-400"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-white">
              <Search size={20} />
            </button>
            <button 
              className="md:hidden p-2 text-gray-400 hover:text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-16 left-0 w-full bg-black border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col p-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center space-x-3 text-lg font-medium",
                    location.pathname === item.path ? "text-red-500" : "text-gray-400"
                  )}
                >
                  <item.icon size={20} />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
