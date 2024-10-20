import withTooltip from '../../../../../Utils/HOC/withTooltip';
import SetDashboardTooltipContext from '../../../Utils/Contexts/DashboardTooltipContext';
import AllGames from '../Components/AllGames/AllGames/AllGames';
import styles from './DashboardBody.module.css';

function DashboardBodyMain() {
	return (
		<div className={`${styles.dashboardBodyContainer}`} id='dashboard-body'>
			<div className={styles.dashboardBody} id='dashboard-innerBody'>
				<AllGames />
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
