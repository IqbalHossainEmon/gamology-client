import { memo, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Utils/Hooks/useTimeFormate';
import CircularSpinner from '../../../../../CircularSpinner/CircularSpinner';
import styles from './VideoStatus.module.css';

function VideoStatus({ video, isPlaying }) {
	const formatTime = useTimeFormat();
	const timerId = useRef(null);
	const videoRef = useRef(video.current);
	const eventRefs = useRef(null);
	const [status, setStatus] = useState({
		duration: 0,
		initialShow: true,
		loading: false,
	});

	const isInitial = useRef(true);

	const isObserverAdded = useRef(false);

	const statusContainerRef = useRef(null);

	if (!eventRefs.current) {
		let didIntersectionPause = false;
		eventRefs.current = {
			handleTransition: () => {
				if (!timerId.current) {
					timerId.current = setTimeout(() => {
						timerId.current = null;
						setStatus(prev => ({ ...prev, animation: false }));
					}, 500);
				}
			},
			loadMetaDataUpdate: ({ target: { duration } }) => {
				setStatus(prev => ({ ...prev, duration }));
			},
			loadUpdate: () => {
				if (localStorage.getItem('autoplay') && videoRef.current.paused) {
					videoRef.current.play();
				}
			},

			initialBtnPlay: () => {
				if (videoRef.current.paused) {
					videoRef.current.play();
				}
			},
			handlePlaying: () => {
				setStatus(prev => ({ ...prev, loading: false }));
			},
			handleWaiting: () => {
				setStatus(prev => ({ ...prev, loading: true }));
			},
			handleInitialPlaying: () => {
				isInitial.current = false;
				setStatus(prev => ({ ...prev, initialShow: false }));
				video.current.removeEventListener(
					'playing',
					eventRefs.current.handleInitialPlaying
				);
			},
			intersectionObserver: new IntersectionObserver(([entry]) => {
				if (!entry.isIntersecting) {
					didIntersectionPause = true;
					videoRef.current.pause();
				} else {
					videoRef.current.play();
					didIntersectionPause = false;
				}
			}),
			onBlurPause: () => {
				if (document.visibilityState === 'hidden') {
					videoRef.current.pause();
				}
			},
			onVideoPlay: () => {
				if (!isObserverAdded.current) {
					eventRefs.current.intersectionObserver.observe(statusContainerRef.current);
					isObserverAdded.current = true;
				}
				window.addEventListener('visibilitychange', eventRefs.current.onBlurPause);
			},
			onPauseVideo: () => {
				if (isObserverAdded.current && !didIntersectionPause) {
					eventRefs.current.intersectionObserver.disconnect();
					isObserverAdded.current = false;
				}
				window.removeEventListener('visibilitychange', eventRefs.current.onBlurPause);
			},
		};
	}

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.addEventListener('playing', eventRefs.current.onVideoPlay);
			videoRef.current.addEventListener('pause', eventRefs.current.onPauseVideo);
		}
		return () => {
			if (isObserverAdded.current) {
				eventRefs.current.intersectionObserver.disconnect();
				isObserverAdded.current = false;
			}
		};
	}, []);

	useEffect(() => {
		if (!isInitial.current) {
			if (isPlaying) {
				setStatus(prev => {
					if (!prev.initialShow) {
						return { play: true, animation: true, loading: false };
					}
					return {};
				});
			} else {
				setStatus({ play: false, animation: true, loading: false });
			}
			eventRefs.current.handleTransition();
		}
	}, [isPlaying]);

	useEffect(() => {
		const { loadMetaDataUpdate, loadUpdate, handlePlay, handleWaiting } = eventRefs.current;
		const addEventListeners = videoElement => {
			videoElement.addEventListener('loadedmetadata', loadMetaDataUpdate);
			videoElement.addEventListener('loadeddata', loadUpdate);
			videoElement.addEventListener('play', handlePlay);
			videoElement.addEventListener('waiting', handleWaiting);
		};

		const removeEventListeners = videoElement => {
			videoElement.removeEventListener('loadedmetadata', loadMetaDataUpdate);
			videoElement.removeEventListener('loadeddata', loadUpdate);
			videoElement.removeEventListener('play', handlePlay);
			videoElement.removeEventListener('waiting', handleWaiting);
		};

		let isPlayedOnce;

		if (video.current) {
			videoRef.current = video.current;
			addEventListeners(videoRef.current);
			video.current.addEventListener('playing', eventRefs.current.handleInitialPlaying);
			isPlayedOnce = isInitial.current;
		}

		return () => {
			if (videoRef.current) {
				removeEventListeners(videoRef.current);
				if (isPlayedOnce) {
					videoRef.current.removeEventListener(
						'playing',
						eventRefs.current.handleInitialPlaying
					);
				}
			}
		};
	}, [video]);

	return (
		<div ref={statusContainerRef} className={styles.statusContainer}>
			{!status.initialShow && !status.animation && status.loading ? (
				<div>
					<CircularSpinner />
				</div>
			) : null}
			{!status.initialShow && (
				<div
					className={`${styles.videoStatus}${status.animation ? ` ${styles.fadeOut}` : ''}`}
				>
					<span {...(!status.play && { className: styles.marginLeft })}>
						<svg viewBox={status.play ? '0 0 10 14' : '0 0 11 14'}>
							<path
								d={status.play ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'}
								fill='white'
							/>
						</svg>
					</span>
				</div>
			)}
			{status.initialShow && status.duration > 0 ? (
				<div className={styles.initialPlaceholder}>
					<button
						className={styles.initialPlaceholderButton}
						onClick={eventRefs.current.initialBtnPlay}
						type='button'
					>
						<span className={styles.svgContainer}>
							<svg viewBox='0 0 11 14'>
								<path d='M0 0v14l11-7z' fill='black' fillRule='nonzero' />
							</svg>
						</span>
						<span>{status.duration ? formatTime(status.duration) : '0:00'}</span>
					</button>
				</div>
			) : null}
		</div>
	);
}

export default memo(VideoStatus);
