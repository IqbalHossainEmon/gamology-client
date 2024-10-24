import { useRef } from 'react';
import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import ScrollBar from '../../ScrollBar/ScrollBar';
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

	const listRef = useRef(null);
	const mainParentRef = useRef(null);
	const parentRef = useRef(null);

	return (
		show && (
			<div
				ref={mainParentRef}
				className={`${positionRef.current.bottom ? `${styles.showBottom} ` : `${styles.showAbove} `}${styles.mainContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
			>
				<div ref={parentRef} className={styles.listScrollContainer}>
					<ul
						className={styles.listContainer}
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
				<ScrollBar childRef={listRef} parentRef={parentRef} mainParentRef={mainParentRef} />
			</div>
		)
	);
}
export default SelectionFieldList;
