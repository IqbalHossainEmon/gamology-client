import styles from './DashboardPriceChangeModal.module.css';

const DashboardPriceChangeModal = ({ price }) => (
  <div className={styles.priceChange}>
    <div>{price}</div>
    <div className={styles.inputContainer}>
      <span className={styles.currency}>$</span>
      <input type="number" className={styles.input} />
    </div>
    <button type="button" className={styles.saveBtn}>
      Save
    </button>
  </div>
);
export default DashboardPriceChangeModal;
