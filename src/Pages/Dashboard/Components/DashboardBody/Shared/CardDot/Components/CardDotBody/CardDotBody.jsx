import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../../Hooks/useAppearDisappear';
import useDropDownHide from '../../../../../../../../Hooks/useDropDownHide';
import useIsTouchAble from '../../../../../../../../Hooks/useIsTouchable';
import CardDotList from '../CardDotList/CardDotList';
import styles from './CardDotBody.module.css';

function CardDotBody({ item, lists, fadeIn, listShowRef, setParentShow }) {
	const [listShow, setListShow] = useState(false);
	const isTouchAble = useIsTouchAble();
	const elementRef = useRef(null);

	listShowRef.current = listShow;

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleHide: () => {
				setListShow(false);
				if (!isTouchAble()) {
					setParentShow(false);
				}
			},
		};
	}

	const { setElement, stopMenu, showMenu } = useDropDownHide(eventRefs.current.handleHide);

	if (!eventRefs.current.handleToggle) {
		eventRefs.current.handleToggle = () => {
			if (!listShowRef.current) {
				setListShow(true);
				showMenu();
			} else {
				setListShow(false);
				stopMenu();
			}
		};
	}

	const [show, childFadeIn] = useAppearDisappear(listShow);

	useEffect(() => {
		setElement(elementRef.current);
	}, [setElement]);

	return (
		<div className={styles.cardDots} ref={elementRef}>
			<button
				className={`${styles.btnDot}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
				onClick={eventRefs.current.handleToggle}
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
					handleHide={eventRefs.current.handleHide}
					item={item}
					lists={lists}
					parentRef={elementRef}
				/>
			) : null}
		</div>
	);
}

export default CardDotBody;
