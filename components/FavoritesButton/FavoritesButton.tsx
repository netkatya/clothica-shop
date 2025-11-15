import React from 'react';
import css from './FavoritesButton.module.css';
import { Heart } from 'lucide-react';
import Link from 'next/link';

export default function FavoriteButton() {
  return (
    <Link
      href="/favorites"
      className={css.heartButton}
      aria-label="Вибране"
      title="Вибране"
    >
      <Heart className={css.icon} size={26} />
    </Link>
  );
}
