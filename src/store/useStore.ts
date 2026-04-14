// src/store/useStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, Theme } from '../types';

interface AppState {
  courses: Course[];
  themes: Theme[];
  addCourse: (course: Course) => void;
  deleteCourse: (courseId: string) => void;
  addTheme: (theme: Theme) => void;
}

export const useStore = create<AppState>()(
  persist(
    (set) => ({
      courses: [],
      themes: [
        {
          id: 'default-forest',
          name: 'Forêt Calme',
          isPublic: true,
          authorId: 'system',
          originalAuthorId: 'system',
          backgroundUrl: '/images/forest.jpg',
          soundtrackUrl: '/audio/forest.mp3',
          variantName: 'forest'
        }
      ],

      addCourse: (course) => 
        set((state) => ({ courses: [...state.courses, course] })),
      
      deleteCourse: (courseId) => 
        set((state) => ({ courses: state.courses.filter(c => c.id !== courseId) })),
      
      addTheme: (theme) => 
        set((state) => ({ themes: [...state.themes, theme] })),
    }),
    {
      name: 'revisions-app-storage',
    }
  )
);