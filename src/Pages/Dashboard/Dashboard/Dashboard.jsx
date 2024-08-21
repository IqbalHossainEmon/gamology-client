import DashboardBody from '../Components/DashboardBody/DashboardBody/DashboardBody';
import Drawer from '../Components/Drawer/Drawer/Drawer';
import styles from './Dashboard.module.css';

function Dashboard() {
	return (
		<div className={styles.dashboard}>
			<Drawer />

			<DashboardBody />
		</div>
	);
}
export default Dashboard;
