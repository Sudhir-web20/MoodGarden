
import React from 'react';
import { Sprout, BarChart3, History, Flower2 } from 'lucide-react';

interface HeaderProps {
  activeTab: 'garden' | 'stats' | 'history';
  setActiveTab: (tab: 'garden' | 'stats' | 'history') => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'garden', label: 'Garden', icon: Flower2 },
    { id: 'stats', label: 'Growth', icon: BarChart3 },
    { id: 'history', label: 'Roots', icon: History },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-emerald-50">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-emerald-100 p-2 rounded-xl">
            <Sprout className="w-6 h-6 text-emerald-600" />
          </div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            MoodGarden
          </h1>
        </div>
        
        <nav className="flex items-center gap-1 md:gap-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? 'bg-emerald-50 text-emerald-700 shadow-sm' 
                    : 'text-slate-500 hover:text-emerald-600 hover:bg-emerald-50/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600' : ''}`} />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
