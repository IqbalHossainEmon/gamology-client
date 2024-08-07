import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../../../Shared/TextField/TextField';
import useDashboardModalHook from '../../../../../../../../useDashboardModalHook/useDashboardModalHook';
import styles from './AllGamesDeleteConfirmModal.module.css';

const AllGamesDeleteConfirmModal = () => {
    const confirmText = useRef(null);

    const [{ errorChange, errorMessage }, setError] = useState({ errorChange: 0, errorMessage: '' });

    const setModal = useDashboardModalHook().useDashboardBodySetModal();

    const handleDelete = () => {
        if (confirmText.current === 'DELETE' || confirmText.current === 'delete' || confirmText.current === 'Delete') {
            console.log('Deleted');
            setModal(false);
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
                htmlFor="delete_game"
                placeholder="Type 'DELETE' to Delete"
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
export default AllGamesDeleteConfirmModal;
