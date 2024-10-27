import withTooltip from '../../../../../Utils/HOC/withTooltip';
import SetDashboardTooltipContext from '../../../Utils/Contexts/DashboardTooltipContext';
import EditBanner from '../Components/Events/EditBanner/EditBanner/EditBanner';
import styles from './DashboardBody.module.css';

function DashboardBodyMain() {
	return (
		<div className={`${styles.dashboardBodyContainer}`} id='dashboard-body'>
			<div className={styles.dashboardBody} id='dashboard-innerBody'>
				<EditBanner />
			</div>
		</div>
	);
}

const DashboardBody = withTooltip(
	DashboardBodyMain,
	SetDashboardTooltipContext,
	'dashboard-innerBody'
);
export default DashboardBody;
