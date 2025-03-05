import { useEffect, useRef, useState } from 'react';
import styles from './RippleEffect.module.css';

function RippleEffect({ background, long }) {
	const [ele, setEle] = useState([]);
	const eleRef = useRef(ele);
	eleRef.current = ele;
	const key = useRef(0);
	const eventRefs = useRef(null);

	const waterDropContainer = useRef(null);

	if (!eventRefs.current) {
		eventRefs.current = {
			removeWaterDrop: () => {
				// Remove the first element after the animation is completed
				setTimeout(
					() => {
						setEle(prev => {
							// If there is only one element in the array then set the key to 0
							if (prev.length === 1) key.current = 0;
							return prev.slice(1);
						});
					},
					long ? 2550 : 7500
				);
			},
			// Handle the click event on the button
			handleClick: e => {
				const btn = e.currentTarget;

				const rect = btn.getBoundingClientRect();

				const x = (e.touches ? e.touches[0].pageX : e.pageX) - rect.left;
				const y = (e.touches ? e.touches[0].pageY : e.pageY) - rect.top;

				// get the width and height of the button
				const width = btn.offsetWidth;
				const height = btn.offsetHeight;

				// Calculate distances from the click point to each corner
				const distances = [
					Math.hypot(x, y), // top-left
					Math.hypot(width - x, y), // top-right
					Math.hypot(x, height - y), // bottom-left
					Math.hypot(width - x, height - y), // bottom-right
				];

				// Get the farthest distance (for full coverage)
				const radius = Math.max(...distances);

				setEle(el => [
					...el,
					<span
						className={`${long ? styles.long : styles.short} ${styles.waterDrop}`}
						key={key.current++}
						style={{
							width: `${radius * 2}px`,
							height: `${radius * 2}px`,
							top: `${y - radius}px`,
							left: `${x - radius}px`,
							background: background || 'white',
						}}
					/>,
				]);
				eventRefs.current.removeWaterDrop();
			},
		};
	}

	const isAdded = useRef(false);

	useEffect(() => {
		const btn = waterDropContainer.current.parentElement;
		const { handleClick } = eventRefs.current;

		if (btn) {
			if (!isAdded.current) {
				btn.classList.add(styles.btn);
				isAdded.current = true;
			}

			btn.addEventListener('click', handleClick);
		}

		return () => {
			if (btn) {
				btn.removeEventListener('click', handleClick);
			}
		};
	}, [background, long]);

	return (
		<span ref={waterDropContainer} className={styles.btnWaterEffect}>
			{ele}
		</span>
	);
}
export default RippleEffect;
