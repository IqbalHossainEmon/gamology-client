import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import useDashboardModalHook from '../../../../useDashboardModalHook/useDashboardModalHook';
import styles from './UserMakeAdminModal.module.css';

function UserMakeAdminModal() {
	const [{ errorChange, errorMessage }, setError] = useState({
		errorChange: 0,
		errorMessage: '',
	}),

	 confirmText = useRef(null),

	 { setDashboardModal } = useDashboardModalHook(),

	 handleMakeAdmin = () => {
		if (
			confirmText.current === 'CONFIRM' ||
			confirmText.current === 'confirm' ||
			confirmText.current === 'Confirm'
		) {
			setDashboardModal(false);
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
                <button
                    className={styles.btn}
                    onClick={handleMakeAdmin}
                    type='button'
                >
                    Yes
                </button>
            </div>
        </div>
    </div>
	);
}
export default UserMakeAdminModal;
