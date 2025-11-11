import css from './PopularGoods.module.css';
import Link from 'next/link';
import GoodsList from '../GoodsList/GoodsList';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { fetchGoodsClient } from '@/lib/api/clientApi';

export default async function PopularGoods() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['goods'],
    queryFn: () => fetchGoodsClient(),
  });
  return (
    <section className={css.section} id="PopularGoods">
      <div className="container">
        <div className={css.title_button}>
          <h2 className={css.title}>Популярні товари</h2>
          <Link href="/goods" className={css.button}>
            Всі товари
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
