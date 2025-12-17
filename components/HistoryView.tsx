
import React from 'react';
import { MoodEntry } from '../types';
import { MOOD_CONFIG, GROWTH_STAGES } from '../constants';
import { Trash2, MessageCircle, Sparkles, TrendingUp } from 'lucide-react';
import { format } from 'date-fns';

interface HistoryViewProps {
  entries: MoodEntry[];
  onDelete: (id: string) => void;
}

const HistoryView: React.FC<HistoryViewProps> = ({ entries, onDelete }) => {
  // Helper to get stage for history items
  const getEntryStage = (mood: string, index: number, allEntries: MoodEntry[]) => {
    const sameMoodEntries = allEntries.filter(e => e.mood === mood);
    // Find chronological position
    const sortedSameMood = [...sameMoodEntries].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const currentEntry = allEntries[index];
    const occurrenceIndex = sortedSameMood.findIndex(e => e.id === currentEntry.id) + 1;

    if (occurrenceIndex <= 2) return { emoji: GROWTH_STAGES[0], label: 'Seedling' };
    if (occurrenceIndex <= 5) return { emoji: GROWTH_STAGES[1], label: 'Sprout' };
    if (occurrenceIndex <= 8) return { emoji: GROWTH_STAGES[2], label: 'Young Plant' };
    return { emoji: MOOD_CONFIG[mood as any].plant.emoji, label: 'Full Bloom' };
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white/50 border-2 border-dashed border-emerald-100 rounded-3xl p-20 flex flex-col items-center justify-center text-center space-y-4">
        <div className="text-6xl grayscale opacity-40">📜</div>
        <div>
          <h3 className="text-xl font-semibold text-slate-700">No memories yet...</h3>
          <p className="text-slate-500">Your logged moods will appear here over time.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {entries.map((entry, index) => {
        const config = MOOD_CONFIG[entry.mood];
        const date = new Date(entry.date);
        const stage = getEntryStage(entry.mood, index, entries);
        
        return (
          <div 
            key={entry.id} 
            className="bg-white rounded-[2rem] p-6 shadow-sm border border-emerald-50 flex flex-col md:flex-row gap-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex-shrink-0 flex items-center md:flex-col md:justify-center gap-3">
              <div className="w-20 h-20 rounded-[1.5rem] bg-slate-50 flex items-center justify-center text-5xl relative overflow-hidden">
                <span className="relative z-10 transition-transform group-hover:scale-110 duration-500">{stage.emoji}</span>
                <div className="absolute inset-0 bg-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-left md:text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {format(date, 'MMM d')}
                </p>
                <p className="text-[10px] text-slate-400 font-semibold">
                  {format(date, 'p')}
                </p>
              </div>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="font-bold text-xl text-slate-800 flex items-center gap-2">
                    {entry.mood}
                    <div className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 rounded-full text-[10px] font-bold text-emerald-700 border border-emerald-100 uppercase tracking-tight">
                      <TrendingUp className="w-3 h-3" />
                      {stage.label}
                    </div>
                  </h4>
                </div>
                <button 
                  onClick={() => onDelete(entry.id)}
                  className="p-2 text-slate-200 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>

              {entry.note && (
                <div className="flex gap-3 bg-slate-50/50 p-4 rounded-2xl">
                  <MessageCircle className="w-4 h-4 text-slate-300 mt-1 flex-shrink-0" />
                  <p className="text-slate-600 text-sm leading-relaxed">{entry.note}</p>
                </div>
              )}

              {entry.aiInsight && (
                <div className="bg-emerald-50/50 rounded-2xl p-5 border border-emerald-100/50 flex gap-4">
                  <div className="bg-white p-2 rounded-xl shadow-sm self-start">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <p className="text-emerald-900 text-sm italic font-semibold leading-relaxed">
                    "{entry.aiInsight}"
                  </p>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HistoryView;
