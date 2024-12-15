import { useRef } from 'react';
import DashboardBody from '../Components/DashboardBody/DashboardBody/DashboardBody';
import Drawer from '../Components/Drawer/Drawer/Drawer';
import styles from './Dashboard.module.css';

function Dashboard() {
	const dashboardBodyRef = useRef(null);

	return (
		<div className={styles.dashboard}>
			<Drawer dashboardBody={dashboardBodyRef} />
			<DashboardBody ref={dashboardBodyRef} />
		</div>
	);
}

export default Dashboard;
