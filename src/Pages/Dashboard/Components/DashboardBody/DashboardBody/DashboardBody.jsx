import { useRef, useState } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import DashboardModal from '../Components/DashboardModal/DashboardModal/DashboardModal';
import EditTags from '../Components/EditTags/EditTags/EditTags';
import styles from './DashboardBody.module.css';

const DashboardBody = () => {
    const parentRef = useRef(null);
    const childRef = useRef(null);
    const [{ show, title, modalQuestion, modalBody }, setModal] = useState({
        title: null,
        modalQuestion: null,
        modalBody: null,
        show: false,
    });

    return (
        <div className={styles.dashboardBodyScrollContainer}>
            <div ref={parentRef} className={styles.dashboardBodyContainer}>
                <div ref={childRef} className={styles.dashboardBody}>
                    <EditTags setModal={setModal} />
                </div>
            </div>
            <ScrollBar parentRef={parentRef} childRef={childRef} />
            {show && (
                <DashboardModal
                    title={title}
                    modalQuestion={modalQuestion}
                    modalBody={modalBody}
                    setShow={prop => setModal(prev => ({ ...prev, show: prop }))}
                />
            )}
        </div>
    );
};
export default DashboardBody;
