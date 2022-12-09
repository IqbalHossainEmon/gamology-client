import GameInColumn from '../GameColumn/GameInColumn';
import styles from './GamesColumn.module.css';

export default function GamesColumn({ header, games, border, style, colNum, cardPosition }) {
  return (
    <div
      className={
        colNum === cardPosition ? styles.GameColumn : [styles.GameColumn, styles.Opcity0].join(' ')
      }
      style={style}
    >
      <div className={styles.heading}>
        <h2>{header}</h2>
        <button type="button">View More</button>
      </div>
      <div className={border ? styles.rightBorder : styles.notBorder}>
        {games.map((game) => (
          <GameInColumn key={game.id} length={games.length} game={game} />
        ))}
      </div>
    </div>
  );
}
