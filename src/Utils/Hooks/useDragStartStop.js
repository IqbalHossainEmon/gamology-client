import { useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(moveEvent, handleMouseUp = () => {}, grab = false) {
	const isTouchAble = useIsTouchAble();
	const isTouchAdd = useRef(false);
	const eventRefs = useRef(null);

	if (eventRefs.current === null) {
		eventRefs.current = {
			onStop: e => {
				if (e.cancelable) {
					e.preventDefault();
				}

				if (isTouchAdd.current) {
					document.removeEventListener('touchmove', moveEvent);
					document.removeEventListener('touchend', eventRefs.current.onStop);
					isTouchAdd.current = false;
				} else {
					document.removeEventListener('mousemove', moveEvent);
					document.removeEventListener('mouseup', eventRefs.current.onStop);
				}

				window.removeEventListener('blur', eventRefs.current.onStop);

				handleMouseUp(e);
				if (document.getElementById('root').classList.contains('grabbing')) {
					document.getElementById('root').removeAttribute('class');
				}
			},
			onStart: e => {
				if (e.defaultPrevented) e.preventDefault();
				const touchAble = isTouchAble();

				window.addEventListener('blur', eventRefs.current.onStop);
				if (touchAble) {
					document.addEventListener('touchmove', moveEvent);
					document.addEventListener('touchend', eventRefs.current.onStop);
					isTouchAdd.current = true;
				} else {
					document.addEventListener('mousemove', moveEvent);
					document.addEventListener('mouseup', eventRefs.current.onStop);
				}

				if (touchAble && grab) {
					document.getElementById('root').classList.add('grabbing');
				}
			},
		};
	}

	return eventRefs.current.onStart;
}
