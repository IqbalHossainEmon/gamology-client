import { useRef, useState } from 'react';
import styles from './EditGame.module.css';

const EditGame = () => {
    const [AddGameDetails, setAddGameDetails] = useState({});

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
    return (
        <div className={styles.editGames}>
            <p>Edit Games</p>
        </div>
    );
};
export default EditGame;
