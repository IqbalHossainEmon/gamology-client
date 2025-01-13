import { useEffect, useRef, useState } from 'react';
import useDropDownHide from '../../../../../../../../Utils/Hooks/useDropDownHide';
import useTooltip from '../../../../../../../../Utils/Hooks/useTooltip';
import CardDotList from '../CardDotList/CardDotList';
import styles from './CardDotBody.module.css';

function CardDotBody({ item, lists, fadeIn }) {
	const [listShow, setListShow] = useState(false);

	const listShowRef = useRef(listShow);
	listShowRef.current = listShow;

	const fadeInRef = useRef(fadeIn);
	fadeInRef.current = fadeIn;

	const eventRefs = useRef(null);
	const { setElement, showMenu, onHide } = useDropDownHide(setListShow);

	if (!eventRefs.current) {
		eventRefs.current = {
			onClick: () => {
				setListShow(prev => !prev);
			},
			onAppear: element => {
				setElement(element);
				showMenu();
			},
		};
	}

	const btnRef = useRef(null);

	const setTooltip = useTooltip();

	const showRef = useRef(false);

	useEffect(() => {
		if (listShow) {
			setTooltip(
				btnRef.current,
				<CardDotList item={item} lists={lists} />,
				'bottom',
				true,
				true
			);
			showRef.current = true;
		} else if (showRef.current) {
			setTooltip(null, null, 'bottom', true);
			showRef.current = false;
		}

		return () => {
			if (showRef.current) {
				setTooltip(null, null, 'bottom', true);
				showRef.current = false;
			}
		};
	}, [listShow, item, lists, setTooltip]);

	return (
		<div className={styles.cardDots} ref={btnRef}>
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
		</div>
	);
}

export default CardDotBody;
