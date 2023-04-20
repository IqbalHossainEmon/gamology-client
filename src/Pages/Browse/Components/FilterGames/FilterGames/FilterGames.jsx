import { useState } from 'react';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import CloseButton from '../../Shared/CloseButton/CloseButton';
import useFilterSortState from '../Components/useFilterSortState/useFilterSortState';

import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptionList from '../Components/FilterOptionList/FilterOptionList';
import styles from './FilterGames.module.css';

const options = [
  {
    id: 0,
    type: 'dropDown',
    optionList: [
      { id: 0, text: 'Show only discounted', filter: 'showOnlyDiscounted' },
      { id: 1, text: 'Hide DLCs and extras', filter: 'HideDLCsAndExtras' },
      { id: 2, text: 'Hide all owned products', filter: 'hideAllOwnedProducts' },
    ],
  },
  {
    id: 1,
    type: 'slider',
    title: 'Price Range',
    rangeName: 'price',
    steps: 5,
    float: true,
  },
  {
    id: 2,
    type: 'dropDown',
    title: 'Genres',
    optionList: [
      { id: 0, text: 'Action', filter: 'action' },
      { id: 1, text: 'Adventure', filter: 'adventure' },
      { id: 2, text: 'Racing', filter: 'racing' },
      { id: 3, text: 'Shooter', filter: 'shooter' },
      { id: 4, text: 'Role-playing', filter: 'rolePlaying' },
      { id: 5, text: 'Sports', filter: 'sports' },
      { id: 6, text: 'Strategy', filter: 'strategy' },
      { id: 7, text: 'Simulation', filter: 'simulation' },
    ],
  },
  {
    id: 3,
    type: 'dropDown',
    title: 'Os',
    optionList: [
      { id: 0, text: 'Windows', filter: 'windows' },
      { id: 1, text: 'macOS', filter: 'macOS' },
      { id: 2, text: 'Linux', filter: 'linux' },
    ],
  },
  {
    id: 4,
    type: 'dropDown',
    title: 'Features',
    optionList: [
      { id: 0, text: 'Single-player', filter: 'singlePlayer' },
      { id: 1, text: 'Multi-player', filter: 'multiPlayer' },
      { id: 2, text: 'Co-op', filter: 'coOp' },
      { id: 3, text: 'Achievements', filter: 'achievements' },
      { id: 4, text: 'Leader Boards', filter: 'leaderBoards' },
      { id: 5, text: 'Controller support', filter: 'controllerSupport' },
      { id: 6, text: 'Cloud saves', filter: 'cloudSaves' },
      { id: 7, text: 'Overlay', filter: 'overlay' },
    ],
  },
  {
    id: 5,
    type: 'slider',
    title: 'Release Date',
    rangeName: 'releaseDate',
    steps: 1,
    float: false,
  },
];

export default function FilterGames({ filterState, dispatch, limits }) {
  const [state, setState] = useState(filterState);

  const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
  const { filter } = filterSortState;

  const screenWidth = useScreenWidth();

  return (
    <aside
      ref={filterSortRef}
      className={`${styles.FilterGames} ${
        filter && screenWidth < 769 ? styles.hidden : styles.show
      }`}
    >
      <div className={styles.filterContainer}>
        {screenWidth < 769 && <h2>Filters</h2>}
        <FilterOptionList options={options} state={state} setState={setState} limits={limits} />
        <ApplyButton
          setShow={setFilterSort}
          dispatch={dispatch}
          filterState={filterState}
          state={state}
        />
      </div>
      {screenWidth < 769 && (
        <div className={styles.closeButton}>
          <CloseButton setState={setFilterSort} state="filter" />
        </div>
      )}
    </aside>
  );
}
