import { useEffect, useState } from 'react';
import styles from './ItemCard.module.css';

export default function ItemCard({ banner, handleClick, cardsPosition }) {
  const { carouselThumb, id, name } = banner;

  const handleCardPosition = (num) => {
    switch (num) {
      case 0:
        return (prev) => ({ ...prev, position: styles.first });
      case 1:
        return { position: styles.two, cardChange: 'next' };
      case 2:
        return { position: styles.three, cardChange: 'next2x' };
      case 3:
        return { position: styles.four, cardChange: 'prev2x' };
      case 4:
        return { position: styles.five, cardChange: 'prev' };
      default:
        return (prev) => ({ ...prev });
    }
  };

  const [card, setCard] = useState(handleCardPosition(cardsPosition[id]));

  useEffect(() => {
    setCard(handleCardPosition(cardsPosition[id]));
  }, [cardsPosition, id]);

  const handleCardClick = () => {
    if (card.cardChange === 'next') {
      handleClick({ type: 'next' });
    } else if (card.cardChange === 'prev') {
      handleClick({ type: 'prev' });
    } else if (card.cardChange === 'next2x') {
      handleClick({ type: 'next' });
      setTimeout(() => {
        handleClick({ type: 'next' });
      }, 500);
    } else if (card.cardChange === 'prev2x') {
      handleClick({ type: 'prev' });
      setTimeout(() => {
        handleClick({ type: 'prev' });
      }, 500);
    }
  };
  return (
    <div className={styles.cards} id={card.position}>
      <button type="button" onClick={handleCardClick}>
        <img src={carouselThumb} alt={`${name} card-${id}`} />
      </button>
      <div className={styles.cardName}>{name}</div>
    </div>
  );
}
