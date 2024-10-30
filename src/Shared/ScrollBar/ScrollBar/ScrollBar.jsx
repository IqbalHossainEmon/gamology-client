import { useEffect, useRef, useState } from 'react';
import Thumb from '../Thumb/Thumb';
import styles from './ScrollBar.module.css';

function ScrollBar({ parentRef }) {
	const [show, setShow] = useState(false);

	const showRef = useRef(show);
	showRef.current = show;

	useEffect(() => {
		const scrollContainer = parentRef.current;
		scrollContainer.classList.add(styles.scrollContainer);

		const updateThumb = () => {
			const { clientHeight } = scrollContainer;
			const { scrollHeight } = scrollContainer;
			const thumbHeight = (clientHeight / scrollHeight) * clientHeight;

			if (thumbHeight === clientHeight) {
				if (!showRef.current) {
					return;
				}
				setShow(false);
				return;
			}
			if (!showRef.current && thumbHeight < clientHeight) {
				setShow(true);
			}
		};

		const observer = new MutationObserver(() => {
			const { overflow } = window.getComputedStyle(scrollContainer);
			if (overflow === 'hidden') {
				updateThumb();
			}
		});

		const resizeObserver = new ResizeObserver(updateThumb);

		observer.observe(scrollContainer, { attributes: true, attributeFilter: ['style'] });
		resizeObserver.observe(scrollContainer);
		updateThumb();

		return () => {
			observer.disconnect();
		};
	}, [parentRef]);

	return show && parentRef.current && <Thumb scrollContainer={parentRef.current} />;
}

export default ScrollBar;
