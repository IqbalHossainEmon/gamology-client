import useFilterSortState from '../FilterGames/Components/useFilterSortState/useFilterSortState';
import styles from './MobileSortAndFilterButton.module.css';

export default function MobileSortAndFilterButton() {
    const { setFilterSort } = useFilterSortState();

    return (
        <div className={styles.buttonPosition}>
            <div className={styles.buttonContainer}>
                <button
                    className={styles.sortButton}
                    onClick={() => setFilterSort('sort')}
                    type="button"
                >
                    <img
                        alt="sort button"
                        src="/assets/images/sortButton.png"
                    />

                    <span>
                        Sort
                    </span>
                </button>

                <div className={styles.verticalLine} />

                <button
                    className={styles.filterButton}
                    onClick={() => setFilterSort('filter')}
                    type="button"
                >
                    <img
                        alt="filter button"
                        src="/assets/images/filterButton.png"
                    />

                    <span>
                        Filter
                    </span>
                </button>
            </div>
        </div>
    );
}
