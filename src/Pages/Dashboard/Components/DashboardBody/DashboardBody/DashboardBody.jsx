import withTooltip from '../../../../../Utils/HOC/withTooltip';
import SetDashboardTooltipContext from '../../../Utils/Contexts/DashboardTooltipContext';
import withDashboardModal from '../../../Utils/HOC/withDashboardModal';
import EditGame from '../Components/AllGames/Components/EditGame/EditGame/EditGame';
import styles from './DashboardBody.module.css';

function DashboardBodyMain() {
	return (
		<div className={`${styles.dashboardBodyContainer}`} id='dashboard-body'>
			<div className={styles.dashboardBody} id='dashboard-innerBody'>
				<EditGame />;
			</div>
		</div>
	);
}

const DashboardBody = withDashboardModal(
	withTooltip(DashboardBodyMain, SetDashboardTooltipContext, 'dashboard-innerBody', 48)
);

export default DashboardBody;
