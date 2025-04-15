import DiscountPrice from '../../../../../../../../Shared/DiscountPrice/DiscountPrice';

import styles from './DiscoverBannerPrice.module.css';

function DiscoverBannerPrice({ price }) {
	return price === 0 ? (
		<p className={styles.priceContainer}>Free</p>
	) : (
		<p className={styles.priceContainer}>
			<span>Starts at </span>
			<DiscountPrice className={styles.price} price={price} />
		</p>
	);
}
export default DiscoverBannerPrice;
