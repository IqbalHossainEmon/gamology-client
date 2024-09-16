import { useRef, useState } from 'react';
import useToast from '../../../../../../../../../Hooks/useToast';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import useDashboardModal from '../../../../useDashboardModal/useDashboardModal';
import styles from './UserMakeAdminModal.module.css';

function UserMakeAdminModal({ data, handleRemove }) {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});
	const confirmText = useRef(null);
	const { setDashboardModal } = useDashboardModal();

	const { setToast } = useToast();

	const handleMakeAdmin = () => {
		if (confirmText.current.toUpperCase() === 'CONFIRM') {
			setDashboardModal(false);

			setToast({
				title: 'User Made Admin',
				message: `${data.name} has been made admin successfully`,
				type: 'success',
			});
			handleRemove();

			console.log('Made Admin');
		} else {
			setError(prev => ({
				errorChange: prev.errorChange + 1,
				errorMessage: 'Please type confirm to confirm',
			}));
		}
	};

	return (
		<div>
			<div className={styles.makeAdminModal}>
				<TextField
					className={styles.textField}
					errorChange={errorChange}
					errorMessage={errorMessage}
					field='input'
					placeholder="Type 'CONFIRM' to continue"
					setState={val => {
						confirmText.current = val;
					}}
					type='text'
				/>
				<div className={styles.btnContainer}>
					<button className={styles.btn} onClick={handleMakeAdmin} type='button'>
						Yes
					</button>
				</div>
			</div>
		</div>
	);
}
export default UserMakeAdminModal;
