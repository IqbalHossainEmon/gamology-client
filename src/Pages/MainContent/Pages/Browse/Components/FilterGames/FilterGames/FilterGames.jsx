import { useState } from 'react';
import useScreenWidth from '../../../../../../../Hooks/useScreenWidth';
import CloseButton from '../../Shared/CloseButton/CloseButton';
import useFilterSortState from '../Components/useFilterSortState/useFilterSortState';

import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptionList from '../Components/FilterOptionList/FilterOptionList';
import styles from './FilterGames.module.css';

const options = [
    {
        id: 0,
        optionList: [
            {
                id: 0,
                type: 'switch',
                text: 'Show only discounted',
                filter: 'showOnlyDiscounted',
            },
            {
                id: 2,
                type: 'switch',
                text: 'Hide all owned products',
                filter: 'hideAllOwnedProducts',
            },
        ],
    },
    {
        id: 1,
        title: 'Price Range',
        optionList: [
            {
                id: 1,
                rangeName: 'price',
                steps: 5,
                float: 2,
            },
            {
                id: 2,
                type: 'switch',
                text: 'Show only free games',
                filter: 'ShowOnlyFreeGames',
            },
        ],
    },

    {
        id: 2,
        title: 'Genre',
        optionList: [
            { id: 0, type: 'switch', text: 'Action', filter: 'action' },
            { id: 1, type: 'switch', text: 'Adventure', filter: 'adventure' },
            { id: 2, type: 'switch', text: 'Racing', filter: 'racing' },
            { id: 3, type: 'switch', text: 'Shooter', filter: 'shooter' },
            { id: 4, type: 'switch', text: 'Role-playing', filter: 'rolePlaying' },
            { id: 5, type: 'switch', text: 'Sports', filter: 'sports' },
            { id: 6, type: 'switch', text: 'Strategy', filter: 'strategy' },
            { id: 7, type: 'switch', text: 'Simulation', filter: 'simulation' },
        ],
    },
    {
        id: 3,
        title: 'Os',
        optionList: [
            { id: 0, type: 'switch', text: 'Windows', filter: 'windows' },
            { id: 1, type: 'switch', text: 'macOS', filter: 'macOS' },
            { id: 2, type: 'switch', text: 'Linux', filter: 'linux' },
        ],
    },
    {
        id: 4,
        title: 'Features',
        optionList: [
            { id: 0, type: 'switch', text: 'Single-player', filter: 'singlePlayer' },
            { id: 1, type: 'switch', text: 'Multi-player', filter: 'multiPlayer' },
            { id: 2, type: 'switch', text: 'Co-op', filter: 'coOp' },
            { id: 3, type: 'switch', text: 'Achievements', filter: 'achievements' },
            { id: 4, type: 'switch', text: 'Leader Boards', filter: 'leaderBoards' },
            {
                id: 5,
                type: 'switch',
                text: 'Controller support',
                filter: 'controllerSupport',
            },
            { id: 6, type: 'switch', text: 'Cloud saves', filter: 'cloudSaves' },
            { id: 7, type: 'switch', text: 'Overlay', filter: 'overlay' },
        ],
    },
    {
        id: 5,
        title: 'Release Date',
        optionList: [
            {
                id: 5,
                rangeName: 'releaseDate',
                steps: 1,
                float: 0,
            },
        ],
    },
];

export default function FilterGames({ filterState, dispatch, limits }) {
    const [state, setState] = useState(filterState);

    const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
    const { filter } = filterSortState;

    const screenWidth = useScreenWidth();

    return (
        <aside ref={filterSortRef} className={`${styles.FilterGames} ${filter && screenWidth < 769 ? styles.hidden : styles.show}`}>
            <div className={styles.filterContainer}>
                {screenWidth < 769 && <h2 className={styles.filterText}>Filters</h2>}
                <FilterOptionList options={options} state={state} setState={setState} limits={limits} />
                <ApplyButton setShow={setFilterSort} dispatch={dispatch} filterState={filterState} state={state} />
            </div>
            {screenWidth < 769 && (
                <div className={styles.closeButton}>
                    <CloseButton setState={setFilterSort} state="filter" />
                </div>
            )}
        </aside>
    );
}
