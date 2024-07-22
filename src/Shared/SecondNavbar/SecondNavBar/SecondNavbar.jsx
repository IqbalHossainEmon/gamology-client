import { useState } from 'react';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import ScreenShadow from '../../ScreenShadow/ScreenShadow';
import SearchField from '../../SearchField/SearchField';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
    const screenWidth = useScreenWidth();
    const [navShow, setNavShow] = useState(false);

    return (
        <section className={styles.SecondNavContainer}>
            <div className={styles.SecondNavbar}>
                <SearchField {...(screenWidth <= 768 && { setNavShow })} setChangedValue={e => console.log(e)} />
                <SecondNavLeftLinks {...(screenWidth <= 768 && { setNavShow })} screenWidth={screenWidth} />
                <SecondNavRightLinks screenWidth={screenWidth} />
            </div>
            <div className={styles.screenShadowContainer}>
                <ScreenShadow show={!navShow} />
            </div>
        </section>
    );
}
