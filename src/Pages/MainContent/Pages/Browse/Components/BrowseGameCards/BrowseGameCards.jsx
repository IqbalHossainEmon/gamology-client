import Card from '../../../../../../Shared/Card/Card';
import Pagination from '../../../../../../Shared/Pagination/Pagination/Pagination';
import styles from './BrowseGameCards.module.css';

export default function BrowseGameCards({ state, dispatch }) {
	const { items } = state;
	const { pageCount } = state;
	return (
		<section className={styles.gameCards}>
			<ul className={styles.cardsContainer}>
				{items.map(({ id, name, cardImg, price }) => (
					<Card
						cardInfo={{ id, name, img: cardImg, price }}
						className={styles.card}
						key={id}
					/>
				))}
			</ul>

			{pageCount > 2 && (
				<div className={styles.pagination}>
					<Pagination
						activePage={state?.activePage}
						setActivePage={newPage =>
							dispatch({ type: 'pageChange', activePage: newPage })
						}
						totalPage={pageCount}
					/>
				</div>
			)}
		</section>
	);
}
