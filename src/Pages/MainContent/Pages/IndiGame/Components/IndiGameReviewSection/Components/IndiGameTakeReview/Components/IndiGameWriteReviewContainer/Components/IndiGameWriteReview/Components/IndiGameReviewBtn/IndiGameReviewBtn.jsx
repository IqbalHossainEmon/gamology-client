import ButtonWaterEffect from '../../../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import styles from './IndiGameReviewBtn.module.css';

export default function IndiGameReviewButtons({ setWriteReviewShow, handleSubmit, canSubmit }) {
	return (
		<div className={styles.IndiGameReviewButtons}>
			<button
				className={styles.closeBtn}
				onClick={() => setWriteReviewShow(false)}
				type='button'
			>
				Close
			</button>
			<button
				type='button'
				{...(canSubmit && { onClick: handleSubmit })}
				className={`${styles.submitBtn}${canSubmit ? '' : ` ${styles.cantSubmit}`}`}
			>
				Submit my review
				<ButtonWaterEffect />
			</button>
		</div>
	);
}
