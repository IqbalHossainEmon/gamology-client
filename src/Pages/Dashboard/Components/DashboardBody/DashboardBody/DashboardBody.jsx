import AddGame from '../Components/AddGame/AddGame';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody}>
			<AddGame />
		</div>
	);
}

export default DashboardBody;
