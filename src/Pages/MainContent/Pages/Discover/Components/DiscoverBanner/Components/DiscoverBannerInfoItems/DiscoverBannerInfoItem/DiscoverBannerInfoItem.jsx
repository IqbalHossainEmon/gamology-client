import Image from '../../../../../../../../../Shared/Image/Image';
import useScreenWidth from '../../../../../../../../../Utils/Hooks/useScreenWidth';
import DiscoverBannerPrice from '../../DiscoverBannerPrice/DiscoverBannerPrice';
import styles from './DiscoverBannerInfoItem.module.css';

export default function DiscoverBannerInfoItem({ banner, bannerState, activeBanner }) {
	const { logoImg, name, id, price } = banner;
	const idState = activeBanner(id, bannerState, styles);

	const screenWidth = useScreenWidth();

	return (
		<div className={`${styles.itemInfo}${idState ? ` ${idState}` : ''}`}>
			<div className={styles.logoContainer}>
				<Image data={logoImg} alt={`${name} Logo-${id + 1}`} />
				{screenWidth < 769 && <DiscoverBannerPrice price={price} />}
			</div>
		</div>
	);
}
