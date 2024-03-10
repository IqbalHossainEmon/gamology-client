import AddGame from '../Components/AddGame/AddGame/AddGame';
import styles from './DashboardBody.module.css';

const DashboardBody = () => (
  <div className={styles.dashboardBodyContainer}>
    <div className={styles.dashboardBody}>
      <AddGame />
    </div>
  </div>
);
export default DashboardBody;
