import useScreenWidth from '../../../../../../../Utils/Hooks/useScreenWidth';
import useBrowseFilter from '../../../Utils/Hooks/useBrowseFilter/useBrowseFilter';
import BrowseCloseButton from '../../Shared/BrowseCloseButton/CloseButton';
import FilterOptionsLoading from '../Components/FilterOptionsLoading/FilterOptionsLoading';
import FilterOptionsWithApplyBtn from '../Components/FilterOptionsWithApplyBtn/FilterOptionsWithApplyBtn/FilterOptionsWithApplyBtn';
import styles from './FilterGames.module.css';

export default function FilterGames({ filterState, dispatch, limits, options, loading }) {
	const { filter, setFilter } = useBrowseFilter();

	const { widthInRem } = useScreenWidth();

	return (
		<aside
			className={`${styles.FilterGames}${widthInRem < 48.0625 && filter ? ` ${styles.show}` : ` ${styles.hidden}`}`}
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
					setFilter={setFilter}
				/>
			)}
			{widthInRem < 48.0625 && (
				<div className={styles.closeButton}>
					<BrowseCloseButton setState={setFilter} state='filter' />
				</div>
			)}
		</aside>
	);
}
