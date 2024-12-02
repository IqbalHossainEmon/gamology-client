import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import GameInColumn from '../EventGamesGameColumn/EventGamesGameInColumn';
import styles from './EventGamesGamesColumn.module.css';

export default function EventGamesGamesColumn({ header, games, bar, colNum, cardPosition }) {
	const btnRef = useRef(null);
	return (
		<li
			className={`${styles.gameColumn}${colNum !== cardPosition ? ` ${styles.opacity0}` : ''}`}
		>
			<div className={styles.heading}>
				<h2>{header}</h2>
				<button ref={btnRef} type='button'>
					View More
					<ButtonWaterEffect btnRef={btnRef} />
				</button>
			</div>
			<p className={styles.text}>test text</p>
			<ul className={`${bar ? `${styles.bar} ` : ''}${styles.column}`}>
				{games.map(game => (
					<GameInColumn game={game} key={game.id} length={games.length} />
				))}
			</ul>
		</li>
	);
}
