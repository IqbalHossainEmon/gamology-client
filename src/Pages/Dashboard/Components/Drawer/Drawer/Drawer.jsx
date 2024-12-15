import { useEffect, useRef, useState } from 'react';
import ScreenShadow from '../../../../../Shared/ScreenShadow/ScreenShadow';
import ScrollBar from '../../../../../Shared/ScrollBar/ScrollBar/ScrollBar';
import useChangeBodyOverflow from '../../../../../Utils/Hooks/useChangeBodyOverflow';
import useDropDownHide from '../../../../../Utils/Hooks/useDropDownHide';
import useScreenWidth from '../../../../../Utils/Hooks/useScreenWidth';
import DrawerFooter from '../Components/DrawerFooter/DrawerFooter';
import drawerIcon from '../Components/drawerIcon/drawerIcon';
import DrawerOptions from '../Components/DrawerOptions/DrawerOptions';
import styles from './Drawer.module.css';

function Drawer({ dashboardBody }) {
	const [collapse, setCollapse] = useState(false);
	const [transition, setTransition] = useState(false);
	const [willScroll, setWillScroll] = useState(false);

	const collapseRef = useRef(collapse);
	collapseRef.current = collapse;

	const screenWidth = useScreenWidth();

	const screenWidthRef = useRef(screenWidth);
	screenWidthRef.current = screenWidth;

	const transitionId = useRef(null);
	const eventRefs = useRef(null);

	const wasDrawerOpen = useRef(false);
	const drawerRef = useRef(null);

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

	const prevWasScrollingRef = useRef(false);

	useEffect(() => {
		setElement(drawerRef.current);

		let wasScrolling = false;
		const parentResizeObserve = new ResizeObserver(([{ target }]) => {
			if (target.scrollHeight + 72 > window.innerHeight) {
				wasScrolling = true;
			} else {
				wasScrolling = false;
			}

			console.log(wasScrolling, prevWasScrollingRef.current);

			if (wasScrolling !== prevWasScrollingRef.current) {
				setWillScroll(wasScrolling);
				prevWasScrollingRef.current = wasScrolling;
			}
		});

		parentResizeObserve.observe(dashboardBody.current);

		return () => {
			parentResizeObserve.disconnect();
		};
	}, [setElement]);

	const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

	useEffect(() => {
		if (screenWidth < 1100) {
			if (collapse) {
				hideBodyOverflow();
			} else {
				showBodyOverflow();
			}
		}
	}, [collapse, hideBodyOverflow, screenWidth, showBodyOverflow]);

	return (
		<>
			<div
				className={`${collapse ? `${styles.containerCollapse} ` : ''}${transition ? `${styles.containerTransition} ` : ''}${styles.drawer}${willScroll ? ` ${styles.willScroll}` : ''}`}
				ref={drawerRef}
			>
				<div className={styles.drawerOptions}>
					<ScrollBar showPath={false}>
						<ul className={styles.optionContainer}>
							{drawerIcon.map(drawer => (
								<DrawerOptions
									{...(screenWidth > 1099 && { parentState: collapse })}
									key={drawer.id}
									option={drawer}
								/>
							))}
						</ul>
					</ScrollBar>
				</div>
				<button
					title='Collapse Drawer'
					className={`${(screenWidth > 1099 ? collapse : !collapse) ? styles.collapsePosition : styles.expandedPosition} ${styles.collapseButton}`}
					onClick={eventRefs.current.handleButtonClick}
					type='button'
				>
					<span className={styles.arrowBtn} />
				</button>
			</div>
			<DrawerFooter collapse={screenWidth > 1099 ? collapse : !collapse} />
			{screenWidth < 1100 && <ScreenShadow show={collapse} zIndex={1} />}
		</>
	);
}
export default Drawer;
