import styles from './ItemCard.module.css';

export default function ItemCard({ banner, handleClick, cardsPosition }) {
  const { carouselThumb, id, name } = banner;
  let position;
  let cardChange;
  switch (cardsPosition[id]) {
    case 0:
      position = styles.first;
      break;
    case 1:
      position = styles.two;
      cardChange = 'next';
      break;
    case 2:
      position = styles.three;
      cardChange = 'next2x';
      break;
    case 3:
      position = styles.four;
      cardChange = 'prev2x';
      break;
    case 4:
      position = styles.five;
      cardChange = 'prev';
      break;
    default:
      position = 0;
      break;
  }
  const handleCardClick = () => {
    if (cardChange === 'next') {
      handleClick({ type: 'next' });
    } else if (cardChange === 'prev') {
      handleClick({ type: 'prev' });
    } else if (cardChange === 'next2x') {
      handleClick({ type: 'next' });
      setTimeout(() => {
        handleClick({ type: 'next' });
      }, 500);
    } else if (cardChange === 'prev2x') {
      handleClick({ type: 'prev' });
      setTimeout(() => {
        handleClick({ type: 'prev' });
      }, 500);
    }
  };
  return (
    <div className={styles.cards} id={position}>
      <button type="button" onClick={handleCardClick}>
        <img src={carouselThumb} alt={`${name} card-${id}`} />
      </button>
      <div className={styles.cardName}>{name}</div>
    </div>
  );
}
