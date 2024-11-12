import EditGameCards from '../Components/Events/EditGameCards/EditGameCards/EditSales';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody} id='dashboard-body'>
			<EditGameCards />
		</div>
	);
}

export default DashboardBody;
