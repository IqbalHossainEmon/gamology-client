import styles from './DiscountPrice.module.css';

export default function DiscountPrice({ price, className }) {
  if (typeof price === 'string') {
    return (
      <span className={className}>
        <span>{price}</span>
      </span>
    );
  }
  if (typeof price === 'object') {
    return (
      <span className={className}>
        <span className={styles.DiscountPrice}>
          <del className={styles.regular}>${price.regular}</del>
          <span className={styles.discount}>${price.discount}</span>
        </span>
      </span>
    );
  }
  return (
    <span className={className}>
      <span>$ {price}</span>
    </span>
  );
}
