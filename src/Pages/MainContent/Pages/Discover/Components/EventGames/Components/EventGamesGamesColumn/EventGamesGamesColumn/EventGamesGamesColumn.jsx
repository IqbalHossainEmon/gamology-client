import useScreenWidth from '../../../../../../../../../Utils/Hooks/useScreenWidth';
import EventGamesGameColumn from '../Components/EventGamesGameColumn/EventGamesGameInColumn';
import EventGamesGameColumnHeader from '../Components/EventGamesGameColumnHeader/EventGamesGameColumnHeader';
import styles from './EventGamesGamesColumn.module.css';

export default function EventGamesGamesColumn({ header, games, colNum, cardPosition }) {
	const { widthInRem } = useScreenWidth();

	return (
		<li
			className={`${styles.gameColumn}${colNum !== cardPosition && widthInRem < 48.0625 ? ` ${styles.opacity0}` : ''}`}
		>
			<EventGamesGameColumnHeader headerTitle={header} />
			<ul className={styles.column}>
				{games.map(game => (
					<EventGamesGameColumn game={game} key={game.id} length={games.length} />
				))}
			</ul>
		</li>
	);
}
