import styles from './IndividualGameReviewBtn.module.css';

export default function IndividualGameReviewButtons({ setWriteReviewShow, handleSubmit, cantSubmit }) {
  return (
    <div className={styles.IndividualGameReviewButtons}>
      <button onClick={() => setWriteReviewShow(false)} type="button" className={styles.closeBtn}>
        Close
      </button>
      <button
        type="button"
        {...(cantSubmit && { onClick: handleSubmit })}
        className={cantSubmit ? styles.submitBtn : [styles.submitBtn, styles.cantSubmit].join(' ')}
      >
        Submit my review
      </button>
    </div>
  );
}
