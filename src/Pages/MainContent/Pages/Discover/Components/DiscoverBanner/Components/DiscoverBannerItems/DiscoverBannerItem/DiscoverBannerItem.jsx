import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import Image from '../../../../../../../../../Shared/Image/Image';
import DiscoverBannerPrice from '../../DiscoverBannerPrice/DiscoverBannerPrice';
import styles from './DiscoverBannerItem.module.css';

export default function DiscoverBannerItem({ banner, bannerState, activeBanner }) {
	const { coverImg, name, id, price } = banner;
	const idState = activeBanner(id, bannerState, styles);

	const btnRef = useRef(null);

	return (
		<div className={`${styles.carouselItem} ${idState}`}>
			<Image
				data={coverImg}
				alt={`${name} carousel cover-${id + 1}`}
				aspectRatioClassName={styles.aspectRatioClassName}
			/>
			<div className={styles.itemButton}>
				<DiscoverBannerPrice price={price} />
				<button ref={btnRef} type='button'>
					buy now
					<ButtonWaterEffect btnRef={btnRef} backGround='rgb(255, 255, 255)' long />
				</button>
			</div>
		</div>
	);
}
