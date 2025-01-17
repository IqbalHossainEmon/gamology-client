import { useEffect, useRef } from 'react';
import ScreenShadow from '../../../../../../../../../Shared/ScreenShadow/ScreenShadow';
import ScrollBar from '../../../../../../../../../Shared/ScrollBar/ScrollBar/ScrollBar';
import useScreenWidth from '../../../../../../../../../Utils/Hooks/useScreenWidth';
import useFilterSortState from '../../../../../Utils/Hooks/useFilterSortState/useFilterSortState';
import CloseButton from '../../../../Shared/CloseButton/CloseButton';
import PcSortList from '../Components/PcSortList/PcSortList/PcSortList';
import SortList from '../Components/SortList/SortList';
import styles from './SortContainer.module.css';

export default function SortContainer({ state, handleChange }) {
	const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
	const { sort } = filterSortState;
	const { widthInRem } = useScreenWidth();
	const dropDownRef = useRef();

	useEffect(() => {
		filterSortRef.sort = dropDownRef.current;
	}, [dropDownRef, filterSortRef]);

	return (
		<>
			<div
				className={`${styles.sortContainer}${sort && widthInRem < 48.0625 ? ` ${styles.hidden}` : ''}`}
				ref={dropDownRef}
			>
				{widthInRem > 48 && (
					<PcSortList
						dropDownRef={dropDownRef}
						handleChange={handleChange}
						setFilterSort={setFilterSort}
						sort={sort}
						state={state}
					/>
				)}
				{widthInRem < 48.0625 && (
					<div className={styles.sortDropDown}>
						<ScrollBar>
							<div className={styles.sortLists}>
								<h2>Sort by</h2>
								<SortList
									handleChange={handleChange}
									setShow={setFilterSort}
									state={state}
								/>
							</div>
						</ScrollBar>
					</div>
				)}
				{widthInRem < 48.0625 && (
					<div className={styles.closeButton}>
						<CloseButton setState={setFilterSort} state='sort' />
					</div>
				)}
			</div>
			{widthInRem < 48.0625 && <ScreenShadow show={!sort} zIndex={3} />}
		</>
	);
}
