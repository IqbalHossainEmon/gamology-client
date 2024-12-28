import { useEffect, useRef, useState } from 'react';
import SuggestionList from '../../../../SuggestionList/SuggestionList/SuggestionList';
import SearchFieldSeeAllButton from '../Components/SearchFieldSeeAllButton/SearchFieldSeeAllButton';
import SearchFieldViewMoreButton from '../Components/SearchFieldViewMoreButton/SearchFieldViewMoreButton';
import styles from './SearchFieldSuggestionList.module.css';

function SearchFieldSuggestionList({ value, searchRef, setValue }) {
	const [navShow, setNavShow] = useState(false);

	const suggestionRef = useRef(null);

	useEffect(() => {
		if (value !== ' ' && value.length > 0) {
			setNavShow(true);
		} else if (suggestionRef.current) {
			setNavShow(false);
		}
	}, [value]);

	const renderExtraSection = useRef(null);
	if (!renderExtraSection.current)
		renderExtraSection.current = length => {
			if (length === 0) return <SearchFieldSeeAllButton searchText={value} />;
			if (length > 4) return <SearchFieldViewMoreButton searchText={value} />;
			return null;
		};

	return (
		<SuggestionList
			state={navShow}
			setShow={() => setNavShow(false)}
			setValue={setValue}
			setState={val => {
				console.log(val);
			}}
			className={styles.searchFieldSuggestionList}
			name='search'
			value={value}
			elementRef={searchRef}
			noPositionChange
			extraSection={renderExtraSection.current}
			maxLimit={4}
			suggestionRef={suggestionRef}
		/>
	);
}
export default SearchFieldSuggestionList;
