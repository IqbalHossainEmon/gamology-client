import Banner from '../Components/Banner/Banner/Banner';
import EventGames from '../Components/EventGames/EventGames/EventGames';
import ExploreGames from '../Components/ExploreGames/ExploreGames';
import FreeGames from '../Components/FreeGames/FreeGames/FreeGames';
import Games from '../Components/Games/Games/Games';
import styles from './Discover.module.css';

export default function Discover() {
  return (
    <div className={styles.discover}>
      <Banner />
      <Games />
      <FreeGames />
      <EventGames />
      <ExploreGames />
    </div>
  );
}
