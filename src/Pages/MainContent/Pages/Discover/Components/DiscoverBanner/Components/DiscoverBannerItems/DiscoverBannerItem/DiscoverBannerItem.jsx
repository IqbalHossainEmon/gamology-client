import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import Image from '../../../../../../../../../Shared/Image/Image/Image';
import DiscoverBannerPrice from '../../DiscoverBannerPrice/DiscoverBannerPrice';
import styles from './DiscoverBannerItem.module.css';

export default function DiscoverBannerItem({ banner, bannerState, activeBanner }) {
	const { coverImg, name, id, price } = banner;
	const idState = activeBanner(id, bannerState, styles);

	return (
		<li className={`${styles.carouselItem} ${idState}`}>
			<Image data={coverImg} alt={`${name} carousel cover-${id + 1}`} aspectRatio={16 / 9} />
			<div className={styles.itemButton}>
				<DiscoverBannerPrice price={price} />
				<button type='button'>
					buy now
					<ButtonWaterEffect background='rgb(255, 255, 255)' long />
				</button>
			</div>
		</li>
	);
}
