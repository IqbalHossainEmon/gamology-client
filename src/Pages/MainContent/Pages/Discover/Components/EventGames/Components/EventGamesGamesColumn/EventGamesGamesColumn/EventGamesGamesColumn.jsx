import EventGamesGameColumn from '../Components/EventGamesGameColumn/EventGamesGameInColumn';
import EventGamesGameColumnHeader from '../Components/EventGamesGameColumnHeader/EventGamesGameColumnHeader';
import styles from './EventGamesGamesColumn.module.css';

export default function EventGamesGamesColumn({ header, games }) {
	return (
		<li className={styles.gameColumn}>
			<EventGamesGameColumnHeader headerTitle={header} />
			<ul className={styles.column}>
				{games.map(game => (
					<EventGamesGameColumn game={game} key={game.id} length={games.length} />
				))}
			</ul>
		</li>
	);
}
