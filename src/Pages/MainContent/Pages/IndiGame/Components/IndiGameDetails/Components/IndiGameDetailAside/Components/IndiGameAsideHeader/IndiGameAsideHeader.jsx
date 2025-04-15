import DiscountPriceWithPercent from '../../../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../../../Shared/Image/Image/Image';
import useScreenWidth from '../../../../../../../../../../Utils/Hooks/useScreenWidth';

import styles from './IndiGameAsideHeader.module.css';

export default function IndiGameAsideHeader({ src, name, price, phoneSrc }) {
	const { widthInRem } = useScreenWidth();

	return (
		<div className={styles.individualGameAsideHeader}>
			<div className={styles.imageContainer}>
				<Image
					alt={name}
					data={widthInRem < 64 ? phoneSrc : src}
					aspectRatioClassName={styles.aspectRatioClassName}
				/>
			</div>
			<div className={styles.price}>
				<DiscountPriceWithPercent price={price} />
			</div>
		</div>
	);
}
