import { useRef, useState } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AllGames from '../Components/AllGames/AllGames/AllGames';
import DashboardModal from '../Components/DashboardModal/DashbboardModal/DashboardModal';
import styles from './DashboardBody.module.css';

const DashboardBody = () => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [{ show, detail, type }, setModal] = useState({ type: '', detail: {}, show: false });

  return (
    <div className={styles.dashboardBodyScrollContainer}>
      <div ref={parentRef} className={styles.dashboardBodyContainer}>
        <div ref={childRef} className={styles.dashboardBody}>
          <AllGames setModal={setModal} />
        </div>
      </div>
      <ScrollBar parentRef={parentRef} childRef={childRef} />
      {show && <DashboardModal type={type} detail={detail} setShow={prop => setModal(prev => ({ ...prev, show: prop }))} />}
    </div>
  );
};
export default DashboardBody;
