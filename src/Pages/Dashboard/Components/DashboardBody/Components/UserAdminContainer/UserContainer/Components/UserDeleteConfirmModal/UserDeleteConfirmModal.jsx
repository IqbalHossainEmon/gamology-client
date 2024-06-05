import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import useDashboardModal from '../../../../useDashboardModal/useDashboardModal';
import styles from './UserDeleteConfirmModal.module.css';

function UserDeleteConfirmModal({ handleRemove, btnText = 'delete', textConfirm = 'DELETE' }) {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});
	const confirmText = useRef(null);
	const { setDashboardModal } = useDashboardModal();

	const handleDelete = () => {
		if (confirmText.current.toUpperCase() === textConfirm.toUpperCase()) {
			handleRemove();
			setDashboardModal(false);
		} else {
			setError(prev => ({
				errorChange: prev.errorChange + 1,
				errorMessage: 'Please type delete to confirm',
			}));
		}
	};
	return (
		<div className={styles.deleteModal}>
			<TextField
				className={styles.textField}
				errorChange={errorChange}
				errorMessage={errorMessage}
				field='input'
				placeholder={`Type '${textConfirm}' to confirm`}
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
