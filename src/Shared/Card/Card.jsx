import { useRef } from 'react';
import DiscountPriceWithPercent from '../DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './Card.module.css';

export default function Card({ cardInfo, style, className, children }) {
	const parentRef = useRef(null);
	const { id, name, carouselThumb, price } = cardInfo;

	return (
		<li
			className={`${className ? `${className} ` : ''}${styles.card} hover-shadow`}
			ref={parentRef}
			{...(style && { style })}
		>
			<img
				alt={`${name}-cardThumb-${id + 1}`}
				className={styles.cardImg}
				src={carouselThumb}
			/>
			<h4 className={styles.name}>{name}</h4>
			<div className={styles.price}>
				<DiscountPriceWithPercent price={price} />
			</div>

			{children ? children(parentRef) : null}
		</li>
	);
}
