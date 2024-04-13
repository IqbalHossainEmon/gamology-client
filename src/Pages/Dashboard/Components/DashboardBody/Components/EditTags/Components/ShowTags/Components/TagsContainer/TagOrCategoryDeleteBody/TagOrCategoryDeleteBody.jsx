import { useRef, useState } from 'react';
import TextField from '../../../../../../../../../../../Shared/TextField/TextField';
import styles from './TagOrCategoryDeleteBody.module.css';

const TagOrCategoryDeleteBody = ({ handleHide, text, handler }) => {
    const [errorChange, setErrorChange] = useState(0);

    const checkText = useRef('');
    return (
        <div className={styles.modalBody}>
            <p className={styles.modelBody}>{text}</p>
            <div className={styles.checkPoint}>
                <TextField
                    field="input"
                    placeholder={"Type 'delete' to confirm"}
                    htmlFor="TagOrCategoryDelete"
                    setState={val => {
                        checkText.current = val;
                    }}
                    errorChange={errorChange}
                    errorMessage={checkText.errorMessage}
                />
            </div>
            <div className={styles.btnContainer}>
                <button
                    onClick={() => {
                        if (checkText.current !== 'delete' && checkText.current !== 'Delete' && checkText.current !== 'DELETE') {
                            checkText.errorMessage = 'Please type "delete" to confirm';
                            setErrorChange(prev => prev + 1);
                            return;
                        }
                        handler();
                        handleHide();
                    }}
                    type="button"
                    className={styles.deleteBtn}
                >
                    Delete
                </button>
                <button onClick={handleHide} type="button" className={styles.cancelBtn}>
                    Cancel
                </button>
            </div>
        </div>
    );
};
export default TagOrCategoryDeleteBody;
