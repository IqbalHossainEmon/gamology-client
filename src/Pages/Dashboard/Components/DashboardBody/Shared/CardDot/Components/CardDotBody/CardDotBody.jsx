import { useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../../Utils/Hooks/useAppearDisappear';
import useDropDownHide from '../../../../../../../../Utils/Hooks/useDropDownHide';
import CardDotList from '../CardDotList/CardDotList';
import styles from './CardDotBody.module.css';

function CardDotBody({ item, lists, fadeIn }) {
	const [listShow, setListShow] = useState(false);

	const elementRef = useRef(null);

	const listShowRef = useRef(listShow);
	listShowRef.current = listShow;

	const fadeInRef = useRef(fadeIn);
	fadeInRef.current = fadeIn;

	const eventRefs = useRef(null);
	const { setElement, showMenu, onHide } = useDropDownHide(setListShow);

	const [show, childFadeIn] = useAppearDisappear(listShow);

	if (!eventRefs.current) {
		eventRefs.current = {
			onClick: () => {
				setListShow(prev => {
					if (prev) {
						onHide();
					}
					return !prev;
				});
			},
			handleBlur: element => {
				setElement(element);
				showMenu();
			},
		};
	}

	return (
		<div className={styles.cardDots}>
			<button
				ref={elementRef}
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
			{show ? (
				<CardDotList
					fadeIn={childFadeIn}
					handleBlur={eventRefs.current.handleBlur}
					item={item}
					lists={lists}
					parentRef={elementRef}
					setHide={() => {
						setListShow(false);
						onHide();
					}}
				/>
			) : null}
		</div>
	);
}

export default CardDotBody;
