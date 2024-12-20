import DiscountPrice from '../../../../../../../../../Shared/DiscountPrice/DiscountPrice';
import styles from './DiscoverBannerInfoItem.module.css';

export default function DiscoverBannerInfoItem({ banner, bannerState, activeBanner }) {
	const { logoImg, name, id, price } = banner;
	const idState = activeBanner(id, bannerState, styles);

	return (
		<div className={styles.itemInfo} {...(idState && { id: idState })}>
			<img alt={`${name} Logo-${id + 1}`} className={styles.logoImg} src={logoImg} />
			{price === 0 ? (
				<p className={styles.priceContainer}>Free</p>
			) : (
				<p className={styles.priceContainer}>
					<span>Starts at </span>
					<DiscountPrice className={styles.price} price={price} />
				</p>
			)}
		</div>
	);
}
