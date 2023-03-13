import useFilterSortState from '../../../../Hooks/useFilterSortState';
import styles from './MobileSortAndFilterButton.module.css';

export default function MobileSortAndFilterButton() {
  const { setFilterSort } = useFilterSortState();

  return (
    <div className={styles.buttonPosition}>
      <div className={styles.buttonContainer}>
        <button onClick={() => setFilterSort('sort')} className={styles.sortButton} type="button">
          <img src="./images/sortButton.png" alt="sort button" />
          <span>Sort</span>
        </button>
        <div className={styles.verticalLine} />
        <button
          onClick={() => setFilterSort('filter')}
          className={styles.filterButton}
          type="button"
        >
          <img src="./images/filterButton.png" alt="filter button" />
          <span>Filter</span>
        </button>
      </div>
    </div>
  );
}
