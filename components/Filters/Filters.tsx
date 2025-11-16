'use client';
import css from './Filters.module.css';

import FilterContent from '../FilterContent/FilterContent';
import { useState } from 'react';
import { FilterContainerProps } from '@/types/filters';

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
  return (
    <div>
      <div className={css.filters}>
        <h3 className={css.filter}>Фільтри</h3>
        <button type="button" className={css.button} onClick={onClearAll}>
          Очистити всі
        </button>
      </div>
      <p className={css.shown}>
        {' '}
        Показано {shown} з {total}
      </p>

      <div className={css.filterWrapper}>
        <div className={css.filterDropdownContainer}>
          <div
            className={css.filterDropdownHeader}
            onClick={() => setIsOpen(!isOpen)}
          >
            <h4 className={css.filterDropdownTitle}>Фільтри</h4>
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
