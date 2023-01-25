import Banner from '../Banner/Banner/Banner';
import EventGames from '../EventGames/EventGames/EventGames';
import ExploreGames from '../ExploreGames/ExploreGames';
import FreeGames from '../FreeGames/FreeGames/FreeGames';
import Games from '../Games/Games/Games';
import styles from './Main.module.css';

export default function Main() {
  return (
    <main className={styles.Main}>
      <Banner />
      <Games />
      <FreeGames />
      <EventGames />
      <ExploreGames />
    </main>
  );
}
