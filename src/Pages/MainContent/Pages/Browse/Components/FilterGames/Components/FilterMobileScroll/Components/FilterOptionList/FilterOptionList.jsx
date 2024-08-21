import { memo } from 'react';
import FilterOptions from '../FilterOptions/FilterOptions/FilterOptions';
import styles from './FilterOptionList.module.css';

function FilterOptionList({ options, state, setState, limits }) {
	return (
		<div className={styles.filterOptionList}>
			{options.map(option => (
				<FilterOptions
					key={option.id}
					limits={limits}
					option={option}
					setState={setState}
					state={state}
				/>
			))}
		</div>
	);
}
export default memo(FilterOptionList);
