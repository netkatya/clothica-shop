import { Range, getTrackBackground } from 'react-range';
import css from './PriceFilter.module.css';
import { PriceFilterProps } from '@/types/filters';

export default function PriceFilter({ values, onChange }: PriceFilterProps) {
  return (
    <div>
      <div className={css.rangeContainer}>
        <Range
          min={1}
          max={5500}
          step={10}
          values={values}
          onChange={newValues => onChange(newValues)}
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
                    values: values,
                    colors: ['#ccc', '#000', '#ccc'],
                    min: 1,
                    max: 5500,
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
          <span>{Math.round(values[0])}</span>
          <span>{Math.round(values[1])}</span>
        </div>
      </div>
    </div>
  );
}
