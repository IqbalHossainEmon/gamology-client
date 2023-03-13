import { memo, useReducer } from 'react';
import withFilterSortProvider from '../../../HOC/withFilterSortProvider';
import useScreenWidth from '../../../Hooks/useScreenWidth';
import BrowseHeader from '../Components/BrowseHeader/BrowseHeader/BrowseHeader';
import FilterGames from '../Components/FilterGames/FilterGames/FilterGames';
import GameCards from '../Components/GameCards/GameCards';
import MobileSortAndFilterButton from '../Components/MobileSortAndFilterButton/MobileSortAndFilterButton';
import useBrowseLogics from '../Components/useBrowseLogics/useBrowseLogics';
import styles from './Browse.module.css';

function Browse() {
  const { initialState, reducer } = useBrowseLogics();

  const screenWidth = useScreenWidth();

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <section className={styles.browse}>
      <BrowseHeader state={state} handleChange={dispatch} />
      <div className={styles.mainContent}>
        <FilterGames filterState={state.filterState} dispatch={dispatch} />
        <GameCards state={state} />
      </div>
      {screenWidth < 769 && <MobileSortAndFilterButton />}
    </section>
  );
}
export default withFilterSortProvider(memo(Browse));
