import { useRef, useState } from 'react';
import FileUploadButton from '../../../../../Shared/FileUploadButton/FileUploadButton';
import SelectionField from '../../../../../Shared/SelectionField/SelectionField';
import TextField from '../../../../../Shared/TextField/TextField';
import styles from './TextFieldContainer.module.css';

export default function TextFieldContainer({ number, gameData, errorChange, errorMessages }) {
  const [type, setType] = useState('');

  const typeRef = useRef(type);
  typeRef.current = type;

  const handleSetValues = (value, name) => {
    gameData.current.gameBanner[number][name] = value;
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
          errorChange={errorChange}
          errorMessage={errorMessages.current.gameBanner[number]?.cover}
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
          errorChange={errorChange}
          errorMessage={errorMessages.current.gameBanner[number]?.cover}
        />
      )}
      <FileUploadButton
        {...(type || { disabled: true })}
        field="input"
        accept="image/*"
        setState={handleSetValues}
        placeholder={
          type.type ? `Choose Game's Banner ${type.type}'s thumbnail` : 'Select Content Type First'
        }
        name="thumb"
        errorChange={errorChange}
        errorMessage={errorMessages.current.gameBanner[number]?.thumb}
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
