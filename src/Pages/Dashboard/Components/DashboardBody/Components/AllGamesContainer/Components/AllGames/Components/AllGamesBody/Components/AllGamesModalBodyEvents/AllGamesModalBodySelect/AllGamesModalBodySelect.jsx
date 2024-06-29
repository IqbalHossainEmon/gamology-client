import AllGamesDeleteConfirmModal from '../AllGamesDeleteConfirmationModal/AllGamesDeleteConfirmModal';
import AllGamesPriceEditModal from '../AllGamesPriceEditModal/AllGamesPriceEditModal';
import styles from './AllGamesModalBodySelect.module.css';

const AllGamesModalBodySelect = ({ type, detail, handleHide }) => {
    const { name, category, price, carouselThumb } = detail;
    return (
        <>
            <div className={styles.card}>
                <div className={styles.cardHeader}>
                    <img src={carouselThumb} alt={name} />
                </div>
                <div className={styles.cardBody}>
                    <p className={styles.name}>{name}</p>
                    <p className={styles.category}>{category?.card}</p>
                    <p className={styles.price}>$ {typeof price === 'object' ? price.regular : price}</p>
                </div>
            </div>
            {type === 'price' ? (
                <AllGamesPriceEditModal handleHide={handleHide} detail={detail} price={typeof price === 'object' ? price.regular : price} />
            ) : (
                <AllGamesDeleteConfirmModal detail={detail} handleHide={handleHide} />
            )}
        </>
    );
};
export default AllGamesModalBodySelect;
