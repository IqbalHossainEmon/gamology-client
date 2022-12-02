import DiscountPriceWithPercent from '../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './GameColumn.module.css';

export default function GameColumn({ game }) {
  return (
    <div className={styles.GameColumn}>
      <div className={styles.gameImage}>
        <img className={styles.image} src={game.carouselThumb} alt={`${game.name}-${game.id}`} />
      </div>
      <div className={styles.gameDetails}>
        <h4 className={styles.name}>{game.name}</h4>
        <DiscountPriceWithPercent price={game.price} />
      </div>
    </div>
  );
}
