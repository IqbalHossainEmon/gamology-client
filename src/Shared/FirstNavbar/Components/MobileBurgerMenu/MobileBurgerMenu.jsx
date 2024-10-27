import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../Utils/Hooks/useDropDownHide';

import FirstNavMobileNavLinks from '../FirstNavMobileNavLinks/FirstNavMobileNavLinks';
import styles from './MobileBurgerMenu.module.css';

export default function MobileBurgerMenu() {
	const [navState, setNavState] = useState(false);
	const navRef = useRef();
	const { showMenu, setElement, onHide } = useDropDownHide(setNavState);

	useEffect(() => {
		setElement(navRef.current);
	}, [setElement, navRef]);

	const root = document.getElementById('root');

	const handleClick = () => {
		setNavState(prev => {
			if (prev) {
				onHide();
				root.removeAttribute('style');
			} else {
				showMenu();
				root.style.overflow = 'hidden';
				root.scrollTop = 0;
			}
			return !prev;
		});
		showMenu();
	};

	return (
		<div ref={navRef}>
			<FirstNavMobileNavLinks navState={navState} setNavState={setNavState} />
			<div className={styles.navOptionBg} {...(navState && { id: styles.hamburgerActive })} />
			<button className={styles.hamburgerButton} onClick={handleClick} type='button'>
				<div className={styles.hamburger} {...(navState && { id: styles.cross })} />
			</button>
		</div>
	);
}
