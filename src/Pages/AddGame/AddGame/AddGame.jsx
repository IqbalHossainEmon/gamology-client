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
    gameSpecifications: {
      spec: [
        {
          for: 'Windows',
          systemReq: [
            [
              { key: '', value: '' },
              { key: '', value: '' },
            ],
          ],
          isActive: false,
        },
        {
          for: 'MacOs',
          systemReq: [
            [
              { key: '', value: '' },
              { key: '', value: '' },
            ],
          ],
          isActive: false,
        },
        {
          for: 'Linux',
          systemReq: [
            [
              { key: '', value: '' },
              { key: '', value: '' },
            ],
          ],
          isActive: false,
        },
      ],
      others: { key: '', value: '' },
      copyWrite: '',
      policy: '',
    },
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
    gameTagsError: {},
    gameDescriptionsError: { descriptions: [] },
    gameSpecificationsError: { spec: [{}, {}, {}], others: [] },
  });

  const { gameInfo, gameBanner, gameDescriptions, gameSpecifications, gameTags } = gameData.current;

  const { gameInfoError, gameBannerError, gameDescriptionsError, gameSpecificationsError, gameTagsError } = errorMessages.current;

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
    } else {
      gameDescriptionsError.sortDesc = '';
    }
    errorMessages.current.gameDescriptionsError.descriptions = gameDescriptions.descriptions.map(desc => {
      const obj = {};
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
    });

    // Game Specifications
    if (!gameSpecifications.spec[0].isActive && !gameSpecifications.spec[1].isActive && !gameSpecifications.spec[2].isActive) {
      gameSpecificationsError.spec[3] = 'At least One System Requirements is required';
      error = true;
    } else {
      if (gameSpecificationsError.spec[3]) gameSpecificationsError.spec.pop();
      const specLength = gameSpecifications.spec.length;
      for (let i = 0; i < specLength; i++) {
        const spec = gameSpecifications.spec[i];
        if (spec.isActive) {
          const { systemReq } = spec;
          const systemReqLength = systemReq.length;
          const recommended = [];
          const minimum = [];
          for (let j = 0; j < systemReqLength; j++) {
            recommended.push(systemReq[j][0].key);
            minimum.push(systemReq[j][1].key);
          }
          const systemReqMustArr = ['CPU', 'Memory', 'GPU', 'Storage'];
          const checkRec = systemReqMustArr.filter(la => !recommended.includes(la));
          const checkMin = systemReqMustArr.filter(la => !minimum.includes(la));

          const setValueFunc = (checkArr, setLoc) => {
            let result = '';
            const { length } = checkArr;
            if (length > 2) {
              const lastItem = checkArr.pop();
              const joined = checkArr.join(', ');
              result = `${joined}, and ${lastItem}`;
            } else {
              result = checkArr.join(' and ');
            }
            gameSpecificationsError.spec[i][setLoc] = `${result} ${length > 1 ? 'are' : 'is'} must be filled`;
          };

          if (checkRec.length) {
            setValueFunc(checkRec, 'rec');
          }
          if (checkMin.length) {
            setValueFunc(checkMin, 'min');
          }
        }
      }
    }

    const systemReqArr = ['CPU', 'Memory', 'GPU', 'Storage', 'OS', 'DirectX', 'Resolution', 'Preset / Target', 'Peripherals', 'Others'];
    if (Array.isArray(gameSpecifications.others.value)) {
      if (!gameSpecifications.others.value[0]) {
        gameSpecificationsError.others[0] = 'Text Language Supported is required';
      } else {
        gameSpecificationsError.others[0] = '';
      }
      if (!gameSpecifications.others.value[1]) {
        gameSpecificationsError.others[1] = 'Audio Language Supported is required';
      } else {
        gameSpecificationsError.others[1] = '';
      }
    } else if (!gameSpecifications.others.value) {
      gameSpecificationsError.others[0] = 'Language Support is required';
    } else {
      gameSpecificationsError.others[0] = '';
    }
    if (!gameSpecifications.copyWrite) {
      gameSpecificationsError.copyWrite = 'CopyWrite is required';
      error = true;
    } else {
      gameSpecificationsError.copyWrite = '';
    }
    if (!gameSpecifications.policy) {
      gameSpecificationsError.policy = 'Policy is required';
      error = true;
    } else {
      gameSpecificationsError.policy = '';
    }

    return error;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (checkValidation()) {
      setErrorChange(prev => ++prev);
      console.log(gameSpecifications);
      console.log(gameSpecificationsError);
      // console.log('error', errorMessages.current);
    }
  };

  return (
    <div className={styles.addGame}>
      <h1 className={styles.header}>Add New Game to the collection</h1>
      <form>
        <AddGameDetails gameInfo={gameInfo} errorMessages={gameInfoError} errorChange={errorChange} />
        <AddGameBanner gameBanner={gameBanner} errorMessages={gameBannerError} errorChange={errorChange} />
        <AddGameTags gameTags={gameTags} gameInfo={gameInfo} errorMessages={gameTagsError} errorChange={errorChange} />
        <AddGameDescriptions gameDescriptions={gameDescriptions} errorChange={errorChange} errorMessages={gameDescriptionsError} />
        <AddGameSpecifications gameSpecifications={gameSpecifications} errorMessages={gameSpecificationsError} errorChange={errorChange} />
        <ButtonForAddGameSection text="Submit" onClick={handleSubmit} />
      </form>
    </div>
  );
}
