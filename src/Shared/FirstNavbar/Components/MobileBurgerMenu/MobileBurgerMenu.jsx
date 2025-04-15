import { useEffect, useRef, useState } from 'react';

import useDropDownHide from '../../../../Utils/Hooks/useDropDownHide';
import FirstNavMobileNavLinks from '../FirstNavMobileNavLinks/FirstNavMobileNavLinks';

import styles from './MobileBurgerMenu.module.css';

export default function MobileBurgerMenu({ hideBodyOverflow, showBodyOverflow }) {
	const [navState, setNavState] = useState(false);
	const elementRef = useRef();
	const { showMenu, setElement, onHide } = useDropDownHide(prop => {
		setNavState(prop);
		showBodyOverflow();
	});

	useEffect(() => {
		setElement(elementRef.current);
	}, [setElement, elementRef]);

	const handleClick = () => {
		setNavState(prev => {
			if (prev) {
				onHide();
				showBodyOverflow();
			} else {
				showMenu();
				hideBodyOverflow();
				document.documentElement.scrollTop = 0;
			}
			return !prev;
		});
	};

	return (
		<div ref={elementRef}>
			<FirstNavMobileNavLinks navState={navState} setNavState={setNavState} />
			<div
				className={`${styles.navOptionBg}${navState ? ` ${styles.hamburgerActive}` : ''}`}
			/>
			<button className={styles.hamburgerButton} onClick={handleClick} type='button'>
				<div className={`${styles.hamburger}${navState ? ` ${styles.cross}` : ''}`} />
			</button>
		</div>
	);
}
