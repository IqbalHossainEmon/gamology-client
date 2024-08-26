import { memo, useEffect, useRef, useState } from 'react';
import useTimeFormat from '../../../../../../Hooks/useTimeFormate';
import CircularSpinner from '../../../../../CircularSpinner/CircularSpinner';
import styles from './VideoStatus.module.css';

const VideoStatus = ({ video, isSeekedRef, isChanging }) => {
	const formatTime = useTimeFormat();
	const timerId = useRef(null);
	const videoRef = useRef(video.current);
	const eventRefs = useRef(null);
	const [status, setStatus] = useState({
		duration: 0,
		initialShow: true,
		loading: false,
	});

	if (!eventRefs.current) {
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
			handlePlay: () => {
				if (isSeekedRef.current) {
					setStatus(prev => {
						if (!prev.initialShow) {
							return { play: true, animation: true, loading: false };
						}
						return {};
					});
					eventRefs.current.handleTransition();
				}
			},
			handlePause: () => {
				if (isSeekedRef.current && !videoRef.current.ended && !isChanging.current) {
					setStatus({ play: false, animation: true, loading: false });
					eventRefs.current.handleTransition();
				}
				if (isChanging.current) {
					isChanging.current = false;
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
		};
	}

	useEffect(() => {
		const {
			loadMetaDataUpdate,
			loadUpdate,
			handlePlay,
			handlePause,
			handlePlaying,
			handleWaiting,
		} = eventRefs.current;
		const addEventListeners = videoElement => {
			videoElement.addEventListener('loadedmetadata', loadMetaDataUpdate);
			videoElement.addEventListener('loadeddata', loadUpdate);
			videoElement.addEventListener('play', handlePlay);
			videoElement.addEventListener('pause', handlePause);
			videoElement.addEventListener('playing', handlePlaying);
			videoElement.addEventListener('waiting', handleWaiting);
		};
		const removeEventListeners = videoElement => {
			videoElement.removeEventListener('loadedmetadata', loadMetaDataUpdate);
			videoElement.removeEventListener('loadeddata', loadUpdate);
			videoElement.removeEventListener('play', handlePlay);
			videoElement.removeEventListener('pause', handlePause);
			videoElement.removeEventListener('playing', handlePlaying);
			videoElement.removeEventListener('waiting', handleWaiting);
		};

		if (video.current) {
			videoRef.current = video.current;
			addEventListeners(videoRef.current);
		}

		return () => {
			if (videoRef.current) {
				removeEventListeners(videoRef.current);
			}
		};
	}, [video]);

	return (
		<>
			{!status.initialShow && !status.animation && status.loading ? (
				<div>
					<CircularSpinner />
				</div>
			) : null}

			{!status.initialShow && (
				<div
					className={
						status.animation
							? [styles.videoStatus, styles.fadeOut].join(' ')
							: styles.videoStatus
					}
				>
					<span {...(!status.play && { className: styles.marginLeft })}>
						<svg viewBox={status.play ? '0 0 10 14' : '0 0 11 14'}>
							<path
								d={status.play ? 'M0 14h3V0H0v14zM7 0v14h3V0H7z' : 'M0 0v14l11-7z'}
								fill="white"
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
						type="button"
					>
						<span className={styles.svgContainer}>
							<svg viewBox="0 0 11 14">
								<path d="M0 0v14l11-7z" fill="black" fillRule="nonzero" />
							</svg>
						</span>
						<span>{status.duration ? formatTime(status.duration) : '0:00'}</span>
					</button>
				</div>
			) : null}
		</>
	);
};

export default memo(VideoStatus);
