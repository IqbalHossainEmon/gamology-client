import { useRef, useState } from 'react';
import AddGameBanner from '../Components/AddGameBanner/AddGameBanner/AddGameBanner';
import AddGameDescriptions from '../Components/AddGameDescriptions/AddGameDescriptions/AddGameDescriptions';
import AddGameDetails from '../Components/AddGameDetails/AddGameDetails';
import AddGameSpecifications from '../Components/AddGameSpecifications/AddGameSpecifications/AddGameSpecifications';
import AddGameTags from '../Components/AddGameTags/AddGameTags/AddGameTags';
import ButtonForAddGameSection from '../Components/ButtonForAddGameSection/ButtonForAddGameSection';
import styles from './AddGame.module.css';

export default function AddGame() {
  const gameData = useRef({
    gameInfo: {},
    gameBanner: [],
    gameDescriptions: { descriptions: [] },
    gameSpecifications: { spec: [] },
    gameTags: { genre: {}, features: {} },
  });
  const [customError, setCustomError] = useState({
    gameDetails: {},
    gameBanner: [],
    gameDescriptions: {},
    gameSpecifications: {},
    gameTags: {},
  });

  const checkValidation = () => {
    console.log('checking...');
    console.log(gameData.current);
  };

  const handleSubmit = () => {
    checkValidation();
  };

  return (
    <div className={styles.addGame}>
      <h1 className={styles.header}>Add New Game to the collection</h1>
      <form>
        <AddGameDetails gameData={gameData} />
        <AddGameBanner gameData={gameData} />
        <AddGameTags gameData={gameData} />
        <AddGameDescriptions gameData={gameData} />
        <AddGameSpecifications gameData={gameData} />
        <ButtonForAddGameSection text="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
