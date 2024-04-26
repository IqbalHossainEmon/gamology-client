import { useRef, useState } from 'react';
import GameInfoField from '../../../../GameInfoField/GameInfoField/GameInfoField';
import styles from './EditGame.module.css';

const EditGame = () => {
    const [AddGameDetails, setAddGameDetails] = useState({});

    const gameData = useRef({
        gameInfo: {
            name: 'Spider-man',
            developer: 'PlayStation',
            publisher: 'Sony',
            logo: {},
            phoneLogo: {},
            releaseDate: { day: '12', month: '4', year: '2002' },
        },
        gameBanner: [{ cover: '', thumb: '', type: '' }],
        gameDescriptions: {
            descriptions: [
                {
                    mainHeader: 'Lorem, ipsum dolor sit amet consectetur adipisicing.',
                    subHeader: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse?',
                    description:
                        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates esse doloribus, aliquam, asperiores magnam in eius voluptatum possimus, maxime quis sunt recusandae. Eum harum maxime voluptatibus, ut ab architecto error!',
                },
            ],
        },
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
    return (
        <div className={styles.editGames}>
            <GameInfoField defaultData={gameData.current} hasDefault />
        </div>
    );
};
export default EditGame;
