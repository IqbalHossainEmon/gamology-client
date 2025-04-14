import { useCallback, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useChangeBodyOverflow() {
	const root = useRef(document.getElementById('root'));

	const isTouchable = useIsTouchAble();

	const isAddedRef = useRef(false);
	const isPaddingAddedRef = useRef(false);

	const checkForTouchScreen = useCallback(() => {
		if (isPaddingAddedRef.current && isTouchable()) {
			root.current.classList.remove('scrollbar-replace-padding');
			isPaddingAddedRef.current = false;
		} else if (!isPaddingAddedRef.current && !isTouchable()) {
			root.current.classList.add('scrollbar-replace-padding');
			isPaddingAddedRef.current = true;
		}
	}, [isTouchable]);
	const hideBodyOverflow = useCallback(() => {
		if (root.current.scrollHeight > root.current.clientHeight) {
			root.current.classList.add('overflow-y-hidden');
			window.addEventListener('resize', checkForTouchScreen);
			if (!isTouchable()) {
				root.current.classList.add('scrollbar-replace-padding');
				isPaddingAddedRef.current = true;
			}
			isAddedRef.current = true;
		}
	}, [checkForTouchScreen, isTouchable]);
	const showBodyOverflow = useCallback(() => {
		if (isAddedRef.current) {
			root.current.classList.remove('overflow-y-hidden');
			window.removeEventListener('resize', checkForTouchScreen);
			if (isPaddingAddedRef.current) {
				root.current.classList.remove('scrollbar-replace-padding');
				isPaddingAddedRef.current = false;
			}
			isAddedRef.current = false;
		}
	}, [checkForTouchScreen]);

	return {
		hideBodyOverflow,
		showBodyOverflow,
	};
}
