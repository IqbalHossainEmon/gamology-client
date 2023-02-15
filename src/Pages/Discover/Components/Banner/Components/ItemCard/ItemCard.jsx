import { useEffect, useState } from 'react';
import styles from './ItemCard.module.css';

export default function ItemCard({ banner, handleClick, cardsPosition, isPause }) {
  const { carouselThumb, id, name } = banner;

  // this function takes card poistions in the screen and returns a object where cards position styles and fucntion is added as element
  const handleCardPosition = (num) => {
    switch (num) {
      case 0:
        return (prev) => ({ ...prev, position: styles.first, cardChange: undefined, active: true });
      case 1:
        return { position: styles.two, cardChange: 'next', clickTimes: 1 };
      case 2:
        return { position: styles.three, cardChange: 'next', clickTimes: 2 };
      case 3:
        return { position: styles.four, cardChange: 'prev', clickTimes: 2 };
      case 4:
        return { position: styles.five, cardChange: 'prev', clickTimes: 1 };
      default:
        return {};
    }
  };

  const [card, setCard] = useState(handleCardPosition(cardsPosition[id]));

  useEffect(() => {
    setCard(handleCardPosition(cardsPosition[id]));
  }, [cardsPosition, id]);

  const handleCardClick = () => {
    handleClick({ type: card.cardChange });
    if (card.clickTimes === 2) {
      const timerId = setTimeout(() => {
        handleClick({ type: card.cardChange });
        clearTimeout(timerId);
      }, 500);
    }
  };

  return (
    <li className={styles.cards} id={card.position}>
      <div className={styles.cardContainer}>
        <button type="button" onClick={handleCardClick}>
          <img src={carouselThumb} alt={`${name} card-${id}`} />
        </button>
        <div className={styles.cardName}>
          <p>{name}</p>
          {card.active && (
            <div className={styles.shadowContainer}>
              <div id={isPause ? styles.pause : styles.play} className={styles.shadow} />
            </div>
          )}
        </div>
      </div>
    </li>
  );
}
