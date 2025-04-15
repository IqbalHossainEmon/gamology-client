import { useEffect, useRef, useState } from 'react';

import useAnimationFrame from '../../../../../../Utils/Hooks/useAnimationFrame';

import styles from './ToastTimer.module.css';

function ToastTimer({ type, isPaused, handleHide, duration = 5000 }) {
	const [scaleX, setScaleX] = useState(100);
	const eventRef = useRef(null);

	useEffect(() => {
		if (scaleX === 0) {
			handleHide();
		}
	}, [scaleX, handleHide]);

	if (!eventRef.current) {
		eventRef.current = progress => setScaleX(100 - Math.min(progress * 100, 100));
	}

	useAnimationFrame(eventRef.current, duration, isPaused);

	return (
		<div
			className={`${styles.toastTimer} ${styles[type]}${isPaused ? ` ${styles.pause}` : ''}`}
			style={{ transform: `scaleX(${scaleX / 100})` }}
		/>
	);
}

export default ToastTimer;
