import { useEffect, useRef, useState } from 'react';
import useIsTouchAble from '../../../../../../../Utils/Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../../Utils/Hooks/useScreenWidth';
import CardDotBody from '../Components/CardDotBody/CardDotBody';

function CardDot({ parentRef, ...rest }) {
	const [dotShow, setDotShow] = useState(false);
	const dotShowRef = useRef(false);
	dotShowRef.current = dotShow;

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
				if (dotShowRef.current) {
					setDotShow(false);
				}
			},
		};
	}

	const isTouchAble = useIsTouchAble();
	const screenWidth = useScreenWidth();

	useEffect(() => {
		const parent = parentRef.current;

		const touchable = isTouchAble();

		if (parent && !touchable && !isEventAdded.current) {
			parent.addEventListener('mouseover', eventRef.current.handleShowBtn);
			parent.addEventListener('mouseleave', eventRef.current.handleHideBtn);
			isEventAdded.current = true;
			if (dotShowRef.current) {
				setDotShow(false);
			}
		} else if (isEventAdded.current && touchable) {
			parent.removeEventListener('mouseover', eventRef.current.handleShowBtn);
			parent.removeEventListener('mouseleave', eventRef.current.handleHideBtn);
			isEventAdded.current = false;
			setDotShow(true);
		} else if (touchable) {
			setDotShow(true);
		}
		return () => {
			if (parent && isEventAdded.current) {
				parent.removeEventListener('mouseover', eventRef.current.handleShowBtn);
				parent.removeEventListener('mouseleave', eventRef.current.handleHideBtn);
				isEventAdded.current = false;
			}
		};
	}, [isTouchAble, parentRef, screenWidth]);

	return <CardDotBody {...rest} fadeIn={dotShow} setParentShow={setDotShow} />;
}
export default CardDot;
