import styles from './DashboardModal.module.css';

const DashboardModal = ({ title, modalQuestion, ModalBody, handleHide, setModal }) => {
    if (!title || !ModalBody) return null;
    return (
        <>
            <h2 className={styles.header}>{title}</h2>
            <div className={styles.headerQuestion}>{modalQuestion}</div>
            <ModalBody handleHide={handleHide} setModal={setModal} />
        </>
    );
};
export default DashboardModal;
