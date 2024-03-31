import DashboardDeleteModal from '../DashboardDeleteModal/DashboardDeleteModal';
import DashboardPriceChangeModal from '../DashboardPriceChangeModal/DashboardPriceChangeModal';
import styles from './CardDotModalBody.module.css';

const CardDotModalBody = ({ type, detail }) => {
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
                <DashboardPriceChangeModal detail={detail} price={typeof price === 'object' ? price.regular : price} />
            ) : (
                <DashboardDeleteModal detail={detail} />
            )}
        </>
    );
};
export default CardDotModalBody;
