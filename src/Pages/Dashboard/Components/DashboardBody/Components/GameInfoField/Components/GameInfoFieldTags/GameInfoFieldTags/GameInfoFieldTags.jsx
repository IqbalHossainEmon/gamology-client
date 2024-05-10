import OptionsContainer from '../Components/OptionsContainer/OptionsContainer';
import PriceReleaseDate from '../Components/PriceReleaseDate/PriceReleaseDate/PriceReleaseDate';
import styles from './GameInfoFieldTags.module.css';

const options = [
    {
        id: 0,
        category: 'Genre',
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
    {
        id: 1,
        category: 'Features',
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
];

export default function GameInfoFieldTags({ gameTags, gameInfo, errorChange, errorMessages, hasDefault, defaultGameTags }) {
    return (
        <section className={styles.addGameTags}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&apos;s tags</h3>
            <div className={styles.optionsContainer}>
                {options.map(option => (
                    <div key={option.id} className={styles.options}>
                        <OptionsContainer
                            initialState={{
                                action: false,
                                adventure: true,
                                racing: false,
                                shooter: false,
                                rolePlaying: false,
                                sports: false,
                                strategy: false,
                                simulation: false,
                            }}
                            options={option.optionList}
                            title={option.category}
                            gameTags={gameTags}
                            errorMessage={errorMessages.genre}
                            errorChange={errorChange}
                        />
                        {console.log(option.optionList)}
                    </div>
                ))}
            </div>
            <PriceReleaseDate gameInfo={gameInfo} errorMessage={errorMessages.releaseDate} errorChange={errorChange} />
        </section>
    );
}
