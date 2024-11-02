import { useEffect, useRef, useState } from 'react';
import Thumb from '../Thumb/Thumb';
import styles from './Scroller.module.css';

function Scroller({ innerContainerRef, outerContainerRef }) {
	const [show, setShow] = useState(false);

	const [style, setStyle] = useState({ height: 0, factor: 0 });

	const showRef = useRef(show);
	showRef.current = show;

	useEffect(() => {
		const outerContainer = outerContainerRef.current;
		const innerContainer = innerContainerRef.current;

		innerContainer.classList.add(styles.scrollContainer);

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

		const resizeObserver = new ResizeObserver(updateThumb);

		resizeObserver.observe(outerContainer);
		resizeObserver.observe(innerContainer);
		updateThumb();

		return () => {
			resizeObserver.disconnect();
		};
	}, [innerContainerRef, outerContainerRef]);

	return (
		show && (
			<Thumb style={style} thumbClass={styles.thumb} container={outerContainerRef.current} />
		)
	);
}
export default Scroller;
