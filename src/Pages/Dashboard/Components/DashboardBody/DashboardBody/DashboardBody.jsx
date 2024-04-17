import { useRef, useState } from 'react';
import Modal from '../../../../../Shared/Modal/Modal';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AddGame from '../Components/AddGame/AddGame';
import EditGame from '../Components/AllGamesContainer/Components/EditGame/EditGame/EditGame';
import DashboardModal from '../Components/DashboardModal/DashboardModal/DashboardModal';
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

    const [showAdd, setShowAdd] = useState(true);

    return (
        <div className={styles.dashboardBodyScrollContainer}>
            <div ref={parentRef} className={styles.dashboardBodyContainer}>
                <button onClick={() => setShowAdd(prev => !prev)} type="button">
                    Toggle
                </button>
                <div ref={childRef} className={styles.dashboardBody}>
                    {showAdd ? <AddGame setModal={setModal} /> : <EditGame setModal={setModal} />}
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
