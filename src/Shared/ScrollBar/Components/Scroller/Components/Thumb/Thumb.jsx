import { useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../../../../../Utils/Hooks/useDragStartStop';
import styles from './Thumb.module.css';
function Thumb({ style, container, thumbRef }) {
	const { factor, height } = style;
	const [show, setShow] = useState(false);
	const eventRefs = useRef(null);
	const factorRef = useRef(factor);
	factorRef.current = factor;
	const timerId = useRef(null);
	const showRef = useRef(show);
	showRef.current = show;
	const isAdded = useRef(false);
	if (!eventRefs.current) {
		let startingPosition = null;
		let prevDiff = 0;
		let diff;
		let lastDiff = 0;
		let isLeft = false;
		eventRefs.current = {
			onMove: e => {
				if (startingPosition === null) return;
				const { clientY } = e;
				diff = clientY - startingPosition + prevDiff;

				const containerHeight = container.clientHeight;
				const scrollerContainer = container.scrollHeight;
				const thumb = thumbRef.current;
				diff = parseInt(diff, 10);

				const ratio = (scrollerContainer / containerHeight) * diff;

				if (ratio <= scrollerContainer - containerHeight && ratio >= 0) {
					container.scrollTop = ratio;
					lastDiff = diff;
					const scrollPercent = (ratio / (scrollerContainer - containerHeight)) * 100;
					thumb.setAttribute('aria-valuenow', scrollPercent.toFixed(2));
				} else if (ratio > scrollerContainer - containerHeight) {
					container.scrollTop = scrollerContainer - containerHeight;
					thumb.setAttribute('aria-valuenow', '100.00');
				} else {
					container.scrollTop = 0;
					thumb.setAttribute('aria-valuenow', '0.00');
				}
			},
			onMouseUp: () => {
				startingPosition = null;
				container.style.userSelect = '';
				prevDiff = lastDiff;
				window.removeEventListener('blur', eventRefs.current.onMouseUp);
				if (isLeft) setShow(false);
			},
			onMouseDown: e => {
				startingPosition = e.clientY;
				window.addEventListener('blur', eventRefs.current.onMouseUp);
				container.style.userSelect = 'none';
			},
			onEnter: () => {
				if (!showRef.current) {
					setShow(true);
					container.removeEventListener('mousemove', eventRefs.current.onEnter);
					isAdded.current = false;
				}
				isLeft = false;
			},
			onLeave: () => {
				if (showRef.current && !startingPosition) {
					setShow(false);
					return;
				}
				if (!startingPosition) {
					isLeft = true;
				}
			},
			onscroll: () => {
				if (startingPosition) return;

				const containerHeight = container.clientHeight;
				const scrollerContainer = container.scrollHeight;

				prevDiff = (container.scrollTop * containerHeight) / scrollerContainer;

				const scrollPercent =
					(container.scrollTop / (scrollerContainer - containerHeight)) * 100;
				thumbRef.current.setAttribute('aria-valuenow', scrollPercent.toFixed(2));
				if (!showRef.current) {
					if (timerId.current) {
						clearTimeout(timerId.current);
					}
					setShow(true);
					timerId.current = setTimeout(() => {
						if (showRef.current) setShow(false);
					}, 1000);
				}
			},
		};
	}
	useEffect(() => {
		if (!show) {
			container.addEventListener('mousemove', eventRefs.current.onEnter);
			isAdded.current = true;
		}
	}, [container, show]);
	useEffect(() => {
		container.addEventListener('mouseleave', eventRefs.current.onLeave);
		container.addEventListener('scroll', eventRefs.current.onscroll);
		setShow(true);
		return () => {
			if (isAdded.current)
				container.removeEventListener('mousemove', eventRefs.current.onEnter);
			container.removeEventListener('mouseleave', eventRefs.current.onLeave);
			container.removeEventListener('scroll', eventRefs.current.onscroll);
		};
	}, [container]);
	const onStart = useDragStartStop(
		eventRefs.current.onMove,
		eventRefs.current.onMouseUp,
		eventRefs.current.onMouseDown
	);
	return (
		<div
			className={`${styles.thumb} ${show ? styles.show : styles.hide}`}
			onMouseDown={onStart}
			style={{
				height,
				transform: `matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, -1) scale(${1 / factor}) translateZ(${1 - 1 / factor - 2}px)`,
			}}
			ref={thumbRef}
			role='scrollbar'
			aria-controls='scrollContainer'
			aria-valuenow={0}
			aria-orientation='vertical'
			aria-valuemax='100'
			aria-valuemin='0'
			aria-valuetext='0'
			tabIndex='0'
		/>
	);
}
export default Thumb;
