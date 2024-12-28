import DiscountPriceWithPercent from '../../../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../../../Shared/Image/Image';
import useScreenWidth from '../../../../../../../../../../Utils/Hooks/useScreenWidth';
import styles from './IndiGameAsideHeader.module.css';

export default function IndiGameAsideHeader({ src, name, price, phoneSrc }) {
	const screenWidth = useScreenWidth();

	return (
		<div className={styles.individualGameAsideHeader}>
			<div className={styles.imageContainer}>
				<Image alt={name} data={screenWidth < 1024 ? phoneSrc : src} aspectRatio={16 / 9} />
			</div>
			<div>
				<h2 className={styles.name}>{name}</h2>
			</div>
			<div className={styles.price}>
				<DiscountPriceWithPercent price={price} />
			</div>
		</div>
	);
}
