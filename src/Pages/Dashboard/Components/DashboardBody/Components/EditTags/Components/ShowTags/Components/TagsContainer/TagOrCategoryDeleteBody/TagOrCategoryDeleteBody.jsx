import styles from './TagOrCategoryDeleteBody.module.css';

const TagOrCategoryDeleteBody = ({ handleHide, text, handler }) => (
    <div className={styles.modalBody}>
        <p className={styles.modelBody}>{text}</p>
        <div className={styles.btnContainer}>
            <button
                onClick={() => {
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
export default TagOrCategoryDeleteBody;
