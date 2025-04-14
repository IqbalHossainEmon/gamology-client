import { useCallback, useEffect, useRef } from 'react';
import useIsTouchAble from './useIsTouchable';

export default function useDragStartStop(moveEvent, handleMouseUp, grab = false) {
	const isTouchAble = useIsTouchAble();
	const isTouchAdd = useRef(false);
	const onStopRef = useRef(null);

	const onStop = useCallback(
		e => {
			if (e.cancelable) {
				e.preventDefault();
			}

			if (isTouchAdd.current) {
				document.removeEventListener('touchmove', moveEvent);
				document.removeEventListener('touchend', onStopRef.current);
				isTouchAdd.current = false;
			} else {
				document.removeEventListener('mousemove', moveEvent);
				document.removeEventListener('mouseup', onStopRef.current);
			}

			window.removeEventListener('blur', onStopRef.current);

			if (handleMouseUp) handleMouseUp(e);
			if (document.getElementById('root').classList.contains('grabbing')) {
				document.getElementById('root').removeAttribute('class');
			}
		},
		[handleMouseUp, moveEvent]
	);

	useEffect(() => {
		onStopRef.current = onStop;
	}, [onStop]);

	const onStart = useCallback(
		e => {
			if (e.defaultPrevented) e.preventDefault();
			const touchAble = isTouchAble();

			window.addEventListener('blur', onStop);
			if (touchAble) {
				document.addEventListener('touchmove', moveEvent);
				document.addEventListener('touchend', onStop);
				isTouchAdd.current = true;
			} else {
				document.addEventListener('mousemove', moveEvent);
				document.addEventListener('mouseup', onStop);
			}

			if (touchAble && grab) {
				document.getElementById('root').classList.add('grabbing');
			}
		},
		[grab, isTouchAble, moveEvent, onStop]
	);

	return onStart;
}
