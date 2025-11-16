import css from './PopularGoods.module.css';
import Link from 'next/link';
import GoodsList from '../GoodsList/GoodsList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchGoodsClient } from '@/lib/api/clientApi';

import { getTranslations } from 'next-intl/server';

export default async function PopularGoods() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['goods'],
    queryFn: fetchGoodsClient.bind(null, {
      page: '1',
      perPage: '12',
      sortBy: 'popgoods',
      order: 'desc',
    }),
  });

  const t = await getTranslations('PopularGoods');
  return (
    <section className={css.section} id="PopularGoods">
      <div className="container">
        <div className={css.title_button}>
          <h2 className={css.title}>{t("title")}</h2>
          <Link href="/goods" className={css.button}>
            {t("button")}
          </Link>
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          {' '}
          <GoodsList />
        </HydrationBoundary>
      </div>
    </section>
  );
}
