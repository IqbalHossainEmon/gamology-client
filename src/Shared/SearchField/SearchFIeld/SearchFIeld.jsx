import { useRef, useState } from 'react';
import SearchFieldBox from '../Components/SearchFieldBox/SearchFieldBox';
import SearchFieldSuggestionList from '../Components/SearchFieldSuggestionList/SearchFieldSuggestionList/SearchFieldSuggestionList';

function SearchField({ setNavShow }) {
	const [value, setValue] = useState('');

	const searchRef = useRef(null);

	return (
		<>
			<SearchFieldBox setNavShow={setNavShow} setValue={setValue} searchRef={searchRef} />
			<SearchFieldSuggestionList
				value={value}
				searchRef={searchRef}
				setValue={() => setValue('')}
			/>
		</>
	);
}
export default SearchField;
