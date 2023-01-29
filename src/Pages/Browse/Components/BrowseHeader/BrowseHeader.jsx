import styles from './BrowseHeader.module.css';

export default function BrowseHeader({ state }) {
  return (
    <div className={styles.BrowseHeader}>
      <h2 className={styles.NumberOfGames}>{state.NumberOfGames} Games</h2>
      <div className={styles.RightSide}>
        <button className={styles.button} type="button">
          Show : <span>{state.sortBy}</span> <div className={styles.downArrow}>&#60;</div>
        </button>
        <div className={styles.sortLists}>
          <ol>
            <li>
              <button className={styles.sortButtons} type="button">
                New release
              </button>
            </li>
            <li>
              <button className={styles.sortButtons} type="button">
                Comming Soon
              </button>
            </li>
            <li>
              <button className={styles.sortButtons} type="button">
                Rating
              </button>
            </li>
            <li>
              <button className={styles.sortButtons} type="button">
                Discount
              </button>
            </li>
            <li>
              <button className={styles.sortButtons} type="button">
                A to Z
              </button>
            </li>
            <li>
              <button className={styles.sortButtons} type="button">
                Price (High to Low)
              </button>
            </li>
            <li>
              <button className={styles.sortButtons} type="button">
                Price (Low to High)
              </button>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
