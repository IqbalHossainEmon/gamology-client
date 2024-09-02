import { useEffect, useRef, useState } from 'react';
import FullScreenButton from '../Components/FullScreenButton/FullScreenButton/FullScreenButton';
import useFullScreenLogic from '../Components/FullScreenButton/useFullScreenLogic/useFullScreenLogic';
import GearButton from '../Components/GearButton/GearButton/GearButton';
import PlayPauseButton from '../Components/PlayPauseButton/PlayPauseButton';
import ProgressTimeShow from '../Components/ProgressTimeShow/ProgressTimeShow';
import VideoProgressBar from '../Components/VideoProgressBar/VideoProgressBar';
import VideoStatus from '../Components/VideoStatus/VideoStatus';
import VideoVolume from '../Components/VideoVolume/VideoVolume';
import styles from './Controllers.module.css';

function Controllers({ video, videoContainer, src, isControllerShowing, isChanging, changePause }) {
	const handleFullScreen = useFullScreenLogic();
	const [progress, setProgress] = useState(0);
	const gearRef = useRef(null);
	const clickTimerId = useRef(null);
	const videoRef = useRef(video);
	const isSeekedRef = useRef(true);
	const canPlay = useRef(true);
	const shouldPause = useRef(false);

	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handlePlaying: () => {
				canPlay.current = true;
				if (shouldPause.current) {
					videoRef.current.pause();
					shouldPause.current = false;
				}
			},

			handleWaiting: () => {
				canPlay.current = false;
			},
			togglePausePlay: () => {
				if (canPlay.current) {
					if (!videoRef.current.ended) {
						if (videoRef.current.paused) {
							videoRef.current.play();
						} else {
							videoRef.current.pause();
						}
					} else {
						videoRef.current.currentTime = 0;
						videoRef.current.play();
					}
				} else {
					shouldPause.current = true;
				}
			},
			// Handle full screen or toggle play depending on click type
			handleClick: () => {
				if (clickTimerId.current) {
					handleFullScreen(videoContainer.current);
					clearTimeout(clickTimerId.current);
					clickTimerId.current = null;
				} else {
					clickTimerId.current = setTimeout(() => {
						eventRefs.current.togglePausePlay();
						clickTimerId.current = null;
					}, 200);
				}
			},
		};
	}

	useEffect(() => {
		const { handlePlaying, handleWaiting } = eventRefs.current;
		const addEventListeners = videoElement => {
			videoElement.addEventListener('playing', handlePlaying);
			videoElement.addEventListener('waiting', handleWaiting);
		};
		const removeEventListeners = videoElement => {
			videoElement.removeEventListener('playing', handlePlaying);
			videoElement.removeEventListener('waiting', handleWaiting);
		};
		const updateVideoRef = videoElement => {
			videoRef.current = videoElement;
			addEventListeners(videoRef.current);
		};

		if (video.current) {
			updateVideoRef(video.current);
		}

		return () => {
			if (videoRef.current) {
				removeEventListeners(videoRef.current);
			}
		};
	}, [video]);

	return (
		<>
			<button
				className={styles.fullDisplayPlayPauseBtn}
				onClick={eventRefs.current.handleClick}
				type='button'
			/>
			<ul className={styles.controllers} id={isControllerShowing ? styles.show : styles.hide}>
				<li className={styles.videoProgressSlider}>
					<VideoProgressBar
						changePause={changePause}
						isSeekedRef={isSeekedRef}
						src={src}
						video={video}
						videoContainer={videoContainer}
						setProgress={setProgress}
						progress={progress}
					/>
				</li>
				<li>
					<PlayPauseButton
						canPlay={canPlay}
						isSeekedRef={isSeekedRef}
						togglePausePlay={eventRefs.current.togglePausePlay}
						video={video}
					/>
				</li>
				<li>
					<VideoVolume
						changePause={changePause}
						video={video}
						videoContainer={videoContainer}
					/>
				</li>
				<li>
					<ProgressTimeShow video={video} progress={progress} />
				</li>
				<li className={styles.gearButton} ref={gearRef}>
					<GearButton gearRef={gearRef} videoContainer={videoContainer} />
				</li>
				<li>
					<FullScreenButton videoContainer={videoContainer} />
				</li>
			</ul>
			<VideoStatus isChanging={isChanging} isSeekedRef={isSeekedRef} video={video} />
		</>
	);
}

export default Controllers;
