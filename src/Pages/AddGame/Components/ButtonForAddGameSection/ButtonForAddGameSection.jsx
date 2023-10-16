import styles from './ButtonForAddGameSection.module.css';

export default function ButtonForAddGameSection({ onClick, text, disabled = false }) {
  return (
    <div className={styles.addMoreButton}>
      <button
        className={styles.btn}
        onClick={onClick}
        type="button"
        {...(disabled && { disabled })}
      >
        {text}
      </button>
    </div>
  );
}
