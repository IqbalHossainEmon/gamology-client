import { useEffect, useRef, useState } from 'react';
import useScreenWidth from '../../../../../../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import SearchField from '../../../../../../../../../../Shared/SearchField/SearchField';
import styles from './AllGamesHeader.module.css';

function AllGamesHeader({ setSearchText }) {
	const [search, setSearch] = useState('');
	const [navShow, setNavShow] = useState(false);
	const screenWidth = useScreenWidth();
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
	return (
		<div className={styles.allGamesHeader}>
			<h2 className={styles.headerText}>All Games</h2>
			<div className={styles.searchFieldContainer}>
				<div className={`${navShow ? `${styles.searchShow} ` : ''}${styles.searchField}`}>
					<SearchField
						setChangedValue={setSearch}
						setNavShow={eventRef.current.handleChange}
					/>
				</div>
			</div>

			{screenWidth < 769 && <ScreenShadow show={navShow} zIndex={3} />}
		</div>
	);
}
export default AllGamesHeader;
