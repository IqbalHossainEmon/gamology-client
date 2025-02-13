import { useRef } from 'react';
import DiscountPriceWithPercent from '../../../../../DiscountPriceWithPercent/DiscountPriceWithPercent';
import ImageWithHover from '../../../../../ImageWithHover/ImageWithHover';
import styles from './GamesShowcaseColumnRow.module.css';

export default function GamesShowcaseColumnRow({ game, link, getHoverCard, dotMenu }) {
	const containerRef = useRef(null);

	const mainContent = (
		<div className={styles.gameColumn} ref={containerRef}>
			<div className={styles.gameImageContainer}>
				<ImageWithHover
					cardHover={getHoverCard}
					game={game}
					container={containerRef}
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
			{dotMenu(containerRef, game)}
		</div>
	);

	return <li>{link ? <a href={game.id}>{mainContent}</a> : mainContent}</li>;
}
