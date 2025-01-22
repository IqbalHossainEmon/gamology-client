import EditGame from '../Components/AllGames/Components/EditGame/EditGame/EditGame';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody}>
			<EditGame />
		</div>
	);
}

export default DashboardBody;
