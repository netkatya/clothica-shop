'use client';
import Link from 'next/link';
import Image from 'next/image';
import { LuTrash2 } from 'react-icons/lu';

import { useQuery } from '@tanstack/react-query';
import { fetchGoodsClient } from '@/lib/api/clientApi';
import css from './favorites.module.css';
import { useFavoritesStore } from '@/lib/store/favoritesStore';
import Loading from '@/app/loading';
import MessageNoInfo from '@/components/MessageNoInfo/MessageNoInfo';
import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

export default function FavoritesPage() {
  const t = useTranslations('FavoritesPage');
  const router = useRouter();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['goods'],
    queryFn: () => fetchGoodsClient({}),
  });
  const goods = data?.data ?? [];

  const { favorites, removeFavorite } = useFavoritesStore();

  const favoriteItems = goods.filter(item => favorites.includes(item._id));

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <p className={css.emptyMessage}>{t('loadError')}</p>;
  }

  if (favoriteItems.length === 0) {
    return (
      <div className={css.favoritesContainer}>
        <div className={css.messageContainer}>
          <MessageNoInfo
            text={t('emptyText')}
            buttonText={t('shopButton')}
            route="/goods"
            onClick={() => router.push('/goods')}
          />
        </div>
      </div>
    );
  }

  return (
    <main className={css.favoritesContainer}>
      <div className="container">
        <h1 className={css.pageTitle}>{t('pageTitle')}</h1>
        <div className={css.favoritesList}>
          {favoriteItems.map(item => (
            <div key={item._id} className={css.favoriteItem}>
              <Link href={`/goods/${item._id}`}>
                <Image
                  src={item.image}
                  alt={item.name}
                  width={335}
                  height={413}
                  className={css.image}
                />
              </Link>
              <div className={css.info}>
                <p className={css.name}>{item.name}</p>
                <p className={css.price}>
                  {item.price.value} {item.price.currency}
                </p>
              </div>
              <div className={css.actions}>
                <button
                  className={css.removeButton}
                  onClick={() => removeFavorite(item._id)}
                  aria-label={t('removeLabel')}
                >
                  <LuTrash2 size={20} className={css.trash} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
