import { useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../../Hooks/useAppearDisappear';
import useDropDownHide from '../../../../../../../../Hooks/useDropDownHide';
import useIsTouchAble from '../../../../../../../../Hooks/useIsTouchable';
import CardDotList from '../CardDotList/CardDotList';
import styles from './CardDot.module.css';

const CardDot = ({ item, lists, fadeIn, listShowRef, setParentShow, isOutside }) => {
	const [listShow, setListShow] = useState(false);

	const isTouchAble = useIsTouchAble();

	const elementRef = useRef(null);

	listShowRef.current = listShow;

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleHide: () => {
				setListShow(false);
				if (!isTouchAble() && isOutside.current) setParentShow(false);
			},
		};
	}
	const { show, fadeIn: childFadeIn } = useAppearDisappear(listShow);

	const { setElement, stopMenu, showMenu } = useDropDownHide(eventRef.current.handleHide);

	return (
		<div ref={elementRef} className={styles.cardDots}>
			<button
				onClick={() => {
					if (!listShow) {
						setListShow(true);
						setElement(elementRef.current);
						showMenu();
					} else {
						setListShow(false);
						stopMenu();
					}
				}}
				className={`${styles.btnDot}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
				type='button'
			>
				<svg
					viewBox='0 0 32 32'
					enableBackground='new 0 0 32 32'
					version='1.1'
					xmlSpace='preserve'
					xmlns='http://www.w3.org/2000/svg'
					fill='#ffffff'
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
					lists={lists}
					handleHide={eventRef.current.handleHide}
					item={item}
					parentRef={elementRef}
					fadeIn={childFadeIn}
				/>
			)}
		</div>
	);
};

export default CardDot;
