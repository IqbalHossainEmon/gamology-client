import EditBanner from '../Components/Events/EditBanner/EditBanner';
import withDashboardModal from '../Components/Utils/HOC/withDashboardModal';
import styles from './DashboardBody.module.css';

function DashboardBody({ children }) {
	return (
		<div className={`${styles.dashboardBodyContainer} scroll-style`} id='dashboard-body'>
			<div className={styles.dashboardBody}>
				<EditBanner />
				{children}
			</div>
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
