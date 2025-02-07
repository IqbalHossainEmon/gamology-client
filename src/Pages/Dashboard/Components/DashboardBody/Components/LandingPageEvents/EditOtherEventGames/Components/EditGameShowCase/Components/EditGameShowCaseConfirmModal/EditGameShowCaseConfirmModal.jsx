import styles from './EditGameShowCaseConfirmModal.module.css';

function EditGameShowCaseConfirmModal({ onConfirm }) {
	return (
		<div className={styles.btnContainer}>
			<button type='button' onClick={onConfirm} className={styles.confirmBtn}>
				Confirm
			</button>
		</div>
	);
}
export default EditGameShowCaseConfirmModal;
