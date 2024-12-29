import { useEffect, useRef, useState } from 'react';
import SuggestionList from '../../../SuggestionList/SuggestionList/SuggestionList';
import styles from './SearchFieldSuggestionList.module.css';

function SearchFieldSuggestionList({
	value,
	searchRef,
	searchInputRef,
	extraSection,
	maxLimit,
	setState,
	shouldClearTheSearch,
	name,
	extraSectionParams,
}) {
	const [navShow, setNavShow] = useState(false);

	const checkIfOnceShown = useRef(false);

	const shouldShow = useRef(true);

	useEffect(() => {
		if (value !== ' ' && value.length > 0 && shouldShow.current) {
			setNavShow(true);
			checkIfOnceShown.current = true;
		} else if (checkIfOnceShown.current) {
			setNavShow(false);
			checkIfOnceShown.current = false;
		}
		shouldShow.current = true;
	}, [value]);

	// console.log(value !== ' ', value.length > 0, shouldShow.current);

	return (
		<SuggestionList
			state={navShow}
			setShow={val => {
				setNavShow(val);
				if (!shouldClearTheSearch) shouldShow.current = false;
			}}
			setState={setState}
			className={styles.searchFieldSuggestionList}
			name={name}
			value={value}
			elementRef={searchRef}
			noPositionChange
			extraSection={extraSection}
			maxLimit={maxLimit}
			searchInputRef={searchInputRef}
			extraSectionParams={extraSectionParams}
		/>
	);
}
export default SearchFieldSuggestionList;
