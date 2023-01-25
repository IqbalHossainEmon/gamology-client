import styles from './BrowseHeader.module.css';

export default function BrowseHeader({ gameNumbers }) {
  return (
    <div className={styles.BrowseHeader}>
      <h2 className={styles.NumberOfGames}>{gameNumbers} Games</h2>
      <div>
        <button className={styles.button} type="button">
          Show : <span />
        </button>
      </div>
    </div>
  );
}
