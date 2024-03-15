import { useState } from 'react';
import AllGamesHeader from '../Components/AllGamesHeader/AllGamesHeader';
import styles from './AllGames.module.css';

const AllGames = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <div className={styles.allGames}>
      <AllGamesHeader change={setSearchText} />
    </div>
  );
};
export default AllGames;
