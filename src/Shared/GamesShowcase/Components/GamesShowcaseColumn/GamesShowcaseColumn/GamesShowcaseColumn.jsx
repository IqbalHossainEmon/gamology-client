import GamesShowcaseHeader from '../Components/GamesShowcaseColumnHeader/GamesShowcaseColumnHeader';
import GamesShowcaseColumnRow from '../Components/GamesShowcaseColumnRow/GamesShowcaseColumnRow';
import styles from './GamesShowcaseColumn.module.css';

export default function GamesShowcaseColumn({ header, games, link, extraCard, index }) {
	return (
		<li className={styles.gameColumn}>
			<GamesShowcaseHeader headerTitle={header} />
			<ul className={styles.column}>
				{games.map(game => (
					<GamesShowcaseColumnRow
						game={game}
						key={game.id}
						length={games.length}
						link={link}
					/>
				))}
				{extraCard && extraCard(index)}
			</ul>
		</li>
	);
}
