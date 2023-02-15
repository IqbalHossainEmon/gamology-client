import ItemCard from '../ItemCard/ItemCard';
import styles from './ItemCards.module.css';

export default function ItemCards({ data, handleClick, cardsPosition, isPause }) {
  return (
    <ul className={styles.itemCards}>
      {data.map(({ id, carouselThumb, name }) => (
        <ItemCard
          key={id}
          isPause={isPause}
          banner={{ carouselThumb, id, name }}
          handleClick={handleClick}
          cardsPosition={cardsPosition}
        />
      ))}
    </ul>
  );
}
