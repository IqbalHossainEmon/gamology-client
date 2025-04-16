import { useCallback, useEffect, useRef } from 'react';

import useTooltip from './useTooltip';

const useHoverTooltips = (element, message, conditionCheckFunction, position = 'left') => {
	const setTooltip = useTooltip();

	const tooltipsInfos = useRef({ container: null, message: '', position: '' });

	const prevElements = useRef({
		container: null,
		message: '',
		position: '',
	});

	const handleHideRef = useRef(null);

	const onMouseEnter = useCallback(() => {
		if (
			prevElements.current.container !== tooltipsInfos.current.container ||
			prevElements.current.message !== tooltipsInfos.current.message ||
			prevElements.current.position !== tooltipsInfos.current.position
		) {
			handleHideRef.current = setTooltip(tooltipsInfos);
			prevElements.current = {
				container: tooltipsInfos.current.container,
				message: tooltipsInfos.current.message,
				position: tooltipsInfos.current.position,
			};
		}
	}, [setTooltip]);

	const onMouseLeave = () => {
		if (handleHideRef.current) {
			handleHideRef.current(tooltipsInfos.current.container);
			handleHideRef.current = null;
			prevElements.current = {
				container: null,
				message: '',
				position: '',
			};
		}
	};

	useEffect(() => {
		if (!element.current) {
			return;
		}

		if (conditionCheckFunction && !conditionCheckFunction()) {
			return;
		}

		const ele = element.current;

		tooltipsInfos.current.container = element.current;
		tooltipsInfos.current.message = message;
		tooltipsInfos.current.position = position;

		if (ele) {
			ele.addEventListener('mouseenter', onMouseEnter);
			ele.addEventListener('mouseleave', onMouseLeave);

			return () => {
				ele.removeEventListener('mouseenter', onMouseEnter);
				ele.removeEventListener('mouseleave', onMouseLeave);
			};
		}
	}, [conditionCheckFunction, element, message, onMouseEnter, position]);
};

export default useHoverTooltips;
