import useHandleDebouncing from '../../../../../../Hooks/useHandleDebouncing';
import ItemCard from '../ItemCard/ItemCard';
import styles from './ItemCards.module.css';

export default function ItemCards({
  data,
  handleClick,
  cardsPosition,
  isPause,
}) {
  const handleDebouncing = useHandleDebouncing();

  return (
    <ul className={styles.itemCards}>
      {data.map(({ id, carouselThumb, name }) => (
        <ItemCard
          key={id}
          isPause={isPause}
          banner={{ carouselThumb, id, name }}
          handleClick={(prop) => handleDebouncing(() => handleClick(prop))}
          cardsPosition={cardsPosition}
        />
      ))}
    </ul>
  );
}
