import withTooltip from '../../../../../Utils/HOC/withTooltip';
import SetDashboardTooltipContext from '../../../Utils/Contexts/DashboardTooltipContext';
import AddGame from '../Components/AddGame/AddGame';
import styles from './DashboardBody.module.css';

function DashboardBodyMain() {
	return (
		<div className={`${styles.dashboardBodyContainer}`} id='dashboard-body'>
			<div className={styles.dashboardBody} id='dashboard-innerBody'>
				<AddGame />
			</div>
		</div>
	);
}

const DashboardBody = withTooltip(
	DashboardBodyMain,
	SetDashboardTooltipContext,
	'dashboard-innerBody',
	48
);
export default DashboardBody;
