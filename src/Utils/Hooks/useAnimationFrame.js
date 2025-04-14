import { useCallback, useEffect, useRef } from 'react';

export default function useAnimationFrame(setState, duration, isPaused, handleDone) {
	const animationRef = useRef(null);
	const startTimeRef = useRef(null);
	const elapsedTimeRef = useRef(0);

	const cancelAnimation = useCallback(paused => {
		if (animationRef.current) {
			if (paused) {
				elapsedTimeRef.current += performance.now() - startTimeRef.current;
			}
			cancelAnimationFrame(animationRef.current);
			startTimeRef.current = null;
			animationRef.current = null;
		}
	}, []);

	const animateFnRef = useRef(null);

	const animate = useCallback(
		timestamp => {
			if (!startTimeRef.current) {
				startTimeRef.current = timestamp;
			}

			const elapsed = timestamp - startTimeRef.current + elapsedTimeRef.current;
			const progress = Math.min(elapsed / duration, 1);

			setState(progress);

			if (progress < 1) {
				animationRef.current = requestAnimationFrame(animateFnRef.current);
			} else if (handleDone) {
				handleDone();
			}
		},
		[duration, handleDone, setState]
	);

	useEffect(() => {
		animateFnRef.current = animate;
	}, [animate]);

	const handleStartOrResume = useCallback(() => {
		if (animationRef.current) {
			cancelAnimation();
		}
		animationRef.current = requestAnimationFrame(animate);
	}, [animate, cancelAnimation]);

	useEffect(() => {
		if (isPaused) {
			cancelAnimation(true);
		} else {
			handleStartOrResume();
		}

		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
		};
	}, [cancelAnimation, handleStartOrResume, isPaused]);
}
