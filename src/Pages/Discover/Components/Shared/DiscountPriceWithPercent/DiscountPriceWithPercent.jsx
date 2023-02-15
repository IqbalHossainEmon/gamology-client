import DiscountPrice from '../DiscountPrice/DiscountPrice';
import styles from './DiscountPriceWithPercent.module.css';

export default function DiscountPriceWithPercent({ price }) {
  return (
    <div className={styles.DiscountPriceWithPercent}>
      {typeof price === 'object' && (
        <div className={[styles.discountPercentage].join(' ')}>
          -{(((price.regular - price.discount) / price.regular) * 100).toFixed(0)}%
        </div>
      )}
      <div className={[styles.discountPrice, styles.discountFontSize].join(' ')}>
        <DiscountPrice price={price} />
      </div>
    </div>
  );
}
