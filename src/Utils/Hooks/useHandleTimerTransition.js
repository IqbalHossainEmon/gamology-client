import { useRef } from 'react';

export default function useHandleTimerTransition(setState, time = 200) {
	const timerId = useRef(null);
	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = () => {
			if (timerId.current) {
				clearTimeout(timerId.current);
				timerId.current = null;
			}
			timerId.current = setTimeout(() => {
				timerId.current = null;
				setState(prev => ({ ...prev, transition: false }));
			}, time);
		};
	}

	return eventRef.current;
}
