import { useRef, useState } from 'react';
import GameInfoField from '../../../../GameInfoField/GameInfoField/GameInfoField';
import styles from './EditGame.module.css';

const EditGame = () => {
    const [AddGameDetails, setAddGameDetails] = useState({});

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
    return (
        <div className={styles.editGames}>
            <GameInfoField defaultData={gameData.current} hasDefault />
        </div>
    );
};
export default EditGame;
