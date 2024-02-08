import TextField from '../../../../../Shared/TextField/TextField';
import AddGameSpecification from '../Components/AddGameSpecification/AddGameSpecification';
import AddGameSpecificationLanguagesSupported from '../Components/AddGameSpecificationLanguagesSupported/AddGameSpecificationLanguagesSupported';
import styles from './AddGameSpecifications.module.css';

const specs = ['Windows', 'MacOs', 'Linux'];

export default function AddGameSpecifications({ gameSpecifications }) {
  const handleValue = (value, name) => {
    gameSpecifications[name] = value;
  };

  return (
    <div className={styles.addGameSpecifications}>
      <h3 className={styles.header}>Add Game&#39;s System Requirement</h3>
      <div className={styles.specsContainer}>
        {specs.map(spec => (
          <div key={spec} className={styles.specs}>
            <AddGameSpecification gameSpecifications={gameSpecifications} state={{ name: spec }} />
          </div>
        ))}
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
