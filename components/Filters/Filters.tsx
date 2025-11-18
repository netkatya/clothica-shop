'use client';
import css from './Filters.module.css';

import FilterContent from '../FilterContent/FilterContent';
import { useState } from 'react';
import { FilterContainerProps } from '@/types/filters';

import { useTranslations } from 'next-intl';

export default function Filters({
  currentFilters,
  onFilterChange,
  onClearAll,
  categories,
  isLoadingCategories,
  shown,
  total,
}: FilterContainerProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const t = useTranslations('Filters');
  return (
    <div>
      <div className={css.filters}>
        <h3 className={css.filter}>{t('title')}</h3>
        <button type="button" className={css.button} onClick={onClearAll}>
          {t('clearAll')}
        </button>
      </div>
      <p className={css.shown}>
        {' '}
        {t('shown')} {shown} {t('of')} {total}
      </p>

      <div className={css.filterWrapper}>
        <div className={css.filterDropdownContainer}>
          <div
            className={css.filterDropdownHeader}
            onClick={() => setIsOpen(!isOpen)}
          >
            <h4 className={css.filterDropdownTitle}>{t('title')}</h4>
            <button
              type="button"
              className={css.arrow}
              style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
              aria-label="Open"
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/symbol-defs.svg#icon-down"></use>
              </svg>
            </button>
          </div>
          {isOpen && (
            <FilterContent
              currentFilters={currentFilters}
              onFilterChange={onFilterChange}
              isLoadingCategories={isLoadingCategories}
              categories={categories}
            />
          )}
        </div>
      </div>
    </div>
  );
}
