import { useRef } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AllGames from '../Components/AllGames/AllGames/AllGames';
import styles from './DashboardBody.module.css';

const DashboardBody = () => {
  const parentRef = useRef(null);
  const childRef = useRef(null);

  return (
    <div className={styles.dashboardBodyScrollContainer}>
      <div ref={parentRef} className={styles.dashboardBodyContainer}>
        <div ref={childRef} className={styles.dashboardBody}>
          <AllGames />
        </div>
      </div>
      <ScrollBar parentRef={parentRef} childRef={childRef} />
    </div>
  );
};
export default DashboardBody;
