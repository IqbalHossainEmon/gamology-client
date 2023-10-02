import styles from './IndividualGameViewMoreButton.module.css';

export default function IndividualGameViewMoreButton({ handleChange }) {
  return (
    <div className={styles.individualGameViewMoreButton}>
      <button onClick={() => handleChange({ type: 'viewMore' })} type="button">
        View More &rarr;
      </button>
    </div>
  );
}
