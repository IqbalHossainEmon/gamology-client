import styles from './IndividualGameReviewBtn.module.css';

export default function IndividualGameReviewButtons({
  setWriteReviewShow,
  handleSubmit,
}) {
  return (
    <div className={styles.IndividualGameReviewButtons}>
      <button
        onClick={() => setWriteReviewShow(false)}
        type="button"
        className={styles.closeBtn}
      >
        Close
      </button>
      <button type="button" onClick={handleSubmit} className={styles.submitBtn}>
        Submit my review
      </button>
    </div>
  );
}
