import { useEffect, useState } from 'react';
import Image from '../../../../../../../../Shared/Image/Image/Image';
import styles from './DiscoverBannerItemMobile.module.css';

export default function DiscoverBannerItemMobile({ banner, cardsPosition }) {
	const { coverMobile, name, id } = banner;
	const [position, setPosition] = useState(0);

	useEffect(() => {
		switch (cardsPosition[id]) {
			case 0:
				setPosition(styles.first);
				break;
			case 1:
				setPosition(styles.two);
				break;
			case 2:
				setPosition(styles.three);
				break;
			case 3:
				setPosition(styles.four);
				break;
			case 4:
				setPosition(styles.five);
				break;
			default:
				setPosition(0);
				break;
		}
	}, [cardsPosition, id]);

	return (
		<li className={`${styles.carouselItem} ${position}`}>
			<Image
				data={coverMobile}
				alt={`${name} carousel cover-${id + 1}`}
				aspectRatioClassName={styles.aspectRatioClassName}
			/>
		</li>
	);
}
