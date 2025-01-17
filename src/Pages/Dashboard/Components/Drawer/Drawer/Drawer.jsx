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

function Drawer() {
	const [collapse, setCollapse] = useState(false);
	const [transition, setTransition] = useState(false);

	const collapseRef = useRef(collapse);
	collapseRef.current = collapse;

	const { widthInRem } = useScreenWidth();

	const widthInRemRef = useRef(widthInRem);
	widthInRemRef.current = widthInRem;

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
				if (!prev && widthInRemRef.current < 68.75) {
					showMenu();
				}
				return !prev;
			});
			eventRefs.current.handleTransition();
		};
	}

	useEffect(() => {
		if (widthInRem < 68.75 && collapseRef.current) {
			setCollapse(false);
			wasDrawerOpen.current = true;
		} else if (wasDrawerOpen.current && widthInRem >= 68.75) {
			setCollapse(true);
			wasDrawerOpen.current = false;
		}
	}, [widthInRem]);

	useEffect(() => {
		setElement(drawerRef.current);
	}, [setElement]);

	const { hideBodyOverflow, showBodyOverflow } = useChangeBodyOverflow();

	useEffect(() => {
		if (widthInRem < 68.75) {
			if (collapse) {
				hideBodyOverflow();
			} else {
				showBodyOverflow();
			}
		}
	}, [collapse, hideBodyOverflow, widthInRem, showBodyOverflow]);

	return (
		<>
			<div
				className={`${collapse ? `${styles.containerCollapse} ` : ''}${transition ? `${styles.containerTransition} ` : ''}${styles.drawer}`}
				ref={drawerRef}
			>
				<div className={styles.drawerOptions}>
					<div className={styles.optionContainer}>
						<ScrollBar showPath={false}>
							<ul className={styles.options}>
								{drawerIcon.map(drawer => (
									<DrawerOptions
										{...(widthInRem > 68.6875 && { parentState: collapse })}
										key={drawer.id}
										option={drawer}
									/>
								))}
							</ul>
						</ScrollBar>
					</div>
				</div>
				<button
					title='Collapse Drawer'
					className={`${(widthInRem > 68.6875 ? collapse : !collapse) ? styles.collapsePosition : styles.expandedPosition} ${styles.collapseButton}`}
					onClick={eventRefs.current.handleButtonClick}
					type='button'
				>
					<span className={styles.arrowBtn} />
				</button>
			</div>
			<DrawerFooter
				collapse={widthInRem > 68.6875 ? collapse : !collapse}
				transition={transition}
			/>
			{widthInRem < 68.75 && <ScreenShadow show={collapse} zIndex={1} />}
		</>
	);
}
export default Drawer;
