import GamesShowcaseHeader from '../Components/GamesShowcaseColumnHeader/GamesShowcaseColumnHeader';
import GamesShowcaseColumnRow from '../Components/GamesShowcaseColumnRow/GamesShowcaseColumnRow';
import styles from './GamesShowcaseColumn.module.css';

export default function GamesShowcaseColumn({
	header,
	games,
	link,
	extraCard,
	index,
	setHeader,
	getHoverCard,
	dotsMenu,
}) {
	return (
		<li className={styles.gameColumn}>
			<GamesShowcaseHeader
				isEditing={!!extraCard}
				headerTitle={header}
				index={index}
				setHeader={setHeader}
			/>
			<ul className={styles.column}>
				{games.map(game => (
					<GamesShowcaseColumnRow
						getHoverCard={getHoverCard}
						parentIndex={index}
						game={game}
						key={game.id}
						length={games.length}
						link={link}
						dotsMenu={dotsMenu}
					/>
				))}
				{!!extraCard && extraCard(index)}
			</ul>
		</li>
	);
}
