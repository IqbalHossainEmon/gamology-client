import { useState } from 'react';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import ScreenShadow from '../../ScreenShadow/ScreenShadow';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';
import SecondNavSearchField from '../Components/SecondNavSearchField/SecondNavSearchField';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
  const screenWidth = useScreenWidth();
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
