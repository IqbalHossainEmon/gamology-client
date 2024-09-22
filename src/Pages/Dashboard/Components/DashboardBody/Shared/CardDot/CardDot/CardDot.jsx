import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../../../../../Hooks/useAppearDisappear';
import useIsTouchAble from '../../../../../../../Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';
import CardDotBody from '../Components/CardDotBody/CardDotBody';

function CardDot({ parentRef, ...rest }) {
	const [dotShow, setDotShow] = useState(false);
	const dotShowRef = useRef(false);
	dotShowRef.current = dotShow;

	const listShowRef = useRef(false);
	const isEventAdded = useRef(false);
	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			setParentShow: setDotShow,
			handleShowBtn: () => {
				if (!dotShowRef.current) {
					setDotShow(true);
				}
			},
			handleHideBtn: () => {
				if (dotShowRef.current && !listShowRef.current) {
					setDotShow(false);
				}
			},
		};
	}
	const isTouchAble = useIsTouchAble();
	const { screenWidth } = useScreenWidth();
	const [show, fadeIn] = useAppearDisappear(dotShow);

	useEffect(() => {
		const parent = parentRef.current;
		const touchable = isTouchAble();

		if (parent && !touchable && !isEventAdded.current) {
			parent.addEventListener('mousemove', eventRef.current.handleShowBtn);
			parent.addEventListener('mouseleave', eventRef.current.handleHideBtn);
			isEventAdded.current = true;
			if (dotShowRef.current) {
				setDotShow(false);
			}
		} else if (isEventAdded.current && touchable) {
			parent.removeEventListener('mousemove', eventRef.current.handleShowBtn);
			parent.removeEventListener('mouseleave', eventRef.current.handleHideBtn);
			isEventAdded.current = false;
			setDotShow(true);
		} else if (touchable) {
			setDotShow(true);
		}
		return () => {
			if (parent && isEventAdded.current) {
				parent.removeEventListener('mousemove', eventRef.current.handleShowBtn);
				parent.removeEventListener('mouseleave', eventRef.current.handleHideBtn);
				isEventAdded.current = false;
			}
		};
	}, [isTouchAble, parentRef, screenWidth]);

	return (
		show && (
			<CardDotBody
				{...rest}
				fadeIn={fadeIn}
				listShowRef={listShowRef}
				setParentShow={setDotShow}
			/>
		)
	);
}
export default CardDot;
