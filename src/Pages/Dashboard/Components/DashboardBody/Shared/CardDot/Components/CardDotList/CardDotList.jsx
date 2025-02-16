import { useEffect, useRef } from 'react';
import styles from './CardDotList.module.css';

function CardDotList({ lists, onAppear, item, fadeIn, setHide }) {
	const listContainerRef = useRef([]);

	const isSet = useRef(false);

	useEffect(() => {
		if (!isSet.current) {
			onAppear(listContainerRef.current);
			isSet.current = true;
		}
	}, [onAppear]);

	return (
		<ul
			ref={ref => listContainerRef.current.push(ref)}
			className={`${styles.listContainer}${fadeIn ? ` ${styles.zoomIn}` : ''}`}
		>
			{lists.map(
				list =>
					list.name && (
						<li key={list.name} ref={ref => listContainerRef.current.push(ref)}>
							<button
								onClick={() => {
									list.event(item);
									if (setHide) setHide();
								}}
								type='button'
							>
								{list.name}
							</button>
						</li>
					)
			)}
		</ul>
	);
}
export default CardDotList;
