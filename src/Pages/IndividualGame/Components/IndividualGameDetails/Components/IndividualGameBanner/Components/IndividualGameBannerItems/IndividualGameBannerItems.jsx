import { useEffect, useRef } from 'react';
import ArrowButton from '../../../../../../../../Shared/ArrowButton/ArrowButton';
import IndividualGameBannerItem from '../IndividualGameBannerItem/IndividualGameBannerItem';
import styles from './IndividualGameBannerItems.module.css';

export default function IndividualGameBannerItems({ active, items, dispatch }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.width = containerRef.current.clientWidth;
    }
  }, [containerRef]);

  return (
    <div className={styles.individualGameBannerItemsContainer}>
      <ArrowButton
        className={[styles.prev, styles.arrowButton].join(' ')}
        handleClick={() => {
          dispatch({ type: 'prevBanner' });
        }}
      />
      <ul
        ref={containerRef}
        style={{
          translate: containerRef.current
            ? `-${active * containerRef.width}px`
            : '0px',
        }}
        className={styles.individualGameBannerItems}
      >
        {items.map((item, index) => (
          <IndividualGameBannerItem
            key={item.id}
            data={item}
            active={active}
            index={index}
          />
        ))}
      </ul>
      <ArrowButton
        className={[styles.next, styles.arrowButton].join(' ')}
        handleClick={() => {
          dispatch({ type: 'nextBanner' });
        }}
      />
    </div>
  );
}
