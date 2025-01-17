import { useEffect, useRef } from 'react';
import useIsTouchAble from '../../../../../../Utils/Hooks/useIsTouchable';
import useScreenWidth from '../../../../../../Utils/Hooks/useScreenWidth';
import styles from './ScrollPath.module.css';
function ScrollPath({ container, innerContainer, thumb, height }) {
	const eventRefs = useRef(null);
	const pathRef = useRef(null);

	const isTouchEnabled = useIsTouchAble()();

	const changingValue = useRef(0);

	const { widthInRem, remsInPixel } = useScreenWidth();

	useEffect(() => {
		pathRef.current?.addEventListener(
			'mousedown',
			() => {
				changingValue.current =
					(innerContainer.current.scrollHeight / container.current.clientHeight) * 2.5;
			},
			{ once: true }
		);
	}, [container, innerContainer]);

	useEffect(() => {
		changingValue.current =
			(innerContainer.current.scrollHeight / container.current.clientHeight) * 2.5;
	}, [container, innerContainer, widthInRem]);

	if (isTouchEnabled) return null;

	if (!eventRefs.current) {
		let isGoingDown = false;
		let animationFrameId = null;
		const scroll = () => {
			switch (isGoingDown) {
				case true:
					switch (
						container.current.scrollTop <
						innerContainer.current.scrollHeight - container.current.clientHeight
					) {
						case true:
							container.current.scrollTop += changingValue.current;
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
							container.current.scrollTop -= changingValue.current;
							animationFrameId = requestAnimationFrame(scroll);
							break;
						default:
							cancelAnimationFrame(animationFrameId);
							animationFrameId = null;
					}
			}
		};
		let mouseMoveAdded = false;
		eventRefs.current = {
			resumeEvent: () => {
				if (animationFrameId) return;
				scroll();
				pathRef.current.removeEventListener('mousemove', eventRefs.current.resumeEvent);
				mouseMoveAdded = false;
			},
			pauseEvent: () => {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
				pathRef.current.addEventListener('mousemove', eventRefs.current.resumeEvent);
				mouseMoveAdded = true;
			},
			stopEvent: () => {
				cancelAnimationFrame(animationFrameId);
				animationFrameId = null;
				document.removeEventListener('mouseup', eventRefs.current.stopEvent);
				window.removeEventListener('blur', eventRefs.current.stopEvent);
				container.current.style.userSelect = '';
				pathRef.current.removeEventListener('mouseleave', eventRefs.current.pauseEvent);
				thumb.current.style.pointerEvents = '';
				if (mouseMoveAdded) {
					pathRef.current.removeEventListener('mousemove', eventRefs.current.resumeEvent);
					mouseMoveAdded = false;
				}
			},
			scroll,
			onMouseDown: e => {
				const { y, height: thumbHeight } = thumb.current.getBoundingClientRect();
				const midY = y + thumbHeight / 2;
				switch (e.clientY > midY) {
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
				window.addEventListener('blur', eventRefs.current.stopEvent);
				e.target.addEventListener('mouseleave', eventRefs.current.pauseEvent);
				container.current.style.userSelect = 'none';
				thumb.current.style.pointerEvents = 'none';
			},
		};
	}
	return (
		<div
			ref={pathRef}
			style={{ height: `${height / remsInPixel}rem` }}
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
