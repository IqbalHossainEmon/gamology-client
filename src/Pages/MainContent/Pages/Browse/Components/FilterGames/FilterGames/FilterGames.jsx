import useScreenWidth from '../../../../../../../Utils/Hooks/useScreenWidth';
import useFilterSortState from '../../../Utils/Hooks/useFilterSortState/useFilterSortState';
import CloseButton from '../../Shared/CloseButton/CloseButton';
import FilterOptionsLoading from '../Components/FilterOptionsLoading/FilterOptionsLoading';
import FilterOptionsWithApplyBtn from '../Components/FilterOptionsWithApplyBtn/FilterOptionsWithApplyBtn/FilterOptionsWithApplyBtn';
import styles from './FilterGames.module.css';

export default function FilterGames({ filterState, dispatch, limits, options, loading }) {
	const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
	const { filter } = filterSortState;
	const { widthInRem } = useScreenWidth();

	return (
		<aside
			className={`${styles.FilterGames} ${filter && widthInRem < 48.0625 ? styles.hidden : styles.show}`}
			ref={filterSortRef}
		>
			{loading ? (
				<FilterOptionsLoading />
			) : (
				<FilterOptionsWithApplyBtn
					dispatch={dispatch}
					filterState={filterState}
					limits={limits}
					options={options}
					screenWidth={widthInRem}
					setFilterSort={setFilterSort}
				/>
			)}
			{widthInRem < 48.0625 && (
				<div className={styles.closeButton}>
					<CloseButton setState={setFilterSort} state='filter' />
				</div>
			)}
		</aside>
	);
}
