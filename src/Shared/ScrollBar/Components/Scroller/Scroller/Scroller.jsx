import { useEffect, useRef, useState } from 'react';
import Thumb from '../Components/Thumb/Thumb';

function Scroller({ innerContainerRef, outerContainerRef }) {
	const [show, setShow] = useState(false);

	const [style, setStyle] = useState({ height: 0, factor: 0 });

	const showRef = useRef(show);
	showRef.current = show;

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

				return;
			}
			if (!showRef.current) {
				setShow(true);
			}
			const factor = (containerHeight - thumbHeight) / (scrollerContainer - containerHeight);

			setStyle({ height: thumbHeight, factor });
		};

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

	return show && <Thumb style={style} container={outerContainerRef.current} />;
}
export default Scroller;
