import useAppearDisappear from '../../../Hooks/useAppearDisappear';
import ScrollBar from '../../ScrollBar/ScrollBar';
import styles from './SelectionFieldList.module.css';

function SelectionFieldList({
	state,
	setShow,
	positionRef,
	parentRef,
	childRef,
	list,
	setValue,
	setState,
	name,
	value,
	none,
}) {
	const [show, fadeIn] = useAppearDisappear(state);
	return (
		show && (
			<ul
				className={`${positionRef.current.bottom ? `${styles.showBottom} ` : `${styles.showAbove} `}${styles.listContainer}${fadeIn ? ` ${styles.fadeIn}` : ''}`}
			>
				<div
					className={styles.listScrollContainer}
					ref={parentRef}
					{...(positionRef.current.height && {
						style: { maxHeight: `${positionRef.current.height}px` },
					})}
				>
					<div ref={childRef}>
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
									tabIndex={show ? 0 : -1}
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
									tabIndex={show ? 0 : -1}
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
					</div>
				</div>
				<ScrollBar childRef={childRef} parentRef={parentRef} />
			</ul>
		)
	);
}
export default SelectionFieldList;
