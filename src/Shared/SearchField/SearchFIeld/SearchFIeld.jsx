import { useRef, useState } from 'react';

import SuggestionList from '../../SuggestionList/SuggestionList/SuggestionList';
import SearchFieldBox from '../Components/SearchFieldBox/SearchFieldBox';

import styles from './SearchFIeld.module.css';

function SearchField({
	setNavShow,
	maxLimit,
	extraSection,
	updateSearchValue,
	shouldClearTheSearch,
	extraSectionParams,
}) {
	const [value, setValue] = useState('');
	const [show, setShow] = useState(false);

	const searchRef = useRef(null);
	const searchInputRef = useRef(null);
	const suggestionList = useRef(null);

	return (
		<>
			<SearchFieldBox
				setNavShow={setNavShow}
				setValue={setValue}
				value={value}
				setShow={setShow}
				searchRef={searchRef}
				searchInputRef={searchInputRef}
				suggestionList={suggestionList}
			/>
			<SuggestionList
				className={styles.suggestionList}
				ref={suggestionList}
				value={value}
				extraSection={extraSection}
				parentShow={value && show}
				searchRef={searchRef}
				searchInputRef={searchInputRef}
				setState={(val, name) => {
					if (updateSearchValue) {
						updateSearchValue(val);
					}

					if (shouldClearTheSearch) {
						setValue('');
					} else if (typeof val === 'object') {
						setValue(val[name]);
					} else {
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
