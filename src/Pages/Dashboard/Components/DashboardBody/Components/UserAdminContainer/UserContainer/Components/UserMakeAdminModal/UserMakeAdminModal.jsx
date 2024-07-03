import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../Shared/TextField/TextField';
import styles from './UserMakeAdminModal.module.css';

const UserMakeAdminModal = ({ handleHide }) => {
    const [{ errorChange, errorMessage }, setError] = useState({ errorChange: 0, errorMessage: '' });

    const confirmText = useRef(null);

    const handleMakeAdmin = () => {
        if (confirmText.current === 'CONFIRM' || confirmText.current === 'confirm' || confirmText.current === 'Confirm') {
            console.log('Admin');
            handleHide();
        } else {
            setError(prev => ({ errorChange: prev.errorChange + 1, errorMessage: 'Please type confirm to confirm' }));
        }
    };

    return (
        <div>
            <div className={styles.deleteModal}>
                <TextField
                    errorChange={errorChange}
                    errorMessage={errorMessage}
                    type="text"
                    placeholder="Type 'CONFIRM' to confirm"
                    label="Type 'CONFIRM' to confirm"
                    field="input"
                    setState={val => {
                        confirmText.current = val;
                    }}
                    className={styles.textField}
                />
                <div className={styles.btnContainer}>
                    <button type="button" className={styles.noBtn} onClick={handleHide}>
                        No
                    </button>
                    <button type="button" className={styles.yesBtn} onClick={handleMakeAdmin}>
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
};
export default UserMakeAdminModal;
