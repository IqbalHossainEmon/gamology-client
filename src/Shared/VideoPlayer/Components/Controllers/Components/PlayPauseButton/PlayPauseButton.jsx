import { memo, useEffect, useRef, useState } from 'react';

import styles from './PlayPauseButton.module.css';

const PlayPauseButton = ({ video, togglePausePlay, isSeekedRef, canPlay }) => {
	const [isPlaying, setIsPlaying] = useState(false);
	const isPlayingRef = useRef(isPlaying);
	isPlayingRef.current = isPlaying;

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handlePlay: () => {
				if (isSeekedRef.current && !isPlayingRef.current) {
					setIsPlaying(true);
				}
			},

			handlePause: () => {
				if (isSeekedRef.current && isPlayingRef.current) {
					setIsPlaying(false);
				}
			},

			handleCanToggle: () => {
				if (canPlay.current) {
					togglePausePlay();
				} else if (isPlayingRef.current) {
					setIsPlaying(false);
					togglePausePlay();
				}
			},
		};
	}
	useEffect(() => {
		let videoRef;

		const { handlePlay, handlePause } = eventRefs.current;

		if (video.current) {
			videoRef = video.current;
			videoRef.addEventListener('play', handlePlay);
			videoRef.addEventListener('pause', handlePause);
		}

		return () => {
			if (videoRef) {
				videoRef.removeEventListener('play', handlePlay);
				videoRef.removeEventListener('pause', handlePause);
			}
		};
	}, [video]);

	return (
		<button
			className={styles.playPauseButton}
			onClick={eventRefs.current.handleCanToggle}
			type="button"
		>
			<span>
				<svg viewBox={isPlaying ? '0 0 10 14' : '0 0 11 14'}>
					<path
						d={isPlaying ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'}
						fill="white "
						fillRule="nonzero"
					/>
				</svg>
			</span>
		</button>
	);
};

export default memo(PlayPauseButton);
