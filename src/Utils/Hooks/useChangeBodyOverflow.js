import { useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useChangeBodyOverflow() {
	const root = useRef(document.getElementById('root'));
	const eventRefs = useRef(null);

	const isTouchable = useIsTouchAble();

	if (!eventRefs.current) {
		eventRefs.current = {
			hideBodyOverflow: () => {
				root.current.style.overflowY = 'hidden';
				if (!isTouchable()) root.current.style.marginRight = '11px';
			},
			showBodyOverflow: () => {
				root.current.removeAttribute('style');
			},
		};
	}
	return {
		hideBodyOverflow: eventRefs.current.hideBodyOverflow,
		showBodyOverflow: eventRefs.current.showBodyOverflow,
	};
}
