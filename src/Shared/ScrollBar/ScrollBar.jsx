import { useEffect, useRef } from 'react';
import styles from './ScrollBar.module.css';

function ScrollBar() {
	const thumbRef = useRef(null);
	const containerRef = useRef(null);
	useEffect(() => {
		const thumb = thumbRef.current;
		const scrollContainer = containerRef.current.parentElement;
		scrollContainer.classList.add(styles.scrollContainer);

		const updateThumb = () => {
			const containerHeight = scrollContainer.clientHeight;
			const containerScrollHeight = scrollContainer.scrollHeight;
			const thumbHeight = (containerHeight / containerScrollHeight) * containerHeight;

			console.log(containerHeight, containerScrollHeight);

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

		const resizeObserver = new ResizeObserver(() => {
			updateThumb();
		});

		observer.observe(scrollContainer, { attributes: true, attributeFilter: ['style'] });
		resizeObserver.observe(containerRef.current);
		updateThumb();

		return () => {
			observer.disconnect();
		};
	}, []);

	return (
		<div ref={containerRef} className={styles.scrollInnerContainer}>
			<div className={styles.thumb} ref={thumbRef} />
			<div />
		</div>
	);
}

export default ScrollBar;
