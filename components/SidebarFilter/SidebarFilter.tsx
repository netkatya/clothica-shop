import css from './SidebarFilter.module.css';
import FilterContent from '../FilterContent/FilterContent';
import { FilterContainerProps } from '@/types/filters';

export default function SidebarFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
  categories,
  isLoadingCategories,
  shown,
  total,
}: FilterContainerProps) {
  return (
    <div className={css.sidebarContainer}>
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
      <FilterContent
        currentFilters={currentFilters}
        onFilterChange={onFilterChange}
        isLoadingCategories={isLoadingCategories}
        categories={categories}
      />
    </div>
  );
}
