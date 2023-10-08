import OptionsContainer from '../Components/OptionsContainer/OptionsContainer';
import PriceReleaseDate from '../Components/PriceReleaseDate/PriceReleaseDate';
import styles from './AddGamesDetailsInfo.module.css';

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

export default function AddGamesDetailsInfo() {
  return (
    <section className={styles.addGamesDetailsInfo}>
      <h3>Add New Game to the collection</h3>
      <div className={styles.optionsContainer}>
        <div className={styles.options}>
          <OptionsContainer options={options[1]} title="Genres" />
        </div>
        <div className={styles.options}>
          <OptionsContainer options={options[0]} title="Features" />
        </div>
      </div>
      <div>
        <PriceReleaseDate />
      </div>
    </section>
  );
}
