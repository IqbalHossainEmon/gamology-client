import { useEffect, useRef, useState } from 'react';

import VideoSlider from '../VideoSlider/VideoSlider';

export default function VideoProgressBar({
	video: videoRef,
	videoContainer,
	src,
	isSeekedRef,
	changePause,
	setProgress,
	progress,
	isControllerShowing,
}) {
	const interval = useRef(null);
	const [buffer, setBuffer] = useState(0);
	const progressRef = useRef(progress);
	progressRef.current = progress;

	const isPlaying = useRef(false);
	const isMouseDown = useRef(false);
	const shouldPlay = useRef(false);
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			progressBufferUpdate: ({ target: { buffered, duration } }) => {
				if (buffered.length > 0) {
					if (buffered.length === 1) {
						setBuffer((buffered.end(buffered.length - 1) / duration) * 100);
					} else {
						const { currentTime } = videoRef.current;
						for (let i = 0; i < buffered.length; i++) {
							if (
								buffered.end(i) >= currentTime &&
								currentTime >= buffered.start(i)
							) {
								setBuffer((buffered.end(i) / duration) * 100);
								break;
							}
						}
					}
				}
			},

			progressUpdate: ({ target: { duration, currentTime } }) => {
				if (!isMouseDown.current) {
					setProgress((currentTime / duration) * 100);
				}
			},

			handleError: () => {
				if (interval.current) {
					clearInterval(interval.current);
					interval.current = null;
				}
			},

			handlePlaying: () => {
				if (isMouseDown.current) {
					videoRef.current.pause();
					shouldPlay.current = true;
				} else {
					isPlaying.current = true;
					isSeekedRef.current = true;
				}
			},

			handlePause: () => {
				isPlaying.current = false;
			},
			// Set current time but after 100ms of mouse move else clear the timer
			setCurrentTime: val => {
				videoRef.current.currentTime = (val / 100) * videoRef.current.duration;
			},

			handleMouseUp: () => {
				isMouseDown.current = false;
				videoRef.current.currentTime =
					(progressRef.current / 100) * videoRef.current.duration;

				if (!isPlaying.current && shouldPlay.current) {
					videoRef.current.play();
					shouldPlay.current = false;
				}
			},
			handleMouseDown: () => {
				if (!videoRef.current.paused) {
					isSeekedRef.current = false;
				}

				isMouseDown.current = true;

				if (isPlaying.current) {
					videoRef.current.pause();
					shouldPlay.current = true;
				}
			},
		};
	}

	useEffect(() => {
		const { progressUpdate, progressBufferUpdate } = eventRefs.current;

		if (videoRef.current) {
			if (isControllerShowing) {
				videoRef.current.addEventListener('timeupdate', progressUpdate);
				videoRef.current.addEventListener('progress', progressBufferUpdate);
			} else {
				videoRef.current.removeEventListener('timeupdate', progressUpdate);
				videoRef.current.removeEventListener('progress', progressBufferUpdate);
			}
		}
	}, [isControllerShowing, videoRef]);

	useEffect(() => {
		const { progressUpdate, progressBufferUpdate, handleError, handlePlaying, handlePause } =
			eventRefs.current;
		const video = videoRef.current;
		const addEventListeners = () => {
			video.addEventListener('timeupdate', progressUpdate);
			video.addEventListener('progress', progressBufferUpdate);
			video.addEventListener('error', handleError);
			video.addEventListener('playing', handlePlaying);
			video.addEventListener('pause', handlePause);
		};
		const removeEventListeners = () => {
			video.removeEventListener('timeupdate', progressUpdate);
			video.removeEventListener('progress', progressBufferUpdate);
			video.removeEventListener('error', handleError);
			video.removeEventListener('playing', handlePlaying);
			video.removeEventListener('pause', handlePause);
		};
		const initializeInterval = () => {
			interval.count = 0;
			interval.current = setInterval(() => {
				if (video.buffered.length === 0) {
					video.load(src);
				} else {
					progressBufferUpdate({ target: video });
					clearInterval(interval.current);
					interval.current = null;
				}

				if (interval.count > 120) {
					clearInterval(interval.current);
					interval.current = null;
				}
				interval.count++;
			}, 500);
		};

		if (video) {
			addEventListeners();

			if (!interval.current) {
				initializeInterval();
			}
			return () => {
				removeEventListeners();
			};
		}
	}, [src, videoRef]);

	return (
		<VideoSlider
			buffer={buffer}
			changePause={changePause}
			handleMouseDown={eventRefs.current.handleMouseDown}
			handleMouseUp={eventRefs.current.handleMouseUp}
			isBuffer
			position={progress}
			setPosition={setProgress}
			videoContainer={videoContainer}
		/>
	);
}
