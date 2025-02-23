import styles from './DiscountPrice.module.css';

export default function DiscountPrice({ price, className }) {
	if (typeof price === 'object') {
		return (
			<span className={`${styles.discountPrice}${className ? ` ${className}` : ''}`}>
				<span className={styles.regularContainer}>
					<span className={styles.regular}>${price.regular}</span>*
				</span>
				<ins className={styles.discount}>${price.discount}</ins>
			</span>
		);
	}
	if (price === 0) {
		return (
			<span className={className}>
				<span>Free</span>
			</span>
		);
	}
	return (
		<span className={className}>
			<span>${price}</span>
		</span>
	);
}
