import { useEffect, useRef, useState } from 'react';
import styles from './ButtonWaterEffect.module.css';

function ButtonWaterEffect({ backGround, long }) {
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
						setEle(e => {
							// If there is only one element in the array then set the key to 0
							if (e.length === 1) key.current = 0;
							return e.slice(1);
						});
					},
					long ? 1550 : 750
				);
			},
			// Handle the click event on the button
			handleClick: e => {
				// get the x and y coordinates of the click event

				const btn = e.target;

				let x =
					(e.touches ? e.touches[0].clientX : e.clientX) -
					btn.getBoundingClientRect().left;
				let y =
					(e.touches ? e.touches[0].clientY : e.clientY) -
					btn.getBoundingClientRect().top;

				// get the width and height of the button
				const width = btn.offsetWidth;
				const height = btn.offsetHeight;
				const halfWidth = width / 2;
				const halfHeight = height / 2;

				// if the click event is outside the button then set the x and y coordinates to the center of the button
				if (x < -2 || y < -2) {
					x = halfWidth;
					y = halfHeight;
				}

				let length;

				// calculate the distance of the click event from the center of the button
				if (x <= halfWidth && y <= halfHeight) {
					length = Math.sqrt((width - x) ** 2 + (height - y) ** 2);
				} else if (x > halfWidth && y < halfHeight) {
					length = Math.sqrt(x ** 2 + (height - y) ** 2);
				} else if (x < halfWidth && y > halfHeight) {
					length = Math.sqrt((width - x) ** 2 + y ** 2);
				} else {
					length = Math.sqrt(x ** 2 + y ** 2);
				}

				if (eleRef.current.length === 0) {
					key.current = 0;
				}

				setEle(el => [
					...el,
					<span
						className={`${long ? styles.long : styles.short} ${styles.waterDrop}`}
						key={key.current++}
						style={{
							width: `${length * 2}px`,
							height: `${length * 2}px`,
							top: `${y - length}px`,
							left: `${x - length}px`,
							background: backGround || 'white',
						}}
					/>,
				]);
				eventRefs.current.removeWaterDrop();
			},
		};
	}
	useEffect(() => {
		const btn = waterDropContainer.current.parentElement;
		const { handleClick } = eventRefs.current;

		btn.addEventListener('click', handleClick);
		return () => {
			if (btn) {
				btn.removeEventListener('click', handleClick);
			}
		};
	}, [backGround, long]);

	return (
		<span ref={waterDropContainer} className={styles.btnWaterEffect}>
			{ele}
		</span>
	);
}
export default ButtonWaterEffect;
