import { useRef, useState } from 'react';
import TextField from '../../../../../../../../Shared/TextField/TextField/TextField';
import useModal from '../../../../../../../../Utils/Hooks/useModal';
import styles from './UserDeleteConfirmModal.module.css';

function UserDeleteConfirmModal({
	handleRemove,
	btnText,
	placeHolder,
	errorMessage: childErrorMessage,
}) {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: childErrorMessage,
	});
	const confirmText = useRef(null);

	const { hideModal } = useModal();

	const handleDelete = () => {
		if (handleRemove(confirmText.current)) {
			setError(prev => ({ ...prev, errorChange: prev.errorChange + 1 }));
			return;
		}
		hideModal();
	};
	return (
		<div className={styles.deleteModal}>
			<TextField
				className={styles.textField}
				errorChange={errorChange}
				errorMessage={errorMessage}
				field='input'
				placeholder={placeHolder}
				setState={val => {
					confirmText.current = val;
				}}
				type='text'
			/>
			<button className={styles.deleteBtn} onClick={handleDelete} type='button'>
				{btnText}
			</button>
		</div>
	);
}
export default UserDeleteConfirmModal;
