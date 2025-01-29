import { useEffect, useRef } from 'react';
import useTooltip from './useTooltip';

const useHoverTooltips = (element, message, position = 'left') => {
	const eventRef = useRef(null);

	const setTooltip = useTooltip();

	if (!eventRef.current) {
		eventRef.current = {
			onMouseEnter: e => {
				setTooltip(element.current, message, position);
			},
			onMouseLeave: e => {
				console.log('Mouse Leave');
			},
		};
	}

	useEffect(() => {
		if (!element.current) return;

		const ele = element.current;

		ele.addEventListener('mouseenter', eventRef.current.onMouseEnter);
		ele.addEventListener('mouseleave', eventRef.current.onMouseLeave);

		return () => {
			ele.removeEventListener('mouseenter', eventRef.current.onMouseEnter);
			ele.removeEventListener('mouseleave', eventRef.current.onMouseLeave);
		};
	}, [element]);

	return eventRef.current.handleSetTooltip;
};

export default useHoverTooltips;
