import { useRef } from 'react';
import SearchField from '../../../../SearchField/SearchFIeld/SearchFIeld';
import SecondNavSearchFieldSeeAllButton from '../Components/SecondNavSearchFieldSeeAllButton/SecondNavSearchFieldSeeAllButton';
import SecondNavSearchFieldViewMoreButton from '../Components/SecondNavSearchFieldViewMoreButton/SecondNavSearchFieldViewMoreButton';

function SecondNavSearchField({ setNavShow }) {
	const renderExtraSection = useRef(null);
	if (!renderExtraSection.current)
		renderExtraSection.current = length => {
			if (length === 0)
				return {
					numberOfButton: 2,
					Content: SecondNavSearchFieldSeeAllButton,
				};
			if (length > 4)
				return {
					numberOfButton: 1,
					Content: SecondNavSearchFieldViewMoreButton,
				};
			return { numberOfButton: 0, Content: null };
		};

	return (
		<SearchField
			setNavShow={setNavShow}
			updateSearchValue={val => {
				console.log(val);
			}}
			maxLimit={4}
			extraSection={renderExtraSection.current}
			shouldClearTheSearch
		/>
	);
}
export default SecondNavSearchField;
