import DashboardBody from '../Components/DashboardBody/DashboardBody/DashboardBody';
import Drawer from '../Components/Drawer/Drawer/Drawer';
import styles from './Dashboard.module.css';

const Dashboard = () => (
    <div className={styles.dashboard}>
        <Drawer />
        <DashboardBody />
    </div>
);
export default Dashboard;
