import { useRef, useState } from 'react';
import Modal from '../../../../../Shared/Modal/Modal';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import DashboardModal from '../Components/DashboardModal/DashboardModal';
import UserContainer from '../Components/UserAdminContainer/UserContainer/UserContainer/UserContainer';
import styles from './DashboardBody.module.css';

const DashboardBody = () => {
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const [{ show, title, modalQuestion, ModalBody }, setModal] = useState({
        title: null,
        modalQuestion: null,
        ModalBody: null,
        show: false,
    });

    return (
        <div className={styles.dashboardBodyScrollContainer}>
            <div ref={parentRef} className={styles.dashboardBodyContainer}>
                <div ref={childRef} className={styles.dashboardBody}>
                    <UserContainer />
                </div>
            </div>
            <ScrollBar parentRef={parentRef} childRef={childRef} />
            {show && (
                <Modal
                    setShow={() =>
                        setModal({
                            title: null,
                            modalQuestion: null,
                            ModalBody: null,
                            show: false,
                        })
                    }
                >
                    <DashboardModal title={title} modalQuestion={modalQuestion} ModalBody={ModalBody} setModal={setModal} />
                </Modal>
            )}
        </div>
    );
};
export default DashboardBody;
