import styles from './DiscoverBannerItem.module.css';

export default function DiscoverBannerItem({ banner, bannerState, activeBanner }) {
	const { coverImg, name, id } = banner;
	const idState = activeBanner(id, bannerState, styles);

	return (
		<div
			{...(idState
				? { className: styles.carouselItem, id: idState }
				: { className: styles.itemHide })}
		>
			<img
				alt={`${name} carousel cover-${id + 1}`}
				className={styles.carouselImg}
				src={coverImg}
			/>
			<div className={styles.itemButton}>
				<button type='button'>buy now</button>
			</div>
		</div>
	);
}
