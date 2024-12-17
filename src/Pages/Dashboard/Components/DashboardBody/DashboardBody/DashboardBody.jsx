import AddGame from '../Components/AddGame/AddGame';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody} id='dashboard-body'>
			<AddGame />
		</div>
	);
}

export default DashboardBody;
