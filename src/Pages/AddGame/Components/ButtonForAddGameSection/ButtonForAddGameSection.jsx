import styles from './ButtonForAddGameSection.module.css';

export default function ButtonForAddGameSection({ onClick, text }) {
  return (
    <div className={styles.addMoreButton}>
      <button className={styles.btn} onClick={onClick} type="button">
        {text}
      </button>
    </div>
  );
}
