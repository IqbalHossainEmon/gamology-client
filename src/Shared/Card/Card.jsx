import DiscountPriceWithPercent from '../../Pages/Discover/Components/Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './Card.module.css';

export default function Card({ cardInfo, screenWidth }) {
  const { id, name, carouselThumb, category, price } = cardInfo;
  const { card } = category;
  let width;
  if (screenWidth > 2134) {
    width = '242px';
  } else if (screenWidth < 2135 && screenWidth >= 1600) {
    width = screenWidth / 8.88888889;
  } else if (screenWidth < 1600 && screenWidth > 1024) {
    // eslint-disable-next-line no-unused-vars
    width = screenWidth / 7.14477212;
  }
  const style = {};
  return (
    <div className={styles.card} style={style}>
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
