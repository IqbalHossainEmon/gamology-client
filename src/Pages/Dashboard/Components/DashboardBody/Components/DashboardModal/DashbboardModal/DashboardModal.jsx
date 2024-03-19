import DashboardDeleteModal from '../Container/DashboardDeleteModal/DashboardDeleteModal';
import DashboardPriceChangeModal from '../Container/DashboardPriceChangeModal/DashboardPriceChangeModal';
import styles from './DashboardModal.module.css';

const DashboardModal = ({ type, detail, show }) => (
  <div className={styles.dashboardModalContainer}>
    <h3>{detail.name}</h3>
    {type === 'price' ? <DashboardPriceChangeModal /> : <DashboardDeleteModal />}
  </div>
);
export default DashboardModal;
