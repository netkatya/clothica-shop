import { useFavoritesStore } from '@/lib/store/favoritesStore';
import { LuHeart } from 'react-icons/lu';
import css from './FavoriteGoodButton.module.css';
import { Good } from '@/types/good';

interface FavoriteGoodButtonProps {
  id: Good['_id'];
}

export default function FavoriteGoodButton({ id }: FavoriteGoodButtonProps) {
  const { favorites, toggleFavorite } = useFavoritesStore();

  const isFavorite = favorites.includes(id);

  return (
    <button
      className={css.favorites}
      onClick={() => toggleFavorite(id)}
      aria-label="Обране"
    >
      <LuHeart
        className={css.iconHeart}
        size={24}
        stroke="#ff89b3"
        fill={isFavorite ? '#ff89b3' : 'transparent'}
        strokeWidth={2}
      />
    </button>
  );
}
