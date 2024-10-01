import EditGame from '../Components/AllGamesContainer/Components/EditGame/EditGame/EditGame';
import withDashboardModal from '../Components/Utils/HOC/withDashboardModal';
import styles from './DashboardBody.module.css';

function DashboardBody({ children }) {
	return (
		<div className={`${styles.dashboardBodyContainer} scroll-style`} id='dashboard-body'>
			<div className={styles.dashboardBody}>
				<EditGame />
				{children}
			</div>
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
