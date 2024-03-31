import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../Shared/TextField/TextField';
import styles from './DashboardDeleteModal.module.css';

const DashboardDeleteModal = () => {
    const confirmText = useRef(null);

    const [{ errorChange, errorMessage }, setError] = useState({ errorChange: 0, errorMessage: '' });

    const handleDelete = () => {
        if (confirmText.current === 'DELETE') {
            console.log('Deleted');
        } else {
            setError(prev => ({ errorChange: prev.errorChange + 1, errorMessage: 'Please type delete to confirm' }));
        }
    };

    return (
        <div className={styles.deleteModal}>
            <TextField
                errorChange={errorChange}
                errorMessage={errorMessage}
                type="text"
                placeholder="Type 'DELETE' to confirm"
                label="Type 'delete' to confirm"
                field="input"
                setState={val => {
                    confirmText.current = val;
                }}
                className={styles.textField}
            />
            <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
                Delete
            </button>
        </div>
    );
};
export default DashboardDeleteModal;
