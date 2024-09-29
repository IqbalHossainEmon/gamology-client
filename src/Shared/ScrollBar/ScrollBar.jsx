import { useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Utils/Hooks/useDragStartStop';
import styles from './ScrollBar.module.css';

function ScrollBar({ parentRef, childRef }) {
	const [scrolled, setScrolled] = useState(0);
	const [show, setShow] = useState(false);
	const [height, setHeight] = useState(0);
	const thumbRef = useRef(null);
	const downElement = useRef(null);
	const containerRef = useRef(null);
	const timerID = useRef(null);
	const eventRefs = useRef(null);
	const scrollHeightRef = useRef(0);
	const isAdded = useRef(false);

	const scrolledRef = useRef(scrolled);
	scrolledRef.current = scrolled;

	if (!eventRefs.current) {
		eventRefs.current = {
			moveSetEventRef: cursorInEle => {
				setScrolled(prev => {
					if (
						prev + cursorInEle - downElement.current > 0 &&
						prev + cursorInEle - downElement.current <
							parentRef.current.clientHeight - thumbRef.current.clientHeight
					) {
						parentRef.current.scrollTop =
							((prev + cursorInEle - downElement.current) /
								(parentRef.current.clientHeight - thumbRef.current.clientHeight)) *
							(parentRef.current.scrollHeight - parentRef.current.clientHeight);
						return prev + cursorInEle - downElement.current;
					}
					if (prev + cursorInEle - downElement.current < 0) {
						parentRef.current.scrollTop = 0;
						return 0;
					}

					parentRef.current.scrollTop =
						parentRef.current.scrollHeight - parentRef.current.clientHeight;
					return parentRef.current.clientHeight - thumbRef.current.clientHeight;
				});
			},
			cursorInElementCalc: e =>
				e?.touches
					? e.touches[0].clientY - thumbRef.current.getBoundingClientRect().y
					: e.clientY - thumbRef.current.getBoundingClientRect().y,
			handleMoveScroll: e => {
				eventRefs.current.moveSetEventRef(eventRefs.current.cursorInElementCalc(e));
			},
			handleMouseUp: () => {
				downElement.current = null;
			},
			handleMouseDownBar: e => {
				downElement.current = eventRefs.current.cursorInElementCalc(e);
			},
			handleMouseDownParent: () => {
				downElement.current = thumbRef.current.clientHeight / 2;
			},
			handleSetHeight: () => {
				setHeight(() => {
					const { clientHeight } = parentRef.current;
					const { scrollHeight } = parentRef.current;

					let thumbHeight = (clientHeight / scrollHeight) * clientHeight;

					if (thumbHeight > clientHeight) {
						thumbHeight = clientHeight;
					}

					const newScrolled =
						(parentRef.current.scrollTop / (scrollHeight - clientHeight)) *
						(clientHeight - thumbHeight);

					setScrolled(newScrolled);

					return thumbHeight;
				});
			},
			handleScroll: () => {
				setShow(true);
				eventRefs.current.handleScrollHide();
				setScrolled(
					(parentRef.current.scrollTop /
						(parentRef.current.scrollHeight - parentRef.current.clientHeight)) *
						(parentRef.current.clientHeight - thumbRef.current.clientHeight)
				);
			},
			handleMouseMove: () => {
				setShow(true);
				eventRefs.current.handleScrollHide();
			},
			handleScrollHide: () => {
				if (timerID.current) {
					clearTimeout(timerID.current);
					timerID.current = null;
				}
				timerID.current = setTimeout(() => {
					timerID.current = null;
					setShow(false);
				}, 2000);
			},
		};
	}

	const onStartScroll = useDragStartStop(
		eventRefs.current.handleMoveScroll,
		eventRefs.current.handleMouseUp,
		eventRefs.current.handleMouseDownBar
	);
	const handleStartParent = useDragStartStop(
		eventRefs.current.handleMoveScroll,
		eventRefs.current.handleMouseUp,
		eventRefs.current.handleMouseDownParent
	);

	if (!eventRefs.current.onStartParent) {
		eventRefs.current.onStartParent = e => {
			e.stopPropagation();
			onStartScroll(e);
		};
	}

	useEffect(() => {
		const container = containerRef.current;
		const knob = thumbRef.current;
		const parent = parentRef.current;

		// Add event listeners
		container.addEventListener('mousedown', handleStartParent);
		container.addEventListener('touchstart', handleStartParent, { passive: false });
		knob.addEventListener('mousedown', eventRefs.current.onStartParent);
		knob.addEventListener('touchstart', eventRefs.current.onStartParent, { passive: false });
		window.addEventListener('resize', eventRefs.current.handleSetHeight);
		parent.addEventListener('scroll', eventRefs.current.handleScroll);
		container.addEventListener('mousemove', eventRefs.current.handleMouseMove);
		let parentObserve, mutationObserver;
		// Set up ResizeObserver
		if (!isAdded.current) {
			parentObserve = new ResizeObserver(() => {
				if (scrollHeightRef.current !== parent.scrollHeight) {
					scrollHeightRef.current = parent.scrollHeight;
					eventRefs.current.handleSetHeight();
				}
			});
			parentObserve.observe(childRef.current);
		}
		// Cleanup function
		return () => {
			container.removeEventListener('mousedown', handleStartParent);
			container.removeEventListener('touchstart', handleStartParent);
			knob.removeEventListener('mousedown', eventRefs.current.onStartParent);
			knob.removeEventListener('touchstart', eventRefs.current.onStartParent);
			window.removeEventListener('resize', eventRefs.current.handleSetHeight);
			parent.removeEventListener('scroll', eventRefs.current.handleScroll);
			container.removeEventListener('mousemove', eventRefs.current.handleMouseMove);
			if (isAdded.current) {
				parentObserve.disconnect();
				mutationObserver.disconnect();
				isAdded.current = false;
			}
		};
	}, [handleStartParent, childRef, parentRef]);

	return (
		<div
			className={`${height <= 0 || height >= parentRef.current.clientHeight ? `${styles.noHeight} ` : ''}${styles.scrollBarContainers}`}
			ref={containerRef}
			tabIndex={0}
			role='scrollbar'
			aria-controls='scrollbar'
			aria-valuenow={scrolled}
		>
			<button
				className={`${show ? `${styles.show} ` : ''}${styles.scrollThumb}`}
				aria-label='scroll thumb'
				ref={thumbRef}
				style={{
					height: `${height}px`,
					translate: `0 ${scrolled < 0 ? 0 : scrolled}px`,
				}}
				type='button'
			/>
		</div>
	);
}

export default ScrollBar;
