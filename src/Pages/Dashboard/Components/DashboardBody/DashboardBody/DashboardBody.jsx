import EditUser from '../Components/UserAdminContainer/Components/EditUser/EditUser/EditUser';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody}>
			<EditUser />
		</div>
	);
}

export default DashboardBody;
