import { useRef, useState } from 'react';
import ButtonWaterEffect from '../../../../../../../../../../../../../Shared/ButtonWaterEffect/ButtonWaterEffect';
import TextField from '../../../../../../../../../../../../../Shared/TextField/TextField';
import useToast from '../../../../../../../../../../../../../Utils/Hooks/useToast';
import useDashboardModal from '../../../../../../../../Utils/Hooks/useDashboardModal';
import styles from './AllGamesDeleteConfirmModal.module.css';

function AllGamesDeleteConfirmModal() {
	const confirmText = useRef(null);
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});

	const btnRef = useRef(null);

	const { setDashboardModal } = useDashboardModal();

	const { setToast } = useToast();

	const handleDelete = () => {
		if (confirmText.current.toUpperCase() === 'DELETE') {
			// API call to delete game
			setToast({
				title: 'Game Deleted',
				message: 'Game has been deleted successfully',
				type: 'success',
			});

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
				htmlFor='delete_game'
				placeholder="Type 'DELETE' to Delete"
				setState={val => {
					confirmText.current = val;
				}}
				type='text'
			/>
			<button ref={btnRef} className={styles.deleteBtn} onClick={handleDelete} type='button'>
				Delete
				<ButtonWaterEffect btnRef={btnRef} long />
			</button>
		</div>
	);
}
export default AllGamesDeleteConfirmModal;