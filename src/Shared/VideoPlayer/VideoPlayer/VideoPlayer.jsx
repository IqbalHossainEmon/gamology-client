import { useCallback, useEffect, useRef, useState } from 'react';

import Controllers from '../Components/Controllers/Controllers/Controllers';
import Video from '../Components/Video/Video';

import styles from './VideoPlayer.module.css';

export default function VideoPlayer({ src, captions, aspectRatioClassName, changePause }) {
	const videoRef = useRef(null);
	const videoContainerRef = useRef(null);
	const mouseMoveTimerId = useRef(null);
	const onLoadedRef = useRef(false);

	const hideControllerRefs = useRef({
		isAutoplayMenuShowing: false,
		shouldHide: false,
	});

	const [isControllerShowing, setIsControllerShowing] = useState(false);

	const handleSetHideController = useCallback((propertyName, value) => {
		hideControllerRefs.current[propertyName] = value;
	}, []);

	// Show hide controllers by checking the time.
	const handleShowHide = useCallback(time => {
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
				} else {
					setIsControllerShowing(false);
				}
			}, time);
		}
	}, []);
	const handleMouseMove = useCallback(() => {
		handleShowHide(4000);
	}, [handleShowHide]);

	const handleLoadedMetaData = () => {
		onLoadedRef.current = true;
	};

	useEffect(() => {
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
	}, [handleMouseMove, videoContainerRef]);

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
				setIsControllerShowing={setIsControllerShowing}
				hideControllerRefs={hideControllerRefs}
				handleSetHideController={handleSetHideController}
			/>
		</div>
	);
}
