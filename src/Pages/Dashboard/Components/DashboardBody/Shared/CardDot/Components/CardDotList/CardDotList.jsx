import { useEffect, useRef, useState } from 'react';
import styles from './CardDotList.module.css';

function CardDotList({ lists, handleHide, item, parentRef, fadeIn }) {
	const [position, setPosition] = useState(0);
	const positionRef = useRef(position);
	positionRef.current = position;

	const listContainerRef = useRef(null);

	useEffect(() => {
		const { x, width, y, height } = parentRef.current.getBoundingClientRect();

		const rightRemain = window.innerWidth - x - width / 2;
		const bottomRemain = window.innerHeight - y - height;

		const containerWidth = listContainerRef.current.clientWidth;
		const containerHeight = listContainerRef.current.clientHeight;

		if (
			rightRemain - 10 > containerWidth / 2 &&
			x > containerWidth / 2 &&
			bottomRemain - 10 > containerHeight
		) {
			if (positionRef.current !== 0) setPosition(0);
			return;
		}
		if (rightRemain - 10 < containerWidth / 2 && x > containerWidth / 2 && bottomRemain > 20) {
			if (positionRef.current !== 1) setPosition(1);
			return;
		}
		if (positionRef.current !== -1) {
			setPosition(-1);
		}
	}, [parentRef]);

	return (
		<ul
			ref={listContainerRef}
			className={`${styles.listContainer} ${position > 0 ? styles.left : position < 0 ? styles.top : styles.bottom}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
		>
			{lists.map(list => (
				<li key={list.id}>
					<button
						onClick={() => {
							list.event(item);
							handleHide();
						}}
						type='button'
					>
						{list.name}
					</button>
				</li>
			))}
		</ul>
	);
}
export default CardDotList;
