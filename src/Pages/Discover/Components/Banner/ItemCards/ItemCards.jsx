import ItemCard from '../ItemCard/ItemCard';
import styles from './ItemCards.module.css';

export default function ItemCards({ data, handleClick, cardsPosition }) {
  return (
    <div className={styles.itemCards}>
      {data.map(({ id, carouselThumb, name }) => (
        <ItemCard
          key={id}
          banner={{ carouselThumb, id, name }}
          handleClick={handleClick}
          cardsPosition={cardsPosition}
        />
      ))}
    </div>
  );
}
