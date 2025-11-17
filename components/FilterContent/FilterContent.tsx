'use client';
import css from './FilterContent.module.css';
import PriceFilter from '../PriceFilter/PriceFilter';
import { SIZES, COLORS, GENDERS, AVAILABLE_COLORS } from '@/constants/goods';
import { FilterContentProps } from '@/types/filters';
import { Gender, Size } from '@/types/good';

const GENDER_MAP: Record<Gender | 'Всі', string> = {
  Всі: 'Всі',
  man: 'Чоловічий',
  women: 'Жіночий',
  unisex: 'Унісекс',
};

const STATUS_OPTIONS: (Gender | 'Всі')[] = ['Всі', ...GENDERS];
export default function FilterContent({
  currentFilters,
  onFilterChange,
  isLoadingCategories,
  categories,
}: FilterContentProps) {
  const handleCategoryClick = (categoryName: string) => {
    onFilterChange(prev => ({ ...prev, category: categoryName }));
  };
  const handleSizeChange = (size: Size) => {
    onFilterChange(prev => {
      const newSizes = prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size];
      return { ...prev, sizes: newSizes };
    });
  };
  const handlePriceChange = (newValues: number[]) => {
    onFilterChange(prev => ({ ...prev, priceRange: newValues }));
  };
  const handleColorClick = (color: string) => {
    onFilterChange(prev => {
      const newColors = prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color];
      return { ...prev, colors: newColors };
    });
  };
  const handleStatusChange = (status: Gender | 'Всі') => {
    onFilterChange(prev => ({ ...prev, status: status }));
  };

  return (
    <div className={css.filterContentContainer}>
      <ul className={css.categoryList}>
        <li
          className={
            currentFilters.category === 'Усі'
              ? `${css.category} ${css.categoryActive}`
              : css.category
          }
          onClick={() => handleCategoryClick('Усі')}
        >
          Усі
        </li>
        {isLoadingCategories ? (
          <li>Завантаження...</li>
        ) : (
          categories.map(category => (
            <li
              className={
                currentFilters.category === category.name
                  ? `${css.category} ${css.categoryActive}`
                  : css.category
              }
              key={category._id}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </li>
          ))
        )}
      </ul>
      <hr className={css.divider} />
      <div>
        <div className={css.filterHeader}>
          <h3>Розмір</h3>
          <button
            type="button"
            onClick={() => onFilterChange(prev => ({ ...prev, sizes: [] }))}
            className={css.clearButtonInternal}
          >
            Очистити
          </button>
        </div>
        <ul className={css.sizeList}>
          {SIZES.map(size => (
            <li key={size} className={css.sizeItem}>
              <input
                type="checkbox"
                id={`size-${size}`}
                className={css.customCheckbox}
                value={size}
                checked={currentFilters.sizes.includes(size)}
                onChange={() => handleSizeChange(size)}
              />
              <label htmlFor={`size-${size}`} className={css.checkboxLabel}>
                {size}
              </label>
            </li>
          ))}
        </ul>
      </div>
      <hr className={css.divider} />
      <div className={css.filterHeader}>
        <h3>Ціна</h3>
        <button
          type="button"
          onClick={() =>
            onFilterChange(prev => ({ ...prev, priceRange: [1, 5000] }))
          }
          className={css.clearButtonInternal}
        >
          Очистити
        </button>
      </div>
      <PriceFilter
        values={currentFilters.priceRange}
        onChange={handlePriceChange}
      />
      <hr className={css.divider} />
      <div>
        <div className={css.filterHeader}>
          <h3>Колір</h3>
          <button
            type="button"
            onClick={() => onFilterChange(prev => ({ ...prev, colors: [] }))}
            className={css.clearButtonInternal}
          >
            Очистити
          </button>
        </div>
        <ul className={css.colorList}>
          {COLORS.map(color => (
            <li key={color}>
              <button
                type="button"
                className={
                  currentFilters.colors.includes(color)
                    ? `${css.color} ${css.colorActive}`
                    : css.color
                }
                onClick={() => handleColorClick(color)}
              >
                {color.charAt(0).toUpperCase() + color.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <hr className={css.divider} />
      <div>
        <div className={css.filterHeader}>
          <h3>Стать</h3>
          <button
            type="button"
            onClick={() => onFilterChange(prev => ({ ...prev, status: 'Всі' }))}
            className={css.clearButtonInternal}
          >
            Очистити
          </button>
        </div>
        <ul className={css.statusList}>
          {STATUS_OPTIONS.map(status => (
            <li key={status} className={css.statusItem}>
              <input
                type="radio"
                id={`status-${status}`}
                name="status-filter-group"
                value={status}
                checked={currentFilters.status === status}
                onChange={() => handleStatusChange(status)}
                className={css.customRadio}
              />
              <label htmlFor={`status-${status}`} className={css.radioLabel}>
                {GENDER_MAP[status]}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
