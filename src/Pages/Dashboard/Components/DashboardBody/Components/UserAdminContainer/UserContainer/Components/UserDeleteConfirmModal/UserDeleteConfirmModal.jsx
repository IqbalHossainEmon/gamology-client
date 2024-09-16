import { useRef, useState } from 'react';
import useToast from '../../../../../../../../../Hooks/useToast';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import useDashboardModal from '../../../../useDashboardModal/useDashboardModal';
import styles from './UserDeleteConfirmModal.module.css';

function UserDeleteConfirmModal({ data, handleRemove }) {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});
	const confirmText = useRef(null);
	const { setDashboardModal } = useDashboardModal();

	const { setToast } = useToast();

	const handleDelete = () => {
		if (confirmText.current.toUpperCase() === 'DELETE') {
			setToast({
				title: 'User Deleted',
				message: `${data.name} has been deleted successfully`,
				type: 'success',
			});
			handleRemove();
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
				field='input'
				placeholder="Type 'DELETE' to Delete User"
				setState={val => {
					confirmText.current = val;
				}}
				type='text'
			/>
			<button className={styles.deleteBtn} onClick={handleDelete} type='button'>
				Delete
			</button>
		</div>
	);
}
export default UserDeleteConfirmModal;
