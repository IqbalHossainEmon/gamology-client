import { useEffect, useRef, useState } from 'react';
import VideoSlider from '../VideoSlider/VideoSlider';

import VolumeButton from '../VolumeButton/VolumeButton';
import styles from './VideoVolume.module.css';

export default function VideoVolume({ video, videoContainer, changePause }) {
	const [volume, setVolume] = useState(0);
	const videoRef = useRef(video.current);

	useEffect(() => {
		if (video.current) {
			videoRef.current = video.current;
		}
	}, [video]);

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleSetValue: val => {
				setVolume(val);
				if (val > 0) {
					videoRef.current.muted = false;
				} else {
					videoRef.current.muted = true;
				}

				videoRef.current.volume = val / 100;
			},
		};
	}

	return (
		<div className={styles.volume}>
			<VolumeButton setVolume={setVolume} videoRef={videoRef} volume={volume} />

			<div className={styles.volumeSliderContainer}>
				<div className={styles.volumeSlider}>
					<VideoSlider
						changePause={changePause}
						position={volume}
						setPosition={eventRef.current.handleSetValue}
						videoContainer={videoContainer}
					/>
				</div>
			</div>
		</div>
	);
}
