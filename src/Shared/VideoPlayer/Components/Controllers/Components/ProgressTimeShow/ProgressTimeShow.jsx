import { useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import { useVideoPlayerProgress } from '../../../../../../Hooks/useVideoPlayerProgress';
import styles from './ProgressTimeShow.module.css';

export default function ProgressTimeShow({ video }) {
	const formatTime = useTimeFormat();
	const time = useVideoPlayerProgress();
	const videoRef = useRef(video.current);
	const eventRef = useRef({
		loadUpdate: () => {},
	});
	const [durationTime, setDurationTime] = useState(0);

	eventRef.current.loadUpdate = useCallback(({ target: { duration } }) => {
		setDurationTime(duration);
	}, []);

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
				{time && durationTime ? formatTime((time / 100) * durationTime) : '0:00'}/
				{durationTime ? formatTime(durationTime) : '0:00'}
			</p>
		</div>
	);
}
