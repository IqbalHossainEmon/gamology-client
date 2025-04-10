import { memo, useEffect, useRef } from 'react';

import styles from './PlayPauseButton.module.css';

function PlayPauseButton({
	video,
	togglePausePlay,
	isSeekedRef,
	canPlay,
	isPlaying,
	setIsPlaying,
}) {
	const isPlayingRef = useRef(isPlaying);
	isPlayingRef.current = isPlaying;

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			onVideoPlay: () => {
				if (isSeekedRef.current && !isPlayingRef.current) {
					setIsPlaying(true);
				}
			},
			onPauseVideo: () => {
				if (isSeekedRef.current && isPlayingRef.current) {
					setIsPlaying(false);
				}
			},
			handleCanToggle: () => {
				if (canPlay.current && video.current.paused) {
					togglePausePlay();
				} else if (isPlayingRef.current && !video.current.paused) {
					setIsPlaying(false);
					togglePausePlay();
				}
			},
		};
	}
	useEffect(() => {
		const { onVideoPlay, onPauseVideo, onWindowVisibilityChange, handleEnd } =
			eventRefs.current;

		const videoRef = video.current;
		if (videoRef) {
			videoRef.addEventListener('play', onVideoPlay);
			videoRef.addEventListener('pause', onPauseVideo);
			videoRef.addEventListener('ended', handleEnd);
			videoRef.addEventListener('playing', onWindowVisibilityChange);
			return () => {
				videoRef.removeEventListener('play', onVideoPlay);
				videoRef.removeEventListener('pause', onPauseVideo);
				videoRef.removeEventListener('ended', handleEnd);
				videoRef.removeEventListener('playing', onWindowVisibilityChange);
			};
		}
	}, [video]);

	return (
		<button
			className={styles.playPauseButton}
			onClick={eventRefs.current.handleCanToggle}
			type='button'
		>
			<svg viewBox={isPlaying ? '0 0 10 14' : '0 0 11 14'}>
				<path
					d={isPlaying ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'}
					fill='white '
					fillRule='nonzero'
				/>
			</svg>
		</button>
	);
}

export default memo(PlayPauseButton);
