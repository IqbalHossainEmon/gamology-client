import { useRef } from 'react';
import ScrollBar from '../../../../../../../../../../../Shared/ScrollBar/ScrollBar/ScrollBar';
import FilterOptionEachPart from '../Components/FilterOptions/FilterOptionEachPart/FilterOptionEachPart';
import styles from './FilterOptions.module.css';

function FilterOptions({ screenWidth, options, state, setState, limits }) {
	const parentRef = useRef(null);
	return (
		<div className={styles.filterContainer} ref={parentRef}>
			<ScrollBar>
				<div className={styles.parentContainer}>
					{screenWidth < 769 && <h2 className={styles.filterText}>Filters</h2>}
					<div className={styles.filterOptionList}>
						{options.map(option => (
							<FilterOptionEachPart
								key={option.category || option.tags[0]}
								limits={limits}
								option={option}
								setState={setState}
								state={state}
							/>
						))}
					</div>
				</div>
			</ScrollBar>
		</div>
	);
}
export default FilterOptions;
