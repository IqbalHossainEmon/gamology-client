import { useReducer } from 'react';
import BrowseHeader from '../Components/BrowseHeader/BrowseHeader/BrowseHeader';
import FilterGames from '../Components/FilterGames/FilterGames/FilterGames';
import GameCards from '../Components/GameCards/GameCards';
import useBrowseLogics from '../Components/useBrowseLogics/useBrowseLogics';
import styles from './Browse.module.css';

export default function Browse() {
  const { initialState, reducer } = useBrowseLogics();

  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <section className={styles.browse}>
      <BrowseHeader state={state} handleChange={dispatch} />
      <div className={styles.mainContent}>
        <FilterGames filterState={state.filterState} dispatch={dispatch} />
        <GameCards state={state} />
      </div>
    </section>
  );
}
