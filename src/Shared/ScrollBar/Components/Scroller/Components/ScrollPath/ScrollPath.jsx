import { useEffect, useRef, useState } from 'react';
import styles from './ScrollPath.module.css';

function ScrollPath({ container, innerContainer, thumb, factor }) {
	const [height, setHeight] = useState(0);

	const eventRefs = useRef(null);
	const pathRef = useRef(null);

	if (!eventRefs.current) {
		let isGoingDown = false;
		let animationFrameId = null;

		const scroll = () => {
			switch (isGoingDown) {
				case true:
					switch (
						container.current.scrollTop <
						container.current.scrollHeight - container.current.clientHeight
					) {
						case true:
							container.current.scrollTop += 25;
							animationFrameId = requestAnimationFrame(scroll);
							break;
						default:
							cancelAnimationFrame(animationFrameId);
							animationFrameId = null;
							break;
					}
					break;
				default:
					switch (container.current.scrollTop > 0) {
						case true:
							container.current.scrollTop -= 25;
							animationFrameId = requestAnimationFrame(scroll);
							break;
						default:
							cancelAnimationFrame(animationFrameId);
							animationFrameId = null;
					}
			}
		};

		const root = document.getElementById('root');
		eventRefs.current = {
			pauseEvent: () => {},
			stopEvent: () => {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
				document.removeEventListener('mouseup', eventRefs.current.stopEvent);
				document.removeEventListener('blur', eventRefs.current.stopEvent);
				root.style.userSelect = '';
			},
			scroll,
			onMouseDown: e => {
				const y = e.clientY - e.target.getBoundingClientRect().y;

				console.log(thumb.current.getBoundingClientRect().y / factor);

				switch (container.current.scrollTop < y) {
					case true:
						isGoingDown = true;
						break;
					default:
						isGoingDown = false;
						break;
				}
				if (animationFrameId) return;
				scroll();
				document.addEventListener('mouseup', eventRefs.current.stopEvent);
				document.addEventListener('blur', eventRefs.current.stopEvent);
				root.style.userSelect = 'none';
			},
		};
	}

	useEffect(() => {
		setTimeout(() => {
			setHeight(innerContainer.current.clientHeight);
		}, 0);
	}, [innerContainer]);

	return (
		<div
			ref={pathRef}
			style={{ height: `${height}px` }}
			onMouseDown={eventRefs.current.onMouseDown}
			className={styles.scrollPath}
			role='scrollbar'
			aria-controls='scrollContainer'
			aria-orientation='vertical'
			aria-valuemax='100'
			aria-valuemin='0'
			aria-valuenow='0'
			tabIndex='0'
		/>
	);
}
export default ScrollPath;
