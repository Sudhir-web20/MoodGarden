
import React, { useState, useEffect } from 'react';
import { MoodType } from './types';
import Header from './components/Header';
import Garden from './components/Garden';
import MoodSelector from './components/MoodSelector';
import MoodStats from './components/MoodStats';
import HistoryView from './components/HistoryView';
import ChatBot from './components/ChatBot';
import { getGardenWisdom } from './geminiService';
import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle, Sprout, Loader2 } from 'lucide-react';
import { useGardenStore } from './store';

const App: React.FC = () => {
  const { 
    entries, 
    activeTab, 
    setActiveTab, 
    isAddingEntry, 
    setIsAddingEntry, 
    isChatOpen, 
    setIsChatOpen,
    addEntry,
    deleteEntry,
    _hasHydrated
  } = useGardenStore();

  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Robust Hydration Guard: 
  // Ensures we only render the UI once we are certain data is restored.
  useEffect(() => {
    if (_hasHydrated) {
      // Small delay to ensure state has fully propagated
      const timeout = setTimeout(() => setIsReady(true), 50);
      return () => clearTimeout(timeout);
    }
  }, [_hasHydrated]);

  const handleAddEntry = async (mood: MoodType, note: string, date: string) => {
    setIsLoading(true);
    try {
      const aiInsight = await getGardenWisdom(mood, note);
      
      const newId = typeof crypto !== 'undefined' && crypto.randomUUID 
        ? crypto.randomUUID() 
        : `entry-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      addEntry({
        id: newId,
        date,
        mood,
        note,
        aiInsight
      });
      
      setIsAddingEntry(false);
      setActiveTab('garden');
    } catch (error) {
      console.error("Failed to add entry:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isReady) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center garden-bg text-emerald-800">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl shadow-emerald-100 flex items-center justify-center">
            <Sprout className="w-16 h-16 text-emerald-600 animate-bounce" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-2 font-black text-xl tracking-tight uppercase">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
              <span>Nurturing the Soil</span>
            </div>
            <p className="text-sm font-medium opacity-60">Restoring your garden's roots...</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen garden-bg flex flex-col text-slate-800">
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 max-w-5xl mx-auto w-full px-4 py-8 pb-32">
        <AnimatePresence mode="wait">
          {activeTab === 'garden' && (
            <motion.div
              key="garden"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 tracking-tight">My Living Garden</h2>
                  <p className="text-slate-600 font-medium opacity-80">Your emotional journey, visualised in nature.</p>
                </div>
                {!isAddingEntry && (
                  <button
                    onClick={() => setIsAddingEntry(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-[1.5rem] font-bold transition-all shadow-xl shadow-emerald-200 flex items-center gap-2 active:scale-95"
                  >
                    <span>Plant a Mood</span>
                    <span className="text-xl">🌱</span>
                  </button>
                )}
              </div>
              
              <Garden entries={entries} />
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MoodStats entries={entries} />
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <HistoryView entries={entries} onDelete={deleteEntry} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Persistent Chat Button */}
      <AnimatePresence>
        {!isChatOpen && activeTab === 'garden' && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsChatOpen(true)}
            className="fixed bottom-8 right-8 w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-emerald-200 z-40 transition-transform"
          >
            <MessageCircle className="w-7 h-7" />
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full border-2 border-white"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Interface */}
      <AnimatePresence>
        {isChatOpen && (
          <ChatBot 
            recentEntries={entries} 
            onClose={() => setIsChatOpen(false)} 
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isAddingEntry && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="w-full max-w-lg"
            >
              <MoodSelector 
                onClose={() => setIsAddingEntry(false)} 
                onSubmit={handleAddEntry} 
                isLoading={isLoading}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
