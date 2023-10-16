import TextField from '../../../../../Shared/TextField/TextField';
import AddGameSpecification from '../Components/AddGameSpecification/AddGameSpecification';
import styles from './AddGameSpecifications.module.css';

export default function AddGameSpecifications({ gameData }) {
  return (
    <div className={styles.addGameSpecifications}>
      <h3 className={styles.header}>Add Game&#39;s System Requirement</h3>
      <div className={styles.specsContainer}>
        <div className={styles.specs}>
          <AddGameSpecification gameData={gameData} state={{ name: 'Windows' }} />
        </div>
        <div className={styles.specs}>
          <AddGameSpecification gameData={gameData} state={{ name: 'MacOs' }} />
        </div>
        <div className={styles.specs}>
          <AddGameSpecification gameData={gameData} state={{ name: 'Linux' }} />
        </div>
      </div>
      <div>
        <div className={styles.textField}>
          <TextField field="textarea" htmlFor="lang_support" placeholder="Languages Supported" />
        </div>
      </div>
    </div>
  );
}
