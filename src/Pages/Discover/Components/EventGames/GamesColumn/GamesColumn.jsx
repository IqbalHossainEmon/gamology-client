import GameColumn from '../GameColumn/GameColumn';
import styles from './GamesColumn.module.css';

export default function GamesColumn({ header, games, border }) {
  return (
    <div>
      <div className={styles.heading}>
        <h2>{header}</h2>
        <button type="button">View More</button>
      </div>
      <div className={border ? styles.rightBorder : styles.notBorder}>
        {games.map((game) => (
          <GameColumn key={game.id} length={games.length} game={game} />
        ))}
      </div>
    </div>
  );
}
