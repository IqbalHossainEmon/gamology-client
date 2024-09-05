import { useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Hooks/useDragStartStop';
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
					const parentHeight = parentRef.current.clientHeight;
					const { scrollHeight } = parentRef.current;

					// Calculate the thumb height in pixels directly
					let thumbHeight = (parentHeight / scrollHeight) * parentHeight;

					// Ensure the thumb height does not exceed the parent height
					if (thumbHeight > parentHeight) {
						thumbHeight = parentHeight;
					}

					setScrolled(
						(parentRef.current.scrollTop /
							(parentRef.current.scrollHeight - parentRef.current.clientHeight)) *
							(parentRef.current.clientHeight - thumbRef.current.clientHeight)
					);

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

		container.addEventListener('mousedown', handleStartParent);
		container.addEventListener('touchstart', handleStartParent, {
			passive: false,
		});

		knob.addEventListener('mousedown', eventRefs.current.onStartParent);
		knob.addEventListener('touchstart', eventRefs.current.onStartParent, { passive: false });

		return () => {};
	});

	useEffect(() => {
		window.addEventListener('resize', eventRefs.current.handleSetHeight);
		return () => {
			window.removeEventListener('resize', eventRefs.current.handleSetHeight);
		};
	}, [childRef]);

	useEffect(() => {
		const childObserve = new ResizeObserver(eventRefs.current.handleSetHeight);
		childObserve.observe(childRef.current);
		const parentObserve = new ResizeObserver(eventRefs.current.handleSetHeight);
		parentObserve.observe(parentRef.current);

		const parent = parentRef.current;
		const container = containerRef.current;
		const { handleScroll } = eventRefs.current;
		const { handleMouseMove } = eventRefs.current;

		parent.addEventListener('scroll', handleScroll);
		container.addEventListener('mousemove', handleMouseMove);

		return () => {
			childObserve.disconnect();
			parentObserve.disconnect();

			parent.removeEventListener('scroll', handleScroll);
			container.removeEventListener('mousemove', handleMouseMove);
		};
	}, [childRef, parentRef]);

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
