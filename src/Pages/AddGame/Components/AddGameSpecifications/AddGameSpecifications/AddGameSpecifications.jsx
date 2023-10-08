import TextField from '../../../../../Shared/TextField/TextField';
import AddGameSpecification from '../AddGameSpecification/AddGameSpecification';
import styles from './AddGameSpecifications.module.css';

export default function AddGameSpecifications() {
  return (
    <div className={styles.addGameSpecifications}>
      <h3>Add Game&#39;s System Requirement</h3>
      <div className={styles.specsContainer}>
        <div className={styles.specs}>
          <AddGameSpecification state={{ name: 'Windows' }} />
        </div>
        <div className={styles.specs}>
          <AddGameSpecification state={{ name: 'MacOs' }} />
        </div>
        <div className={styles.specs}>
          <AddGameSpecification state={{ name: 'Linux' }} />
        </div>
      </div>
      <div>
        <div className={styles.textField}>
          <TextField
            field="textarea"
            empty={0}
            placeholder="Languages Supported"
          />
        </div>
      </div>
    </div>
  );
}
