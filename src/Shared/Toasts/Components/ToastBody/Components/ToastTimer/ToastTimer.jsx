import { useState } from 'react';
import useAnimationFrame from '../../../../../../Hooks/useAnimationFrame';
import styles from './ToastTimer.module.css';

function ToastTimer({ type, isPaused, id, duration = 5000 }) {
	const [scaleX, setScaleX] = useState(100);

	console.log(scaleX);

	useAnimationFrame(
		progress => setScaleX(100 - Math.min(progress * 100, 100)),
		duration,
		isPaused
	);

	return (
		<div
			className={`${styles.toastTimer} ${styles[type]}${isPaused ? ` ${styles.pause}` : ''}`}
			style={{ transform: `scaleX(${scaleX / 100})` }}
		/>
	);
}

export default ToastTimer;
