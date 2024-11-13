import useAppearDisappear from '../../../Utils/Hooks/useAppearDisappear';
import ScrollBar from '../../ScrollBar/ScrollBar/ScrollBar';
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

	return (
		show && (
			<div
				className={`${positionRef.current.bottom ? `${styles.showBottom} ` : `${styles.showAbove} `}${styles.mainContainer}${fadeIn ? ` ${styles.fadeIn}` : ''} ${Math.floor(Math.random() * 2 + 1) === 1 ? styles.left : styles.right}`}
			>
				<div
					className={styles.listScrollContainer}
					{...(positionRef.current.height && {
						style: { maxHeight: `${positionRef.current.height}px` },
					})}
				>
					<ScrollBar>
						<ul className={styles.listContainer}>
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
					</ScrollBar>
				</div>
			</div>
		)
	);
}
export default SelectionFieldList;
