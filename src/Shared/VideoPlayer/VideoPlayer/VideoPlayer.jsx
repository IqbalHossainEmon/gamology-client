import { useEffect, useRef, useState } from 'react';
import Controllers from '../Components/Controllers/Controllers/Controllers';
import Video from '../Components/Video/Video';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({
	src,
	captions,
	sizeClassName,
	changePause,
	aspectRatio = 16 / 9,
}) {
	const videoRef = useRef(null);
	const videoContainerRef = useRef(null);
	const mouseMoveTimerId = useRef(null);
	const onLoadedRef = useRef(false);
	const eventRefs = useRef();
	const [isControllerShowing, setIsControllerShowing] = useState(false);

	if (!eventRefs.current) {
		eventRefs.current = {
			// Show hide controllers by checking the time.
			handleShowHide: time => {
				if (onLoadedRef.current) {
					if (mouseMoveTimerId.current) {
						clearTimeout(mouseMoveTimerId.current);
						mouseMoveTimerId.current = null;
					} else {
						setIsControllerShowing(true);
					}
					mouseMoveTimerId.current = setTimeout(() => {
						mouseMoveTimerId.current = null;
						setIsControllerShowing(false);
					}, time);
				}
			},
			handleMouseMove: () => {
				eventRefs.current.handleShowHide(4000);
			},
			handleMouseUp: () => {
				videoContainerRef?.current.addEventListener(
					'mousemove',
					eventRefs.current.handleMouseMove
				);
				eventRefs.current.handleShowHide(1000);
				document.removeEventListener('mouseup', eventRefs.current.handleMouseUp);
			},
			handleLoadedMetaData: () => {
				onLoadedRef.current = true;
			},
			handleMouseDown: () => {
				document.addEventListener('mouseup', eventRefs.current.handleMouseUp);
				if (mouseMoveTimerId.current) {
					clearTimeout(mouseMoveTimerId.current);
					mouseMoveTimerId.current = null;
				}
				videoContainerRef?.current.removeEventListener(
					'mousemove',
					eventRefs.current.handleMouseMove
				);
			},
			handleMouseLeave: () => {
				eventRefs.current.handleShowHide(1000);
			},
		};
	}

	useEffect(() => {
		const { handleMouseMove, handleMouseDown, handleLoadedMetaData, handleMouseLeave } =
			eventRefs.current;
		const addEventListeners = (videoContainer, video) => {
			if (videoContainer) {
				videoContainer.addEventListener('mousemove', handleMouseMove);
				videoContainer.addEventListener('mousedown', handleMouseDown);
				videoContainer.addEventListener('mouseleave', handleMouseLeave);
			}
			if (video) {
				video.addEventListener('loadedmetadata', handleLoadedMetaData);
			}
		};
		const removeEventListeners = (videoContainer, video) => {
			if (video) {
				video.removeEventListener('loadedmetadata', handleLoadedMetaData);
			}
			if (videoContainer) {
				videoContainer.removeEventListener('mousemove', handleMouseMove);
				videoContainer.removeEventListener('mousedown', handleMouseDown);
			}
		};
		const videoContainer = videoContainerRef.current;
		const video = videoRef.current;

		addEventListeners(videoContainer, video);

		return () => {
			removeEventListeners(videoContainer, video);
		};
	}, [videoContainerRef]);

	return (
		<div
			className={
				sizeClassName
					? [styles.videoContainer, sizeClassName].join(' ')
					: styles.videoContainer
			}
			style={{ paddingTop: `${(1 / aspectRatio) * 100}%` }}
			ref={videoContainerRef}
		>
			<Video
				captions={captions}
				className={styles.video}
				ref={videoRef}
				src={src}
				videoContainer={videoContainerRef}
			/>
			<Controllers
				changePause={changePause}
				isControllerShowing={isControllerShowing}
				src={src}
				video={videoRef}
				videoContainer={videoContainerRef}
			/>
		</div>
	);
}
