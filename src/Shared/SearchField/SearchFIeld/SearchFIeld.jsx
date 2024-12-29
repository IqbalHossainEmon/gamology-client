import { useRef, useState } from 'react';
import SearchFieldBox from '../Components/SearchFieldBox/SearchFieldBox';
import SearchFieldSuggestionList from '../Components/SearchFieldSuggestionList/SearchFieldSuggestionList';

function SearchField({
	setNavShow,
	maxLimit,
	extraSection,
	updateSearchValue,
	shouldClearTheSearch,
	extraSectionParams,
}) {
	const [value, setValue] = useState('');

	const searchRef = useRef(null);
	const searchInputRef = useRef(null);

	return (
		<>
			<SearchFieldBox
				setNavShow={setNavShow}
				setValue={setValue}
				value={value}
				searchRef={searchRef}
				searchInputRef={searchInputRef}
			/>
			<SearchFieldSuggestionList
				value={value}
				extraSection={extraSection}
				searchRef={searchRef}
				searchInputRef={searchInputRef}
				setState={(val, name) => {
					if (updateSearchValue) updateSearchValue(val);
					if (shouldClearTheSearch) {
						setValue('');
					} else if (typeof val === 'object') setValue(val[name]);
					else {
						setValue(val);
					}
				}}
				name='name'
				shouldClearTheSearch={shouldClearTheSearch}
				maxLimit={maxLimit}
				extraSectionParams={extraSectionParams}
			/>
		</>
	);
}
export default SearchField;
