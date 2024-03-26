import { useEffect, useRef } from 'react';
import useScreenWidth from '../../../../../../../../../../Hooks/useScreenWidth';
import ArrowButton from '../../../../../../../../../../Shared/ArrowButton/ArrowButton';
import IndiGameBannerCard from '../IndiGameBannerCard/IndiGameBannerCard';
import styles from './IndiGameBannerCards.module.css';

export default function IndiGameBannerCards({ active, items, dispatch, timerFunction, cardsOnDeck, cardActive, thumbTransition }) {
  const screenWidth = useScreenWidth();

  const cardsOnDeckRef = useRef(cardsOnDeck);
  cardsOnDeckRef.current = cardsOnDeck;

  useEffect(() => {
    let cards = 8;

    if (screenWidth <= 2134 && screenWidth >= 1700) {
      cards = 7;
    } else if (screenWidth <= 1699 && screenWidth >= 1464) {
      cards = 6;
    } else if (
      (screenWidth <= 1463 && screenWidth >= 1260) ||
      (screenWidth <= 1023 && screenWidth >= 860) ||
      (screenWidth <= 768 && screenWidth >= 612)
    ) {
      cards = 5;
    } else if (
      (screenWidth <= 1259 && screenWidth >= 1024) ||
      (screenWidth <= 859 && screenWidth >= 769) ||
      (screenWidth <= 611 && screenWidth >= 530)
    ) {
      cards = 4;
    } else if (screenWidth <= 529 && screenWidth >= 404) {
      cards = 3;
    } else if (screenWidth <= 403 && screenWidth >= 312) {
      cards = 2;
    } else if (screenWidth <= 311 && screenWidth >= 0) {
      cards = 1;
    }

    if (cardsOnDeckRef.current !== cards) {
      dispatch({ type: 'screenSizeChange', cardsOnDeck: cards });
    }
  }, [dispatch, screenWidth]);

  return (
    <div className={styles.cardsContainer}>
      <ArrowButton
        name="Previous Button"
        handleClick={() => {
          dispatch({ type: 'prevCards' });
          timerFunction(false, dispatch, 250);
        }}
        className={[styles.btn, styles.prevBtn].join(' ')}
      />
      <div className={styles.cardsWrapper}>
        <ul
          style={
            thumbTransition
              ? {
                  width: `${Math.ceil(items.length / cardsOnDeck) * 100}%`,
                  translate: `calc(-${
                    Math.ceil(items.length / cardsOnDeck) ? (100 / Math.ceil(items.length / cardsOnDeck)) * cardActive : 0
                  }% - ${cardsOnDeck > 1 ? cardActive * 15 : 0}px)`,
                  transition: 'translate 250ms',
                }
              : {
                  width: `${Math.ceil(items.length / cardsOnDeck) * 100}%`,
                  translate: `calc(-${
                    Math.ceil(items.length / cardsOnDeck) ? (100 / Math.ceil(items.length / cardsOnDeck)) * cardActive : 0
                  }% - ${cardsOnDeck > 1 ? cardActive * 15 : 0}px)`,
                }
          }
          className={styles.individualGameBannerCards}
        >
          {items.map((item, index) => (
            <IndiGameBannerCard key={item.id} index={index} data={item} active={active} dispatch={dispatch} timerFunction={timerFunction} />
          ))}
        </ul>
      </div>
      <ArrowButton
        name="next Button"
        handleClick={() => {
          dispatch({ type: 'nextCards' });
          timerFunction(false, dispatch, 250);
        }}
        className={[styles.btn, styles.nextBtn].join(' ')}
      />
    </div>
  );
}
