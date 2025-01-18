import { useEffect, useRef, useState } from 'react';
import Controllers from '../Components/Controllers/Controllers/Controllers';
import Video from '../Components/Video/Video';
import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ src, captions, aspectRatioClassName, changePause }) {
	const videoRef = useRef(null);
	const videoContainerRef = useRef(null);
	const mouseMoveTimerId = useRef(null);
	const onLoadedRef = useRef(false);
	const eventRefs = useRef();

	const hideControllerRefs = useRef({
		isAutoplayMenuShowing: false,
		shouldHide: false,
		hideEvent: null,
	});

	const [isControllerShowing, setIsControllerShowing] = useState(false);

	if (!eventRefs.current) {
		hideControllerRefs.current.hideEvent = () => setIsControllerShowing(false);
		eventRefs.current = {
			// Show hide controllers by checking the time.
			handleShowHide: time => {
				if (onLoadedRef.current) {
					if (mouseMoveTimerId.current) {
						clearTimeout(mouseMoveTimerId.current);
						mouseMoveTimerId.current = null;
					} else {
						if (hideControllerRefs.current.shouldHide) {
							hideControllerRefs.current.shouldHide = false;
						}
						setIsControllerShowing(true);
					}
					mouseMoveTimerId.current = setTimeout(() => {
						mouseMoveTimerId.current = null;
						if (hideControllerRefs.current.isAutoplayMenuShowing) {
							hideControllerRefs.current.shouldHide = true;
						} else setIsControllerShowing(false);
					}, time);
				}
			},
			handleMouseMove: () => {
				eventRefs.current.handleShowHide(4000);
			},

			handleLoadedMetaData: () => {
				onLoadedRef.current = true;
			},
		};
	}

	useEffect(() => {
		const { handleMouseMove, handleLoadedMetaData } = eventRefs.current;
		const addEventListeners = (videoContainer, video) => {
			if (videoContainer) {
				videoContainer.addEventListener('mousemove', handleMouseMove);
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
			className={`${styles.videoContainer}${aspectRatioClassName ? ` ${aspectRatioClassName}` : ''}`}
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
				hideControllerRefs={hideControllerRefs}
				setIsControllerShowing={setIsControllerShowing}
			/>
		</div>
	);
}
