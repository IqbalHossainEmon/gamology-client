import { useRef } from 'react';
import ScrollBar from '../../../../../../../../../Shared/ScrollBar/ScrollBar/ScrollBar';
import FilterOptionList from '../Components/FilterOptionList/FilterOptionList';
import styles from './FilterMobileScroll.module.css';

function FilterMobileScroll({ screenWidth, options, state, setState, limits }) {
	const parentRef = useRef(null);
	return (
		<div className={styles.filterContainer} ref={parentRef}>
			<ScrollBar>
				<div className={styles.parentContainer}>
					{screenWidth < 769 && <h2 className={styles.filterText}>Filters</h2>}
					<FilterOptionList
						limits={limits}
						options={options}
						setState={setState}
						state={state}
					/>
				</div>
			</ScrollBar>
		</div>
	);
}
export default FilterMobileScroll;
