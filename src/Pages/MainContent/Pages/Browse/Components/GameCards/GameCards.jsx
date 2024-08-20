import Card from '../../../../../../Shared/Card/Card';
import Pagination from '../../../../../../Shared/Pagination/Pagination/Pagination';
import styles from './GameCards.module.css';

export default function GameCards({ state, dispatch }) {
    const { items } = state,
     { pageCount } = state;
    return (
        <section className={styles.gameCards}>
            <ul className={styles.cardsContainer}>
                {items.map(item => (
                    <Card
                        cardInfo={item}
                        className={styles.card}
                        key={item.id}
                    />
                ))}
            </ul>

            {pageCount > 2 && (
                <div className={styles.pagination}>
                    <Pagination
                        activePage={state?.activePage}
                        setActivePage={newPage => dispatch({ type: 'pageChange', activePage: newPage })}
                        totalPage={pageCount}
                    />
                </div>
            )}
        </section>
    );
}
