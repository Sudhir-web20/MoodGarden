
import React from 'react';
import { MoodType, PlantInfo } from './types';
import { Sun, Leaf, CloudRain, Zap, Wind, Star, Moon } from 'lucide-react';

export const GROWTH_STAGES = ['🌱', '🌿', '🪴'];

export const MOOD_CONFIG: Record<MoodType, { icon: React.ReactNode; plant: PlantInfo }> = {
  [MoodType.HAPPY]: {
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
    plant: { 
      type: 'Sunflower', 
      emoji: '🌻', 
      color: 'bg-yellow-400', 
      description: 'Basking in the light.' 
    }
  },
  [MoodType.CALM]: {
    icon: <Leaf className="w-5 h-5 text-emerald-500" />,
    plant: { 
      type: 'Bonsai', 
      emoji: '🌳', 
      color: 'bg-emerald-400', 
      description: 'Rooted and centered.' 
    }
  },
  [MoodType.SAD]: {
    icon: <CloudRain className="w-5 h-5 text-blue-500" />,
    plant: { 
      type: 'Willow', 
      emoji: '🎋', 
      color: 'bg-blue-300', 
      description: 'Gentle resilience in the rain.' 
    }
  },
  [MoodType.ANGRY]: {
    icon: <Zap className="w-5 h-5 text-rose-500" />,
    plant: { 
      type: 'Cactus', 
      emoji: '🌵', 
      color: 'bg-rose-400', 
      description: 'Protective boundaries and inner strength.' 
    }
  },
  [MoodType.ANXIOUS]: {
    icon: <Wind className="w-5 h-5 text-indigo-400" />,
    plant: { 
      type: 'Fern', 
      emoji: '🌿', 
      color: 'bg-indigo-300', 
      description: 'Delicate complexity and constant movement.' 
    }
  },
  [MoodType.EXCITED]: {
    icon: <Star className="w-5 h-5 text-orange-500" />,
    plant: { 
      type: 'Paradise Bloom', 
      emoji: '🌺', 
      color: 'bg-orange-400', 
      description: 'Vibrant energy and bright colors.' 
    }
  },
  [MoodType.TIRED]: {
    icon: <Moon className="w-5 h-5 text-slate-500" />,
    plant: { 
      type: 'Aloe', 
      emoji: '🌱', 
      color: 'bg-slate-400', 
      description: 'Quiet restoration and healing rest.' 
    }
  }
};
