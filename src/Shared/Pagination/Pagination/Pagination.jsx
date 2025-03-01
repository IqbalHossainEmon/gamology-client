import ArrowIcon from '../../Icons/ArrowIcon/ArrowIcon';
import usePaginationLogic, { DOTS } from '../PaginationLogic/usePaginationLogic';
import styles from './Pagination.module.css';

export default function Pagination({ activePage, setActivePage, totalPage, pageNumberStyle }) {
	const paginationRange = usePaginationLogic(totalPage, activePage);
	if (totalPage <= 1) {
		return null;
	}

	return (
		<ul className={styles.pagination}>
			<li className={styles.number}>
				<button
					className={`${styles.paginationButton} ${styles.prevButton} ${styles.number}${pageNumberStyle ? ` ${pageNumberStyle}` : ''}`}
					disabled={activePage === 1}
					onClick={() => setActivePage(activePage - 1)}
					type='button'
				>
					<ArrowIcon
						className={styles.arrowIcon}
						{...(activePage === 1 && { stroke: 'rgba(255, 255, 255, 0.3)' })}
					/>
				</button>
			</li>

			{paginationRange.map((page, i) => (
				<li
					className={page === DOTS ? styles.ellipsis : styles.number}
					key={page === DOTS ? `...${i}` : page}
				>
					{page === DOTS ? (
						DOTS
					) : (
						<button
							className={`${styles.paginationButton} ${styles.numberButton}${pageNumberStyle ? ` ${pageNumberStyle}` : ''}`}
							onClick={() => setActivePage(page)}
							type='button'
							{...(activePage === page && { id: styles.active })}
						>
							{page}
						</button>
					)}
				</li>
			))}

			<li className={styles.number}>
				<button
					className={`${styles.paginationButton} ${styles.nextButton} ${styles.number}${pageNumberStyle ? ` ${pageNumberStyle}` : ''}`}
					disabled={activePage === totalPage}
					onClick={() => setActivePage(activePage + 1)}
					type='button'
				>
					<ArrowIcon
						className={styles.arrowIcon}
						{...(activePage === totalPage && {
							stroke: 'rgba(255, 255, 255, 0.3)',
						})}
					/>
				</button>
			</li>
		</ul>
	);
}
