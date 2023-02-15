import DiscountPriceWithPercent from '../../Pages/Discover/Components/Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './Card.module.css';

export default function Card({ cardInfo, cardsWidth, slider }) {
  const { id, name, carouselThumb, category, price } = cardInfo;
  const { card } = category;

  return (
    <li
      className={`${styles.card} ${slider && styles.slider}`}
      {...(cardsWidth && { style: { width: `${cardsWidth - 10}px` } })}
    >
      <img className={styles.cardImg} src={carouselThumb} alt={`${name}-cardThum-${id + 1}`} />
      <p className={styles.category}>
        <small>{card}</small>
      </p>
      <h4 className={styles.name}>{name}</h4>
      <div className={styles.price}>
        <DiscountPriceWithPercent price={price} />
      </div>
    </li>
  );
}
