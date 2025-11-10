'use client';

import { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';
import css from './PriceFilter.module.css';

export default function PriceFilter() {
  const [priceValues, setPriceValues] = useState<number[]>([1, 1500]);

  return (
    <div>
      <div className={css.rangeContainer}>
        <Range
          min={1}
          max={5000}
          step={10}
          values={priceValues}
          onChange={values => setPriceValues(values)}
          renderTrack={({ props, children }) => {
            const { ref, ...trackProps } = props;
            return (
              <div
                ref={ref}
                {...trackProps}
                className={css.rangeTrack}
                style={{
                  ...props.style,
                  background: getTrackBackground({
                    values: priceValues,
                    colors: ['#ccc', '#000', '#ccc'],
                    min: 1,
                    max: 5000,
                  }),
                }}
              >
                {children}
              </div>
            );
          }}
          renderThumb={({ props }) => {
            const { key, ...thumbProps } = props;
            return <div key={key} {...thumbProps} className={css.rangeThumb} />;
          }}
        />

        <div className={css.rangeLabels}>
          <span>{Math.round(priceValues[0])}</span>
          <span>{Math.round(priceValues[1])}</span>
        </div>
      </div>
    </div>
  );
}
