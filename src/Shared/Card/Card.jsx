import { useRef } from 'react';
import DiscountPriceWithPercent from '../DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './Card.module.css';

export default function Card({ cardInfo, style, className, children }) {
    const parentRef = useRef(null);

    const { id, name, carouselThumb, price } = cardInfo;

    return (
        <li
            ref={parentRef}
            className={`${className ? `${className} ` : ''}${styles.card} hover-shadow`}
            {...(style && { style })}
        >
            <img className={styles.cardImg} src={carouselThumb} alt={`${name}-cardThumb-${id + 1}`} />
            <h4 className={styles.name}>{name}</h4>
            <div className={styles.price}>
                <DiscountPriceWithPercent price={price} />
            </div>
            {children && children(parentRef)}
        </li>
    );
}
