import Image from '../../../../../../../../../Shared/Image/Image/Image';
import useScreenWidth from '../../../../../../../../../Utils/Hooks/useScreenWidth';
import DiscoverBannerPrice from '../../DiscoverBannerPrice/DiscoverBannerPrice';
import styles from './DiscoverBannerInfoItem.module.css';

export default function DiscoverBannerInfoItem({ banner, bannerState, activeBanner }) {
	const { logoImg, name, id, price } = banner;
	const idState = activeBanner(id, bannerState, styles);

	const { widthInRem } = useScreenWidth();

	return (
		<div className={`${styles.itemInfo}${idState ? ` ${idState}` : ''}`}>
			<div className={styles.logoContainer}>
				<Image data={logoImg} alt={`${name} Logo-${id + 1}`} />
				{widthInRem < 48.0625 && <DiscoverBannerPrice price={price} />}
			</div>
		</div>
	);
}
