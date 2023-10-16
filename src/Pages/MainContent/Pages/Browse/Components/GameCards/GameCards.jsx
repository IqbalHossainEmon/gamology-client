import Card from '../../../../../../Shared/Card/Card';
import Pagination from '../../../../../../Shared/Pagination/Pagination';
import styles from './GameCards.module.css';

export default function GameCards({ state, dispatch }) {
  const { items } = state;
  const { pageCount } = state;
  return (
    <section className={styles.gameCards}>
      <ul>
        {items.map(item => (
          <Card key={item.id} cardInfo={item} />
        ))}
      </ul>
      {pageCount > 2 && (
        <div className={styles.pagination}>
          <Pagination
            activePage={state?.activePage}
            totalPage={pageCount}
            setActivePage={dispatch}
          />
        </div>
      )}
    </section>
  );
}
