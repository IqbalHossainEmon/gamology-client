import { useEffect, useRef, useState } from 'react';

import useDropDownHide from '../../../../Utils/Hooks/useDropDownHide';
import RotateArrow from '../../../RotateArrow/RotateArrow';
import SecondNavLinkLists from '../SecondNavDesktopLinks/SecondNavDesktopLinks';
import styles from './SecondNavMobileLinks.module.css';

export default function SecondNavMobileLinks() {
	const [navTextState, setNavTextState] = useState(styles.discover);
	const [navMidShow, setNavMidShow] = useState();
	const midSliderElement1 = useRef(null);
	const midSliderElement2 = useRef(null);

	const { showMenu, setElement } = useDropDownHide(setNavMidShow);

	useEffect(() => {
		setElement([midSliderElement1.current, midSliderElement2.current]);
	}, [setElement, midSliderElement1]);

	const handleClick = no => {
		setNavMidShow(false);
		switch (no) {
			case 1:
				setNavTextState(styles.browse);
				break;
			case 2:
				setNavTextState(styles.news);
				break;
			default:
				setNavTextState(styles.discover);
				break;
		}
	};

	return (
		<div className={styles.mobileLinks}>
			<div className={styles.navLinksContainer} ref={midSliderElement1}>
				<SecondNavLinkLists navMidShow={navMidShow} setNavTextState={handleClick} />
			</div>
			<button
				className={styles.navLinkToggleButton}
				onClick={() => {
					setNavMidShow(prev => !prev);
					showMenu();
				}}
				ref={midSliderElement2}
				type='button'
			>
				<div className={styles.navLinkOverFlow} id={navTextState}>
					<p>Discover</p>
					<p>Browse</p>
					<p>News</p>
				</div>
				<div className={styles.navArrow}>
					<RotateArrow state={navMidShow} />
				</div>
			</button>
		</div>
	);
}
