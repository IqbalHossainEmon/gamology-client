import DiscoverBannerItemMobile from '../../DiscoverBannerItemMobile/DiscoverBannerItemMobile';
import DiscoverBannerItem from '../DiscoverBannerItem/DiscoverBannerItem';

import styles from './DiscoverBannerItems.module.css';

export default function DiscoverBannerItems({
	data,
	bannerState,
	cardsPosition,
	screenWidth,
	activeBanner,
}) {
	return (
		<ul className={styles.carouselItems}>
			{data.map(({ coverMobile, coverImg, id, name, price }, index) =>
				screenWidth > 48 ? (
					<DiscoverBannerItem
						activeBanner={activeBanner}
						banner={{ coverImg, id: index, name, price }}
						bannerState={bannerState}
						key={id}
					/>
				) : (
					<DiscoverBannerItemMobile
						banner={{ coverMobile, id: index, name }}
						cardsPosition={cardsPosition}
						key={id}
					/>
				)
			)}
		</ul>
	);
}
