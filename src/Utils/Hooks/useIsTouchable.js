import { useCallback } from 'react';

const useIsTouchAble = () =>
	useCallback(
		() =>
			window.matchMedia('(any-pointer: coarse)').matches ||
			'ontouchstart' in window ||
			navigator.maxTouchPoints > 0,
		[]
	);

export default useIsTouchAble;
