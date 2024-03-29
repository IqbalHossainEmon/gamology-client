import Modal from '../../../../../../../Shared/Modal/Modal';
import DashboardDeleteModal from '../Container/DashboardDeleteModal/DashboardDeleteModal';
import DashboardPriceChangeModal from '../Container/DashboardPriceChangeModal/DashboardPriceChangeModal';
import styles from './DashboardModal.module.css';

const DashboardModal = ({ type, detail, setShow }) => {
    const { name, price, carouselThumb, category } = detail;

    if (type === null) return null;
    return (
        <Modal setShow={setShow}>
            <h2 className={styles.header}>{type === 'price' ? 'Change Price' : 'Delete'}</h2>
            <h3 className={styles.headerQuestion}>
                {type === 'price' ? (
                    <>
                        What price($) you want to set for <span className={styles.nameContainer}>{name}</span>
                    </>
                ) : (
                    <>
                        Are you sure you want to delete <span className={styles.nameContainer}>{name}</span>?
                    </>
                )}
            </h3>
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
                <DashboardPriceChangeModal price={typeof price === 'object' ? price.regular : price} />
            ) : (
                <DashboardDeleteModal detail={detail} />
            )}
        </Modal>
    );
};
export default DashboardModal;
