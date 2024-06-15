import DiscountPriceWithPercent from '../../../../../../../../Shared/DiscountPriceWithPercent/DiscountPriceWithPercent';
import styles from './EventGamesGameInColumn.module.css';

export default function EventGamesGameColumn({ game }) {
	return (
		<li className={styles.GameColumn}>
			<div className={styles.gameImage}>
				<img
					alt={`${game.name}-${game.id}`}
					className={styles.image}
					src={game.carouselThumb}
				/>
			</div>
			<div className={styles.gameDetails}>
				<h4 className={styles.name}>{game.name}</h4>

				<DiscountPriceWithPercent price={game.price} />
			</div>
		</li>
	);
}
