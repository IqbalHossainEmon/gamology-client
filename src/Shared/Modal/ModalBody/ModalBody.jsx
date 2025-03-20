import { useEffect, useRef, useState } from 'react';
import ScrollBar from '../../ScrollBar/ScrollBar/ScrollBar';
import styles from './ModalBody.module.css';

function ModalBody({ content, fadeIn, hideModal }) {
	const [style, setStyle] = useState({
		x: 0,
		y: 0,
		top: 0,
		left: 0,
		transformOrigin: '0 center',
	});

	const containerRef = useRef(null);

	useEffect(() => {
		//   x and y position
		if ((containerRef.current, content.parentElement)) {
			const { quadrant } = content.parentElement;

			const top = content.parentElement.y;
			const left = content.parentElement.x;

			const width = containerRef.current?.offsetWidth;
			const height = containerRef.current?.offsetHeight;

			const centerX = window.innerWidth / 2;
			const centerY = window.innerHeight / 2;

			const newX = centerX - width / 2 - left;
			const newY = centerY - height / 2 - top;

			const translate = `${newX}px ${newY}px`;

			switch (quadrant) {
				case 'top-right':
					setStyle((x, y, ...rest) => ({
						...rest,
						left: left - width,
						top: top - height / 2,
						transformOrigin: '100% center',
						translate,
					}));
					break;
				case 'bottom-left':
					setStyle(prev => ({
						...prev,
						top: top - height,
						left,
						transformOrigin: '0 100%',
						translate,
					}));
					break;
				case 'bottom-right':
					setStyle(prev => ({
						...prev,
						top: top - height,
						left: left - width,
						transformOrigin: '100% 100%',
						translate,
					}));
					break;
				default:
					setStyle(({ x, y, ...rest }) => ({
						...rest,
						top: top - height / 2,
						left,
						translate,
					}));
					break;
			}
		}
	}, [containerRef, content.parentElement]);

	return (
		<div
			ref={containerRef}
			className={`${fadeIn ? `${styles.zoomIn} ` : ''}${styles.modal}`}
			{...(content.parentElement && fadeIn
				? {
						style,
					}
				: { style: (({ translate, ...rest }) => rest)(style) })}
		>
			<ScrollBar>
				<div className={styles.modalContentContainer}>
					<h2 className={styles.header}>{content.title}</h2>
					<div className={styles.body}>{content.body}</div>
					<div>{content.footer}</div>
					<button className={styles.crossBtn} onClick={hideModal} type='button'>
						<span className={styles.cross} />
					</button>
				</div>
			</ScrollBar>
		</div>
	);
}
export default ModalBody;
