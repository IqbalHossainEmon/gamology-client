import { useEffect, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useChangeBodyOverflow() {
	const root = useRef();
	const eventRefs = useRef(null);

	useEffect(() => {
		root.current = document.getElementById('root');
	}, []);

	const isTouchable = useIsTouchAble();

	if (!eventRefs.current) {
		eventRefs.current = {
			hideBodyOverflow: () => {
				const touchAble = isTouchable();

				if (
					!touchAble &&
					!root.current.classList.contains('margin-right-6px') &&
					!root.current.classList.contains('overflow-y-hidden') &&
					root.current.scrollHeight > window.innerHeight
				) {
					root.current.classList.add('overflow-y-hidden', 'margin-right-6px');
				} else if (touchAble) {
					root.current.classList.add('overflow-y-hidden');
				}
			},
			showBodyOverflow: () => {
				if (root.current.classList.contains('margin-right-6px')) {
					root.current.classList.remove('margin-right-6px');
				}
				if (root.current.classList.contains('overflow-y-hidden')) {
					root.current.classList.remove('overflow-y-hidden');
				}
			},
		};
	}
	return {
		hideBodyOverflow: eventRefs.current.hideBodyOverflow,
		showBodyOverflow: eventRefs.current.showBodyOverflow,
	};
}
