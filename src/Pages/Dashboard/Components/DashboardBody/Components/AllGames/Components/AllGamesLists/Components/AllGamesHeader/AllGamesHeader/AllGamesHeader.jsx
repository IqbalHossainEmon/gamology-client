import { useEffect, useRef, useState } from 'react';

import SearchField from '../../../../../../../../../../../Shared/SearchField/SearchFIeld/SearchFIeld';
import useScreenWidth from '../../../../../../../../../../../Utils/Hooks/useScreenWidth';
import AllGamesHeaderSearchFieldShowAll from '../Component/AllGamesHeaderSearchFieldShowAll/AllGamesHeaderSearchFieldShowAll';

import styles from './AllGamesHeader.module.css';

function AllGamesHeader({ setSearchText }) {
	const [search, setSearch] = useState('');
	const [navShow, setNavShow] = useState(false);
	const { widthInRem } = useScreenWidth();
	const timerId = useRef(null);
	const searchRef = useRef(search);
	searchRef.current = search;

	useEffect(() => {
		if (timerId) {
			clearTimeout(timerId.current);
			timerId.current = null;
		}

		timerId.current = setTimeout(() => {
			timerId.current = null;
			if (search !== '') {
				console.log(search);
			}
		}, 30);
	}, [search]);

	const eventRef = useRef(null);

	if (!eventRef.current) {
		eventRef.current = {
			handleChange: prop => {
				setNavShow(prop);
				setSearchText(searchRef.current);
			},
		};
	}
	const renderExtraSection = useRef(null);
	if (!renderExtraSection.current) {
		renderExtraSection.current = length => {
			if (length > 1) {
				return {
					numberOfButton: 1,
					Content: AllGamesHeaderSearchFieldShowAll,
				};
			}
			return { numberOfButton: 0, Content: null };
		};
	}

	return (
		<div className={styles.allGamesHeader}>
			<h2 className={styles.headerText}>All Games</h2>
			<div className={styles.searchFieldContainer}>
				<div className={`${navShow ? `${styles.searchShow} ` : ''}${styles.searchField}`}>
					<SearchField
						setChangedValue={setSearch}
						setNavShow={eventRef.current.handleChange}
						shouldClearTheSearch
						extraSection={renderExtraSection.current}
					/>
				</div>
			</div>
			{widthInRem < 48.0625 && <ScreenShadow show={navShow} zIndex={3} />}
		</div>
	);
}
export default AllGamesHeader;
