import { useEffect, useRef, useState } from 'react';
import FilterOption from '../../../../../../../../../Shared/FilterOption/FilterOption/FilterOption';
import RotateArrow from '../../../../../../../../../Shared/RotateArrow/RotateArrow';
import FilterRangeOption from '../Container/FilterRangeOption/FilterRangeOption/FilterRangeOption';
import styles from './FilterOptions.module.css';

export default function FilterOptions({
  option,
  state,
  setState,
  limits = {},
}) {
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
        {optionList.map((op, i) => {
          switch (op.type) {
            case 'switch':
              return (
                <FilterOption
                  key={op.id}
                  text={op.text}
                  border={i !== optionList.length - 1}
                  state={state[op.filter]}
                  name={op.filter}
                  setState={setState}
                />
              );
            default:
              return (
                <FilterRangeOption
                  key={op.id}
                  limit={limits[op.rangeName]}
                  setState={setState}
                  option={op}
                  {...(state.ShowOnlyFreeGames &&
                    op.rangeName === 'price' && { disabled: true })}
                />
              );
          }
        })}
      </div>
    </div>
  );
}
