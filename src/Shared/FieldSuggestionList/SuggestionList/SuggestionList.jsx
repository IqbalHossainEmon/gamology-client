import { useEffect, useRef, useState } from 'react';
import SuggestionListContainer from '../Components/SuggestionListContainer/SuggestionListContainer';
import styles from './SuggestionList.module.css';

function SuggestionList({
	value,
	searchRef,
	searchInputRef,
	extraSection,
	maxLimit,
	setState,
	shouldClearTheSearch,
	name,
	extraSectionParams,
	link,
	setHeight,
}) {
	const [navShow, setNavShow] = useState(false);

	const checkerRef = useRef({ onceShown: false, prevValue: value });

	const shouldShow = useRef(true);

	useEffect(() => {
		if (
			value !== ' ' &&
			value.length > 0 &&
			shouldShow.current &&
			checkerRef.current.prevValue !== value
		) {
			setNavShow(true);
			checkerRef.current.onceShown = true;
		} else if (checkerRef.current.onceShown) {
			setNavShow(false);

			checkerRef.current.onceShown = false;
		}
		shouldShow.current = true;
	}, [value]);

	return (
		<SuggestionListContainer
			state={navShow}
			setShow={val => {
				setNavShow(val);
				if (!shouldClearTheSearch) shouldShow.current = false;
			}}
			setState={setState}
			className={styles.searchSuggestionList}
			name={name}
			value={value}
			elementRef={searchRef}
			noPositionChange
			extraSection={extraSection}
			maxLimit={maxLimit}
			searchInputRef={searchInputRef}
			extraSectionParams={extraSectionParams}
			link={link}
			setContainerHeight={setHeight}
		/>
	);
}
export default SuggestionList;
