import { useEffect, useRef, useState } from 'react';
import Thumb from '../Thumb/Thumb';

function Scroller({ innerContainerRef, outerContainerRef }) {
	const [show, setShow] = useState(false);

	const [fadeIn, setFadeIn] = useState(false);

	const [style, setStyle] = useState({ height: 0, factor: 0 });

	const showRef = useRef(show);
	showRef.current = show;

	const eventRef = useRef(null);

	const timerId = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			onEnter: () => {
				setFadeIn(true);
			},
			onLeave: () => {
				setFadeIn(false);
			},
			onscroll: () => {
				if (timerId.current) {
					clearTimeout(timerId.current);
				}
				setFadeIn(true);
				timerId.current = setTimeout(() => {
					setFadeIn(false);
				}, 1000);
			},
		};
	}

	useEffect(() => {
		const outerContainer = outerContainerRef.current;
		const innerContainer = innerContainerRef.current;

		const updateThumb = () => {
			const containerHeight = outerContainer.clientHeight;
			const scrollerContainer = innerContainer.scrollHeight;
			const thumbHeight = (containerHeight / scrollerContainer) * containerHeight;

			if (scrollerContainer <= containerHeight) {
				if (!showRef.current) {
					return;
				}
				setShow(false);

				outerContainer.removeEventListener('mouseenter', eventRef.current.onEnter);
				outerContainer.removeEventListener('mouseleave', eventRef.current.onLeave);
				outerContainer.removeEventListener('scroll', eventRef.current.onscroll);

				return;
			}
			if (!showRef.current) {
				setShow(true);
				outerContainer.addEventListener('mouseenter', eventRef.current.onEnter);
				outerContainer.addEventListener('mouseleave', eventRef.current.onLeave);
				outerContainer.addEventListener('scroll', eventRef.current.onscroll);
			}

			const factor = (containerHeight - thumbHeight) / (scrollerContainer - containerHeight);

			setStyle({ height: thumbHeight, factor });
		};

		// check if the container has a style to overflow-y to hidden
		const multiObserver = new MutationObserver(entries => {
			entries.forEach(entry => {
				if (entry.attributeName === 'style') {
					const entryStyle = entry.target.getAttribute('style');
					if (entryStyle && entryStyle.includes('overflow-y: hidden')) {
						setShow(false);
					} else {
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
	}, [innerContainerRef, outerContainerRef]);

	return show && <Thumb style={style} container={outerContainerRef.current} show={fadeIn} />;
}
export default Scroller;
