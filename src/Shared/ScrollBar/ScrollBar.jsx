import { useEffect, useRef, useState } from 'react';
import useDragStartStop from '../../Utils/Hooks/useDragStartStop';
import styles from './ScrollBar.module.css';

function ScrollBar({ parentRef, childRef, mainParentRef }) {
	const [scrolled, setScrolled] = useState(0);
	const [show, setShow] = useState(false);
	const [height, setHeight] = useState(0);

	const thumbRef = useRef(null);
	const containerRef = useRef(null);
	const timerID = useRef(null);
	const eventRefs = useRef(null);
	const scrollHeightRef = useRef(0);
	const isAdded = useRef(false);

	const scrolledRef = useRef(scrolled);
	scrolledRef.current = scrolled;

	const showRef = useRef(show);
	showRef.current = show;

	if (!eventRefs.current) {
		eventRefs.current = {
			moveSetEventRef: cursorInEle => {
				setScrolled(prev => {
					if (
						prev + cursorInEle > thumbRef.current.clientHeight / 2 &&
						prev + cursorInEle <
							parentRef.current.clientHeight - thumbRef.current.clientHeight / 2
					) {
						parentRef.current.scrollTop =
							((prev + cursorInEle - thumbRef.current.clientHeight / 2) /
								(parentRef.current.clientHeight - thumbRef.current.clientHeight)) *
							(parentRef.current.scrollHeight - parentRef.current.clientHeight);
						return prev + cursorInEle - thumbRef.current.clientHeight / 2;
					}
					if (prev + cursorInEle <= thumbRef.current.clientHeight / 2) {
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

	const onStartScroll = useDragStartStop(eventRefs.current.handleMoveScroll);

	if (!eventRefs.current.onStartParent) {
		eventRefs.current = {
			...eventRefs.current,
			onStartParent: e => {
				e.stopPropagation();
				onStartScroll(e);
			},
			onMouseMoveShow: () => {
				if (!showRef.current) setShow(true);
				eventRefs.current.handleScrollHide();
			},
			onMouseDownOnParent: e => {
				if (mainParentRef.current.clientWidth - e.offsetX < 6) {
					onStartScroll(e);
				}
			},
			onMouseLeaveOnParent: () => {
				if (showRef.current) setShow(false);
			},
		};
	}

	useEffect(() => {
		const parent = parentRef.current;
		const mainParent = mainParentRef.current;
		let parentObserve;
		if (parent) {
			// Add event listeners
			mainParent.addEventListener('mousemove', eventRefs.current.onMouseMoveShow);
			mainParent.addEventListener('mousedown', eventRefs.current.onMouseDownOnParent);
			mainParent.addEventListener('mouseleave', eventRefs.current.onMouseLeaveOnParent);

			window.addEventListener('resize', eventRefs.current.handleSetHeight);
			parent.addEventListener('scroll', eventRefs.current.handleScroll);

			// Set up ResizeObserver
			if (!isAdded.current) {
				parentObserve = new ResizeObserver(() => {
					if (scrollHeightRef.current !== parent.scrollHeight) {
						scrollHeightRef.current = parent.scrollHeight;
						eventRefs.current.handleSetHeight();
					}
				});
				parentObserve.observe(childRef.current);
				isAdded.current = true;
			}
		}
		// Cleanup function
		return () => {
			mainParent.removeEventListener('mousemove', eventRefs.current.onMouseMoveOnParent);
			mainParent.removeEventListener('mouseleave', eventRefs.current.onMouseLeaveOnParent);

			window.removeEventListener('resize', eventRefs.current.handleSetHeight);
			parent.removeEventListener('scroll', eventRefs.current.handleScroll);
			if (isAdded.current) {
				parentObserve.disconnect();
				isAdded.current = false;
			}
		};
	}, [childRef, mainParentRef, parentRef]);

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
