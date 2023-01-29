import useScreenInfo from '../../../Hooks/useScreenInfo';
import SecondNavLeftSide from '../Components/SecondNavLeftSide/SecondNavLeftSide';
import SecondNavRightSide from '../Components/SecondNavRightSide/SecondNavRightSide';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  const { screenWidth } = useScreenInfo();

  return (
    <div className={styles.SecondNavbar}>
      <SecondNavLeftSide screenWidth={screenWidth} />
      <SecondNavRightSide screenWidth={screenWidth} />
    </div>
  );
}
