import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndividualGameReviewBtn.module.css';

export default function IndividualGameReviewButtons({ setWriteReviewShow, handleSubmit, canSubmit }) {
  const buttonRef = useRef(null);

  return (
    <div className={styles.IndividualGameReviewButtons}>
      <button onClick={() => setWriteReviewShow(false)} type="button" className={styles.closeBtn}>
        Close
      </button>
      <button
        ref={buttonRef}
        type="button"
        {...(canSubmit && { onClick: handleSubmit })}
        className={`${styles.submitBtn}${canSubmit ? '' : ` ${styles.cantSubmit}`}`}
      >
        Submit my review
        <ButtonWaterEffect btnRef={buttonRef} />
      </button>
    </div>
  );
}
