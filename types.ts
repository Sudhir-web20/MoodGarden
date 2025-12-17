
export enum MoodType {
  HAPPY = 'Happy',
  CALM = 'Calm',
  SAD = 'Sad',
  ANGRY = 'Angry',
  ANXIOUS = 'Anxious',
  EXCITED = 'Excited',
  TIRED = 'Tired'
}

export interface PlantInfo {
  type: string;
  emoji: string;
  color: string;
  description: string;
}

export interface MoodEntry {
  id: string;
  date: string; // ISO string
  mood: MoodType;
  note: string;
  aiInsight?: string;
}

export interface GardenTheme {
  primary: string;
  secondary: string;
}
