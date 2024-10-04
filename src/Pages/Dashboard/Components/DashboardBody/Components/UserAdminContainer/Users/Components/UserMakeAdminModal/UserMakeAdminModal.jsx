import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import useDashboardModal from '../../../../Utils/Hooks/useDashboardModal';
import styles from './UserMakeAdminModal.module.css';

function UserMakeAdminModal({ handleMakeAdmin: handleEvent }) {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	});
	const confirmText = useRef(null);
	const { setDashboardModal } = useDashboardModal();

	const handleMakeAdmin = () => {
		if (confirmText.current.toUpperCase() === 'CONFIRM') {
			setDashboardModal(false);
			handleEvent();
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