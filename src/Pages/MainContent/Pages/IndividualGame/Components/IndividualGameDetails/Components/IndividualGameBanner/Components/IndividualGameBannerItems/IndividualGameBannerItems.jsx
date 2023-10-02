import { useRef } from 'react';
import useHandleDebouncing from '../../../../../../../../Hooks/useHandleDebouncing';
import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import IndividualGameBannerItem from '../IndividualGameBannerItem/IndividualGameBannerItem';
import styles from './IndividualGameBannerItems.module.css';

export default function IndividualGameBannerItems({
  active,
  items,
  dispatch,
  transition,
  timerFunction,
}) {
  const containerRef = useRef(null);
  const handleDebounce = useHandleDebouncing(300);

  return (
    <div className={styles.individualGameBannerItemsContainer}>
      <ArrowButton
        className={[styles.prev, styles.arrowButton].join(' ')}
        handleClick={() =>
          handleDebounce(() => {
            dispatch({ type: 'prevBanner' });
            timerFunction(null, dispatch, 300);
          })
        }
      />
      <ul
        ref={containerRef}
        style={
          transition
            ? {
                translate: containerRef.current
                  ? `calc(-${active * 100}% - ${active * 20}px)`
                  : '0px',
                transition: 'translate 250ms ease-in-out',
              }
            : {
                translate: containerRef.current
                  ? `calc(-${active * 100}% - ${active * 20}px)`
                  : '0px',
              }
        }
        className={styles.individualGameBannerItems}
      >
        {items.map((item, index) => (
          <IndividualGameBannerItem
            key={item.id}
            data={item}
            active={active}
            index={index}
            transition={transition}
          />
        ))}
      </ul>
      <ArrowButton
        className={[styles.next, styles.arrowButton].join(' ')}
        handleClick={() =>
          handleDebounce(() => {
            dispatch({ type: 'nextBanner' });
            timerFunction(null, dispatch, 300);
          })
        }
      />
    </div>
  );
}
