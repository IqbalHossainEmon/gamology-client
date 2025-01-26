import GamesShowcaseHeader from '../Components/GamesShowcaseColumnHeader/GamesShowcaseColumnHeader';
import GamesShowcaseColumnRow from '../Components/GamesShowcaseColumnRow/GamesShowcaseColumnRow';
import styles from './GamesShowcaseColumn.module.css';

export default function GamesShowcaseColumn({ header, games, link, extraCard, index, dataRef }) {
	return (
		<li className={styles.gameColumn}>
			<GamesShowcaseHeader headerTitle={header} index={index} dataRef={dataRef} />
			<ul className={styles.column}>
				{games.map(game => (
					<GamesShowcaseColumnRow
						parentIndex={index}
						dataRef={dataRef}
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
