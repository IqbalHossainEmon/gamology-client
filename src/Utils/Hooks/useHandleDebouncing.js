import { useCallback, useRef } from 'react';

const useHandleDebouncing = (seconds = 500) => {
	const timeOutRef = useRef(null);
	// Handle multiple click.
	return useCallback(
		handleClick => {
			if (timeOutRef.current) {
				return;
			}
			handleClick();
			timeOutRef.current = setTimeout(() => {
				timeOutRef.current = null;
			}, seconds);
		},
		[seconds]
	);
};

export default useHandleDebouncing;
