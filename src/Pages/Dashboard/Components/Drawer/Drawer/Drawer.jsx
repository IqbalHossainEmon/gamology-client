import { useEffect, useRef, useState } from 'react';
import ScreenShadow from '../../../../../Shared/ScreenShadow/ScreenShadow';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar';
import useDropDownHide from '../../../../../Utils/Hooks/useDropDownHide';
import useScreenWidth from '../../../../../Utils/Hooks/useScreenWidth';
import DrawerFooter from '../Components/DrawerFooter/DrawerFooter';
import drawerIcon from '../Components/drawerIcon/drawerIcon';
import DrawerOptions from '../Components/DrawerOptions/DrawerOptions';
import styles from './Drawer.module.css';

function Drawer() {
	const [collapse, setCollapse] = useState(false);
	const [transition, setTransition] = useState(false);
	const collapseRef = useRef(collapse);
	collapseRef.current = collapse;

	const { screenWidth, screenWidthRef } = useScreenWidth();

	const mainParentRef = useRef(null);
	const scrollParentRef = useRef(null);
	const scrollChildRef = useRef(null);
	const elementRef = useRef(null);
	const transitionId = useRef(null);
	const eventRefs = useRef(null);

	const wasDrawerOpen = useRef(false);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleTransition: () => {
				setTransition(true);
				if (transitionId.current) {
					clearTimeout(transitionId.current);
					transitionId.current = null;
				}
				transitionId.current = setTimeout(() => {
					setTransition(false);
					transitionId.current = null;
				}, 300);
			},
			handleHide: () => {
				setCollapse(false);
				eventRefs.current.handleTransition();
			},
		};
	}
	const { showMenu, setElement } = useDropDownHide(eventRefs.current.handleHide);

	if (!eventRefs.current.handleButtonClick) {
		eventRefs.current.handleButtonClick = () => {
			setCollapse(prev => {
				if (!prev && screenWidthRef.current < 1100) {
					showMenu();
				}
				return !prev;
			});
			eventRefs.current.handleTransition();
		};
	}

	useEffect(() => {
		if (screenWidth < 1100 && collapseRef.current) {
			setCollapse(false);
			wasDrawerOpen.current = true;
		} else if (wasDrawerOpen.current && screenWidth >= 1100) {
			setCollapse(true);
			wasDrawerOpen.current = false;
		}
	}, [screenWidth]);

	useEffect(() => {
		setElement(elementRef.current);
	}, [setElement]);

	return (
		<>
			<div
				className={`${collapse ? `${styles.containerCollapse} ` : ''}${transition ? `${styles.containerTransition} ` : ''}${styles.drawerContainer}`}
				ref={elementRef}
			>
				<div className={styles.drawerImmediateContainer}>
					<div className={styles.drawerScrollContainer} ref={mainParentRef}>
						<div className={styles.drawer} ref={scrollParentRef}>
							<ul className={styles.optionContainer} ref={scrollChildRef}>
								{drawerIcon.map(drawer => (
									<DrawerOptions
										{...(screenWidth > 1099 && { parentState: collapse })}
										key={drawer.id}
										option={drawer}
									/>
								))}
							</ul>
							<DrawerFooter collapse={collapse} screenWidth={screenWidth} />
						</div>
						<ScrollBar
							childRef={scrollChildRef}
							parentRef={scrollParentRef}
							mainParentRef={mainParentRef}
						/>
					</div>
				</div>
				<button
					className={`${collapse ? styles.collapsePosition : styles.expandedPosition} ${styles.collapseButton}`}
					onClick={eventRefs.current.handleButtonClick}
					type='button'
				>
					<span className={styles.arrowBtn} />
				</button>
			</div>
			{screenWidth < 1100 && <ScreenShadow show={collapse} zIndex={1} />}
		</>
	);
}
export default Drawer;
