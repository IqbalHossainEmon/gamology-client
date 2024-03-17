import usePagination, { DOTS } from '../../Hooks/usePagination';
import ArrowIcon from '../ArrowIcon/ArrowIcon';
import styles from './Pagination.module.css';

export default function Pagination({ activePage, setActivePage, totalPage }) {
  const paginationRange = usePagination(totalPage, activePage);

  return (
    <ul className={styles.pagination}>
      <li className={styles.number}>
        <button
          type="button"
          onClick={() => setActivePage(activePage - 1)}
          disabled={activePage === 1}
          className={`${styles.paginationButton} ${styles.prevButton} ${styles.number}`}
        >
          <ArrowIcon className={styles.arrowIcon} {...(activePage === 1 && { stroke: 'rgba(255, 255, 255, 0.3)' })} />
        </button>
      </li>
      {paginationRange.map((page, i) => (
        <li key={page === DOTS ? `...${i}` : page} className={page === DOTS ? styles.ellipsis : styles.number}>
          {page === DOTS ? (
            DOTS
          ) : (
            <button
              type="button"
              onClick={() => setActivePage(page)}
              className={`${styles.paginationButton} ${styles.numberButton}`}
              {...(activePage === page && { id: styles.active })}
            >
              {page}
            </button>
          )}
        </li>
      ))}
      <li className={styles.number}>
        <button
          type="button"
          onClick={() => setActivePage(activePage + 1)}
          disabled={activePage === totalPage}
          className={`${styles.paginationButton} ${styles.nextButton} ${styles.number}`}
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
