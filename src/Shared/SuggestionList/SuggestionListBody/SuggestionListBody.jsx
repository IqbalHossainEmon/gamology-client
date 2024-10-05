import { useEffect, useRef } from 'react';
import ScrollBar from '../../ScrollBar/ScrollBar';
import styles from './SuggestionListBody.module.css';

function SuggestionListBody({
	fadeIn,
	list,
	setValue,
	setState,
	name,
	value,
	setShow,
	show,
	positionRef,
}) {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	useEffect(() => {
		if (parentRef.current.clientHeight > positionRef.current.height) {
			parentRef.current.style.height = `${positionRef.current.height}px`;
		}
	}, [positionRef, positionRef.current.height]);

	return (
		<ul
			className={`${positionRef.current.bottom ? styles.showBottom : styles.showAbove} ${styles.listContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
		>
			<div className={styles.listScrollContainer} ref={parentRef}>
				<div ref={childRef}>
					{list.map(item => (
						<li
							className={`${styles.item}${value.id === item.id ? ` ${styles.selected}` : ''}`}
							key={item.id}
						>
							<button
								tabIndex={show ? 0 : -1}
								{...(value === item && { disabled: true })}
								onClick={() => {
									setShow(false);
									setValue(item);
									setState(item, name);
								}}
								type='button'
							>
								<div className={styles.itemContainer}>
									<img src={item.carouselThumb} alt={item.alt} />
									<p>{item.editedName || item.name}</p>
								</div>
							</button>
						</li>
					))}
					{list.length === 0 && (
						<li className={`${styles.item} ${styles.noDataItem}`}>No Match Found</li>
					)}
				</div>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} />
		</ul>
	);
}
export default SuggestionListBody;
