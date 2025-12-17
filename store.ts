
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MoodEntry } from './types';

interface GardenState {
  entries: MoodEntry[];
  activeTab: 'garden' | 'stats' | 'history';
  isAddingEntry: boolean;
  isChatOpen: boolean;
  _hasHydrated: boolean;
  
  // Actions
  addEntry: (entry: MoodEntry) => void;
  deleteEntry: (id: string) => void;
  setActiveTab: (tab: 'garden' | 'stats' | 'history') => void;
  setIsAddingEntry: (isOpen: boolean) => void;
  setIsChatOpen: (isOpen: boolean) => void;
  setHasHydrated: (state: boolean) => void;
}

export const useGardenStore = create<GardenState>()(
  persist(
    (set) => ({
      entries: [],
      activeTab: 'garden',
      isAddingEntry: false,
      isChatOpen: false,
      _hasHydrated: false,

      setHasHydrated: (state) => set({ _hasHydrated: state }),

      addEntry: (entry) => set((state) => {
        const updated = [entry, ...state.entries].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        return { entries: updated };
      }),

      deleteEntry: (id) => set((state) => ({
        entries: state.entries.filter(e => e.id !== id)
      })),

      setActiveTab: (activeTab) => set({ activeTab }),
      setIsAddingEntry: (isAddingEntry) => set({ isAddingEntry }),
      setIsChatOpen: (isChatOpen) => set({ isChatOpen }),
    }),
    {
      name: 'mood-garden-vault-v1', // This key is now permanent. Changing it will cause data loss.
      storage: createJSONStorage(() => window.localStorage),
      onRehydrateStorage: (state) => {
        return (rehydratedState) => {
          if (rehydratedState) {
            rehydratedState.setHasHydrated(true);
          }
        };
      },
    }
  )
);
