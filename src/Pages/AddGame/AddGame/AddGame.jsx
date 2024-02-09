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
    gameDescriptions: { descriptions: [{ mainHeader: '', subHeader: '', description: '' }] },
    gameSpecifications: { spec: [] },
    gameTags: { genre: {}, features: {} },
  });

  const [errorChange, setErrorChange] = useState(0);

  const errorMessages = useRef({
    gameInfoError: {
      name: '',
      developer: '',
      publisher: '',
      logo: '',
      phoneLogo: '',
      releaseDate: '',
    },
    gameBannerError: [{ cover: '', thumb: '', type: '' }],
    gameDescriptionsError: { descriptions: [] },
    gameSpecificationsError: { spec: [] },
    gameTagsError: {},
  });

  const { gameInfo, gameBanner, gameDescriptions, gameSpecifications, gameTags } = gameData.current;

  const {
    gameInfoError,
    gameBannerError,
    gameDescriptionsError,
    gameSpecificationsError,
    gameTagsError,
  } = errorMessages.current;

  const checkValidation = () => {
    let error = false;
    // Game Info
    if (!gameInfo.name) {
      gameInfoError.name = 'Title is required';
      error = true;
    } else {
      gameInfoError.name = '';
    }
    if (!gameInfo.developer) {
      gameInfoError.developer = 'Developer is required';
      error = true;
    } else {
      gameInfoError.developer = '';
    }
    if (!gameInfo.publisher) {
      gameInfoError.publisher = 'Publisher is required';
      error = true;
    } else {
      gameInfoError.publisher = '';
    }
    if (!gameInfo.logo?.file) {
      gameInfoError.logo = 'Cover Image is required';
      error = true;
    } else {
      gameInfoError.logo = '';
    }
    if (!gameInfo.phoneLogo?.file) {
      gameInfoError.phoneLogo = 'Portrait Cover Image is required';
      error = true;
    } else {
      gameInfoError.phoneLogo = '';
    }

    // Game Banner
    errorMessages.current.gameBannerError = gameBanner.map(banner => {
      const obj = {};
      if (!banner.cover && !banner.type) {
        error = true;
        obj.cover = 'Cover Image/Video is required';
      } else if (
        banner.type === 'Video' &&
        !(
          banner.cover?.includes('.mp4') ||
          banner.cover?.includes('.webm') ||
          banner.cover?.includes('.ogg') ||
          banner.cover?.includes('.mkv') ||
          banner.cover?.includes('.avi') ||
          banner.cover?.includes('.flv') ||
          banner.cover?.includes('.wmv') ||
          banner.cover?.includes('.mov') ||
          banner.cover?.includes('.m4v')
        )
      ) {
        obj.cover = "Only video file's URL is allowed";
        error = true;
      } else if (banner.type === 'Image') {
        obj.cover = 'Image file is required';
        error = true;
      } else obj.cover = '';
      if (!banner.thumb) {
        error = true;
        obj.thumb = 'Thumbnail is required';
      } else {
        obj.thumb = '';
      }
      return obj;
    });

    // Game Tags
    if (Object.keys(gameTags.genre).length === 0) {
      gameTagsError.genre = 'Genre is required';
      error = true;
    } else {
      gameTagsError.genre = '';
    }
    if (Object.keys(gameTags.features).length === 0) {
      gameTagsError.features = 'Features is required';
      error = true;
    } else {
      gameTagsError.features = '';
    }
    if (!gameInfo.releaseDate.day || !gameInfo.releaseDate.month || !gameInfo.releaseDate.year) {
      gameTagsError.releaseDate = 'Release Date is required';
      error = true;
    }
    if (!gameInfo.price) {
      gameInfo.price = 0;
    }

    // Game Descriptions
    if (!gameDescriptions.sortDesc) {
      gameDescriptionsError.sortDesc = 'Short Description is required';
      error = true;
    }
    errorMessages.current.gameDescriptionsError.descriptions = gameDescriptions.descriptions.map(
      desc => {
        const obj = {};
        console.log(desc);
        if (desc.mainHeader === '') {
          obj.mainHeader = 'Main Header is required';
          error = true;
        } else {
          obj.mainHeader = '';
        }
        if (desc.subHeader === '') {
          obj.subHeader = 'Sub Header is required';
          error = true;
        } else {
          obj.subHeader = '';
        }
        if (desc.description === '') {
          obj.description = 'Description is required';
          error = true;
        } else {
          obj.description = '';
        }
        return obj;
      }
    );

    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkValidation()) {
      setErrorChange(prev => ++prev);
      console.log('data', gameData.current);
      // console.log('error', errorMessages.current);
    }
  };

  return (
    <div className={styles.addGame}>
      <h1 className={styles.header}>Add New Game to the collection</h1>
      <form>
        <AddGameDetails
          gameInfo={gameInfo}
          errorMessages={gameInfoError}
          errorChange={errorChange}
        />
        <AddGameBanner
          gameBanner={gameBanner}
          errorMessages={gameBannerError}
          errorChange={errorChange}
        />
        <AddGameTags
          gameTags={gameTags}
          gameInfo={gameInfo}
          errorMessages={gameTagsError}
          errorChange={errorChange}
        />
        <AddGameDescriptions
          gameDescriptions={gameDescriptions}
          errorChange={errorChange}
          errorMessages={gameDescriptionsError}
        />
        <AddGameSpecifications
          gameSpecifications={gameSpecifications}
          errorMessages={gameSpecificationsError}
          errorChange={errorChange}
        />
        <ButtonForAddGameSection text="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
