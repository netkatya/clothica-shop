import css from './SidebarFilter.module.css';
import FilterContent from '../FilterContent/FilterContent';

export default function SidebarFilters({
  currentFilters,
  onFilterChange,
  onClearAll,
  Categories,
  isLoadingCategories,
}) {
  return (
    <aside className={css.sidebarContainer}>
      <div className={css.filters}>
        <h3 className={css.filter}>Фільтри</h3>
        <button
          type="button"
          className={css.button}
          //   onClick={onClearAll}
        >
          Очистити всі
        </button>
      </div>
      <p className={css.shown}> Показано X з Y</p>
      <FilterContent
        currentFilters={currentFilters}
        onFilterChange={onFilterChange}
        isLoadingCategories={isLoadingCategories}
        Categories={Categories}
      />
    </aside>
  );
}
