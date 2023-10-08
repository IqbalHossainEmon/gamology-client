import SelectionField from '../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../Shared/TextField/TextField';
import styles from './TextFieldContainer.module.css';

export default function TextFieldContainer({ number }) {
  return (
    <div className={styles.textFieldContainer}>
      <TextField
        className={styles.field}
        field="input"
        placeholder="Add Game's Banner Images or Videos"
      />
      <div className={styles.selectContainer}>
        <SelectionField list={['Image', 'Video']} htmlFor={number} />
      </div>
    </div>
  );
}
