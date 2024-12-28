import Image from '../../Image/Image';
import ScrollBar from '../../ScrollBar/ScrollBar/ScrollBar';
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
	loading,
	extraSection,
	length,
	suggestionRef,
}) {
	// console.log(suggestionRef);

	return (
		<div
			className={`${positionRef.current ? styles.showAbove : styles.showBottom} ${styles.mainContainer}${className ? ` ${className}` : ''}`}
			{...(suggestionRef && { ref: suggestionRef })}
		>
			<ul
				style={{ height: loading ? '15rem' : `${height / 16}rem` }}
				className={`${styles.listContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
			>
				<ScrollBar>
					{loading
						? [...Array(4).keys()].map(item => (
								<li className={`${styles.placeHolder}`} key={item}>
									<div className={`${styles.itemContainerPlaceHolder}`}>
										<div
											className={`${styles.imagePlaceHolder} ${styles.loading}`}
										/>
										<div
											className={`${styles.textPlaceHolder} ${styles.loading}`}
										/>
									</div>
								</li>
							))
						: list.map(item => (
								<li
									className={`${styles.item}${value.name === item.name ? ` ${styles.selected}` : ''}`}
									key={item.name}
								>
									<button
										tabIndex={show ? 0 : -1}
										{...(value === item && { disabled: true })}
										onClick={() => {
											setShow(false);
											if (setValue) setValue(item);
											if (setState) setState(item, name);
										}}
										type='button'
									>
										<div className={styles.itemContainer}>
											<div className={styles.imageContainer}>
												<Image
													data={item.carouselThumb}
													alt={item.alt}
													aspectRatioClassName={
														styles.aspectRatioClassName
													}
												/>
											</div>
											<p>{item.editedName || item.name}</p>
										</div>
									</button>
								</li>
							))}
					{list.length === 0 && !loading && (
						<li className={`${styles.item} ${styles.noDataItem}`}>No Match Found</li>
					)}
				</ScrollBar>
			</ul>
			{extraSection && extraSection(length)}
		</div>
	);
}
export default SuggestionListBody;
