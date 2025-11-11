import { fetchGoodsClient } from '@/lib/api/clientApi';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import GoodsClient from './Goods.client';
import css from './Goods.module.css';

async function GoodsPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['goods'],
    queryFn: ({ pageParam }) => fetchGoodsClient(pageParam),
    initialPageParam: 1,
  });
  return (
    <section className={css.section}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <GoodsClient />;
      </HydrationBoundary>
    </section>
  );
}

export default GoodsPage;
