import DiscountPrice from '../../../../../../../../../../../../../Shared/DiscountPrice/DiscountPrice';
import AllGamesDeleteConfirmModal from '../AllGamesDeleteConfirmModal/AllGamesDeleteConfirmModal';
import AllGamesPriceEditModal from '../AllGamesPriceEditModal/AllGamesPriceEditModal';
import AllGamesSalesModal from '../AllGamesSalesModal/AllGamesSalesModal';
import styles from './AllGamesModalBodySelect.module.css';

function AllGamesModalBodySelect({ type, detail }) {
	const { name, category, price, carouselThumb } = detail;

	let Component;

	switch (type) {
		case 'price':
			Component = AllGamesPriceEditModal;
			break;
		case 'delete':
			Component = AllGamesDeleteConfirmModal;
			break;
		case 'sales':
			Component = AllGamesSalesModal;
			break;
		default:
			Component = null;
			break;
	}

	return (
		<>
			<div className={styles.card}>
				<div className={styles.cardHeader}>
					<img alt={name} src={carouselThumb} />
				</div>
				<div className={styles.cardBody}>
					<p className={styles.name}>{name}</p>
					<p className={styles.category}>{category?.card}</p>
					<DiscountPrice price={price} />
				</div>
			</div>
			<Component detail={detail} price={price} />
		</>
	);
}
export default AllGamesModalBodySelect;
