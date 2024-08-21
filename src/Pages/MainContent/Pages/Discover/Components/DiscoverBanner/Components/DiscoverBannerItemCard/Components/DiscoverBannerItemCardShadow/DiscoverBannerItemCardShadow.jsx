import { useEffect, useRef, useState } from 'react';
import styles from './DiscoverBannerItemCardShadow.module.css';

function DiscoverBannerItemCardShadow({ isPause }) {
	const [translate, setTranslate] = useState(0);
	const timerId = useRef(null);
	const startTime = useRef(null);
	const translateRef = useRef(translate);
	translateRef.current = translate;

	const prevTranslate = useRef(0);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			cancelAnimation: isPaused => {
				if (timerId.current) {
					if (isPaused) {
						prevTranslate.current = translateRef.current;
					}
					cancelAnimationFrame(timerId.current);
					startTime.current = null; // Reset start time
					timerId.current = null;
				}
			},

			animate: timestamp => {
				if (!startTime.current) {
					startTime.current = timestamp;
				}
				const elapsed = timestamp - startTime.current;

				if (elapsed >= 7750) {
					eventRefs.current.cancelAnimation();
					return;
				}
				setTranslate(Math.min(prevTranslate.current + 0.0129032258 * elapsed, 100));
				timerId.current = requestAnimationFrame(eventRefs.current.animate);
			},
			handleStartOrResume: () => {
				if (timerId.current) {
					eventRefs.current.cancelAnimation();
				}
				timerId.current = requestAnimationFrame(eventRefs.current.animate);
			},
		};
	}

	useEffect(() => {
		if (isPause) {
			eventRefs.current.cancelAnimation(true);
		} else {
			eventRefs.current.handleStartOrResume();
		}

		return () => {
			if (timerId.current) {
				cancelAnimationFrame(timerId.current);
			}
		};
	}, [isPause]);

	return (
		<div className={styles.shadowContainer}>
			<div
				className={styles.shadow}
				style={{
					transform: `translateY(${translate}%)`,
				}}
			/>
		</div>
	);
}

export default DiscoverBannerItemCardShadow;
