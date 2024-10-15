import withDashboardModal from '../../../../Utils/HOC/withDashboardModal';
import withDashboardTooltip from '../../../../Utils/HOC/withDashboardTooltip';
import DashboardBodyContent from '../DashboardBodyContent/DashboardBodyContent';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={`${styles.dashboardBodyContainer}`} id='dashboard-body'>
			<div className={styles.dashboardBody} id='dashboard-innerBody'>
				<DashboardBodyContent />
			</div>
		</div>
	);
}

const EnhancedDashboardBody = withDashboardModal(withDashboardTooltip(DashboardBody));

export default EnhancedDashboardBody;
