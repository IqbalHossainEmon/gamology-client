import TextField from '../../../../../Shared/TextField/TextField';
import AddGameSpecification from '../Components/AddGameSpecification/AddGameSpecification';
import AddGameSpecificationLanguagesSupported from '../Components/AddGameSpecificationLanguagesSupported/AddGameSpecificationLanguagesSupported';
import styles from './AddGameSpecifications.module.css';

export default function AddGameSpecifications({ gameData }) {
  const handleValue = (value, name) => {
    gameData.current.gameSpecifications[name] = value;
  };

  return (
    <div className={styles.addGameSpecifications}>
      <h3 className={styles.header}>Add Game&#39;s System Requirement</h3>
      <div className={styles.specsContainer}>
        <div className={styles.specs}>
          <AddGameSpecification index={0} gameData={gameData} state={{ name: 'Windows' }} />
        </div>
        <div className={styles.specs}>
          <AddGameSpecification index={1} gameData={gameData} state={{ name: 'MacOs' }} />
        </div>
        <div className={styles.specs}>
          <AddGameSpecification index={2} gameData={gameData} state={{ name: 'Linux' }} />
        </div>
      </div>
      <div>
        <AddGameSpecificationLanguagesSupported handleValue={handleValue} />
        <div className={styles.textField}>
          <TextField
            setState={handleValue}
            name="copyWrite"
            field="input"
            htmlFor="copyright"
            placeholder="Copyright"
          />
        </div>
        <div className={styles.textField}>
          <TextField
            setState={handleValue}
            name="policy"
            field="input"
            htmlFor="privacy"
            placeholder="Privacy Policy Link"
          />
        </div>
      </div>
    </div>
  );
}
