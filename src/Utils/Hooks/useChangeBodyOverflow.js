import { useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useChangeBodyOverflow() {
	const root = useRef(document.getElementById('root'));
	const eventRefs = useRef(null);

	const isTouchable = useIsTouchAble();

	if (!eventRefs.current) {
		let isAdded;
		let isPaddingAdded;
		eventRefs.current = {
			checkForTouchScreen: () => {
				if (isPaddingAdded && isTouchable()) {
					root.current.classList.remove('scrollbar-replace-padding');
					isPaddingAdded = false;
				} else if (!isPaddingAdded && !isTouchable()) {
					root.current.classList.add('scrollbar-replace-padding');
					isPaddingAdded = true;
				}
			},
			hideBodyOverflow: () => {
				if (root.current.scrollHeight > root.current.clientHeight) {
					root.current.classList.add('overflow-y-hidden');
					window.addEventListener('resize', eventRefs.current.checkForTouchScreen);
					if (!isTouchable()) {
						root.current.classList.add('scrollbar-replace-padding');
						isPaddingAdded = true;
					}
					isAdded = true;
				}
			},
			showBodyOverflow: () => {
				if (isAdded) {
					root.current.classList.remove('overflow-y-hidden');
					window.removeEventListener('resize', eventRefs.current.checkForTouchScreen);
					if (isPaddingAdded) {
						root.current.classList.remove('scrollbar-replace-padding');
						isPaddingAdded = false;
					}
					isAdded = false;
				}
			},
		};
	}
	return {
		hideBodyOverflow: eventRefs.current.hideBodyOverflow,
		showBodyOverflow: eventRefs.current.showBodyOverflow,
	};
}
