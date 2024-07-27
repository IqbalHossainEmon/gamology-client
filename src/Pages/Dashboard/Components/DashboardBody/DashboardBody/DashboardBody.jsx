import { useRef } from 'react';
import withDashboardModal from '../../../../../HOC/withDashboardModal';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import UserContainer from '../Components/UserAdminContainer/UserContainer/UserContainer/UserContainer';
import styles from './DashboardBody.module.css';

const DashboardBody = ({ render }) => {
    const parentRef = useRef(null);
    const childRef = useRef(null);

    return (
        <div className={styles.dashboardBodyScrollContainer}>
            <div ref={parentRef} className={styles.dashboardBodyContainer}>
                <div ref={childRef} className={styles.dashboardBody}>
                    <UserContainer />
                </div>
            </div>
            <ScrollBar parentRef={parentRef} childRef={childRef} />
            {render}
        </div>
    );
};
export default withDashboardModal(DashboardBody);
