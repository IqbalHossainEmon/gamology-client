import AddGame from '../Components/AddGame/AddGame';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={`${styles.dashboardBodyContainer}`} id='dashboard-body'>
			<div className={styles.dashboardBody}>
				<AddGame />
			</div>
		</div>
	);
}

export default DashboardBody;
