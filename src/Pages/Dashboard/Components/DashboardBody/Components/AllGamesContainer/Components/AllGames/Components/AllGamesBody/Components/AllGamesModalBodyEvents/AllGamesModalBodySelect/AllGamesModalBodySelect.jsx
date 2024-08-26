import AllGamesDeleteConfirmModal from '../AllGamesDeleteConfirmModal/AllGamesDeleteConfirmModal';
import AllGamesPriceEditModal from '../AllGamesPriceEditModal/AllGamesPriceEditModal';
import styles from './AllGamesModalBodySelect.module.css';

function AllGamesModalBodySelect({ type, detail }) {
	const { name, category, price, carouselThumb } = detail;
	return (
		<>
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<img alt={name} src={carouselThumb} />
				</div>
				<div className={styles.cardBody}>
					<p className={styles.name}>{name}</p>

					<p className={styles.category}>{category?.card}</p>

					<p className={styles.price}>
						${typeof price === 'object' ? price.regular : price}
					</p>
				</div>
			</div>
			{type === 'price' ? (
				<AllGamesPriceEditModal
					detail={detail}
					price={typeof price === 'object' ? price.regular : price}
				/>
			) : (
				<AllGamesDeleteConfirmModal detail={detail} />
			)}
		</>
	);
}
export default AllGamesModalBodySelect;
