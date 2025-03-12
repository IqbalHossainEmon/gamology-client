import { useRef } from 'react';

const useIsTouchAble = () => {
	const isTouchable = useRef(null);

	if (!isTouchable.current) {
		isTouchable.current = () =>
			window.matchMedia('(any-pointer: coarse)').matches ||
			'ontouchstart' in window ||
			navigator.maxTouchPoints > 0;
	}

	return isTouchable.current;
};

export default useIsTouchAble;
