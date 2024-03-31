import Modal from '../../../../../../../Shared/Modal/Modal';
import styles from './DashboardModal.module.css';

const DashboardModal = ({ title, modalQuestion, modalBody, setShow }) => {
    if (!title) return null;
    return (
        <Modal setShow={setShow}>
            <h2 className={styles.header}>{title}</h2>
            <h3 className={styles.headerQuestion}>{modalQuestion}</h3>
            {modalBody}
        </Modal>
    );
};
export default DashboardModal;
