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

	if (!eventRefs.current) {
		const root = document.getElementById('root');
		let startingPosition = null;
		let elementTop = 0;
		let elementBottom = 0;
		eventRefs.current = {
			onMove: e => {
				if (startingPosition === null) return;
				const clientY = e.clientY || e.clientY === 0 ? e.clientY : e.touches[0].clientY;

				if (clientY + elementBottom > container.clientHeight) {
					container.scrollTop = container.scrollHeight;
					thumbRef.current.setAttribute('aria-valuenow', 100);
					return;
				}

				if (clientY - elementTop < 0) {
					container.scrollTop = 0;
					thumbRef.current.setAttribute('aria-valuenow', 0);
					return;
				}

				const deltaY = (clientY - startingPosition) / factorRef.current;
				if (container.scrollTop >= 0 && container.scrollTop <= container.scrollHeight) {
					container.scrollTop += deltaY;
					startingPosition = clientY;

					const scrollPercent =
						(container.scrollTop / (container.scrollHeight - container.clientHeight)) *
						100;
					thumbRef.current.setAttribute('aria-valuenow', scrollPercent.toFixed(2));
				}
			},
			onMouseUp: () => {
				startingPosition = null;
				root.style.userSelect = '';
			},
			onMouseDown: e => {
				startingPosition = e.clientY || e.clientY === 0 ? e.clientY : e.touches[0].clientY;
				elementTop = startingPosition - e.target.getBoundingClientRect().top;
				elementBottom = e.target.getBoundingClientRect().bottom - startingPosition;
				document.addEventListener('blur', eventRefs.current.onMouseUp);
				root.style.userSelect = 'none';
			},
			onEnter: () => {
				if (!showRef.current) {
					setShow(true);
				}
			},
			onLeave: () => {
				if (showRef.current && !startingPosition) {
					setShow(false);
				}
			},
			onscroll: () => {
				const scrollPercent =
					(container.scrollTop / (container.scrollHeight - container.clientHeight)) * 100;
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
		container.addEventListener('mouseenter', eventRefs.current.onEnter);
		container.addEventListener('mouseleave', eventRefs.current.onLeave);
		container.addEventListener('scroll', eventRefs.current.onscroll);

		setShow(true);

		return () => {
			container.removeEventListener('mouseenter', eventRefs.current.onEnter);
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
				transform: `
                    matrix3d(
                        1, 0, 0, 0,
                        0, 1, 0, 0,
                        0, 0, 1, 0,
                        0, 0, 0, -1
                    )
                    scale(${1 / factor})
                    translateZ(${1 - 1 / factor - 2}px)
                `,
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
