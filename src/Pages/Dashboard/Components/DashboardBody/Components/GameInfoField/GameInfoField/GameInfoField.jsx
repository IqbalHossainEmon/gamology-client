import { useRef, useState } from 'react';
import ButtonForGameInfoFieldSection from '../Components/ButtonForGameInfoFieldSection/ButtonForGameInfoFieldSection';
import GameInfoFieldBanner from '../Components/GameInfoFieldBanner/GameInfoFieldBanner/GameInfoFieldBanner';
import GameInfoFieldDescriptions from '../Components/GameInfoFieldDescriptions/GameInfoFieldDescriptions/GameInfoFieldDescriptions';
import GameInfoFieldDetails from '../Components/GameInfoFieldDetails/GameInfoFieldDetails';
import GameInfoFieldSpecifications from '../Components/GameInfoFieldSpecifications/GameInfoFieldSpecifications/GameInfoFieldSpecifications';
import GameInfoFieldTags from '../Components/GameInfoFieldTags/GameInfoFieldTags/GameInfoFieldTags';
import OuterErrorMessage from '../Components/OuterErrorMessage/OuterErrorMessage';
import useGameInfoFieldLogics from '../useGameInfoFieldLogics/useGameInfoFieldLogics';
import styles from './GameInfoField.module.css';

export default function GameInfoField({ handleGameInfo, hasDefault, defaultData }) {
    const gameData = useRef({
        gameInfo: {
            name: 'Spiderman - Miles Morales',
            developer: 'Playstation',
            publisher: 'Sony',
            logo: {
                type: 'FormData',
                file: {},
            },
            phoneLogo: {
                type: 'FormData',
                file: {},
            },
            releaseDate: {
                day: 3,
                month: 2,
                year: 2012,
            },
            price: '0.00',
        },
        gameBanner: [
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
            {
                cover: {
                    type: 'FormData',
                    file: {},
                },
                thumb: {
                    type: 'FormData',
                    file: {},
                },
                type: 'Image',
            },
        ],
        gameDescriptions: {
            descriptions: [
                {
                    mainHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
                },
                {
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
                },
                {
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    mainHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
                },
                {
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    description:
                        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
                {
                    subHeader: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                },
            ],
            sortDesc:
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit accusantium consequuntur facilis qui harum, id ut sit repellendus animi ducimus, aspernatur unde. Eum optio maiores perspiciatis, sunt praesentium magni beatae vel incidunt delectus natus excepturi maxime debitis deserunt, modi ducimus quidem. Earum voluptate inventore aperiam fuga porro quidem laborum, consectetur rerum odio est culpa eaque laudantium. Ut quo delectus obcaecati. ',
        },
        gameSpecifications: {
            spec: [
                {
                    for: 'Windows',
                    systemReq: [
                        [
                            {
                                key: 'CPU',
                                value: 'dual Core',
                            },
                            {
                                key: 'CPU',
                                value: 'Ryzen 5 3600',
                            },
                        ],
                        [
                            {
                                key: 'Memory',
                                value: '8GB',
                            },
                            {
                                key: 'Memory',
                                value: '16GB',
                            },
                        ],
                        [
                            {
                                key: 'GPU',
                                value: 'GTX 1060',
                            },
                            {
                                key: 'GPU',
                                value: 'RTX 3060',
                            },
                        ],
                        [
                            {
                                key: 'Storage',
                                value: '100GB',
                            },
                            {
                                key: 'Storage',
                                value: '100GB SSD',
                            },
                        ],
                        [
                            {
                                key: 'VRM',
                                value: '4GB',
                            },
                            {
                                key: 'VRM',
                                value: '8GB',
                            },
                        ],
                        [
                            {
                                key: 'DirectX',
                                value: 'DirectX 11',
                            },
                            {
                                key: 'DirectX',
                                value: 'DirectX 12',
                            },
                        ],
                        [
                            {
                                key: 'Others',
                                value: 'sfasdf',
                            },
                            {
                                key: 'Peripherals',
                                value: 'WKWK',
                            },
                        ],
                    ],
                },
            ],
            others: {
                key: 'Language Supported',
                value: ['English, Bangla, French, Hindi', 'English, Bangla, French, Hindi'],
            },
            copyWrite:
                '© 2022 MARVEL © 2022 Sony Interactive Entertainment LLC Created and developed by Insomniac Games, Inc. PC version by Nixxes Software BV.',
            policy: 'https://www.playstation.com/country-selector/index.html',
        },
        gameTags: {
            genre: {
                action: true,
                adventure: true,
                rolePlaying: true,
            },
            features: {
                singlePlayer: true,
            },
        },
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
            <h1 className={styles.header}>{hasDefault ? 'Edit The Game' : 'Add New Game to the collection'}</h1>
            <form>
                <GameInfoFieldDetails gameInfo={gameInfo} errorMessages={gameInfoError} errorChange={errorChange} hasDefault={hasDefault} />
                <GameInfoFieldBanner
                    gameBanner={gameBanner}
                    errorMessages={gameBannerError}
                    errorChange={errorChange}
                    hasDefault={hasDefault}
                />
                <GameInfoFieldTags
                    gameTags={gameTags}
                    gameInfo={gameInfo}
                    errorMessages={gameTagsError}
                    errorChange={errorChange}
                    hasDefault={hasDefault}
                />
                <GameInfoFieldDescriptions
                    gameDescriptions={gameDescriptions}
                    errorChange={errorChange}
                    hasDefault={hasDefault}
                    errorMessages={gameDescriptionsError}
                />
                <GameInfoFieldSpecifications
                    gameSpecifications={gameSpecifications}
                    errorMessages={gameSpecificationsError}
                    errorChange={errorChange}
                    hasDefault={hasDefault}
                />
                <OuterErrorMessage errorChange={errorChange} isThereError={errorMessages.current.isThereError} />
                <ButtonForGameInfoFieldSection text="Submit" onClick={handleSubmit} />
            </form>
        </div>
    );
}
