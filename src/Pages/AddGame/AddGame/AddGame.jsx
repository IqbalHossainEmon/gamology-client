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

  const [errorChange, setErrorChange] = useState(0);

  const errorMessages = useRef({
    gameInfo: {},
    gameBanner: [],
    gameDescriptions: { descriptions: [] },
    gameSpecifications: { spec: [] },
    gameTags: { genre: {}, features: {} },
  });

  const checkValidation = () => {
    let error = false;
    if (!gameData.current.gameInfo.name) {
      errorMessages.current.gameInfo.name = 'Title is required';
      error = true;
    } else {
      errorMessages.current.gameInfo.name = '';
    }
    if (!gameData.current.gameInfo.developer) {
      errorMessages.current.gameInfo.developer = 'Developer is required';
      error = true;
    } else {
      errorMessages.current.gameInfo.developer = '';
    }
    if (!gameData.current.gameInfo.publisher) {
      errorMessages.current.gameInfo.publisher = 'Publisher is required';
      error = true;
    } else {
      errorMessages.current.gameInfo.publisher = '';
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkValidation()) {
      setErrorChange(prev => ++prev);
      return;
    }
    console.log(gameData.current);
  };

  return (
    <div className={styles.addGame}>
      <h1 className={styles.header}>Add New Game to the collection</h1>
      <form onSubmit={handleSubmit}>
        <AddGameDetails
          gameData={gameData}
          errorMessages={errorMessages}
          errorChange={errorChange}
        />
        <AddGameBanner gameData={gameData} />
        <AddGameTags gameData={gameData} />
        <AddGameDescriptions gameData={gameData} />
        <AddGameSpecifications gameData={gameData} />
        <ButtonForAddGameSection submit text="Submit" />
      </form>
    </div>
  );
}
