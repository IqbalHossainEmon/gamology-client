import { useRef, useState } from 'react';
import FileUploadButton from '../../../../../Shared/FileUploadButton/FileUploadButton';
import SelectionField from '../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../Shared/TextField/TextField';
import styles from './TextFieldContainer.module.css';

export default function TextFieldContainer({ number, gameData }) {
  const [type, setType] = useState('');

  const typeRef = useRef(type);
  typeRef.current = type;

  const handleSetValues = (value, name) => {
    gameData.current.gameBanner[number] = { ...gameData.current.gameBanner[number], [name]: value };
    console.log(value, name);
    console.log(gameData.current.gameBanner[number]);
  };

  return (
    <div className={styles.textFieldContainer}>
      {type.type === 'Image' ? (
        <FileUploadButton
          {...(type || { disabled: true })}
          className={styles.marginBot}
          field="input"
          accept="image/*"
          setState={handleSetValues}
          placeholder="Choose Game's Banner Image"
          name="cover"
        />
      ) : (
        <TextField
          {...(!type && { disabled: true })}
          className={styles.marginBot}
          field="input"
          htmlFor={number}
          setState={handleSetValues}
          placeholder={type ? "Add Game's Banner Video's Link" : 'Select Content Type First'}
          name="cover"
        />
      )}
      <FileUploadButton
        {...(type || { disabled: true })}
        className={styles.marginBot}
        field="input"
        accept={type.type === 'Image' ? 'image/*' : 'video/*'}
        setState={handleSetValues}
        placeholder={
          type.type ? `Choose Game's Banner ${type.type}'s thumbnail` : 'Select Content Type First'
        }
        name="thumb"
      />
      <div className={styles.selectContainer}>
        <SelectionField
          setState={(value, name) => {
            setType({ [name]: value });
            handleSetValues(value, name);
          }}
          list={['Image', 'Video']}
          htmlFor={number}
          placeholder="Content Type"
          name="type"
        />
      </div>
    </div>
  );
}
