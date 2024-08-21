import useScreenWidth from '../../../../../../../../../../Hooks/useScreenWidth';
import DiscountPriceWithPercent from '../../../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './IndiGameAsideHeader.module.css';

export default function IndiGameAsideHeader({ src, name, price, phoneSrc }) {
	const screenWidth = useScreenWidth();

	return (
		<div className={styles.individualGameAsideHeader}>
			<div className={styles.imageContainer}>
				<img alt={name} src={screenWidth < 1024 ? phoneSrc : src} />
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
