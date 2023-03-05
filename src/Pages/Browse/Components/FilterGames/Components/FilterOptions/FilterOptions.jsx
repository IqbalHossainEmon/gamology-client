import { useRef } from 'react';
import FilterOption from '../FilterOption/FilterOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ options, state, setState }) {
  const { title, optionList } = options;
  const optionListLength = useRef(optionList.length);
  console.log(optionListLength.current);
  return (
    <div className={styles.filterOptions}>
      {title && (
        <div>
          <h3>{title}</h3>
        </div>
      )}
      <div>
        {optionList.map((op) => (
          <FilterOption
            key={op.id}
            text={op.text}
            border={op.id !== optionListLength.current - 1}
            state={state[op.filter]}
            setState={() => setState((prev) => ({ ...prev, [op.filter]: !prev[op.filter] }))}
          />
        ))}
      </div>
    </div>
  );
}
