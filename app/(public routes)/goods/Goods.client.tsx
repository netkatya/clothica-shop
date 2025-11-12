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
import { useState, useMemo } from 'react';
import SidebarFilters from '@/components/SidebarFilter/SidebarFilter';
import { AllFiltersState } from '@/types/filters';
import { Category } from '@/types/category';
import { useDebounce } from 'use-debounce';
import { Gender } from '@/types/good';

export default function GoodsClient() {
  const [filters, setFilters] = useState<AllFiltersState>({
    category: 'Усі',
    sizes: [],
    priceRange: [1, 5499],
    colors: [],
    status: 'Всі',
  });
  const [debouncedPriceRange] = useDebounce(filters.priceRange, 3000);
  const apiFilters = useMemo(
    () => ({
      ...filters,
      priceRange: debouncedPriceRange,
    }),
    [filters, debouncedPriceRange]
  );
  const { data: categoriesData, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoriesClient(1, 7),
    refetchOnWindowFocus: false,
  });
  const categories: Category[] = categoriesData?.categories ?? [];
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
    queryKey: ['goods', apiFilters],

    queryFn: ({ pageParam }) => {
      let categoryId: string | undefined = undefined;
      if (filters.category !== 'Усі' && categories.length > 0) {
        const selectedCategory = categories.find(
          cat => cat.name === filters.category
        );
        categoryId = selectedCategory?._id;
      }
      const apiGender: Gender | undefined =
        apiFilters.status === 'Всі' ? undefined : apiFilters.status;
      return fetchGoodsClient(
        pageParam,
        12,
        apiGender,
        categoryId,
        filters.sizes,
        apiFilters.priceRange[0],
        apiFilters.priceRange[1]
      );
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      if (!lastPage?.totalPages || currentPage >= lastPage.totalPages) {
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
      priceRange: [1, 5500],
      colors: [],
      status: 'Всі',
    });
  };

  const goods = data?.pages.flatMap(page => page.goods) ?? [];
  const shown = goods.length;
  const total = data?.pages[0]?.totalItems ?? 0;
  return (
    <div className="container">
      <h1 className={css.heading}>
        {filters.category === 'Усі' ? 'Всі товари' : filters.category}
      </h1>
      <div className={css.mobileOnly}>
        <Filters
          currentFilters={filters}
          onFilterChange={setFilters}
          onClearAll={handleClearAll}
          isLoadingCategories={isLoadingCategories}
          categories={categories}
          shown={shown}
          total={total}
        />
      </div>
      <main className={css.main}>
        <aside className={css.tablet}>
          <SidebarFilters
            currentFilters={filters}
            onFilterChange={setFilters}
            onClearAll={handleClearAll}
            isLoadingCategories={isLoadingCategories}
            categories={categories}
            shown={shown}
            total={total}
          />
        </aside>
        <div>
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
        </div>{' '}
        {!isLoading && total < 1 && (
          <div className={css.test}>
            <div className={css.messageContainer}>
              <p className={css.message}>
                За вашим запитом не знайдено жодних товарів, спробуйте змінити
                фільтри, або скинути їх
              </p>
              <button
                type="button"
                onClick={handleClearAll}
                className={css.reset}
              >
                Скинути фільтри
              </button>
            </div>
          </div>
        )}
      </main>{' '}
    </div>
  );
}
