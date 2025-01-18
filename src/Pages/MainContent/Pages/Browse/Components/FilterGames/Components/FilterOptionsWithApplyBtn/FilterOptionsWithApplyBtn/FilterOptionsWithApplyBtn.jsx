import { useState } from 'react';
import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptions from '../Components/FilterOptions/FilterOptions/FilterOptions';

function FilterOptionsWithApplyBtn({
	dispatch,
	filterState,
	limits,
	options,
	screenWidth,
	setFilter,
}) {
	const [state, setState] = useState(filterState);
	return (
		<>
			<FilterOptions
				limits={limits}
				options={options}
				screenWidth={screenWidth}
				setState={setState}
				state={state}
			/>
			<ApplyButton
				dispatch={dispatch}
				filterState={filterState}
				setShow={setFilter}
				state={state}
			/>
		</>
	);
}
export default FilterOptionsWithApplyBtn;
