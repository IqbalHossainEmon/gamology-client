import { useEffect, useRef, useState } from 'react';
import GameInfoField from '../../../../GameInfoField/GameInfoField/GameInfoField';
import styles from './EditGame.module.css';

const data = {
    gameInfo: {
        name: 'Spiderman - Miles Morales',
        developer: 'Playstation',
        publisher: 'Sony',
        logo: '/assets/images/CarouselInfo/spiderman-logo.png',
        phoneLogo: '/assets/images/spiderman-logo-cover.avif',
        releaseDate: {
            day: 3,
            month: 2,
            year: 2012,
        },
        price: '0.69',
    },
    gameBanner: [
        {
            id: 0,
            type: 'video',
            cover: `/assets/images/IndiGameBanner/spider-carousel-v-1.mp4`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-1.avif`,
        },
        {
            id: 1,
            type: 'video',
            cover: `/assets/images/IndiGameBanner/spider-carousel-v-2.mp4`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-2.avif`,
        },
        {
            id: 2,
            type: 'video',
            cover: `/assets/images/IndiGameBanner/spider-carousel-v-3.mp4`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-3.avif`,
        },
        {
            id: 3,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-1.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-4.avif`,
        },
        {
            id: 4,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-2.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-5.avif`,
        },
        {
            id: 5,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-3.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-6.avif`,
        },
        {
            id: 6,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-4.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-7.avif`,
        },
        {
            id: 8,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-6.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-9.avif`,
        },
        {
            id: 7,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-5.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-8.avif`,
        },
        {
            id: 9,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-7.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-10.avif`,
        },
        {
            id: 10,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-8.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-11.avif`,
        },
        {
            id: 11,
            type: 'image',
            cover: `/assets/images/IndiGameBanner/spider-carousel-9.jpg`,
            thumb: `/assets/images/IndiGameBannerCards/spiderman-carousel-card-12.avif`,
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
        shortDesc:
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
            {
                for: 'Linux',
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
        Genre: {
            action: true,
            adventure: true,
            rolePlaying: true,
        },
        Features: {
            singlePlayer: true,
        },
    },
};

const EditGame = () => {
    const [AddGameDetails, setAddGameDetails] = useState({});

    const mainDefaultData = useRef(data);

    useEffect(() => {
        setTimeout(() => {
            const defaultData = JSON.parse(JSON.stringify(data));

            defaultData.gameSpecifications.spec.forEach((spec, index) => {
                defaultData.gameSpecifications.spec[index].isActive = true;
            });
            setAddGameDetails(defaultData);
        }, 10);
    }, []);

    const handleSubmit = newData => {
        console.log(newData);
        if (JSON.stringify(mainDefaultData.current) !== JSON.stringify(newData)) {
            console.log(newData);
            return { errorMessage: '', error: false };
        }
        return { errorMessage: 'No changes made.', error: true };
    };

    return (
        <div className={styles.editGames}>
            <GameInfoField defaultData={AddGameDetails} hasDefault handleGameInfo={handleSubmit} />
        </div>
    );
};
export default EditGame;
