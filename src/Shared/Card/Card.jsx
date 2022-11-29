import DiscountPriceWithPercent from '../../Pages/Discover/Components/Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './Card.module.css';

export default function Card({ cardInfo }) {
  const { id, name, carouselThumb, category, price } = cardInfo;
  const { card } = category;
  return (
    <div className={styles.card}>
      <img className={styles.cardImg} src={carouselThumb} alt={`${name}-cardThum-${id + 1}`} />
      <p className={styles.category}>
        <small>{card}</small>
      </p>
      <h4 className={styles.name}>{name}</h4>
      <div className={styles.price}>
        <DiscountPriceWithPercent price={price} />
      </div>
    </div>
  );
}
