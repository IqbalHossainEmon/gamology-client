import { useRef } from 'react';
import ScrollBar from '../../../../../../../../../Shared/ScrollBar/ScrollBar';
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
	const childRef = useRef(null);

	return (
		<div className={styles.filterContainer}>
			<div className={styles.parentContainer} ref={parentRef}>
				<div className={styles.childContainer} ref={childRef}>
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

			{screenWidth < 769 && <ScrollBar childRef={childRef} parentRef={parentRef} />}
		</div>
	);
}
export default FilterMobileScroll;
