import { useRef } from 'react';
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
  const customError = useRef({
    name: 0,
    developer: 0,
    publisher: 0,
    logo: 0,
    phoneLogo: 0,
    gameBanner: 0,
    gameDescriptions: 0,
    gameSpecifications: 0,
    gameTags: 0,
  });

  const checkValidation = () => {
    if (!gameData.current.name) {
      customError.current.name = 1;
    }
    if (!gameData.current.developer) {
      customError.current.developer = 1;
    }
    if (!gameData.current.publisher) {
      customError.current.publisher = 1;
    }
    if (!gameData.current.logo) {
      customError.current.logo = 1;
    }
    if (!gameData.current.phoneLogo) {
      customError.current.phoneLogo = 1;
    }
  };

  const handleSubmit = () => {
    checkValidation();
  };

  return (
    <div className={styles.addGame}>
      <h1 className={styles.header}>Add New Game to the collection</h1>
      <form>
        <AddGameDetails customError={customError} gameData={gameData} />
        <AddGameBanner gameData={gameData} />
        <AddGameTags gameData={gameData} />
        <AddGameDescriptions gameData={gameData} />
        <AddGameSpecifications gameData={gameData} />
        <ButtonForAddGameSection text="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
