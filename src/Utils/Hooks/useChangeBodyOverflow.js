import { useEffect, useRef } from 'react';

export default function useChangeBodyOverflow(element) {
	const root = useRef();
	const eventRefs = useRef(null);

	useEffect(() => {
		if (element) {
			root.current = element.current;
		} else root.current = document.getElementById('root');
	}, [element]);

	if (!eventRefs.current) {
		eventRefs.current = {
			hideBodyOverflow: () => {
				root.current.style.overflowY = 'hidden';
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
