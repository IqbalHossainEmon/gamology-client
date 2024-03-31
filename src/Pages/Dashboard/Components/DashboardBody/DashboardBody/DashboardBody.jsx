import { useRef, useState } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AllGames from '../Components/AllGames/AllGames/AllGames';
import DashboardModal from '../Components/DashboardModal/DashboardModal/DashboardModal';
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
                    <AllGames setModal={setModal} />
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
