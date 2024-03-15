import { useState } from 'react';
import styles from './AllGames.module.css';

const AllGames = () => {
  const [games, setGames] = useState([]);

  return (
    <div className={styles.allGames}>
      <h1>All Games</h1>
    </div>
  );
};
export default AllGames;
