import DiscoverBannerItem from '../DiscoverBannerItem/DiscoverBannerItem';
import DiscoverBannerItemMobile from '../DiscoverBannerItemMobile/DiscoverBannerItemMobile';
import styles from './DiscoverBannerItems.module.css';

export default function DiscoverBannerItems({
	data,
	bannerState,
	cardsPosition,
	screenWidth,
	activeBanner,
}) {
	return (
		<div className={styles.carouselItems}>
			{data.map(({ coverMobile, coverImg, id, name }, index) =>
				screenWidth > 768 ? (
					<DiscoverBannerItem
						activeBanner={activeBanner}
						banner={{ coverImg, id: index, name }}
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
		</div>
	);
}
