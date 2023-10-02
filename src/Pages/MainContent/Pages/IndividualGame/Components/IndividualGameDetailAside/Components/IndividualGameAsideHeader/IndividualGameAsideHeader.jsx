import useScreenWidth from '../../../../../../Hooks/useScreenWidth';
import DiscountPriceWithPercent from '../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './IndividualGameAsideHeader.module.css';

export default function IndividualGameAsideHeader({
  src,
  name,
  price,
  phoneSrc,
}) {
  const screenWidth = useScreenWidth();

  return (
    <div className={styles.individualGameAsideHeader}>
      <div className={styles.imageContainer}>
        <img src={screenWidth < 1024 ? phoneSrc : src} alt={name} />
      </div>
      <div className={styles.name}>
        <h2>{name}</h2>
      </div>
      <div className={styles.price}>
        <DiscountPriceWithPercent price={price} />
      </div>
    </div>
  );
}
