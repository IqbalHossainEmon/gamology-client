import TextField from '../../../../../Shared/TextField/TextField';
import AddGameSpecification from '../Components/AddGameSpecification/AddGameSpecification';
import AddGameSpecificationLanguagesSupported from '../Components/AddGameSpecificationLanguagesSupported/AddGameSpecificationLanguagesSupported';
import styles from './AddGameSpecifications.module.css';

const specs = ['Windows', 'MacOs', 'Linux'];

export default function AddGameSpecifications({ gameSpecifications, errorMessages, errorChange }) {
  const handleValue = (value, name) => {
    gameSpecifications[name] = value;
  };

  return (
    <div className={styles.addGameSpecifications}>
      <h3 className={styles.header}>Add Game&#39;s System Requirement</h3>
      <div className={styles.specsContainer}>
        {specs.map((spec, i) => (
          <div key={spec} className={styles.specs}>
            <AddGameSpecification
              gameSpecifications={gameSpecifications}
              state={{ name: spec }}
              index={i}
            />
          </div>
        ))}
      </div>
      <div>
        <AddGameSpecificationLanguagesSupported
          handleValue={handleValue}
          errorMessages={errorMessages}
          errorChange={errorChange}
          gameSpecifications={gameSpecifications}
        />
        <div className={styles.textField}>
          <TextField
            setState={handleValue}
            name="copyWrite"
            field="input"
            htmlFor="copyright"
            placeholder="Copyright"
            errorChange={errorChange}
            errorMessage={errorMessages.copyWrite}
          />
        </div>
        <div className={styles.textField}>
          <TextField
            setState={handleValue}
            name="policy"
            field="input"
            htmlFor="privacy"
            placeholder="Privacy Policy Link"
            errorChange={errorChange}
            errorMessage={errorMessages.policy}
          />
        </div>
      </div>
    </div>
  );
}
