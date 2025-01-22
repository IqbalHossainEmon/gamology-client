import DiscountPriceWithPercent from '../../../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import ImageWithHover from '../../../../../../../../../../Shared/ImageWithHover/ImageWithHover';
import styles from './EventGamesGameInColumn.module.css';

export default function EventGamesGameColumn({ game }) {
	return (
		<li className={styles.gameColumn}>
			<div className={styles.gameImageContainer}>
				<ImageWithHover
					cardHover={null}
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
