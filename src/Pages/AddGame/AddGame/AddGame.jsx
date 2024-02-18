import { useRef, useState } from 'react';
import AddGameBanner from '../Components/AddGameBanner/AddGameBanner/AddGameBanner';
import AddGameDescriptions from '../Components/AddGameDescriptions/AddGameDescriptions/AddGameDescriptions';
import AddGameDetails from '../Components/AddGameDetails/AddGameDetails';
import AddGameSpecifications from '../Components/AddGameSpecifications/AddGameSpecifications/AddGameSpecifications';
import AddGameTags from '../Components/AddGameTags/AddGameTags/AddGameTags';
import ButtonForAddGameSection from '../Components/ButtonForAddGameSection/ButtonForAddGameSection';
import useAddGameLogics from '../useAddGameLogics/useAddGameLogics';
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
    gameSpecificationsError: {
      spec: [{}, {}, {}],
      others: [],
    },
  });

  const { gameInfo, gameBanner, gameTags, gameDescriptions, gameSpecifications } = gameData.current;
  const { gameInfoError, gameBannerError, gameTagsError, gameDescriptionsError, gameSpecificationsError } = errorMessages.current;

  const { checkValidation, handleUnnecessaryRemove } = useAddGameLogics({ gameData, errorMessages });

  const handleSubmit = e => {
    e.preventDefault();
    if (checkValidation()) {
      setErrorChange(prev => ++prev);
      return;
    }
    console.log(gameData.current);
    handleUnnecessaryRemove();
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
