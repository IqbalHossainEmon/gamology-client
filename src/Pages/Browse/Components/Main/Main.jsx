import { useReducer } from 'react';

import BrowseHeader from '../BrowseHeader/BrowseHeader';
import useBrowseState from '../useBrowseState/useBrowseState';
import styles from './Main.module.css';

export default function Main() {
  const { initialState, reducer } = useBrowseState();

  const [state, dispatch] = useReducer(reducer, initialState);

  console.log(dispatch);

  return (
    <main className={styles.Main}>
      <BrowseHeader state={state} />
    </main>
  );
}
