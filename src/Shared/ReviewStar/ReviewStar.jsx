import { useCallback, useEffect, useState } from 'react';
import styles from './ReviewStar.module.css';

const emptyStar = 'assets/images/icons/star-empty.png';
const fullStar = 'assets/images/icons/star-full.png';

export default function ReviewStar({ setValue, disabled, newValue = 0 }) {
  const [star, setStar] = useState({ active: 0, show: 0 });

  const handleMouseOver = useCallback((index) => {
    setStar((prev) => ({ ...prev, show: index }));
  }, []);

  useEffect(() => {
    setStar({ active: newValue, show: newValue });
  }, [handleMouseOver, newValue]);

  const handleClick = (active) => {
    setStar((prev) => ({ ...prev, active }));
    setValue((prev) => ({ ...prev, active }));
  };

  return (
    <div
      onMouseLeave={() => setStar((prev) => ({ ...prev, show: prev.active }))}
      className={styles.reviewStar}
    >
      {[0, 1, 2, 3, 4].map((s, i) => (
        <button
          className={
            disabled
              ? `${styles.disabled} ${styles.starButton}`
              : styles.starButton
          }
          type="button"
          key={s}
          {...(disabled || {
            onMouseOver: () => handleMouseOver(i),
            onFocus: () => handleMouseOver(i),
            onClick: () => handleClick(i),
          })}
        >
          <img src={star.show >= i ? fullStar : emptyStar} alt="" />
        </button>
      ))}
    </div>
  );
}
