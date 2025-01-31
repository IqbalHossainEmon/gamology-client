import { useEffect, useRef } from 'react';
import useTooltip from './useTooltip';

const useHoverTooltips = (element, message, conditionCheckFunction, position = 'left') => {
	const eventRefs = useRef(null);

	const setTooltip = useTooltip();

	if (!eventRefs.current) {
		let prevElements = {
			container: null,
			message: '',
			position: '',
		};
		eventRefs.current = {
			onMouseEnter: () => {
				console.log('enter');

				if (
					prevElements.container !== element.current ||
					prevElements.message !== message ||
					prevElements.position !== position
				) {
					eventRefs.current.handleHide = setTooltip(element.current, message, position);
					prevElements = {
						container: element.current,
						message,
						position,
					};
				}
			},
			onMouseLeave: () => {
				if (eventRefs.current.handleHide) {
					eventRefs.current.handleHide(element.current);
					eventRefs.current.handleHide = undefined;
					prevElements = {
						container: null,
						message: '',
						position: '',
					};
				}
			},
		};
	}

	useEffect(() => {
		console.log(element.current, !element.current || !conditionCheckFunction());

		if (!element.current || !!conditionCheckFunction ? !conditionCheckFunction() : true) return;

		const ele = element.current;
		console.log('wkwk');

		ele.addEventListener('mouseenter', eventRefs.current.onMouseEnter);
		ele.addEventListener('mouseleave', eventRefs.current.onMouseLeave);

		return () => {
			ele?.removeEventListener('mouseenter', eventRefs.current.onMouseEnter);
			ele?.removeEventListener('mouseleave', eventRefs.current.onMouseLeave);
		};
	}, [conditionCheckFunction, element]);
};

export default useHoverTooltips;
