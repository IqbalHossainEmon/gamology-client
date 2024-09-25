import { useRef } from 'react';

const useHandleDebouncing = (seconds = 500) => {
	const timeOutRef = useRef(null);
	// Handle multiple click.
	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = handleClick => {
			if (!timeOutRef.current) {
				handleClick();
				timeOutRef.current = setTimeout(() => {
					timeOutRef.current = null;
				}, seconds);
			}
		};
	}

	return eventRef.current;
};

export default useHandleDebouncing;
