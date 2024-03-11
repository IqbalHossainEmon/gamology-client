import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import GameInColumn from '../EventGamesGameColumn/EventGamesGameInColumn';
import styles from './EventGamesGamesColumn.module.css';

export default function EventGamesGamesColumn({ header, games, border, screenWidth, colNum, cardPosition }) {
  const btnRef = useRef(null);
  return (
    <li
      className={colNum === cardPosition ? styles.GameColumn : [styles.GameColumn, styles.Opacity0].join(' ')}
      {...(screenWidth < 768 && { style: { width: `${screenWidth}px` } })}
    >
      <div className={styles.heading}>
        <h2>{header}</h2>
        <button ref={btnRef} type="button">
          View More
          <ButtonWaterEffect btnRef={btnRef} />
        </button>
      </div>
      <ul className={`${border && styles.rightBorder} ${styles.column}`}>
        {games.map(game => (
          <GameInColumn key={game.id} length={games.length} game={game} />
        ))}
      </ul>
    </li>
  );
}
