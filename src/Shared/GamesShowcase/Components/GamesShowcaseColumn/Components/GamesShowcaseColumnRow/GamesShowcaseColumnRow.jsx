import DiscountPriceWithPercent from '../../../../../DiscountPriceWithPercent/DiscountPriceWithPercent';
import ImageWithHover from '../../../../../ImageWithHover/ImageWithHover';
import styles from './GamesShowcaseColumnRow.module.css';

export default function GamesShowcaseColumnRow({ game, link, dataRef }) {
	const mainContent = (
		<div className={styles.gameColumn}>
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
		</div>
	);

	return <li>{link ? <a href={game.id}>{mainContent}</a> : mainContent}</li>;
}
