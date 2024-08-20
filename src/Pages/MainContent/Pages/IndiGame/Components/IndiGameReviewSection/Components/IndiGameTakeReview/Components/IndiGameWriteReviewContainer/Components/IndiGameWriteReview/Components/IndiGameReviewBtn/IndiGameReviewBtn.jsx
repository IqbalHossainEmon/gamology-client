import { useRef } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndiGameReviewBtn.module.css';

export default function IndiGameReviewButtons({ setWriteReviewShow, handleSubmit, canSubmit }) {
    const buttonRef = useRef(null);

    return (
        <div className={styles.IndiGameReviewButtons}>
            <button
                className={styles.closeBtn}
                onClick={() => setWriteReviewShow(false)}
                type="button"
            >
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
