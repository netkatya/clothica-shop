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
import { useState, useMemo, useRef, useEffect } from 'react';
import SidebarFilters from '@/components/SidebarFilter/SidebarFilter';
import { AllFiltersState } from '@/types/filters';
import { Category } from '@/types/category';
import { useDebounce } from 'use-debounce';
import { ColorOfGood, Gender, Size } from '@/types/good';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

const getFiltersFromParams = (
  searchParams: URLSearchParams
): AllFiltersState => {
  const category = searchParams.get('category') || 'Усі';
  const status = (searchParams.get('status') as Gender | 'Всі') || 'Всі';
  const sizes = (searchParams.get('sizes')?.split(',') as Size[]) || [];
  const colors =
    (searchParams.get('colors')?.split(',') as ColorOfGood[]) || [];
  const priceMin = Number(searchParams.get('price_min')) || 1;
  const priceMax = Number(searchParams.get('price_max')) || 5500;
  return {
    category,
    status,
    sizes,
    colors,
    priceRange: [priceMin, priceMax],
  };
};

export default function GoodsClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [filters, setFilters] = useState<AllFiltersState>(() =>
    getFiltersFromParams(searchParams)
  );
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
  const isInitialRender = useRef(true);
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
      if (apiFilters.category !== 'Усі' && categories.length > 0) {
        const selectedCategory = categories.find(
          cat => cat.name === apiFilters.category
        );
        categoryId = selectedCategory?._id;
      }
      const apiGender: Gender | undefined =
        apiFilters.status === 'Всі' ? undefined : apiFilters.status;
      const apiColors = apiFilters.colors.map(
        (color: string) => color.toLowerCase() as ColorOfGood
      );
      return fetchGoodsClient({
        page: String(pageParam),
        perPage: '12',
        gender: apiGender,
        category: categoryId,
        colors: apiColors,
        size: apiFilters.sizes,
        minPrice: String(apiFilters.priceRange[0]),
        maxPrice: String(apiFilters.priceRange[1]),
      });
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const currentPage = allPages.length;
      if (
        !lastPage?.meta.totalPages ||
        currentPage >= lastPage.meta.totalPages
      ) {
        return undefined;
      }
      return currentPage + 1;
    },
    refetchOnMount: false,
  });
  useEffect(() => {
    if (isInitialRender.current) {
      isInitialRender.current = false;
      return;
    }
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [apiFilters]);
  useEffect(() => {
    const params = new URLSearchParams();
    if (apiFilters.category !== 'Усі') {
      params.set('category', apiFilters.category);
    }
    if (apiFilters.status !== 'Всі') {
      params.set('status', apiFilters.status);
    }
    if (apiFilters.sizes.length > 0) {
      params.set('sizes', apiFilters.sizes.join(','));
    }
    if (apiFilters.colors.length > 0) {
      params.set('colors', apiFilters.colors.join(','));
    }

    const isDefaultPrice =
      apiFilters.priceRange[0] === 1 && apiFilters.priceRange[1] === 5500;
    if (!isDefaultPrice) {
      params.set('price_min', String(apiFilters.priceRange[0]));
      params.set('price_max', String(apiFilters.priceRange[1]));
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [apiFilters, pathname, router]);
  const handleClearAll = () => {
    setFilters({
      category: 'Усі',
      sizes: [],
      priceRange: [1, 5500],
      colors: [],
      status: 'Всі',
    });
  };

  const goods = data?.pages.flatMap(page => page.data) ?? [];
  const shown = goods.length;
  const total = data?.pages[0]?.meta?.totalItems ?? 0;
  const handleLoadMore = () => {
    fetchNextPage().then(() => {
      requestAnimationFrame(() => {
        window.scrollBy({
          top: 879,
          behavior: 'smooth',
        });
      });
    });
  };

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
        <div className={css.contentArea}>
          <AllGoodsList goods={goods}></AllGoodsList>{' '}
          <div className={css.buttonContainer}>
            {hasNextPage && (
              <button
                onClick={handleLoadMore}
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
