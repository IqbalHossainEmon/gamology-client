import Image from '../../../../../../../../../Shared/Image/Image/Image';
import RippleEffect from '../../../../../../../../../Shared/RippleEffect/RippleEffect';
import DiscoverBannerPrice from '../../DiscoverBannerPrice/DiscoverBannerPrice';

import styles from './DiscoverBannerItem.module.css';

export default function DiscoverBannerItem({ banner, bannerState, activeBanner }) {
	const { coverImg, name, id, price } = banner;
	const idState = activeBanner(id, bannerState, styles);

	return (
		<li className={`${styles.carouselItem} ${idState}`}>
			<Image
				data={coverImg}
				alt={`${name} carousel cover-${id + 1}`}
				aspectRatioClassName={styles.aspectRatioClassName}
			/>
			<div className={styles.itemButton}>
				<DiscoverBannerPrice price={price} />
				<button type='button'>
					buy now
					<RippleEffect background='rgb(255, 255, 255)' long />
				</button>
			</div>
		</li>
	);
}
