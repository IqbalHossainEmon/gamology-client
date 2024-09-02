import { useEffect, useRef } from 'react';
import useScreenWidth from '../../../../../../../../../Hooks/useScreenWidth';
import ScreenShadow from '../../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import useFilterSortState from '../../../../FilterGames/Components/useFilterSortState/useFilterSortState';
import CloseButton from '../../../../Shared/CloseButton/CloseButton';
import PcSortList from '../Components/PcSortList/PcSortList/PcSortList';
import SortList from '../Components/SortList/SortList';
import styles from './SortContainer.module.css';

export default function SortContainer({ state, handleChange }) {
	const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
	const { sort } = filterSortState;
	const screenWidth = useScreenWidth();
	const dropDownRef = useRef();

	useEffect(() => {
		filterSortRef.sort = dropDownRef.current;
	}, [dropDownRef, filterSortRef]);

	return (
		<>
			<div
				className={`${styles.sortContainer}${sort && screenWidth < 769 ? ` ${styles.hidden}` : ''}`}
				ref={dropDownRef}
			>
				{screenWidth > 768 && (
					<PcSortList
						dropDownRef={dropDownRef}
						handleChange={handleChange}
						setFilterSort={setFilterSort}
						sort={sort}
						state={state}
					/>
				)}

				{screenWidth < 769 && (
					<div className={styles.sortLists}>
						<h2>Sort by</h2>
						<SortList
							handleChange={handleChange}
							setShow={setFilterSort}
							state={state}
						/>
					</div>
				)}

				{screenWidth < 769 && (
					<div className={styles.closeButton}>
						<CloseButton setState={setFilterSort} state='sort' />
					</div>
				)}
			</div>

			{screenWidth < 769 && <ScreenShadow show={!sort} zIndex={3} />}
		</>
	);
}
