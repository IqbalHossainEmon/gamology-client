import { useCallback } from 'react';
import FilterSwitch from '../FilterSwitch/FilterSwitch';
import styles from './FilterOption.module.css';

function FilterOption({ text, setState, border, state, name }) {
  const handleClick = useCallback(() => {
    setState(prev => ({ ...prev, [name]: !prev[name] }), name);
    document.removeEventListener('mouseup', handleClick);
  }, [name, setState]);
  return (
    <div
      tabIndex="0"
      role="button"
      onMouseDown={() => {
        document.addEventListener('mouseup', handleClick);
      }}
      className={
        border && styles.borderBot
          ? `${styles.filterOption} ${styles.borderBot} ${styles.shadow}`
          : `${styles.filterOption} ${styles.shadow}`
      }
    >
      <p className={styles.text}>{text}</p>
      <div className={styles.toggleButtonContainer}>
        <FilterSwitch event={handleClick} state={state} setState={setState} name={name} />
      </div>
    </div>
  );
}

export default FilterOption;
