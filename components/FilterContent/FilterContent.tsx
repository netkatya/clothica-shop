'use client';
import css from './FilterContent.module.css';
import PriceFilter from '../PriceFilter/PriceFilter';
import { useState } from 'react';
import { SIZES, COLORS } from '@/constants/goods';
import { fetchCategoriesClient } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';

const STATUS_OPTIONS = ['Всі', 'Жіночий', 'Чоловічий', 'Унісекс'];

export default function FilterContent() {
  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategoriesClient(1, 7),
    refetchOnWindowFocus: false,
  });
  const [selectedColors, setSelectedColors] = useState<string[]>(['Білий']);
  const [selectedStatus, setSelectedStatus] = useState<string>('Всі');
  const handleColorClick = (color: string) => {
    setSelectedColors(prevSelected => {
      const isSelected = prevSelected.includes(color);
      if (isSelected) {
        return prevSelected.filter(c => c !== color);
      } else {
        return [...prevSelected, color];
      }
    });
  };
  const categories = data?.data ?? [];
  return (
    <div className={css.filterContentContainer}>
      <div className={css.filterHeader}>
        <h3>Категорії</h3>
        <button
          type="button"
          // onClick={() => onFilterChange('sizes', [])}
          className={css.clearButtonInternal}
        >
          Очистити
        </button>
      </div>
      <ul className={css.categoryList}>
        <li className={css.category}>Усі</li>
        {categories.map(category => (
          <li className={css.category} key={category._id}>
            {category.name}
          </li>
        ))}
      </ul>
      <hr className={css.divider} />

      <div>
        <div className={css.filterHeader}>
          <h3>Розмір</h3>
          <button
            type="button"
            // onClick={() => onFilterChange('sizes', [])}
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
                // checked={currentFilters.sizes.includes(size)}
                // onChange={() => handleSizeChange(size)}
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
          type-="button"
          // onClick={() => onFilterChange('priceRange', [1, 5000])}
          className={css.clearButtonInternal}
        >
          Очистити
        </button>
      </div>
      <PriceFilter />
      <hr className={css.divider} />
      <div>
        <div className={css.filterHeader}>
          <h3>Колір</h3>
          <button
            type="button"
            // onClick={() => onFilterChange('colors', [])}
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
                  COLORS.includes(color)
                    ? `${css.color} ${css.colorActive}`
                    : css.color
                }
                onClick={() => handleColorClick(color)}
              >
                {color}
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
            // onClick={() => onFilterChange('status', 'Всі')}
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
                // checked={currentFilters.status === status}
                // onChange={() => handleStatusChange(status)}
                className={css.customRadio}
              />
              <label htmlFor={`status-${status}`} className={css.radioLabel}>
                {status}
              </label>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
