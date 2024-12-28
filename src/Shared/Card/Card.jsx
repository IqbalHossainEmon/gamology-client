import { useRef } from 'react';
import DiscountPriceWithPercent from '../DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../Image/Image';
import styles from './Card.module.css';

export default function Card({ cardInfo, style, className, children }) {
	const parentRef = useRef(null);
	const { id, name, img, price } = cardInfo;

	return (
		<li
			className={`${className ? `${className} ` : ''}${styles.card} hover-shadow`}
			ref={parentRef}
			{...(style && { style })}
		>
			<div className={styles.cardImg}>
				<Image data={img} alt={`${name}-cardThumb-${id + 1}`} aspectRatio={3 / 4} />
			</div>
			<h4 className={styles.name}>{name}</h4>
			<div className={styles.price}>
				<DiscountPriceWithPercent price={price} />
			</div>
			{children ? children(parentRef, cardInfo) : null}
		</li>
	);
}
