import { useEffect, useRef } from 'react';
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
	loading,
}) {
	const suggestionRef = useRef(null);

	useEffect(() => {
		if (setSuggestionRef) setSuggestionRef(suggestionRef.current);
	}, [setSuggestionRef]);

	return (
		<div
			className={`${positionRef.current ? styles.showAbove : styles.showBottom} ${styles.mainContainer}${className ? ` ${className}` : ''}${loading ? ' loading' : ''}`}
			{...(suggestionRef && { ref: suggestionRef })}
		>
			<ul
				style={{ height: `${height}px` }}
				className={`${styles.listContainer}${fadeIn ? ` ${styles.fadeIn}` : ''} scroll-style`}
			>
				{list.map(item => (
					<li
						className={`${styles.item}${value.name === item.name ? ` ${styles.selected}` : ''}`}
						key={item.name}
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
	);
}
export default SuggestionListBody;
