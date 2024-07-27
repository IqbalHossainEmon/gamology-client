import styles from './DashboardModal.module.css';

const DashboardModal = ({ content }) => {
    const { modalTitle, modalBody, modalFooter } = content;
    if (!modalTitle || !modalBody) return null;
    return (
        <>
            <h2 className={styles.header}>{modalTitle}</h2>
            <div className={styles.headerQuestion}>{modalBody}</div>
            <div>{modalFooter}</div>
        </>
    );
};
export default DashboardModal;
