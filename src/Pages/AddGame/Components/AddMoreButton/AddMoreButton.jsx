import styles from './AddMoreButton.module.css';

export default function AddMoreButton({ onClick }) {
  return (
    <div className={styles.addMoreButton}>
      <button className={styles.btn} onClick={onClick} type="button">
        Add More <span className={styles.plus}>+</span>
      </button>
    </div>
  );
}
