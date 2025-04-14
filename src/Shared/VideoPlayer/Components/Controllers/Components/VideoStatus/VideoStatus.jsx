import { memo, useCallback, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Utils/Hooks/useTimeFormate';
import CircularSpinner from '../../../../../CircularSpinner/CircularSpinner';
import styles from './VideoStatus.module.css';

function VideoStatus({ video, isPlaying }) {
	const formatTime = useTimeFormat();
	const timerId = useRef(null);
	const videoRef = useRef(video.current);
	const handleInitialPlayingRef = useRef(null);
	const intersectionObserverRef = useRef(null);
	const [status, setStatus] = useState({
		duration: 0,
		initialShow: true,
		loading: false,
	});

	const isInitial = useRef(true);

	const isObserverAdded = useRef(false);

	const statusContainerRef = useRef(null);

	const didIntersectionPauseRef = useRef(false);

	const handleTransition = useCallback(() => {
		if (!timerId.current) {
			timerId.current = setTimeout(() => {
				timerId.current = null;
				setStatus(prev => ({ ...prev, animation: false }));
			}, 500);
		}
	}, []);

	const loadMetaDataUpdate = useCallback(({ target: { duration } }) => {
		setStatus(prev => ({ ...prev, duration }));
	}, []);

	const loadUpdate = useCallback(() => {
		if (localStorage.getItem('autoplay') && videoRef.current.paused) {
			videoRef.current.play();
		}
	}, []);

	const initialBtnPlay = useCallback(() => {
		if (videoRef.current.paused) {
			videoRef.current.play();
		}
	}, []);

	const handlePlaying = useCallback(() => {
		setStatus(prev => ({ ...prev, loading: false }));
	}, []);

	const handleWaiting = useCallback(() => {
		setStatus(prev => ({ ...prev, loading: true }));
	}, []);

	const handleInitialPlaying = useCallback(() => {
		isInitial.current = false;
		setStatus(prev => ({ ...prev, initialShow: false }));
		videoRef.current.removeEventListener('playing', handleInitialPlayingRef.current);
	}, []);

	useEffect(() => {
		handleInitialPlayingRef.current = handleInitialPlaying;
		isObserverAdded.current = false;
	}, [handleInitialPlaying]);

	const handleIntersection = useCallback(([entry]) => {
		if (!entry.isIntersecting) {
			didIntersectionPauseRef.current = true;
			videoRef.current.pause();
		} else {
			videoRef.current.play();
			didIntersectionPauseRef.current = false;
		}
	}, []);

	useEffect(() => {
		intersectionObserverRef.current = new IntersectionObserver(handleIntersection, {
			threshold: 0.1,
		});
		return () => {
			if (intersectionObserverRef.current) {
				intersectionObserverRef.current.disconnect();
				isObserverAdded.current = false;
			}
		};
	}, [handleIntersection]);

	const onBlurPause = useCallback(() => {
		if (document.visibilityState === 'hidden') {
			videoRef.current.pause();
		}
	}, []);
	const onVideoPlay = useCallback(() => {
		if (!isObserverAdded.current) {
			intersectionObserverRef.current.observe(statusContainerRef.current);
			isObserverAdded.current = true;
		}
		window.addEventListener('visibilitychange', onBlurPause);
	}, [onBlurPause]);

	const onPauseVideo = useCallback(() => {
		if (isObserverAdded.current && !didIntersectionPauseRef) {
			intersectionObserverRef.current.disconnect();
			isObserverAdded.current = false;
		}
		window.removeEventListener('visibilitychange', onBlurPause);
	}, [onBlurPause]);

	useEffect(() => {
		if (videoRef.current) {
			videoRef.current.addEventListener('playing', onVideoPlay);
			videoRef.current.addEventListener('pause', onPauseVideo);
		}
		return () => {
			if (isObserverAdded.current) {
				intersectionObserverRef.current.disconnect();
				isObserverAdded.current = false;
			}
		};
	}, [onPauseVideo, onVideoPlay]);

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
			handleTransition();
		}
	}, [handleTransition, isPlaying]);

	useEffect(() => {
		const addEventListeners = videoElement => {
			videoElement.addEventListener('loadedmetadata', loadMetaDataUpdate);
			videoElement.addEventListener('loadeddata', loadUpdate);
			videoElement.addEventListener('play', handlePlaying);
			videoElement.addEventListener('waiting', handleWaiting);
		};

		const removeEventListeners = videoElement => {
			videoElement.removeEventListener('loadedmetadata', loadMetaDataUpdate);
			videoElement.removeEventListener('loadeddata', loadUpdate);
			videoElement.removeEventListener('play', handlePlaying);
			videoElement.removeEventListener('waiting', handleWaiting);
		};

		let isPlayedOnce;

		if (videoRef) {
			videoRef.current = videoRef;
			addEventListeners(videoRef.current);
			videoRef.addEventListener('playing', handleInitialPlaying);
			isPlayedOnce = isInitial.current;
		}

		return () => {
			if (videoRef.current) {
				removeEventListeners(videoRef.current);
				if (isPlayedOnce) {
					videoRef.current.removeEventListener('playing', handleInitialPlaying);
				}
			}
		};
	}, [handleInitialPlaying, handlePlaying, handleWaiting, loadMetaDataUpdate, loadUpdate, video]);

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
						onClick={initialBtnPlay}
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
