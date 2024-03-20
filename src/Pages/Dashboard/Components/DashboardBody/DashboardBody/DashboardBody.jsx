import { useRef, useState } from 'react';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import AllGames from '../Components/AllGames/AllGames/AllGames';
import DashboardModal from '../Components/DashboardModal/DashbboardModal/DashboardModal';
import styles from './DashboardBody.module.css';

const DashboardBody = () => {
  const parentRef = useRef(null);
  const childRef = useRef(null);
  const [{ show, detail, type }, setModal] = useState({
    type: 'price',
    detail: {
      id: 23,
      name: 'UNCHARTED™: Legacy of Thieves Collection',
      category: {
        card: 'Base game',
      },
      coverImg: '/assets/images/CarouselCoverDesktop/fortnite.png',
      logoImg: '/assets/images/CarouselInfo/fortnite-logo.png',
      carouselThumb: '/assets/images/CarouselCard/fortnite-carousel-thumb.jpg',
      coverMobile: '/assets/images/CarouselCoverMobile/uncharted-carousel-mobile.jpg',
      price: { regular: 49.99, discount: 15.99 },
    },
    show: true,
  });

  return (
    <div className={styles.dashboardBodyScrollContainer}>
      <div ref={parentRef} className={styles.dashboardBodyContainer}>
        <div ref={childRef} className={styles.dashboardBody}>
          <AllGames />
        </div>
      </div>
      <ScrollBar parentRef={parentRef} childRef={childRef} />
      <DashboardModal type={type} detail={detail} show={show} setShow={prop => setModal(prev => ({ ...prev, show: prop }))} />
    </div>
  );
};
export default DashboardBody;
