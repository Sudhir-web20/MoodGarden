
import React, { useState } from 'react';
import { MoodType } from '../types';
import { MOOD_CONFIG } from '../constants';
import { X, Send, Loader2, Calendar } from 'lucide-react';

interface MoodSelectorProps {
  onClose: () => void;
  onSubmit: (mood: MoodType, note: string, date: string) => void;
  isLoading: boolean;
}

const MoodSelector: React.FC<MoodSelectorProps> = ({ onClose, onSubmit, isLoading }) => {
  const [selectedMood, setSelectedMood] = useState<MoodType | null>(null);
  const [note, setNote] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMood) {
      // Use the selected date at the current time for better sorting in history
      const now = new Date();
      const [year, month, day] = selectedDate.split('-').map(Number);
      const plantingDate = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());
      onSubmit(selectedMood, note, plantingDate.toISOString());
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden border border-emerald-50 max-h-[90vh] overflow-y-auto">
      <div className="p-6 md:p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">How are you feeling?</h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mood Grid */}
          <div className="grid grid-cols-4 md:grid-cols-7 gap-3">
            {(Object.keys(MOOD_CONFIG) as MoodType[]).map((mood) => {
              const config = MOOD_CONFIG[mood];
              const isSelected = selectedMood === mood;
              return (
                <button
                  key={mood}
                  type="button"
                  onClick={() => setSelectedMood(mood)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl transition-all ${
                    isSelected 
                      ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 scale-105' 
                      : 'bg-slate-50 text-slate-600 hover:bg-emerald-50'
                  }`}
                >
                  <span className="text-2xl">{config.plant.emoji}</span>
                  <span className="text-[10px] font-bold uppercase tracking-tight">{mood}</span>
                </button>
              );
            })}
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 px-1 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              When did you feel this?
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all text-slate-700 font-medium"
            />
          </div>

          {/* Note Input */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-500 px-1">Any thoughts you'd like to plant?</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="What's on your mind..."
              className="w-full h-24 p-5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-emerald-100 focus:border-emerald-500 outline-none transition-all resize-none text-slate-700"
            />
          </div>

          <button
            type="submit"
            disabled={!selectedMood || isLoading}
            className={`w-full py-4 rounded-3xl font-bold text-lg flex items-center justify-center gap-2 transition-all ${
              selectedMood && !isLoading
                ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-xl shadow-emerald-100'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Cultivating insight...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Add to Garden</span>
              </>
            )}
          </button>
        </form>
      </div>
      <div className="bg-emerald-50 px-8 py-4 text-center">
        <p className="text-[11px] font-medium text-emerald-700 uppercase tracking-widest">
          The seeds you plant today bloom into the wisdom of tomorrow
        </p>
      </div>
    </div>
  );
};

export default MoodSelector;
