import { useRef } from 'react';
import DashboardDeleteModal from '../Container/DashboardDeleteModal/DashboardDeleteModal';
import DashboardPriceChangeModal from '../Container/DashboardPriceChangeModal/DashboardPriceChangeModal';
import styles from './DashboardModal.module.css';

const DashboardModal = ({ type, detail, show, setShow }) => {
  const timerId = useRef(null);

  const { name, price, carouselThumb, category } = detail;

  const handleModalClose = () => {
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
    timerId.current = setTimeout(() => {
      setShow(false);
    }, 300);
  };

  if (type === null || !show) return null;
  return (
    <div className={styles.dashboardModal}>
      <h2 className={styles.header}>{type === 'price' ? 'Change Price' : 'Delete'}</h2>
      <h3 className={styles.headerQuestion}>
        {type === 'price' ? (
          <>
            Are you sure you want to delete <span className={styles.nameContainer}>{name}</span>?
          </>
        ) : (
          <>
            Give the new price you want to set for <span className={styles.nameContainer}>{name}</span>
          </>
        )}
      </h3>
      <button type="button" className={styles.crossBtn}>
        <span className={styles.cross} />
      </button>
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
      {type === 'price' ? <DashboardPriceChangeModal detail={detail} /> : <DashboardDeleteModal detail={detail} />}
    </div>
  );
};
export default DashboardModal;
