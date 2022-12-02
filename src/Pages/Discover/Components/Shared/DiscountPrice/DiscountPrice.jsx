import { useEffect, useState } from 'react';
import styles from './DiscountPrice.module.css';

export default function DiscountPrice({ price, className }) {
  const [element, setElement] = useState('');

  useEffect(() => {
    if (typeof price === 'string') {
      setElement(<span>{price}</span>);
    } else if (typeof price === 'object') {
      setElement(
        <span className={styles.DiscountPrice}>
          <del className={styles.regular}>${price.regular}</del>
          <span className={styles.discount}>${price.discount}</span>
        </span>
      );
    } else {
      setElement(<span>$ {price}</span>);
    }
  }, [price]);

  return <span className={className}>{element}</span>;
}
