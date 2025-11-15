import React from 'react';
import css from './FavoritesButton.module.css';
import { Heart } from 'lucide-react';

export default function FavoriteButton() {
  return (
    <button className={css.heartButton} aria-label="Вибране" title="Вибране">
      <Heart className={css.icon} size={26} />
    </button>
  );
}
