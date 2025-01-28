import { useRef } from 'react';

const useHoverTooltips = () => {
	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			onMouseEnter: e => {},
		};
	}
};

export default useHoverTooltips;
