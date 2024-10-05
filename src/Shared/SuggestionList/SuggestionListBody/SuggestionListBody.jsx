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
	className,
	height,
	setSuggestionRef,
}) {
	const parentRef = useRef(null);
	const childRef = useRef(null);

	const suggestionRef = useRef(null);

	useEffect(() => {
		if (setSuggestionRef) setSuggestionRef(suggestionRef.current);
	}, [setSuggestionRef]);

	return (
		<div
			className={`${positionRef.current.bottom ? styles.showBottom : styles.showAbove} ${styles.mainContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}${className ? ` ${className}` : ''}`}
			{...(suggestionRef && { ref: suggestionRef })}
		>
			<div
				className={styles.listScrollContainer}
				ref={parentRef}
				style={{ height: `${height}px` }}
			>
				<ul ref={childRef} className={styles.listContainer}>
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
				</ul>
			</div>
			<ScrollBar childRef={childRef} parentRef={parentRef} />
		</div>
	);
}
export default SuggestionListBody;
