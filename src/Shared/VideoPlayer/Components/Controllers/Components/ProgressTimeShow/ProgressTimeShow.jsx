import { useEffect, useRef, useState } from 'react';

import useTimeFormat from '../../../../../../Utils/Hooks/useTimeFormate';

import styles from './ProgressTimeShow.module.css';

export default function ProgressTimeShow({ video, progress }) {
	const formatTime = useTimeFormat();
	const videoRef = useRef(video.current);
	const eventRef = useRef(null);
	const [durationTime, setDurationTime] = useState(0);

	if (!eventRef.current) {
		eventRef.current = {
			loadUpdate: ({ target: { duration } }) => {
				setDurationTime(duration);
			},
		};
	}
	useEffect(() => {
		const { loadUpdate } = eventRef.current;

		if (video.current) {
			videoRef.current = video.current;
			videoRef.current.addEventListener('loadedmetadata', loadUpdate);
		}

		return () => {
			videoRef.current.removeEventListener('loadedmetadata', loadUpdate);
		};
	}, [video]);

	return (
		<div className={styles.progressTimeShow}>
			<p>
				<span className={styles.progressTime}>
					{progress && durationTime
						? formatTime((progress / 100) * durationTime)
						: '0:00'}
				</span>
				/ {durationTime ? formatTime(durationTime) : '0:00'}
			</p>
		</div>
	);
}
