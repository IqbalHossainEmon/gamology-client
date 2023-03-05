import { useState } from 'react';
import useScreenInfo from '../../../Hooks/useScreenInfo';
import ScreenShadow from '../../ScreenShadow/ScreenShadow';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';
import SecondNavSearchField from '../Components/SecondNavSearchField/SecondNavSearchField';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  const { screenWidth } = useScreenInfo();
  const [navShow, setNavShow] = useState(false);

  return (
    <section className={styles.SecondNavContainer}>
      <div className={styles.SecondNavbar}>
        <SecondNavSearchField
          {...(screenWidth <= 768 && { setNavShow })}
          screenWidth={screenWidth}
        />
        <SecondNavLeftLinks {...(screenWidth <= 768 && { setNavShow })} screenWidth={screenWidth} />
        <SecondNavRightLinks screenWidth={screenWidth} />
      </div>
      <ScreenShadow show={navShow} />
    </section>
  );
}
