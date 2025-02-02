import { useEffect, useRef, useState } from 'react';

import useDropDownHide from '../../../../Utils/Hooks/useDropDownHide';
import RotateArrow from '../../../RotateArrow/RotateArrow';
import SecondNavLinkLists from '../SecondNavLinkList/SecondNavLinkList';
import styles from './SecondNavMobileLinks.module.css';

export default function SecondNavMobileLinks({ setNavShow }) {
	const [navTextState, setNavTextState] = useState(styles.discover);
	const [navMidShow, setNavMidShow] = useState(false);
	const firstElement = useRef(null);
	const secondElement = useRef(null);
	const setShowState = state => {
		setNavShow(state);
		setNavMidShow(state);
	};
	const { showMenu, setElement } = useDropDownHide(setShowState);

	useEffect(() => {
		setElement([firstElement.current, secondElement.current]);
	}, [setElement, firstElement]);

	const handleClick = no => {
		setShowState(false);
		switch (no) {
			case 1:
				setNavTextState(styles.browse);
				break;
			default:
				setNavTextState(styles.discover);
				break;
		}
	};

	return (
		<div className={styles.mobileLinks}>
			<SecondNavLinkLists
				id={navMidShow ? 'navShow' : 'navHide'}
				navMidShow={navMidShow}
				setNavTextState={handleClick}
				firstElement={firstElement}
			/>
			<button
				className={styles.navLinkToggleButton}
				onClick={() => {
					setShowState(prev => !prev);
					showMenu();
				}}
				ref={secondElement}
				type='button'
			>
				<div className={`${styles.navLinkOverFlow} ${navTextState}`}>
					<p>Discover</p>
					<p>Browse</p>
				</div>
				<div className={styles.navArrow}>
					<RotateArrow state={navMidShow} />
				</div>
			</button>
		</div>
	);
}
