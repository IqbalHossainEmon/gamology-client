import { useEffect, useRef, useState } from 'react';
import ButtonForGameInfoFieldSection from '../Components/ButtonForGameInfoFieldSection/ButtonForGameInfoFieldSection';
import GameInfoFieldBanner from '../Components/GameInfoFieldBanner/GameInfoFieldBanner/GameInfoFieldBanner';
import GameInfoFieldDescriptions from '../Components/GameInfoFieldDescriptions/GameInfoFieldDescriptions/GameInfoFieldDescriptions';
import GameInfoFieldDetails from '../Components/GameInfoFieldDetails/GameInfoFieldDetails';
import GameInfoFieldSpecifications from '../Components/GameInfoFieldSpecifications/GameInfoFieldSpecifications/GameInfoFieldSpecifications';
import GameInfoFieldTags from '../Components/GameInfoFieldTags/GameInfoFieldTags/GameInfoFieldTags';
import OuterErrorMessage from '../Components/OuterErrorMessage/OuterErrorMessage';
import useGameInfoFieldLogics from '../useGameInfoFieldLogics/useGameInfoFieldLogics';
import styles from './GameInfoField.module.css';

export default function GameInfoField({ handleGameInfo, hasDefault, defaultData = {} }) {
    const [loading, setLoading] = useState(true);

    const gameData = useRef({
        gameInfo: {
            name: '',
            developer: '',
            publisher: '',
            logo: {},
            phoneLogo: {},
            releaseDate: { day: '', month: '', year: '' },
            price: '0.00',
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
        gameTags: {},
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
        outerErrorMessage: '',
    });

    const { checkValidation, handleUnnecessaryRemove } = useGameInfoFieldLogics({ gameData, errorMessages });

    const handleSubmit = e => {
        e.preventDefault();

        if (checkValidation()) {
            setErrorChange(prev => ++prev);
            return;
        }
        const cleanData = handleUnnecessaryRemove();
        const errorMessage = handleGameInfo(cleanData);
        errorMessages.current.outerErrorMessage = errorMessage;
        setErrorChange(prev => ++prev);
    };

    useEffect(() => {
        const categories = ['Genre', 'Features'];
        if (hasDefault && Object.keys(defaultData).length) {
            const defaultGameData = JSON.parse(JSON.stringify(defaultData));
            const specList = defaultGameData.gameSpecifications.spec.map(spec => spec.for);
            const defSpec = {
                systemReq: [
                    [
                        { key: '', value: '' },
                        { key: '', value: '' },
                    ],
                ],
                isActive: false,
            };
            ['Windows', 'MacOs', 'Linux'].forEach((spec, index) => {
                if (!specList.includes(spec)) {
                    const newSpec = JSON.parse(JSON.stringify(defSpec));
                    newSpec.for = spec;
                    switch (index) {
                        case 0:
                            defaultGameData.gameSpecifications.spec.unshift(newSpec);
                            break;
                        case 1:
                            defaultGameData.gameSpecifications.spec.splice(1, 0, newSpec);
                            break;
                        default:
                            defaultGameData.gameSpecifications.spec.push(newSpec);
                    }
                }
            });
            gameData.current = defaultGameData;
            // fetch game categories
            gameData.current.gameTags = categories.reduce((acc, category) => {
                const obj = {};

                const defaultCategory = hasDefault ? defaultData.gameTags[category] : {};
                if (hasDefault && Object.keys(defaultCategory).length) {
                    obj[category] = defaultCategory;
                } else {
                    obj[category] = {};
                }
                return { ...acc, ...obj };
            }, {});
        } else {
            gameData.current.gameTags = categories.reduce((acc, category) => {
                const obj = {};
                obj[category] = {};
                return { ...acc, ...obj };
            }, {});
        }

        if (
            hasDefault
                ? Object.keys(defaultData).length && Object.keys(gameData.current.gameTags).length
                : Object.keys(gameData.current.gameTags).length
        )
            setLoading(false);
    }, [defaultData, hasDefault]);

    return (
        <div className={styles.addGame}>
            <h1 className={styles.header}>{hasDefault ? 'Edit The Game' : 'Add New Game to the collection'}</h1>
            {loading ? (
                <h3>Loading...</h3>
            ) : (
                <form>
                    <GameInfoFieldDetails
                        gameInfo={gameData}
                        errorMessages={errorMessages}
                        errorChange={errorChange}
                        hasDefault={hasDefault}
                        {...(hasDefault && { defaultGameInfo: defaultData.gameInfo })}
                    />
                    <GameInfoFieldBanner
                        gameBanner={gameData}
                        errorMessages={errorMessages}
                        errorChange={errorChange}
                        hasDefault={hasDefault}
                        {...(hasDefault && { defaultGameBanner: defaultData.gameBanner })}
                    />
                    <GameInfoFieldTags
                        gameData={gameData}
                        errorMessages={errorMessages}
                        errorChange={errorChange}
                        hasDefault={hasDefault}
                        {...(hasDefault && { defaultGameTags: defaultData.gameTags })}
                        {...(hasDefault && { defaultReleaseDate: defaultData.gameInfo.releaseDate })}
                        {...(hasDefault && { defaultPrice: defaultData.gameInfo.price })}
                    />
                    <GameInfoFieldDescriptions
                        gameDescriptions={gameData}
                        errorChange={errorChange}
                        hasDefault={hasDefault}
                        errorMessages={errorMessages}
                        {...(hasDefault && { defaultGameDescriptions: defaultData.gameDescriptions })}
                    />
                    <GameInfoFieldSpecifications
                        gameSpecifications={gameData}
                        errorMessages={errorMessages}
                        errorChange={errorChange}
                        hasDefault={hasDefault}
                        {...(hasDefault && { defaultGameSpecifications: defaultData.gameSpecifications })}
                    />
                    <OuterErrorMessage errorChange={errorChange} errorMessage={errorMessages.current.outerErrorMessage} />
                    <ButtonForGameInfoFieldSection text="Submit" onClick={handleSubmit} />
                </form>
            )}
        </div>
    );
}
