import { useEffect, useRef } from 'react';
import useTooltip from './useTooltip';

const useHoverTooltips = (element, message, conditionCheckFunction, position = 'left') => {
	const eventRefs = useRef(null);

	const setTooltip = useTooltip();

	const tooltipsInfos = useRef({ container: null, message: '', position: '' });
	tooltipsInfos.current.container = element.current;
	tooltipsInfos.current.message = message;
	tooltipsInfos.current.position = position;

	if (!eventRefs.current) {
		let prevElements = {
			container: null,
			message: '',
			position: '',
		};
		eventRefs.current = {
			onMouseEnter: () => {
				if (
					prevElements.container !== tooltipsInfos.current.container ||
					prevElements.message !== tooltipsInfos.current.message ||
					prevElements.position !== tooltipsInfos.current.position
				) {
					eventRefs.current.handleHide = setTooltip(tooltipsInfos);
					prevElements = {
						container: tooltipsInfos.current.container,
						message: tooltipsInfos.current.message,
						position: tooltipsInfos.current.position,
					};
				}
			},
			onMouseLeave: () => {
				if (eventRefs.current.handleHide) {
					eventRefs.current.handleHide(tooltipsInfos.current.container);
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
		if (!element.current) return;

		if (conditionCheckFunction && !conditionCheckFunction()) return;

		const ele = element.current;

		ele.addEventListener('mouseenter', eventRefs.current.onMouseEnter);
		ele.addEventListener('mouseleave', eventRefs.current.onMouseLeave);

		return () => {
			ele?.removeEventListener('mouseenter', eventRefs.current.onMouseEnter);
			ele?.removeEventListener('mouseleave', eventRefs.current.onMouseLeave);
		};
	}, [conditionCheckFunction, element, message]);
};

export default useHoverTooltips;
