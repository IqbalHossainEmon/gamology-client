import Image from '../../../../../../Shared/Image/Image/Image';
import useFilterSortState from '../../Utils/Hooks/useFilterSortState/useFilterSortState';
import styles from './MobileSortAndFilterButton.module.css';

export default function MobileSortAndFilterButton() {
	const { setFilterSort } = useFilterSortState();

	return (
		<div className={styles.buttonPosition}>
			<div className={styles.buttonContainer}>
				<button
					className={styles.sortButton}
					onClick={() => setFilterSort('sort')}
					type='button'
				>
					<div className={styles.imageContainer}>
						<Image
							data='/assets/images/sortButton.png'
							alt='sort button'
							aspectRatioClassName={styles.aspectRatioClassName}
						/>
					</div>
					<span>Sort</span>
				</button>
				<div className={styles.verticalLine} />
				<button
					className={styles.filterButton}
					onClick={() => setFilterSort('filter')}
					type='button'
				>
					<div className={styles.imageContainer}>
						<Image
							data='/assets/images/filterButton.png'
							alt='filter button'
							aspectRatioClassName={styles.aspectRatioClassName}
						/>
					</div>
					<span>Filter</span>
				</button>
			</div>
		</div>
	);
}
