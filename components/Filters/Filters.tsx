'use client';

import { useState } from 'react';
import css from './Filters.module.css';
import PriceFilter from '../PriceFilter/PriceFilter';

const SIZES = ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL'];
const colors = [
  'Білий',
  'Чорний',
  'Сірий',
  'Синій',
  'Зелений',
  'Червоний',
  'Пастельні відтінки',
];
const STATUS_OPTIONS = ['Всі', 'Жіночий', 'Чоловічий', 'Унісекс'];
export default function Filters() {
  const [selectedColors, setSelectedColors] = useState<string[]>(['Білий']);
  const [selectedStatus, setSelectedStatus] = useState<string>('Всі');
  const [isOpen, setIsOpen] = useState<boolean>(false);
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
  return (
    <div className="container">
      <div className={css.filters}>
        <h3 className={css.filter}>Фільтри</h3>
        <button type="button" className={css.button}>
          Очистити всі
        </button>
      </div>
      <p className={css.shown}> Показано X з Y</p>
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
        {isOpen && (
          <div className={css.filterContent}>
            <ul className={css.categoryList}>
              <li className={css.category}>Усі</li>
              <li className={css.category}>Футболки та сорочки</li>
              <li className={css.category}>Штани та джинси</li>
              <li className={css.category}>Верхній одяг</li>
              <li className={css.category}>Топи та майки</li>
              <li className={css.category}>Сукні та спідниці</li>
              <li className={css.category}>Домашній та спортивний одяг</li>
              <li className={css.category}>Худі та кофти</li>
            </ul>
            <hr className={css.divider} />
            <div>
              <div className={css.filterHeader}>
                <h3>Розмір</h3>
                <button type="button" className={css.clearButtonInternal}>
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
                      // checked={currentFilters.sizes?.includes(size) || false}
                      // onChange={() => handleSizeChange(size)}
                    />
                    <label
                      htmlFor={`size-${size}`}
                      className={css.checkboxLabel}
                    >
                      {size}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className={css.divider} />
            <div className={css.filterHeader}>
              <h3>Ціна</h3>
              <button type="button" className={css.clearButtonInternal}>
                Очистити
              </button>
            </div>
            <PriceFilter key={1} />
            <hr className={css.divider} />
            <div className={css.filterHeader}>
              <h3>Колір</h3>
              <button type="button" className={css.clearButtonInternal}>
                Очистити
              </button>
            </div>
            <ul className={css.colorList}>
              {colors.map(color => (
                <li key={color}>
                  <button
                    className={
                      selectedColors.includes(color)
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
            <hr className={css.divider} />
            <div className={css.filterHeader}>
              <h3>Стать</h3>
              <button type="button" className={css.clearButtonInternal}>
                Очистити
              </button>
            </div>
            <ul className={css.statusList}>
              {STATUS_OPTIONS.map(status => (
                <li key={status} className={css.statusItem}>
                  <input
                    type="radio"
                    id={`status-${status}`}
                    name="status"
                    value={status}
                    checked={selectedStatus === status}
                    onChange={() => setSelectedStatus(status)}
                    className={css.customRadio}
                  />
                  <label
                    htmlFor={`status-${status}`}
                    className={css.radioLabel}
                  >
                    {status}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
