import useScreenInfo from '../../../Hooks/useScreenInfo';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';
import SecondNavSearchField from '../Components/SecondNavSearchField/SecondNavSearchField';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  const { screenWidth } = useScreenInfo();

  return (
    <div className={styles.SecondNavContainer}>
      <div className={styles.SecondNavbar}>
        <SecondNavSearchField screenWidth={screenWidth} />
        <SecondNavLeftLinks screenWidth={screenWidth} />
        <SecondNavRightLinks screenWidth={screenWidth} />
      </div>
    </div>
  );
}
