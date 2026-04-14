'use client';

import { useState } from 'react';
import { useStore } from '../store/useStore';
import { CategoryType, FeatureType, Course } from '../types';
import { css } from '../../styled-system/css';

interface Props {
  onClose?: () => void;
}

export default function CourseCreator({ onClose }: Props) {
  const addCourse = useStore((state) => state.addCourse);

  const [title, setTitle] = useState('');
  const [categoryType, setCategoryType] = useState<CategoryType>('music');
  const [customName, setCustomName] = useState('');
  const [features, setFeatures] = useState<FeatureType[]>([]);
  const [isPublic, setIsPublic] = useState(false);

  const handleFeatureToggle = (feature: FeatureType) => {
    setFeatures((prev) =>
      prev.includes(feature) ? prev.filter((f) => f !== feature) : [...prev, feature]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCourse: Course = {
      id: crypto.randomUUID(),
      title,
      authorId: 'user-1',
      originalAuthorId: 'user-1',
      isPublic,
      category: {
        type: categoryType,
        customName: categoryType === 'custom' ? customName : undefined,
        features: features,
      },
      sessions: [],
      flashcards: [],
      quizzes: [],
    };

    addCourse(newCourse);

    setTitle('');
    setCategoryType('music');
    setCustomName('');
    setFeatures([]);
    setIsPublic(false);

    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className={css({ display: 'flex', flexDir: 'column', gap: '4' })}>
      <h2 className={css({ fontSize: '2xl', fontWeight: 'bold' })}>Créer un cours</h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Titre du cours"
        required
        className={css({ p: '3', border: '1px solid #ccc', borderRadius: '4px' })}
      />

      <select
        value={categoryType}
        onChange={(e) => {
          setCategoryType(e.target.value as CategoryType);
          setFeatures([]);
        }}
        className={css({ p: '3', border: '1px solid #ccc', borderRadius: '4px' })}
      >
        <option value="music">Musique</option>
        <option value="sport">Sport</option>
        <option value="custom">Personnalisée</option>
      </select>

      {categoryType === 'custom' && (
        <input
          type="text"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          placeholder="Nom de la catégorie"
          required
          className={css({ p: '3', border: '1px solid #ccc', borderRadius: '4px' })}
        />
      )}

      {categoryType === 'music' && (
        <label className={css({ display: 'flex', gap: '2', alignItems: 'center' })}>
          <input
            type="checkbox"
            checked={features.includes('note-verification')}
            onChange={() => handleFeatureToggle('note-verification')}
          />
          Vérification des notes jouées
        </label>
      )}

      {categoryType === 'sport' && (
        <label className={css({ display: 'flex', gap: '2', alignItems: 'center' })}>
          <input
            type="checkbox"
            checked={features.includes('exercise-timer')}
            onChange={() => handleFeatureToggle('exercise-timer')}
          />
          Timer d'exercices
        </label>
      )}

      {categoryType === 'custom' && (
        <div className={css({ display: 'flex', flexDir: 'column', gap: '2' })}>
          <span className={css({ fontWeight: 'bold' })}>Fonctionnalités optionnelles :</span>
          <label className={css({ display: 'flex', gap: '2', alignItems: 'center' })}>
            <input
              type="checkbox"
              checked={features.includes('note-verification')}
              onChange={() => handleFeatureToggle('note-verification')}
            />
            Vérification sonore
          </label>
          <label className={css({ display: 'flex', gap: '2', alignItems: 'center' })}>
            <input
              type="checkbox"
              checked={features.includes('exercise-timer')}
              onChange={() => handleFeatureToggle('exercise-timer')}
            />
            Timer d'exercices
          </label>
        </div>
      )}

      <label className={css({ display: 'flex', gap: '2', alignItems: 'center' })}>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
        />
        Rendre ce cours public
      </label>

      <button type="submit" className={css({ p: '3', bg: 'black', color: 'white', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' })}>
        Enregistrer le cours
      </button>
    </form>
  );
}