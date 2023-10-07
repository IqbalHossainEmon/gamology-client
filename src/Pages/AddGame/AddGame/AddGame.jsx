import AddGameBanner from '../Components/AddGameBanner/AddGameBanner';
import AddGameDetails from '../Components/AddGameDetails/AddGameDetails';
import AddGamesDetailsInfo from '../Components/AddGamesDetailsInfo/AddGamesDetailsInfo';
import styles from './AddGame.module.css';

export default function AddGame() {
  return (
    <div className={styles.addGame}>
      <h1>Add New Game to the collection</h1>
      <form>
        <AddGameDetails />
        <AddGameBanner />
        <AddGamesDetailsInfo />
      </form>
    </div>
  );
}
