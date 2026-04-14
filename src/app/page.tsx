'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import CourseCreator from '../components/CourseCreator';
import { css } from '../../styled-system/css';
import { FeatureType } from '../types';

const getCategoryName = (type: string, customName?: string) => {
  if (type === 'music') return 'Musique';
  if (type === 'sport') return 'Sport';
  if (type === 'custom' && customName) return customName;
  return 'Personnalisée';
};

const getFeatureNames = (features: FeatureType[]) => {
  if (features.length === 0) return 'Aucune';
  return features
    .map((f) => (f === 'note-verification' ? 'Vérification notes' : 'Timer'))
    .join(' + ');
};

export default function Home() {
  const courses = useStore((state) => state.courses);
  const [showCreator, setShowCreator] = useState(false);

  return (
    <div className={css({ minH: '100vh', bg: '#f9fafb', color: '#111827' })}>
      <header className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: '6', bg: 'white', borderBottom: '1px solid #e5e7eb' })}>
        <div className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
          <h1 className={css({ fontSize: '2xl', fontWeight: 'bold', mr: '4' })}>Mes Activités</h1>
          <div className={css({ display: 'flex', gap: '2' })}>
            <button className={css({ px: '4', py: '2', bg: '#f3f4f6', borderRadius: 'md', fontWeight: 'medium', cursor: 'pointer' })}>Mes cours</button>
            <button className={css({ px: '4', py: '2', color: '#6b7280', fontWeight: 'medium', cursor: 'pointer' })}>Bibliothèque</button>
          </div>
        </div>
        <div className={css({ display: 'flex', gap: '4', alignItems: 'center' })}>
          <button className={css({ px: '4', py: '2', bg: 'black', color: 'white', borderRadius: 'md', fontWeight: 'medium', cursor: 'pointer' })}>Connexion</button>
        </div>
      </header>

      <main className={css({ p: '8', maxW: '1200px', mx: 'auto' })}>
        <div className={css({ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: '8' })}>
          <div>
            <h2 className={css({ fontSize: 'xl', fontWeight: 'bold' })}>Mes cours</h2>
            <p className={css({ color: '#6b7280' })}>Gérez vos activités et suivez votre progression</p>
          </div>
          <button
            onClick={() => setShowCreator(true)}
            className={css({ px: '4', py: '2', bg: '#111827', color: 'white', borderRadius: 'md', fontWeight: 'medium', cursor: 'pointer' })}
          >
            + Nouveau cours
          </button>
        </div>

        {courses.length === 0 ? (
          <div className={css({ display: 'flex', flexDir: 'column', alignItems: 'center', justifyContent: 'center', p: '16', bg: 'white', borderRadius: 'lg', border: '1px solid #e5e7eb' })}>
            <div className={css({ fontSize: '4xl', mb: '4', color: '#9ca3af' })}>📖</div>
            <p className={css({ color: '#6b7280', mb: '2' })}>Aucun cours pour le moment</p>
            <button onClick={() => setShowCreator(true)} className={css({ color: 'blue.600', fontWeight: 'medium', cursor: 'pointer', bg: 'transparent', border: 'none' })}>
              Créez votre premier cours !
            </button>
          </div>
        ) : (
          <div className={css({ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '6' })}>
            {courses.map((course) => (
              <div key={course.id} className={css({ p: '6', bg: 'white', borderRadius: 'lg', border: '1px solid #e5e7eb', boxShadow: 'sm' })}>
                <h3 className={css({ fontSize: 'lg', fontWeight: 'bold', mb: '2' })}>{course.title}</h3>
                <p className={css({ fontSize: 'sm', color: '#6b7280', mb: '1' })}>
                  Catégorie : {getCategoryName(course.category.type, course.category.customName)}
                </p>
                <p className={css({ fontSize: 'sm', color: '#6b7280', mb: '1' })}>
                  Options : {getFeatureNames(course.category.features)}
                </p>
                <p className={css({ fontSize: 'sm', color: '#6b7280' })}>
                  Statut : {course.isPublic ? 'Public' : 'Privé'}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      {showCreator && (
        <div className={css({ position: 'fixed', inset: '0', bg: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, backdropFilter: 'blur(4px)' })}>
          <div className={css({ bg: 'white', p: '6', borderRadius: 'lg', w: '100%', maxW: '500px', position: 'relative' })}>
            <button
              onClick={() => setShowCreator(false)}
              className={css({ position: 'absolute', top: '4', right: '4', cursor: 'pointer', bg: 'transparent', border: 'none', fontSize: 'xl', color: '#6b7280' })}
            >
              ✕
            </button>
            <CourseCreator onClose={() => setShowCreator(false)} />
          </div>
        </div>
      )}
    </div>
  );
}