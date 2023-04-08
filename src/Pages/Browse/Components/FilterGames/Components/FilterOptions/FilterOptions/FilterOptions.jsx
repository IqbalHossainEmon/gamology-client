import { useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../Shared/RotateArrow/RotateArrow';
import FilterOption from '../Components/FilterOption/FilterOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ option, state, setState }) {
  const [show, setShow] = useState(true);
  const optionRef = useRef();
  const { title, optionList } = option;
  const optionListLength = useRef(optionList.length);

  useEffect(() => {
    optionRef.height =
      optionRef.current.offsetHeight * optionListLength.current +
      optionListLength.current * 20 +
      20;
  }, [optionRef]);

  return (
    <div className={styles.filterOptions}>
      {title && (
        <div
          tabIndex="0"
          role="button"
          onClick={() => setShow((prev) => !prev)}
          className={`${styles.filterTitle} hover-shadow`}
        >
          <h3>{title}</h3>
          <div className={styles.downArrow}>
            <RotateArrow state={show} />
          </div>
        </div>
      )}
      <div
        className={styles.optionList}
        {...(title && {
          style: show
            ? {
                height: `${optionRef.height}px`
              }
            : { height: '0px' }
        })}
      >
        {optionList.map((op) => (
          <FilterOption
            ref={optionRef}
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
