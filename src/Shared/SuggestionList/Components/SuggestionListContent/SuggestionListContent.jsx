import { useEffect } from 'react';
import useObjectUtilities from '../../../../Utils/Hooks/useObjectUtilities';
import useScreenWidth from '../../../../Utils/Hooks/useScreenWidth';
import Image from '../../../Image/Image/Image';
import ScrollBar from '../../../ScrollBar/ScrollBar/ScrollBar';
import styles from './SuggestionListContent.module.css';

function SuggestionListContent({
	fadeIn,
	list,
	setState,
	value,
	setShow,
	show,
	positionRef,
	className,
	height,
	loading,
	extraSection,
	length,
	setElement,
	showMenu,
	suggestionRef,
	extraSectionParams,
	onHide,
	elementRef,
	setContainerHeight,
	isSelected,
	ref,
}) {
	const { numberOfButton, Content } = extraSection
		? extraSection(length)
		: { numberOfButton: 0, Content: () => null };

	const { remHeightInPixels } = useScreenWidth();

	useEffect(() => {
		setElement([suggestionRef.current, elementRef.current]);
		showMenu();
	}, [elementRef, onHide, setElement, showMenu, suggestionRef]);

	useEffect(() => {
		if (setContainerHeight) {
			setContainerHeight(
				loading ? 14 : (height + (numberOfButton || 0) * 42) / remHeightInPixels
			);
		}
		return () => {
			if (setContainerHeight) setContainerHeight(0);
		};
	}, [height, loading, numberOfButton, remHeightInPixels, setContainerHeight]);

	const { cloneObject } = useObjectUtilities();

	const handleClick = item => {
		isSelected.current = true;
		const newItem = cloneObject(item);
		delete newItem.editedName;
		setShow(false);
		onHide();
		if (setState) setState(newItem);
	};

	return (
		<div
			className={`${positionRef.current ? styles.showAbove : styles.showBottom} ${styles.mainContainer}${className ? ` ${className}` : ''}`}
			ref={r => {
				suggestionRef.current = r;
				if (ref) ref.current = r;
			}}
		>
			<div
				style={{
					height: loading
						? '14rem'
						: `${(height + (numberOfButton || 0) * 42) / remHeightInPixels}rem`,
				}}
				className={`${styles.listContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
			>
				{(loading || !!list.length) && (
					<ScrollBar>
						<ul className={styles.list}>
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
											className={`${styles.item}${typeof value === 'object' ? value.name === item.name : value === item.name ? ` ${styles.selected}` : ''}`}
											key={item.name}
										>
											<button
												className={styles.itemButton}
												tabIndex={show ? 0 : -1}
												{...(value === item && { disabled: true })}
												onClick={() => handleClick(item)}
												onKeyDown={e => {
													if (e.key === 'Enter' || e.key === ' ') {
														handleClick(item);
													}
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
						</ul>
					</ScrollBar>
				)}
				{!loading &&
					(numberOfButton ? (
						<div className={styles.extraSection}>
							<Content
								value={value}
								setShow={setShow}
								{...extraSectionParams}
								setValue={val => setState(val)}
							/>
						</div>
					) : (
						!list.length && (
							<div className={`${styles.item} ${styles.noDataItem}`}>
								No Match Found
							</div>
						)
					))}
			</div>
		</div>
	);
}
export default SuggestionListContent;
