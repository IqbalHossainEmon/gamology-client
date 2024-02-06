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
    gameInfo: {
      name: '',
      developer: '',
      publisher: '',
      logo: {},
      phoneLogo: {},
      releaseDate: { day: '', month: '', year: '' },
    },
    gameBanner: [{ cover: '', thumb: '', type: '' }],
    gameDescriptions: { descriptions: [] },
    gameSpecifications: { spec: [] },
    gameTags: { genre: {}, features: {} },
  });

  const [errorChange, setErrorChange] = useState(0);

  const errorMessages = useRef({
    gameInfo: {
      name: '',
      developer: '',
      publisher: '',
      logo: '',
      phoneLogo: '',
      releaseDate: '',
    },
    gameBanner: [{ cover: '', thumb: '', type: '' }],
    gameDescriptions: { descriptions: [] },
    gameSpecifications: { spec: [] },
    gameTags: {},
  });

  const checkValidation = () => {
    let error = false;
    // Game Info
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
    if (!gameData.current.gameInfo.logo?.file) {
      errorMessages.current.gameInfo.logo = 'Cover Image is required';
      error = true;
    } else {
      errorMessages.current.gameInfo.logo = '';
    }
    if (!gameData.current.gameInfo.phoneLogo?.file) {
      errorMessages.current.gameInfo.phoneLogo = 'Portrait Cover Image is required';
      error = true;
    } else {
      errorMessages.current.gameInfo.phoneLogo = '';
    }
    // Game Banner
    if (gameData.current.gameBanner.length !== 0) {
      errorMessages.current.gameBanner = gameData.current.gameBanner.map(banner => {
        const obj = {};
        if (!banner.cover) {
          error = true;
          obj.cover = 'Cover Image is required';
        } else {
          obj.cover = '';
        }
        if (!banner.thumb) {
          error = true;
          obj.thumb = 'Thumbnail is required';
        } else {
          obj.thumb = '';
        }
        return obj;
      });
    }
    // Game Tags
    if (Object.keys(gameData.current.gameTags.genre).length === 0) {
      errorMessages.current.gameTags.genre = 'Genre is required';
      error = true;
    } else {
      errorMessages.current.gameTags.genre = '';
    }
    if (Object.keys(gameData.current.gameTags.features).length === 0) {
      errorMessages.current.gameTags.features = 'Features is required';
      error = true;
    } else {
      errorMessages.current.gameTags.features = '';
    }
    if (
      !gameData.current.gameInfo.releaseDate.day ||
      !gameData.current.gameInfo.releaseDate.month ||
      !gameData.current.gameInfo.releaseDate.year
    ) {
      errorMessages.current.gameInfo.releaseDate = 'Release Date is required';
      error = true;
    }
    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkValidation()) {
      setErrorChange(prev => ++prev);
      console.log('data', gameData.current);
    }
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
        <AddGameBanner
          gameData={gameData}
          errorMessages={errorMessages}
          errorChange={errorChange}
        />
        <AddGameTags gameData={gameData} errorMessages={errorMessages} errorChange={errorChange} />
        <AddGameDescriptions gameData={gameData} />
        <AddGameSpecifications gameData={gameData} />
        <ButtonForAddGameSection submit text="Submit" />
      </form>
    </div>
  );
}
