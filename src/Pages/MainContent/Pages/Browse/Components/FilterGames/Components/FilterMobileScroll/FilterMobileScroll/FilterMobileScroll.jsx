import { useRef } from 'react';
import ScrollBar from '../../../../../../../../../Shared/ScrollBar/ScrollBar/ScrollBar';
import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptionList from '../Components/FilterOptionList/FilterOptionList';
import styles from './FilterMobileScroll.module.css';

function FilterMobileScroll({
	screenWidth,
	options,
	state,
	setState,
	limits,
	setFilterSort,
	dispatch,
	filterState,
}) {
	const parentRef = useRef(null);
	return (
		<div className={styles.filterContainer} ref={parentRef}>
			<div className={styles.parentContainer}>
				<div className={styles.childContainer}>
					{screenWidth < 769 && <h2 className={styles.filterText}>Filters</h2>}
					<FilterOptionList
						limits={limits}
						options={options}
						setState={setState}
						state={state}
					/>
					<ApplyButton
						dispatch={dispatch}
						filterState={filterState}
						setShow={setFilterSort}
						state={state}
					/>
				</div>
			</div>
			{screenWidth < 769 && <ScrollBar parentRef={parentRef} />}
		</div>
	);
}
export default FilterMobileScroll;
