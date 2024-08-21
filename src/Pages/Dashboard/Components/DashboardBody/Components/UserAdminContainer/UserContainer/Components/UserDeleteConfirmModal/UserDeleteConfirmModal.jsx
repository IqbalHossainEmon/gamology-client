import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import useDashboardModalHook from '../../../../useDashboardModalHook/useDashboardModalHook';
import styles from './UserDeleteConfirmModal.module.css';

function UserDeleteConfirmModal() {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});
	const confirmText = useRef(null);
	const { setDashboardModal } = useDashboardModalHook();
	const handleDelete = () => {
		if (
			confirmText.current === 'DELETE' ||
			confirmText.current === 'delete' ||
			confirmText.current === 'Delete'
		) {
			console.log('Deleted');
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
				field="input"
				placeholder="Type 'DELETE' to Delete User"
				setState={val => {
					confirmText.current = val;
				}}
				type="text"
			/>

			<button className={styles.deleteBtn} onClick={handleDelete} type="button">
				Delete
			</button>
		</div>
	);
}
export default UserDeleteConfirmModal;
