import { useRef } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import UserContainer from '../Components/UserAdminContainer/UserContainer/UserContainer/UserContainer';
import withDashboardModal from '../Components/Utils/HOC/withDashboardModal';
import styles from './DashboardBody.module.css';

function DashboardBody({ children }) {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	return (
		<div className={styles.dashboardBodyScrollContainer}>
			<div className={styles.dashboardBodyContainer} ref={parentRef}>
				<div className={styles.dashboardBody} ref={childRef}>
					<UserContainer />
				</div>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} />
			{children}
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
