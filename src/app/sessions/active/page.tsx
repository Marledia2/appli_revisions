'use client';

import { useState, useEffect, useRef } from 'react';
import { css } from '../../../../styled-system/css';
import { lofiContainer } from '../../../../styled-system/recipes';
import { Session, Theme, Media } from '../../../types';

const mockSession: Session = {
  id: 's1',
  title: 'Séance Sportive Lofi',
  isAIGenerated: false,
  timers: [
    { id: 't1', durationInSeconds: 45, label: 'Effort intense', type: 'sequence' },
    { id: 't2', durationInSeconds: 20, label: 'Repos', type: 'sequence' },
    { id: 't3', durationInSeconds: 60, label: 'Exercice long', type: 'sequence' }
  ],
  content: [
    { id: 'm1', type: 'video', title: 'Tutoriel Mouvement', url: 'https://www.w3schools.com/html/mov_bbb.mp4', isVisible: true },
    { id: 'm2', type: 'image', title: 'Schéma Musculaire', url: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=800&auto=format&fit=crop', isVisible: true }
  ]
};

const mockTheme: Theme = {
  id: 't1',
  name: 'Forêt Mystique',
  isPublic: true,
  authorId: 'system',
  originalAuthorId: 'system',
  backgroundUrl: '',
  soundtrackUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3',
  variantName: 'forest'
};

export default function ActiveSession() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTimerIndex, setActiveTimerIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(mockSession.timers[0]?.durationInSeconds || 0);
  const [currentTheme, setCurrentTheme] = useState(mockTheme.variantName);
  const [activeMedia, setActiveMedia] = useState<Media | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (isPlaying && timeLeft === 0) {
      if (activeTimerIndex < mockSession.timers.length - 1) {
        const nextIndex = activeTimerIndex + 1;
        setActiveTimerIndex(nextIndex);
        setTimeLeft(mockSession.timers[nextIndex].durationInSeconds);
      } else {
        setIsPlaying(false);
      }
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft, activeTimerIndex]);

  const currentTimer = mockSession.timers[activeTimerIndex];
  const minutes = Math.floor(timeLeft / 60);
  const seconds = (timeLeft % 60).toString().padStart(2, '0');

  return (
    <div className={lofiContainer({ themeVariant: currentTheme })}>
      <audio ref={audioRef} src={mockTheme.soundtrackUrl} loop />

      <header className={css({ p: '6', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bg: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 10 })}>
        <h1 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>{mockSession.title}</h1>
        <div className={css({ display: 'flex', gap: '4' })}>
          {(['forest', 'beach', 'sea', 'night'] as const).map((t) => (
            <button
              key={t}
              onClick={() => setCurrentTheme(t)}
              className={css({ px: '4', py: '2', borderRadius: 'md', bg: currentTheme === t ? 'white' : 'transparent', color: currentTheme === t ? 'black' : 'white', border: '1px solid white', cursor: 'pointer', textTransform: 'capitalize', fontWeight: 'bold', transition: 'all 0.2s' })}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      <main className={css({ flex: 1, display: 'flex', flexDir: 'column', alignItems: 'center', justifyContent: 'center', p: '8', position: 'relative' })}>
        {currentTimer && (
          <div className={css({ textAlign: 'center', bg: 'rgba(0,0,0,0.6)', p: '12', borderRadius: '2xl', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.2)', minW: '400px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', zIndex: 10 })}>
            <h2 className={css({ fontSize: '2xl', mb: '6', textTransform: 'uppercase', letterSpacing: 'widest', color: 'gray.300' })}>
              {currentTimer.label}
            </h2>
            <div className={css({ fontSize: '9xl', fontWeight: 'bold', fontFamily: 'monospace', mb: '8', textShadow: '0 4px 12px rgba(0,0,0,0.5)' })}>
              {minutes}:{seconds}
            </div>

            <div className={css({ display: 'flex', gap: '4', justifyContent: 'center' })}>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className={css({ px: '8', py: '4', fontSize: 'xl', fontWeight: 'bold', borderRadius: 'full', bg: isPlaying ? 'rgba(255,255,255,0.2)' : 'white', color: isPlaying ? 'white' : 'black', cursor: 'pointer', transition: 'all 0.2s', _hover: { transform: 'scale(1.05)' } })}
              >
                {isPlaying ? 'Pause' : 'Démarrer'}
              </button>
              <button
                onClick={() => {
                  setIsPlaying(false);
                  setTimeLeft(currentTimer.durationInSeconds);
                }}
                className={css({ px: '8', py: '4', fontSize: 'xl', fontWeight: 'bold', borderRadius: 'full', bg: 'transparent', color: 'white', border: '2px solid white', cursor: 'pointer', transition: 'all 0.2s', _hover: { bg: 'rgba(255,255,255,0.1)' } })}
              >
                Réinitialiser
              </button>
            </div>
            <div className={css({ mt: '6', fontSize: 'sm', color: 'gray.400' })}>
              Étape {activeTimerIndex + 1} sur {mockSession.timers.length}
            </div>
          </div>
        )}
      </main>

      <footer className={css({ p: '6', display: 'flex', gap: '4', justifyContent: 'center', bg: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', zIndex: 10 })}>
        {mockSession.content.map((media) => (
          <button
            key={media.id}
            onClick={() => setActiveMedia(media)}
            className={css({ px: '6', py: '3', bg: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid rgba(255,255,255,0.3)', borderRadius: 'lg', cursor: 'pointer', fontWeight: 'bold', _hover: { bg: 'rgba(255,255,255,0.2)' } })}
          >
            Ouvrir : {media.title}
          </button>
        ))}
      </footer>

      {activeMedia && (
        <div className={css({ position: 'fixed', inset: '0', bg: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, p: '8' })}>
          <div className={css({ position: 'relative', maxW: '1000px', w: '100%', bg: 'black', borderRadius: 'xl', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.2)' })}>
            <div className={css({ p: '4', display: 'flex', justifyContent: 'space-between', alignItems: 'center', bg: '#111' })}>
              <h3 className={css({ fontSize: 'lg', fontWeight: 'bold' })}>{activeMedia.title}</h3>
              <button
                onClick={() => setActiveMedia(null)}
                className={css({ bg: 'transparent', border: 'none', color: 'white', fontSize: '2xl', cursor: 'pointer' })}
              >
                ✕
              </button>
            </div>
            
            <div className={css({ p: '4', display: 'flex', justifyContent: 'center', alignItems: 'center', minH: '400px' })}>
              {activeMedia.type === 'video' && (
                <video src={activeMedia.url} controls autoPlay className={css({ maxW: '100%', maxH: '70vh', borderRadius: 'md' })} />
              )}
              {activeMedia.type === 'image' && (
                <img src={activeMedia.url} alt={activeMedia.title} className={css({ maxW: '100%', maxH: '70vh', objectFit: 'contain', borderRadius: 'md' })} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}