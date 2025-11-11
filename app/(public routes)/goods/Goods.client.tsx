'use client';
import AllGoodsList from '@/components/AllGoodsList/AllGoodsList';
import Filters from '@/components/Filters/Filters';

import {
  fetchCategoriesClient,
  fetchGoodsClient,
  FetchGoodsResponse,
} from '@/lib/api/clientApi';
import {
  useInfiniteQuery,
  useQuery,
  type InfiniteData,
} from '@tanstack/react-query';
import css from './Goods.module.css';
import { useState } from 'react';
import { Gender, Size } from '@/types/good';
import SidebarFilters from '@/components/SidebarFilter/SidebarFilter';

interface AllFiltersState {
  category: string;
  sizes: Size[];
  priceRange: number[];
  colors: string[];
  status: Gender;
}

export default function GoodsClient() {
  const [filters, setFilters] = useState<AllFiltersState>({
    category: 'Усі',
    sizes: [],
    priceRange: [1, 1500],
    colors: ['Білий'],
    status: 'men',
  });
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoriesClient(1, 8),
    refetchOnWindowFocus: false,
  });
  const categories = categoriesData?.data ?? [];
  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<
    FetchGoodsResponse,
    Error,
    InfiniteData<FetchGoodsResponse, number>,
    (string | AllFiltersState)[],
    number
  >({
    queryKey: ['goods', filters],

    queryFn: ({ pageParam }) =>
      fetchGoodsClient(
        pageParam,
        12,
        filters.status,
        filters.sizes,
        filters.priceRange[0],
        filters.priceRange[1]
      ),

    initialPageParam: 1,

    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;

      if (!lastPage?.totalPages) {
        return undefined;
      }

      if (currentPage >= lastPage.totalPages) {
        return undefined;
      }
      return currentPage + 1;
    },

    refetchOnMount: false,
  });
  const handleClearAll = () => {
    setFilters({
      category: 'Усі',
      sizes: [],
      priceRange: [1, 5000],
      colors: [],
      status: 'men',
    });
  };
  const goods = data?.pages.flatMap(page => page.data) ?? [];
  const totalPages = data?.pages[data.pages.length - 1]?.totalPages;
  return (
    <div className="container">
      <div className={css.mobileOnly}>
        <Filters
          currentFilters={filters}
          onFilterChange={setFilters}
          onClearAll={handleClearAll}
          isLoadingCategories={isLoadingCategories}
          Categories={categories}
        />
      </div>
      <SidebarFilters
        currentFilters={filters}
        onFilterChange={setFilters}
        onClearAll={handleClearAll}
        isLoadingCategories={isLoadingCategories}
        Categories={categories}
      />
      <main>
        <AllGoodsList goods={goods}></AllGoodsList>{' '}
        <div className={css.buttonContainer}>
          {hasNextPage && (
            <button
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage || isFetchingNextPage}
              className={css.button}
            >
              {isFetchingNextPage ? 'Завантаження...' : 'Показати більше'}
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
