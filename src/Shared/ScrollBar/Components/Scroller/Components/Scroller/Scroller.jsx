import { useEffect, useRef, useState } from 'react';
import ScrollPath from '../ScrollPath/ScrollPath';
import Thumb from '../Thumb/Thumb';
function Scroller({ innerContainerRef, outerContainerRef, showPath }) {
	const [show, setShow] = useState(false);
	const [style, setStyle] = useState(
		showPath ? { height: 0, factor: 0, scrollerHeight: 0 } : { height: 0, factor: 0 }
	);
	const [isIOS, setIsIOS] = useState(false);

	const isIosRef = useRef(isIOS);
	isIosRef.current = isIOS;

	const thumbRef = useRef(null);
	const showRef = useRef(show);
	showRef.current = show;
	useEffect(() => {
		const outerContainer = outerContainerRef.current;
		const innerContainer = innerContainerRef.current;

		let isIos = false;

		if (getComputedStyle(outerContainer).webkitOverflowScrolling) {
			setIsIOS(true);
			isIos = true;
			innerContainer.style.perspective = '1px';
			innerContainer.style.height = '';
			innerContainer.style.width = '';
			innerContainer.style.position = '';
		} else if (isIosRef.current) {
			setIsIOS(false);
		}

		const updateThumb = () => {
			const containerHeight = outerContainer.clientHeight;
			const scrollerContainer = innerContainer.scrollHeight;
			const thumbHeight = (containerHeight / scrollerContainer) * containerHeight;
			if (scrollerContainer <= containerHeight) {
				if (!showRef.current) {
					return;
				}
				setShow(false);
				return;
			}
			if (!showRef.current) {
				setShow(true);
			}
			let factor = (containerHeight - thumbHeight) / (scrollerContainer - containerHeight);

			if (isIos) {
				factor = 1 - 1 / (1 + factor);
			}

			if (showPath) {
				setStyle({ height: thumbHeight, factor, scrollerHeight: scrollerContainer });
			} else {
				setStyle({ height: thumbHeight, factor });
			}
		};
		const multiObserver = new MutationObserver(entries => {
			entries.forEach(entry => {
				if (entry.attributeName === 'style') {
					const entryStyle = entry.target.getAttribute('style');
					if (entryStyle && entryStyle.includes('overflow-y: hidden')) {
						if (!showRef.current) {
							setShow(false);
						}
					} else if (!showRef.current) {
						setShow(true);
					}
				}
			});
		});
		const resizeObserver = new ResizeObserver(updateThumb);
		resizeObserver.observe(outerContainer);
		resizeObserver.observe(innerContainer);
		multiObserver.observe(outerContainer, { attributes: true });
		updateThumb();
		return () => {
			resizeObserver.disconnect();
			multiObserver.disconnect();
		};
	}, [innerContainerRef, outerContainerRef, showPath]);
	return (
		show && (
			<>
				<Thumb
					style={style}
					container={outerContainerRef.current}
					thumbRef={thumbRef}
					isIOS={isIOS}
				/>
				{showPath && (
					<ScrollPath
						container={outerContainerRef}
						innerContainer={innerContainerRef}
						thumb={thumbRef}
						height={style.scrollerHeight}
					/>
				)}
			</>
		)
	);
}
export default Scroller;
