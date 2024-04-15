import { useRef, useState } from 'react';

import ButtonForGameInfoFieldSection from '../Components/ButtonForGameInfoFieldSection/ButtonForGameInfoFieldSection';
import GameInfoFieldBanner from '../Components/GameInfoFieldBanner/GameInfoFieldBanner/GameInfoFieldBanner';
import GameInfoFieldDescriptions from '../Components/GameInfoFieldDescriptions/GameInfoFieldDescriptions/GameInfoFieldDescriptions';
import GameInfoFieldDetails from '../Components/GameInfoFieldDetails/GameInfoFieldDetails';
import GameInfoFieldSpecifications from '../Components/GameInfoFieldSpecifications/GameInfoFieldSpecifications/GameInfoFieldSpecifications';
import GameInfoFieldTags from '../Components/GameInfoFieldTags/GameInfoFieldTags/GameInfoFieldTags';
import OuterErrorMessage from '../Components/OutterErrorMessage/OuterErrorMessage';
import useGameInfoFieldLogics from '../useGameInfoFieldLogics/useGameInfoFieldLogics';
import styles from './GameInfoField.module.css';

export default function GameInfoField({ handleGameInfo, hasDefaultData, defaultData }) {
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
        isThereError: false,
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

    const { checkValidation, handleUnnecessaryRemove } = useGameInfoFieldLogics({ gameData, errorMessages });

    const handleSubmit = e => {
        e.preventDefault();
        if (checkValidation()) {
            setErrorChange(prev => ++prev);
            return;
        }
        handleUnnecessaryRemove();
        console.log(gameData.current);
    };

    return (
        <div className={styles.addGame}>
            <h1 className={styles.header}>Add New Game to the collection</h1>
            <form>
                <GameInfoFieldDetails gameInfo={gameInfo} errorMessages={gameInfoError} errorChange={errorChange} />
                <GameInfoFieldBanner gameBanner={gameBanner} errorMessages={gameBannerError} errorChange={errorChange} />
                <GameInfoFieldTags gameTags={gameTags} gameInfo={gameInfo} errorMessages={gameTagsError} errorChange={errorChange} />
                <GameInfoFieldDescriptions
                    gameDescriptions={gameDescriptions}
                    errorChange={errorChange}
                    errorMessages={gameDescriptionsError}
                />
                <GameInfoFieldSpecifications
                    gameSpecifications={gameSpecifications}
                    errorMessages={gameSpecificationsError}
                    errorChange={errorChange}
                />
                <OuterErrorMessage errorChange={errorChange} isThereError={errorMessages.current.isThereError} />
                <ButtonForGameInfoFieldSection text="Submit" onClick={handleSubmit} />
            </form>
        </div>
    );
}
