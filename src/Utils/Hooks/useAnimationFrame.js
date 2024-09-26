import { useEffect, useRef } from 'react';

export default function useAnimationFrame(setState, duration, isPaused, handleDone) {
	const animationRef = useRef(null);
	const startTimeRef = useRef(null);
	const elapsedTimeRef = useRef(0);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			cancelAnimation: paused => {
				if (animationRef.current) {
					if (paused) {
						elapsedTimeRef.current += performance.now() - startTimeRef.current;
					}
					cancelAnimationFrame(animationRef.current);
					startTimeRef.current = null;
					animationRef.current = null;
				}
			},
			animate: timestamp => {
				if (!startTimeRef.current) {
					startTimeRef.current = timestamp;
				}

				const elapsed = timestamp - startTimeRef.current + elapsedTimeRef.current;
				const progress = Math.min(elapsed / duration, 1);

				setState(progress);

				if (progress < 1) {
					animationRef.current = requestAnimationFrame(eventRefs.current.animate);
				} else if (handleDone) {
					handleDone();
				}
			},
			handleStartOrResume: () => {
				if (animationRef.current) {
					eventRefs.current.cancelAnimation();
				}
				animationRef.current = requestAnimationFrame(eventRefs.current.animate);
			},
		};
	}

	useEffect(() => {
		if (isPaused) {
			eventRefs.current.cancelAnimation(true);
		} else {
			eventRefs.current.handleStartOrResume();
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [isPaused]);
}
