'use client';
import css from './Filters.module.css';

import FilterContent from '../FilterContent/FilterContent';
import { useState } from 'react';
import { QueryClient } from '@tanstack/react-query';

export default function Filters() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <div className="container">
      <div className={css.filters}>
        <h3 className={css.filter}>Фільтри</h3>
        <button
          type="button"
          className={css.button}
          // onClick={onClearAll}
        >
          Очистити всі
        </button>
      </div>
      <p className={css.shown}> Показано X з Y</p>

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
            >
              <svg width="24" height="24" aria-hidden="true">
                <use href="/symbol-defs.svg#icon-down"></use>
              </svg>
            </button>
          </div>
          {isOpen && <FilterContent />}
        </div>
      </div>
    </div>
  );
}
