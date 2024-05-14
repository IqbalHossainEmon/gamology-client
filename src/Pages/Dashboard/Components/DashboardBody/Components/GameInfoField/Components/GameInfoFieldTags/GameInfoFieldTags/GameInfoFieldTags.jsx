import { useEffect, useState } from 'react';
import OptionsContainer from '../Components/OptionsContainer/OptionsContainer';
import PriceReleaseDate from '../Components/PriceReleaseDate/PriceReleaseDate/PriceReleaseDate';
import styles from './GameInfoFieldTags.module.css';

const data = [
    {
        id: 0,
        category: 'Genre',
        optionList: [
            { id: 0, text: 'Action', filter: 'action' },
            { id: 1, text: 'Adventure', filter: 'adventure' },
            { id: 2, text: 'Racing', filter: 'racing' },
            { id: 3, text: 'Shooter', filter: 'shooter' },
            { id: 4, text: 'Role-playing', filter: 'rolePlaying' },
            { id: 5, text: 'Sports', filter: 'sports' },
            { id: 6, text: 'Strategy', filter: 'strategy' },
            { id: 7, text: 'Simulation', filter: 'simulation' },
        ],
    },
    {
        id: 1,
        category: 'Features',
        optionList: [
            { id: 0, text: 'Single-player', filter: 'singlePlayer' },
            { id: 1, text: 'Multi-player', filter: 'multiPlayer' },
            { id: 2, text: 'Co-op', filter: 'coOp' },
            { id: 3, text: 'Achievements', filter: 'achievements' },
            { id: 4, text: 'Leader Boards', filter: 'leaderBoards' },
            {
                id: 5,
                text: 'Controller support',
                filter: 'controllerSupport',
            },
            { id: 6, text: 'Cloud saves', filter: 'cloudSaves' },
            { id: 7, text: 'Overlay', filter: 'overlay' },
        ],
    },
];

export default function GameInfoFieldTags({
    gameData,
    errorChange,
    errorMessages,
    hasDefault,
    defaultGameTags,
    defaultReleaseDate,
    defaultPrice,
}) {
    const [options, setOptions] = useState([]);

    useEffect(() => {
        setOptions(data);
    }, []);

    const getInitialState = (list, category) => {
        const initialState = {};
        list.forEach(option => {
            if (hasDefault && Object.prototype.hasOwnProperty.call(defaultGameTags[category], option.filter))
                initialState[option.filter] = true;
            else initialState[option.filter] = false;
        });
        return initialState;
    };
    return (
        <section className={styles.addGameTags}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&apos;s tags</h3>
            <div className={styles.optionsContainer}>
                {options.map(option => (
                    <div key={option.id} className={styles.options}>
                        <OptionsContainer
                            initialState={getInitialState(option.optionList, option.category)}
                            options={option.optionList}
                            title={option.category}
                            gameTags={gameData}
                            errorMessage={errorMessages.current.gameTagsError[option.category]}
                            errorChange={errorChange}
                        />
                    </div>
                ))}
            </div>
            <PriceReleaseDate
                gameInfo={gameData}
                errorMessage={errorMessages.current.gameTagsError.releaseDate}
                errorChange={errorChange}
                defaultReleaseDate={defaultReleaseDate}
                hasDefault={hasDefault}
                defaultPrice={defaultPrice}
            />
        </section>
    );
}
