
import React, { useMemo } from 'react';
import { MoodEntry } from '../types';
import { MOOD_CONFIG, GROWTH_STAGES } from '../constants';
import { motion } from 'framer-motion';

interface GardenProps {
  entries: MoodEntry[];
}

const Garden: React.FC<GardenProps> = ({ entries }) => {
  // Logic to calculate growth stage for each entry
  // A plant "grows" as you log more of that specific mood over time.
  const processedEntries = useMemo(() => {
    const moodCounts: Record<string, number> = {};
    
    // Process oldest to newest to count occurrences
    return [...entries].reverse().map((entry) => {
      moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      const count = moodCounts[entry.mood];
      
      let stageEmoji = '';
      let stageLevel = 0;
      let isFullBloom = false;

      if (count <= 2) {
        stageEmoji = GROWTH_STAGES[0]; // Seedling
        stageLevel = 1;
      } else if (count <= 5) {
        stageEmoji = GROWTH_STAGES[1]; // Sprout
        stageLevel = 2;
      } else if (count <= 8) {
        stageEmoji = GROWTH_STAGES[2]; // Potted
        stageLevel = 3;
      } else {
        stageEmoji = MOOD_CONFIG[entry.mood].plant.emoji; // Full Bloom
        stageLevel = 4;
        isFullBloom = true;
      }

      return {
        ...entry,
        stageEmoji,
        stageLevel,
        isFullBloom,
        totalMoodCount: count
      };
    }).reverse(); // Return to newest first for display
  }, [entries]);

  const displayEntries = processedEntries.slice(0, 20);

  if (entries.length === 0) {
    return (
      <div className="bg-white/50 border-2 border-dashed border-emerald-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-6xl grayscale opacity-40">🌵</div>
        <div>
          <h3 className="text-xl font-semibold text-slate-700">The soil is ready...</h3>
          <p className="text-slate-500">Record your first mood to watch your garden grow.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {displayEntries.map((entry, index) => {
        const config = MOOD_CONFIG[entry.mood];
        
        return (
          <motion.div
            key={entry.id}
            initial={{ scale: 0, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ 
              type: 'spring', 
              stiffness: 260, 
              damping: 20,
              delay: index * 0.05 
            }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="group relative"
          >
            <div className={`aspect-square bg-white rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:shadow-emerald-200/50 transition-all p-4 flex flex-col items-center justify-center border ${
              entry.isFullBloom ? 'border-emerald-200' : 'border-emerald-50'
            }`}>
              {/* Plant Visualization */}
              <div className="relative mb-2">
                <motion.div
                  animate={entry.isFullBloom ? {
                    scale: [1, 1.05, 1],
                    rotate: [0, 2, -2, 0]
                  } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className={`text-6xl filter drop-shadow-md transition-transform group-hover:scale-110 ${
                    !entry.isFullBloom ? 'opacity-80' : 'opacity-100'
                  }`}
                >
                  {entry.stageEmoji}
                </motion.div>
                
                {/* Growth Aura for Blooms */}
                {entry.isFullBloom && (
                  <div className="absolute inset-0 bg-emerald-400/20 blur-2xl rounded-full -z-10 animate-pulse" />
                )}
              </div>

              {/* Date & Metadata */}
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                {new Date(entry.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </div>
              
              <div className={`mt-1.5 px-3 py-1 rounded-full text-[10px] font-bold transition-colors ${
                entry.isFullBloom 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-emerald-50 text-emerald-700'
              }`}>
                {entry.isFullBloom ? config.plant.type : `Level ${entry.stageLevel}`}
              </div>

              {/* Floating Status Indicator (Small dots for stage) */}
              <div className="absolute top-4 right-6 flex gap-1">
                {[1, 2, 3, 4].map((s) => (
                  <div 
                    key={s} 
                    className={`w-1.5 h-1.5 rounded-full ${
                      s <= entry.stageLevel ? 'bg-emerald-400' : 'bg-slate-100'
                    }`} 
                  />
                ))}
              </div>

              {/* Advanced Tooltip */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-sm rounded-[2.5rem] p-5 flex flex-col items-center justify-center text-center z-20 pointer-events-none translate-y-2 group-hover:translate-y-0">
                <div className="mb-2 text-2xl">{entry.isFullBloom ? '✨' : '🌱'}</div>
                <p className="text-xs italic text-emerald-900 line-clamp-4 leading-relaxed font-semibold px-2">
                  "{entry.aiInsight || entry.note || "A quiet moment of reflection."}"
                </p>
                <div className="mt-3 space-y-1">
                  <div className="text-[9px] font-black text-emerald-600 uppercase tracking-[0.2em]">
                    {entry.mood} Entry #{entry.totalMoodCount}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">
                    {new Date(entry.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default Garden;
