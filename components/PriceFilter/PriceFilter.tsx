'use client';

import { useState } from 'react'; // Імпортуємо useState
import { Range, getTrackBackground } from 'react-range';
import css from './PriceFilter.module.css'; // Переконайтесь, що цей CSS підключений

// 1. Прибираємо пропси, компонент тепер самостійний
export default function PriceFilter() {
  // 2. Додаємо локальний стан для керування повзунками
  // Початкові значення - 1 та 5000
  const [priceValues, setPriceValues] = useState<number[]>([1, 1500]);

  // 3. Функція "Очистити" скидає локальний стан

  return (
    <div>
      {/* --- Контейнер для слайдера --- */}
      <div className={css.rangeContainer}>
        <Range
          // 4. Оновлюємо min/max
          min={1}
          max={5000}
          step={10} // Крок 10, щоб було зручніше
          // 5. Використовуємо локальний стан
          values={priceValues}
          // 6. 'onChange' оновлює локальний стан
          onChange={values => setPriceValues(values)}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              className={css.rangeTrack}
              style={{
                ...props.style,
                background: getTrackBackground({
                  // 7. Передаємо локальні значення та нові min/max
                  values: priceValues,
                  colors: ['#ccc', '#000', '#ccc'],
                  min: 1,
                  max: 5000,
                }),
              }}
            >
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} className={css.rangeThumb} />
          )}
        />

        {/* --- 8. Підписи показують локальний стан --- */}
        <div className={css.rangeLabels}>
          <span>{Math.round(priceValues[0])}</span>
          <span>{Math.round(priceValues[1])}</span>
        </div>
      </div>
    </div>
  );
}
