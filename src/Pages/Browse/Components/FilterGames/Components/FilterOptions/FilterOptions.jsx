import { useEffect, useRef, useState } from 'react';
import useElementSize from '../../../../../../Hooks/useElementSize';
import RotateArrow from '../../../../../../Shared/RotateArrow/RotateArrow';
import FilterOption from '../FilterOption/FilterOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ options, state, setState }) {
  const [show, setShow] = useState(true);
  const option = useRef();
  const getElementHeight = useElementSize();
  const { title, optionList } = options;
  const optionListLength = useRef(optionList.length);

  useEffect(() => {
    option.height =
      getElementHeight(option.current, 'height') * optionListLength.current +
      optionListLength.current * 20 +
      20;
  }, [getElementHeight, option]);

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
                height: `${option.height}px`
              }
            : { height: '0px' }
        })}
      >
        {optionList.map((op) => (
          <FilterOption
            ref={option}
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
