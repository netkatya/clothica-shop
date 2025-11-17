import css from './SidebarFilter.module.css';
import FilterContent from '../FilterContent/FilterContent';
import { FilterContainerProps } from '@/types/filters';

import { useTranslations } from 'next-intl';

export default function SidebarFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
  categories,
  isLoadingCategories,
  shown,
  total,
}: FilterContainerProps) {
  const t = useTranslations('Filters');

  return (
    <div className={css.test}>
      <div className={css.sidebarContainer}>
        <div className={css.filters}>
          <h3 className={css.filter}>{t('title')}</h3>
          <button type="button" className={css.button} onClick={onClearAll}>
            {t('clearAll')}
          </button>
        </div>
        <p className={css.shown}>
          {t('shown')} {shown} {t('of')} {total}
        </p>
        <FilterContent
          currentFilters={currentFilters}
          onFilterChange={onFilterChange}
          isLoadingCategories={isLoadingCategories}
          categories={categories}
        />
      </div>
    </div>
  );
}
