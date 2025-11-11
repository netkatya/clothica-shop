'use client';

import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import css from './StarRating.module.css';

//component for review modal
interface StarPickerProps {
  onChange?: (rating: number) => void;
  defaultValue?: number;
}

export default function StarPicker({
  onChange,
  defaultValue = 0,
}: StarPickerProps) {
  const [selected, setSelected] = useState(defaultValue);
  const [hovered, setHovered] = useState(0);

  return (
    <div className={css.stars}>
      {Array.from({ length: 5 }, (_, i) => {
        const starNumber = i + 1;
        const filled = hovered >= starNumber || selected >= starNumber;

        return (
          <span
            key={i}
            onMouseEnter={() => setHovered(starNumber)}
            onMouseLeave={() => setHovered(0)}
            onClick={() => {
              setSelected(starNumber);
              onChange?.(starNumber);
            }}
            style={{ cursor: 'pointer' }}
          >
            {filled ? (
              <AiFillStar className={css.starFull} />
            ) : (
              <AiOutlineStar className={css.starEmpty} />
            )}
          </span>
        );
      })}
    </div>
  );
}
