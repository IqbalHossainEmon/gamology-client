import Image from '../../../../../../Shared/Image/Image/Image';
import useBrowseFilter from '../../Utils/Hooks/useBrowseFilter/useBrowseFilter';
import useBrowseSort from '../../Utils/Hooks/useBrowseSort/useBrowseSort';

import styles from './MobileSortAndFilterButton.module.css';

export default function MobileSortAndFilterButton() {
	const { setFilter } = useBrowseFilter();
	const { setSort } = useBrowseSort();

	return (
		<div className={styles.buttonPosition}>
			<div className={styles.buttonContainer}>
				<button className={styles.sortButton} onClick={() => setSort(true)} type='button'>
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
					onClick={() => setFilter(true)}
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
