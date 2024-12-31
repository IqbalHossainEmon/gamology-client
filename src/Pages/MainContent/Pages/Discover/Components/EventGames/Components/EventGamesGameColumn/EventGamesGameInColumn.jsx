import DiscountPriceWithPercent from '../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import Image from '../../../../../../../../Shared/Image/Image/Image';
import styles from './EventGamesGameInColumn.module.css';

export default function EventGamesGameColumn({ game }) {
	return (
		<li className={styles.gameColumn}>
			<div className={styles.gameImageContainer}>
				<Image
					data={game.carouselThumb}
					alt={game.name}
					aspectRatioClassName={styles.aspectRatioClassName}
					className={styles.image}
				/>
			</div>
			<div className={styles.gameDetails}>
				<h4 className={styles.name}>{game.name}</h4>
				<DiscountPriceWithPercent price={game.price} />
			</div>
		</li>
	);
}
