import { useEffect, useRef } from 'react';
import useDragStartStop from '../../../../../../Utils/Hooks/useDragStartStop';
import useScreenWidth from '../../../../../../Utils/Hooks/useScreenWidth';
import styles from './VideoSlider.module.css';

export default function VideoSlider({
	position,
	setPosition,
	isBuffer,
	buffer,
	videoContainer,
	changePause,
	handleMouseUp,
	handleMouseDown,
}) {
	const stateRef = useRef(position);
	stateRef.current = position;
	const pathRef = useRef(null);
	const { widthInRem, heightInRem } = useScreenWidth();
	const eventRefs = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			handleResize: () => {
				pathRef.width = pathRef.current?.offsetWidth;
				pathRef.offsetLeft = pathRef.current.getBoundingClientRect().left;
			},

			// Get cursor position while dragging
			handleMove: e => {
				const cursorInPercent =
					((e?.touches
						? e.touches[0].clientX - pathRef.offsetLeft
						: e.clientX - pathRef.offsetLeft) /
						pathRef.width) *
					100;

				if (cursorInPercent < 100 && cursorInPercent > 0) {
					if (
						parseFloat(cursorInPercent.toFixed(3)) !==
						parseFloat(stateRef.current.toFixed(3))
					) {
						setPosition(cursorInPercent);
					}
				} else if (cursorInPercent < 0 && stateRef.current !== 0) {
					setPosition(0);
				} else if (cursorInPercent > 100 && stateRef.current !== 100) {
					setPosition(100);
				}
			},
		};
	}
	useEffect(() => {
		eventRefs.current.handleResize();
	}, [widthInRem, heightInRem]);

	useEffect(() => {
		setTimeout(() => {
			eventRefs.current.handleResize();
		}, 250);
	}, [changePause]);

	useEffect(() => {
		const { handleResize } = eventRefs.current;
		const addFullscreenEventListeners = element => {
			element.addEventListener('fullscreenchange', handleResize);
			element.addEventListener('mozfullscreenchange', handleResize);
			element.addEventListener('MSFullscreenChange', handleResize);
			element.addEventListener('webkitfullscreenchange', handleResize);
		};
		const removeFullscreenEventListeners = element => {
			element.removeEventListener('fullscreenchange', handleResize);
			element.removeEventListener('mozfullscreenchange', handleResize);
			element.removeEventListener('MSFullscreenChange', handleResize);
			element.removeEventListener('webkitfullscreenchange', handleResize);
		};

		let videoContainerRef;

		if (videoContainer.current) {
			addFullscreenEventListeners(videoContainer.current);
			videoContainerRef = videoContainer.current;
		}

		return () => {
			if (videoContainerRef) {
				removeFullscreenEventListeners(videoContainerRef);
			}
		};
	}, [videoContainer]);

	const onStart = useDragStartStop(eventRefs.current.handleMove, handleMouseUp);

	if (!eventRefs.current.handleMouseDownClick) {
		eventRefs.current.handleMouseDownClick = e => {
			eventRefs.current.handleMove(e);
			if (typeof handleMouseDown === 'function') handleMouseDown();
			onStart(e);
		};
	}

	return (
		<div
			className={styles.videoSliderPath}
			onMouseDown={eventRefs.current.handleMouseDownClick}
			onTouchStart={eventRefs.current.handleMouseDownClick}
			ref={pathRef}
			role='slider'
			aria-label='video slider'
			aria-valuenow={position.toFixed(2)}
			tabIndex='0'
		>
			<div className={styles.path} />
			<div className={styles.activePath} style={{ scale: `${position / 100} 1` }} />

			{isBuffer ? (
				<div className={styles.bufferPath} style={{ scale: `${buffer / 100} 1` }} />
			) : null}

			<div className={styles.knobContainer} style={{ translate: `${position}%` }}>
				<div className={styles.knob} />
			</div>
		</div>
	);
}
