import { forwardRef } from 'react';
import styles from './FilterOption.module.css';

function FilterOption({ text, state, setState, border }, ref) {
  return (
    <div
      ref={ref}
      tabIndex="0"
      role="button"
      onClick={setState}
      className={`${styles.filterOption} ${border && styles.borderBot} hover-shadow`}
    >
      <p className={styles.text}>{text}</p>
      <div className={styles.toggleButtonContainer}>
        <div className={styles.toggleButton} id={state ? styles.filterOn : styles.filterOff}>
          <div className={styles.round} />
        </div>
      </div>
    </div>
  );
}

export default forwardRef(FilterOption);
