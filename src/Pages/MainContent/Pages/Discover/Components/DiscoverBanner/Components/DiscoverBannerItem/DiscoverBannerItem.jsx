import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './DiscoverBannerItem.module.css';

export default function DiscoverBannerItem({ banner, bannerState, activeBanner }) {
	const { coverImg, name, id } = banner;
	const idState = activeBanner(id, bannerState, styles);

	const btnRef = useRef(null);

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
				<button ref={btnRef} type='button'>
					buy now
					<ButtonWaterEffect btnRef={btnRef} backGround='rgb(255, 255, 255)' long />
				</button>
			</div>
		</div>
	);
}
