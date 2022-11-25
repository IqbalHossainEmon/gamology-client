import styles from './DiscountPrice.module.css';

export default function DiscountPrice({ price, className }) {
  return (
    <span className={className}>
      {typeof price === 'object' ? (
        <span className={styles.DiscountPrice}>
          <del className={styles.regular}>${price.regular}</del>
          <span className={styles.discount}>${price.discount}</span>
        </span>
      ) : (
        <span>$ {price}</span>
      )}
    </span>
  );
}
