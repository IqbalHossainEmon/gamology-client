import { useRef } from 'react';
import withDashboardModal from '../../../../../HOC/withDashboardModal';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import EditGame from '../Components/AllGamesContainer/Components/EditGame/EditGame/EditGame';
import styles from './DashboardBody.module.css';

const DashboardBody = ({ render }) => {
    const parentRef = useRef(null);
    const childRef = useRef(null);

    return (
        <div className={styles.dashboardBodyScrollContainer}>
            <div ref={parentRef} className={styles.dashboardBodyContainer}>
                <div ref={childRef} className={styles.dashboardBody}>
                    <EditGame />
                </div>
            </div>
            <ScrollBar parentRef={parentRef} childRef={childRef} />
            {render}
        </div>
    );
};
export default withDashboardModal(DashboardBody);
