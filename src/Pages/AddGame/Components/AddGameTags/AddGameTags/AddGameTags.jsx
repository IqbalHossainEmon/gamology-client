import OptionsContainer from '../Components/OptionsContainer/OptionsContainer';
import PriceReleaseDate from '../Components/PriceReleaseDate/PriceReleaseDate';
import styles from './AddGameTags.module.css';

const options = [
  [
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
  [
    { id: 0, text: 'Action', filter: 'action' },
    { id: 1, text: 'Adventure', filter: 'adventure' },
    { id: 2, text: 'Racing', filter: 'racing' },
    { id: 3, text: 'Shooter', filter: 'shooter' },
    { id: 4, text: 'Role-playing', filter: 'rolePlaying' },
    { id: 5, text: 'Sports', filter: 'sports' },
    { id: 6, text: 'Strategy', filter: 'strategy' },
    { id: 7, text: 'Simulation', filter: 'simulation' },
  ],
];

export default function AddGameTags({ gameData }) {
  return (
    <section className={styles.addGameTags}>
      <h3 className={styles.header}>Add Game&apos;s tags</h3>
      <div className={styles.optionsContainer}>
        <div className={styles.options}>
          <OptionsContainer
            initialState={{
              Action: false,
              Adventure: false,
              Racing: false,
              Shooter: false,
              Role: false,
              Sports: false,
              Strategy: false,
              Simulation: false,
            }}
            options={options[1]}
            title="Genres"
            gameData={gameData}
          />
        </div>
        <div className={styles.options}>
          <OptionsContainer
            initialState={{
              SinglePlayer: true,
              MultiPlayer: true,
              CoOp: true,
              Achievements: true,
              LeaderBoards: true,
              ControllerSupport: true,
              CloudSaves: true,
              Overlay: true,
            }}
            options={options[0]}
            title="Features"
            gameData={gameData}
          />
        </div>
      </div>
      <div>
        <PriceReleaseDate />
      </div>
    </section>
  );
}
