import { useState } from 'react';
import useScreenWidth from '../../../Utils/Hooks/useScreenWidth';
import ScreenShadow from '../../ScreenShadow/ScreenShadow';
import SearchField from '../../SearchField/SearchField';
import SecondNavLeftLinks from '../Components/SecondNavLeftLinks/SecondNavLeftLinks';
import SecondNavRightLinks from '../Components/SecondNavRightLinks/SecondNavRightLinks';
import styles from './SecondNavbar.module.css';

export default function SecondNavbar() {
	const { screenWidth } = useScreenWidth();
	const [navShow, setNavShow] = useState(false);

	return (
		<section className={styles.SecondNavContainer}>
			<div className={styles.SecondNavbar}>
				<SearchField setNavShow={setNavShow} screenWidth={screenWidth} />
				<SecondNavLeftLinks
					{...(screenWidth <= 768 && { setNavShow })}
					screenWidth={screenWidth}
				/>
				<SecondNavRightLinks screenWidth={screenWidth} />
			</div>
			<ScreenShadow show={navShow && screenWidth <= 768} />
		</section>
	);
}
