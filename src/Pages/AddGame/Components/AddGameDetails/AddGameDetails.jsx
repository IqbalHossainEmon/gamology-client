import TextField from '../../../../Shared/TextField/TextField';
import styles from './AddGameDetails.module.css';

export default function AddGameDetails() {
  return (
    <section className={styles.gameDetails}>
      <h3>Add Game&apos;s Details</h3>
      <div>
        <div className={styles.textFieldContainer}>
          <TextField
            className={styles.field}
            field="input"
            placeholder="Game's Name"
          />
          <TextField
            className={styles.field}
            field="input"
            placeholder="Release Date"
          />
        </div>
        <div className={styles.textFieldContainer}>
          <TextField
            className={styles.field}
            field="input"
            placeholder="Developer"
          />
          <TextField
            className={styles.field}
            field="input"
            placeholder="Publisher"
          />
        </div>
        <div className={styles.textFieldContainer}>
          <TextField
            className={styles.field}
            field="input"
            placeholder="Portrait Cover image’s Link"
          />
          <TextField
            className={styles.field}
            field="input"
            placeholder="Landscape Cover image’s link"
          />
        </div>
      </div>
    </section>
  );
}
