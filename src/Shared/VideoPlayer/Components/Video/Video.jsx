import { forwardRef, useEffect, useRef, useState } from 'react';

import styles from './Video.module.css';

function Video({ videoContainer, src, captions, className }, ref) {
	const [fullscreenSize, setFullscreenSize] = useState({
		isFullScreen: false,
		width: 0,
		height: 0,
	});
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleSetFullscreenSize: () => {
				const width = window.innerWidth;
				const height = window.innerHeight;

				if (height > width / 1.7777778) {
					setFullscreenSize({
						isFullScreen: true,
						width,
						height: width / 1.7777778,
					});
				} else {
					setFullscreenSize({
						isFullScreen: true,
						width: height * 1.7777778,
						height,
					});
				}
			},
			handleFullscreenChange: () => {
				if (document.fullscreenElement) {
					eventRefs.current.handleSetFullscreenSize();
					window.addEventListener('resize', eventRefs.current.handleSetFullscreenSize);
				} else {
					setFullscreenSize(prev => ({ ...prev, isFullScreen: false }));
					window.removeEventListener('resize', eventRefs.current.handleSetFullscreenSize);
				}
			},
		};
	}
	useEffect(() => {
		const { handleFullscreenChange } = eventRefs.current;
		const addFullscreenEventListeners = element => {
			element.addEventListener('fullscreenchange', handleFullscreenChange);
			element.addEventListener('mozfullscreenchange', handleFullscreenChange);
			element.addEventListener('MSFullscreenChange', handleFullscreenChange);
			element.addEventListener('webkitfullscreenchange', handleFullscreenChange);
		};
		const removeFullscreenEventListeners = element => {
			element.removeEventListener('fullscreenchange', handleFullscreenChange);
			element.removeEventListener('mozfullscreenchange', handleFullscreenChange);
			element.removeEventListener('MSFullscreenChange', handleFullscreenChange);
			element.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
		};

		const videoContainerRef = videoContainer.current;
		if (videoContainerRef) {
			addFullscreenEventListeners(videoContainerRef);
			return () => {
				removeFullscreenEventListeners(videoContainerRef);
			};
		}
	}, [videoContainer]);

	return (
		<video
			className={[className, styles.video].join(' ')}
			crossOrigin='anonymous'
			muted
			preload='auto'
			ref={ref}
			src={src}
			{...(fullscreenSize.isFullScreen && {
				style: {
					width: `${fullscreenSize.width}px`,
					height: `${fullscreenSize.height}px`,
				},
			})}
		>
			<track kind='captions' src={captions} />
			<p>Your browser does not support the video tag.</p>
		</video>
	);
}

export default forwardRef(Video);
