import DiscountPriceWithPercent from '../DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './Card.module.css';

export default function Card({ cardInfo, cardsWidth, slider }) {
  const { id, name, carouselThumb, price } = cardInfo;

  return (
    <li
      className={`${styles.card} ${slider && styles.slider} hover-shadow`}
      {...(cardsWidth && { style: { width: `${cardsWidth - 10}px` } })}
    >
      <img className={styles.cardImg} src={carouselThumb} alt={`${name}-cardThumb-${id + 1}`} />
      <h4 className={styles.name}>{name}</h4>
      <div className={styles.price}>
        <DiscountPriceWithPercent price={price} />
      </div>
    </li>
  );
}
