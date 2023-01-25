import { useState } from 'react';
import BrowseHeader from '../BrowseHeader/BrowseHeader';
import styles from './Main.module.css';

export default function Main() {
  const [numberOfGames, setNumberOfGames] = useState('PC Games / All');
  console.log(setNumberOfGames);
  return (
    <main className={styles.Main}>
      <BrowseHeader gameNumbers={numberOfGames} />
    </main>
  );
}
