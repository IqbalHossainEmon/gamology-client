import { useEffect, useRef, useState } from 'react';
import RotateArrow from '../../../../../../../Shared/RotateArrow/RotateArrow';
import FilterOption from '../Components/FilterOption/FilterOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({ option, state, setState }) {
  const { title, optionList } = option;
  const optionRef = useRef(0);
  const [show, setShow] = useState({
    show: true,
    height: NaN,
  });

  useEffect(() => {
    setShow((prev) => ({
      ...prev,
      height: optionRef.current.offsetHeight,
    }));
  }, []);

  return (
    <div className={styles.filterOptions}>
      {title && (
        <div
          tabIndex="0"
          role="button"
          onClick={() => setShow((prev) => ({ ...prev, show: !prev.show }))}
          className={styles.filterTitle}
        >
          <h3>{title}</h3>
          <div className={styles.downArrow}>
            <RotateArrow state={show.show} />
          </div>
        </div>
      )}

      <div
        className={styles.optionList}
        ref={optionRef}
        {...(title && {
          style: show.show
            ? {
                height: `${show.height}px`,
              }
            : { height: '0px' },
        })}
      >
        {optionList.map((op) => (
          <FilterOption
            key={op.id}
            text={op.text}
            border={op.id !== optionList.length - 1}
            state={state[op.filter]}
            name={op.filter}
            setState={setState}
          />
        ))}
      </div>
    </div>
  );
}
