import EditTags from '../Components/EditTags/EditTags/EditTags';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody}>
			<EditTags />
		</div>
	);
}

export default DashboardBody;
