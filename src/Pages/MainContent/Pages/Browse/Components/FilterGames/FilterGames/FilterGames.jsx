import { useState } from 'react';
import useScreenWidth from '../../../../../../../Utils/Hooks/useScreenWidth';
import CloseButton from '../../Shared/CloseButton/CloseButton';
import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterMobileScroll from '../Components/FilterMobileScroll/FilterMobileScroll/FilterMobileScroll';
import useFilterSortState from '../Components/useFilterSortState/useFilterSortState';
import styles from './FilterGames.module.css';

const options = [
	{
		type: 'switch',
		tags: ['Show only discounted', 'Hide all owned products'],
	},
	{
		category: 'Price Range',
		type: 'range',
		details: {
			rangeName: 'price',
			stepCondition: [
				{ ifLess: 10, step: 1 },
				{ ifLess: 50, step: 5 },
				{ ifLess: 100, step: 10 },
			],
			float: 2,
			switch: { tag: 'Show only free games' },
		},
	},
	{
		type: 'switch',
		category: 'Genre',
		tags: [
			'Action',
			'Adventure',
			'Racing',
			'Shooter',
			'Role-playing',
			'Sports',
			'Strategy',
			'Simulation',
		],
	},
	{
		type: 'switch',
		category: 'Os',
		tags: ['Windows', 'macOS', 'Linux'],
	},
	{
		type: 'switch',
		category: 'Features',
		tags: [
			'Single-player',
			'Multi-player',
			'Co-op',
			'Achievements',
			'Leader Boards',
			'Controller support',
			'Cloud saves',
			'Overlay',
		],
	},
	{
		type: 'range',
		category: 'Release Date',
		details: {
			rangeName: 'releaseDate',
			float: 0,
		},
	},
];

export default function FilterGames({ filterState, dispatch, limits }) {
	const [state, setState] = useState(filterState);
	const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
	const { filter } = filterSortState;
	const screenWidth = useScreenWidth();

	return (
		<aside
			className={`${styles.FilterGames} ${filter && screenWidth < 769 ? styles.hidden : styles.show}`}
			ref={filterSortRef}
		>
			<FilterMobileScroll
				dispatch={dispatch}
				filterState={filterState}
				limits={limits}
				options={options}
				screenWidth={screenWidth}
				setFilterSort={setFilterSort}
				setState={setState}
				state={state}
			/>
			<ApplyButton
				dispatch={dispatch}
				filterState={filterState}
				setShow={setFilterSort}
				state={state}
			/>
			{screenWidth < 769 && (
				<div className={styles.closeButton}>
					<CloseButton setState={setFilterSort} state='filter' />
				</div>
			)}
		</aside>
	);
}
