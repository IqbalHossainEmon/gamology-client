import { useEffect, useRef } from 'react';
import styles from './Thumb.module.css';

function Thumb({ scrollContainer }) {
	const thumbRef = useRef(null);

	useEffect(() => {
		const thumb = thumbRef.current;

		const updateThumb = () => {
			const containerHeight = scrollContainer.clientHeight;
			const containerScrollHeight = scrollContainer.scrollHeight;
			const thumbHeight = (containerHeight / containerScrollHeight) * containerHeight;

			const factor =
				(containerHeight - thumbHeight) / (containerScrollHeight - containerHeight);

			thumb.style.height = `${thumbHeight}px`;
			thumb.style.transform = `
		        matrix3d(
		            1, 0, 0, 0,
		            0, 1, 0, 0,
		            0, 0, 1, 0,
		            0, 0, 0, -1
		        )
		        scale(${1 / factor})
		        translateZ(${1 - 1 / factor}px)
		        translateZ(-2px)
		    `;
		};

		const observer = new MutationObserver(() => {
			const { overflow } = window.getComputedStyle(scrollContainer);
			if (overflow === 'hidden') {
				updateThumb();
			}
		});

		const resizeObserver = new ResizeObserver(updateThumb);

		observer.observe(scrollContainer, { attributes: true, childList: true, tree: true });
		resizeObserver.observe(scrollContainer);
		updateThumb();

		return () => {
			observer.disconnect();
			resizeObserver.disconnect();
		};
	}, [scrollContainer]);

	return (
		<>
			<div className={styles.thumb} ref={thumbRef} />
			<div />
		</>
	);
}
export default Thumb;
