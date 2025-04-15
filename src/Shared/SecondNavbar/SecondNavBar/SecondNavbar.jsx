import { useState } from 'react';

import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import ScreenShadow from '../../ScreenShadow/ScreenShadow';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';
import SecondNavSearchField from '../Components/SecondNavSearchField/SecondNavSearchField/SecondNavSearchField';

import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
	const { widthInRem } = useScreenWidth();
	const [navShow, setNavShow] = useState(false);

	return (
		<section className={styles.secondNavContainer}>
			<div className={styles.secondNavbar}>
				<SecondNavSearchField setNavShow={setNavShow} />
				<SecondNavLeftLinks
					{...(widthInRem <= 48 && { setNavShow })}
					screenWidth={widthInRem}
				/>
				<SecondNavRightLinks screenWidth={widthInRem} />
			</div>
			<ScreenShadow show={navShow && widthInRem <= 48} />
		</section>
	);
}
