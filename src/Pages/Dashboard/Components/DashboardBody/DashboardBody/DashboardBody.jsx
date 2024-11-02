import EditBanner from '../Components/Events/EditBanner/EditBanner/EditBanner';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody} id='dashboard-body'>
			<EditBanner />
		</div>
	);
}

export default DashboardBody;
