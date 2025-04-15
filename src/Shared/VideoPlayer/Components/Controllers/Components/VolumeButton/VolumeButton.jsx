import { useEffect, useState } from 'react';

import styles from './VolumeButton.module.css';

const icon = {
	muted: 'M13.5 9A4.5 4.5 0 0 0 11 4.97v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM16 9c0 .94-.2 1.82-.54 2.64l1.51 1.51A8.796 8.796 0 0 0 18 9c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM1.27 0L0 1.27 4.73 6H0v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 0 0 3.69-1.81L16.73 18 18 16.73l-9-9L1.27 0zM9 1L6.91 3.09 9 5.18V1z',
	low: 'M0 6v6h4l5 5V1L4 6H0z',
	medium: 'M13.5 9A4.5 4.5 0 0 0 11 4.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM0 6v6h4l5 5V1L4 6H0z',
	high: 'M0 6v6h4l5 5V1L4 6H0zm13.5 3A4.5 4.5 0 0 0 11 4.97v8.05c1.48-.73 2.5-2.25 2.5-4.02zM11 .23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77 0-4.28-2.99-7.86-7-8.77z',
};

export default function VolumeButton({ volume, videoRef, setVolume }) {
	const [state, setState] = useState({ title: 'muted', svg: icon.muted });

	useEffect(() => {
		let volState;
		if (volume > 66 && !videoRef.muted) {
			volState = 'high';
		} else if (volume <= 66 && volume > 33 && !videoRef.muted) {
			volState = 'medium';
		} else if (volume > 0 && volume <= 33 && !videoRef.muted) {
			volState = 'low';
		} else {
			volState = 'muted';
		}

		setState({ svg: icon[volState], title: volState });
	}, [videoRef, volume]);

	const handleMute = () => {
		if (videoRef.current.muted) {
			setVolume(videoRef.current.volume * 100);
		} else {
			setVolume(0);
		}
		videoRef.current.muted = !videoRef.current.muted;
	};

	return (
		<button className={styles.volumeBtn} onClick={handleMute} type='button'>
			<svg viewBox='0 0 18 18'>
				<title>{state.title}</title>
				<path d={state.svg} fill='white' fillRule='nonzero' />
			</svg>
		</button>
	);
}
