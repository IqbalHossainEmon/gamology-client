import EditGameCards from '../Components/Events/EditGameCards/EditGameCards/EditGameCards';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody}>
			<EditGameCards />
		</div>
	);
}

export default DashboardBody;
