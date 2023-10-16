import SelectionField from '../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../Shared/TextField/TextField';
import styles from './TextFieldContainer.module.css';

export default function TextFieldContainer({ number, gameData }) {
  const handleSetValues = (value, name) => {
    gameData.current.gameBanner[number] = { [name]: value };
  };

  return (
    <div className={styles.textFieldContainer}>
      <TextField
        className={styles.field}
        field="input"
        setState={handleSetValues}
        placeholder="Add Game's Banner Image or Video's cover"
        name="cover"
      />
      <TextField
        className={styles.thumbField}
        field="input"
        setState={handleSetValues}
        placeholder="Add Game's Banner Image or Video's thumb"
        name="thumb"
      />
      <div className={styles.selectContainer}>
        <SelectionField
          setState={handleSetValues}
          list={['Image', 'Video']}
          htmlFor={number}
          name="type"
        />
      </div>
    </div>
  );
}
