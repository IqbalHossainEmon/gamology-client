import DiscountPrice from '../DiscountPrice/DiscountPrice';

import styles from './DiscountPriceWithPercent.module.css';

export default function DiscountPriceWithPercent({ price }) {
	return price.discount ? (
		<div className={styles.discountPriceWithPercent}>
			<p className={styles.discountPercentage}>
				-{(((price.regular - price.discount) / price.regular) * 100).toFixed(0)}%
			</p>
			<p className={styles.discountPrice}>
				<DiscountPrice price={price} />
			</p>
		</div>
	) : (
		<DiscountPrice price={price} className={styles.noDiscount} />
	);
}
