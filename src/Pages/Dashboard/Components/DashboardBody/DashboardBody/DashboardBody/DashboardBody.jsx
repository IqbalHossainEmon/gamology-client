import withDashboardModal from '../../Components/Utils/HOC/withDashboardModal';
import DashboardBodyContent from '../DashboardBodyContent/DashboardBodyContent';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={`${styles.dashboardBodyContainer} scroll-style`} id='dashboard-body'>
			<div className={styles.dashboardBody} id='dashboard-innerBody'>
				<DashboardBodyContent />
			</div>
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(DashboardBody);

export default EnhancedDashboardBody;
