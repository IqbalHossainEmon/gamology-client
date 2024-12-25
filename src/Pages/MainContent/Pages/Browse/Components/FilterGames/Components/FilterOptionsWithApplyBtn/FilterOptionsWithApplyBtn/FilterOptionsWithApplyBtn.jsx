import { useState } from 'react';
import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptions from '../Components/FilterOptions/FilterOptions/FilterOptions';

function FilterOptionsWithApplyBtn({
	dispatch,
	filterState,
	limits,
	options,
	screenWidth,
	setFilterSort,
}) {
	const [state, setState] = useState(filterState);
	return (
		<>
			<FilterOptions
				dispatch={dispatch}
				limits={limits}
				options={options}
				screenWidth={screenWidth}
				setFilterSort={setFilterSort}
				setState={setState}
				state={state}
			/>
			<ApplyButton
				dispatch={dispatch}
				filterState={filterState}
				setShow={setFilterSort}
				state={state}
			/>
		</>
	);
}
export default FilterOptionsWithApplyBtn;
