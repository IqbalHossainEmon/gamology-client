import AllGames from '../Components/AllGames/AllGames/AllGames';
import styles from './DashboardBody.module.css';

function DashboardBody() {
	return (
		<div className={styles.dashboardBody}>
			<AllGames />
		</div>
	);
}

export default DashboardBody;
