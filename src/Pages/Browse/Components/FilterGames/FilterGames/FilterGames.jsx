import { useState } from 'react';
import useFilterSortState from '../../../../../Hooks/useFilterSortState';
import useScreenWidth from '../../../../../Hooks/useScreenWidth';
import CloseButton from '../../Shared/CloseButton/CloseButton';
import ApplyButton from '../Components/ApplyButton/ApplyButton';
import FilterOptions from '../Components/FilterOptions/FilterOptions';
import styles from './FilterGames.module.css';

const options = [
  {
    id: 0,
    optionList: [
      { id: 0, text: 'Show only discounted', filter: 'showOnlyDiscounted' },
      { id: 1, text: 'Hide DLCs and extras', filter: 'HideDLCsAndExtras' },
      { id: 2, text: 'Hide all owned products', filter: 'hideAllOwnedProducts' }
    ]
  },
  {
    id: 1,
    title: 'Genres',
    optionList: [
      { id: 0, text: 'Action', filter: 'action' },
      { id: 1, text: 'Adventure', filter: 'adventure' },
      { id: 2, text: 'Racing', filter: 'racing' },
      { id: 3, text: 'Shooter', filter: 'shooter' },
      { id: 4, text: 'Role-playing', filter: 'rolePlaying' },
      { id: 5, text: 'Sports', filter: 'sports' },
      { id: 6, text: 'Strategy', filter: 'strategy' },
      { id: 7, text: 'Simulation', filter: 'simulation' }
    ]
  },
  {
    id: 2,
    title: 'Os',
    optionList: [
      { id: 0, text: 'Windows', filter: 'windows' },
      { id: 1, text: 'macOS', filter: 'macOS' },
      { id: 2, text: 'Linux', filter: 'linux' }
    ]
  },
  {
    id: 3,
    title: 'Features',
    optionList: [
      { id: 0, text: 'Single-player', filter: 'singlePlayer' },
      { id: 1, text: 'Multi-player', filter: 'multiPlayer' },
      { id: 2, text: 'Co-op', filter: 'coOp' },
      { id: 3, text: 'Achievements', filter: 'achievements' },
      { id: 4, text: 'Leader Boards', filter: 'leaderBoards' },
      { id: 5, text: 'Controller support', filter: 'controllerSupport' },
      { id: 6, text: 'Cloud saves', filter: 'cloudSaves' },
      { id: 7, text: 'Overlay', filter: 'overlay' }
    ]
  }
];

export default function FilterGames({ filterState, dispatch }) {
  const [state, setState] = useState(filterState);

  const { filterSortState, setFilterSort, filterSortRef } = useFilterSortState();
  const { filter } = filterSortState;

  const screenWidth = useScreenWidth();

  return (
    <aside
      ref={filterSortRef}
      className={`${styles.FilterGames} ${filter && screenWidth < 769 && styles.hidden}`}
    >
      <div className={styles.filterContainer}>
        {screenWidth < 769 && <h2>Filters</h2>}
        <div>
          {options.map((option) => (
            <FilterOptions key={option.id} options={option} setState={setState} state={state} />
          ))}
        </div>
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
