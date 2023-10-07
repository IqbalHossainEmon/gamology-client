import SelectionField from '../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../Shared/TextField/TextField';
import AddMoreButton from '../AddMoreButton/AddMoreButton';
import styles from './AddGameBanner.module.css';

export default function AddGameBanner() {
  return (
    <div className={styles.gddGameBanner}>
      <h3>Add Game&#39;s Banner Images or Videos</h3>
      <div className={styles.textFieldContainer}>
        <TextField
          className={styles.field}
          field="input"
          placeholder="Add Game's Banner Images or Videos"
        />
        <div className={styles.selectContainer}>
          <SelectionField list={['Image', 'Video']} />
        </div>
      </div>
      <AddMoreButton />
    </div>
  );
}
