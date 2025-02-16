import { useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../../Utils/Hooks/useAppearDisappear';
import useDropDownHide from '../../../../../../../../Utils/Hooks/useDropDownHide';
import CardDotList from '../CardDotList/CardDotList';
import styles from './CardDotBody.module.css';

const isMouseOverElement = element => {
	const mouseX = window.event?.x || 0;
	const mouseY = window.event?.y || 0;

	const elementUnderMouse = document.elementFromPoint(mouseX, mouseY);
	return element.contains(elementUnderMouse);
};

function CardDotBody({ item, lists, fadeIn, setParentShow, parentRef }) {
	const [listShow, setListShow] = useState(false);

	const fadeInRef = useRef(fadeIn);
	fadeInRef.current = fadeIn;

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleHide: state => {
				setListShow(state);

				if (!isMouseOverElement(parentRef.current)) {
					setParentShow(state);
				}
			},
		};
	}

	const { setElement, showMenu, onHide } = useDropDownHide(eventRefs.current.handleHide);

	const [show, childFadeIn] = useAppearDisappear(listShow);

	if (!eventRefs.current.onClick) {
		eventRefs.current = {
			...eventRefs.current,
			onClick: () => {
				setListShow(prev => {
					if (prev) {
						onHide();
					}
					return !prev;
				});
			},
			onAppear: element => {
				setElement(element);
				showMenu();
			},
		};
	}

	return (
		<div className={styles.cardDots}>
			<button
				className={`${styles.btnDot}${fadeIn || listShow ? ` ${styles.zoomIn}` : ''}`}
				onClick={eventRefs.current.onClick}
				type='button'
			>
				<svg
					enableBackground='new 0 0 32 32'
					fill='#ffffff'
					version='1.1'
					viewBox='0 0 32 32'
					xmlSpace='preserve'
					xmlns='http://www.w3.org/2000/svg'
				>
					<g strokeWidth='0' />
					<g strokeLinecap='round' strokeLinejoin='round' />
					<g>
						<circle cx='16' cy='16' fill='#F08A5D' r='2' />
						<circle cx='16' cy='26' fill='#B83B5E' r='2' />
						<circle cx='16' cy='6' fill='#B83B5E' r='2' />
						<circle
							cx='16'
							cy='16'
							fill='none'
							r='2'
							stroke='#200F60'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeMiterlimit='10'
							strokeWidth='0.00032'
						/>
						<circle
							cx='16'
							cy='26'
							fill='#F9ED69'
							r='2'
							stroke='#200F60'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeMiterlimit='10'
							strokeWidth='0.00032'
						/>
						<circle
							cx='16'
							cy='6'
							fill='none'
							r='2'
							stroke='#200F60'
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeMiterlimit='10'
							strokeWidth='0.00032'
						/>
					</g>
				</svg>
			</button>
			{show && (
				<CardDotList
					fadeIn={childFadeIn}
					onAppear={eventRefs.current.onAppear}
					item={item}
					lists={lists}
				/>
			)}
		</div>
	);
}

export default CardDotBody;
