import { useRef } from 'react';

const useIsTouchAble = () => {
	const isTouchable = useRef(null);

	if (!isTouchable.current) {
		isTouchable.current = () => window.matchMedia('(any-hover: none)').matches;
	}

	return isTouchable.current;
};

export default useIsTouchAble;
