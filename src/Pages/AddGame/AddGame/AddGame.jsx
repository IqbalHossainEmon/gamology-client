import AddGameBanner from '../Components/AddGameBanner/AddGameBanner/AddGameBanner';
import AddGameDescriptions from '../Components/AddGameDescriptions/AddGameDescriptions';
import AddGameDetails from '../Components/AddGameDetails/AddGameDetails';
import AddGameSpecifications from '../Components/AddGameSpecifications/AddGameSpecifications/AddGameSpecifications';
import AddGamesDetailsInfo from '../Components/AddGamesDetailsInfo/AddGamesDetailsInfo/AddGamesDetailsInfo';
import styles from './AddGame.module.css';

export default function AddGame() {
  return (
    <div className={styles.addGame}>
      <h1>Add New Game to the collection</h1>
      <form>
        <AddGameDetails />
        <AddGameBanner />
        <AddGamesDetailsInfo />
        <AddGameDescriptions />
        <AddGameSpecifications/>
      </form>
    </div>
  );
}
