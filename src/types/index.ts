export type CategoryType = 'music' | 'sport' | 'custom';
export type FeatureType = 'note-verification' | 'exercise-timer';

export interface Category {
  type: CategoryType;
  customName?: string;
  features: FeatureType[];
}

export interface TimerConfig {
  id: string;
  durationInSeconds: number;
  label: string;
  type: 'global' | 'sequence';
}

export interface Media {
  id: string;
  type: 'image' | 'video' | 'file';
  url: string;
  title: string;
  isVisible: boolean;
}

export interface Session {
  id: string;
  title: string;
  isAIGenerated: boolean;
  globalDuration?: number;
  timers: TimerConfig[];
  themeId?: string;
  content: Media[];
}

export interface Flashcard {
  id: string;
  front: string;
  back: string;
  isAIGenerated: boolean;
  sourceSessionIds: string[];
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctOptionIndex: number;
  isAIGenerated: boolean;
}

export interface Course {
  id: string;
  title: string;
  authorId: string;
  originalAuthorId: string;
  isPublic: boolean;
  category: Category;
  sessions: Session[];
  flashcards: Flashcard[];
  quizzes: Quiz[];
}

export interface Theme {
  id: string;
  name: string;
  isPublic: boolean;
  authorId: string;
  originalAuthorId: string;
  backgroundUrl: string;
  soundtrackUrl: string;
  variantName: 'forest' | 'beach' | 'sea' | 'night' | 'custom';
}