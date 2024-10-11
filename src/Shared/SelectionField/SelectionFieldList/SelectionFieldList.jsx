import { useEffect, useRef, useState } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import styles from './SelectionFieldList.module.css';

function SelectionFieldList({
	state,
	setShow,
	positionRef,
	list,
	setValue,
	setState,
	name,
	value,
	none,
}) {
	const [show, fadeIn] = useAppearDisappear(state);

	const [hasScrollbar, setHasScrollbar] = useState(false);
	const listRef = useRef(null);

	useEffect(() => {
		const checkScrollbar = () => {
			if (listRef.current) {
				setHasScrollbar(listRef.current.scrollHeight > listRef.current.clientHeight);
			}
		};
		checkScrollbar();
	}, [show]);

	return (
		show && (
			<div
				className={`${positionRef.current.bottom ? `${styles.showBottom} ` : `${styles.showAbove} `}${styles.mainContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
			>
				<ul
					className={`${styles.listScrollContainer} scroll-style${hasScrollbar ? ` ${styles.scrollbarPresent}` : ''}`}
					{...(positionRef.current.height && {
						style: { maxHeight: `${positionRef.current.height}px` },
					})}
					ref={listRef}
				>
					{none ? (
						<li
							className={`${styles.item}${value === '' ? ` ${styles.selected}` : ''}`}
						>
							<button
								onClick={() => {
									setShow(false);
									setValue('');
									setState('', name);
								}}
								tabIndex={0}
								type='button'
							>
								None
							</button>
						</li>
					) : null}
					{list.map(item => (
						<li
							className={`${styles.item}${value === item ? ` ${styles.selected}` : ''}`}
							key={item}
						>
							<button
								tabIndex={0}
								{...(value === item && { disabled: true })}
								onClick={() => {
									setShow(false);
									setValue(item);
									setState(item, name);
								}}
								type='button'
							>
								{item}
							</button>
						</li>
					))}

					{list.length === 0 && (
						<li className={`${styles.item} ${styles.noDataItem}`}>No Data</li>
					)}
				</ul>
			</div>
		)
	);
}
export default SelectionFieldList;
