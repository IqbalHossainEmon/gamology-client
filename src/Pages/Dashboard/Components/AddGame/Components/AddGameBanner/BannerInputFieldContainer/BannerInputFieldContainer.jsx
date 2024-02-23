import { useRef, useState } from 'react';

import FileUploadButton from '../../../../../../../Shared/FileUploadButton/FileUploadButton';
import SelectionField from '../../../../../../../Shared/SelectionField/SelectionField';
import CoverImageVideoContainer from '../CoverImageVideoContainer/CoverImageVideoContainer';
import styles from './BannerInputFieldContainer.module.css';

export default function BannerInputFieldContainer({ number, gameBanner, errorChange, errorMessages }) {
  const [type, setType] = useState('');

  const typeRef = useRef(type);
  typeRef.current = type;

  const handleSetValues = (value, name) => {
    gameBanner[number][name] = value;

    if (errorMessages[number]?.type) {
      delete errorMessages[number].type;
      delete errorMessages[number].thumb;
      delete errorMessages[number].cover;
    }
  };

  return (
    <div className={styles.textFieldContainer}>
      <CoverImageVideoContainer
        type={typeRef.current}
        handleSetValues={handleSetValues}
        errorChange={errorChange}
        name="cover"
        errorMessage={errorMessages[number]?.cover}
        number={number}
      />
      <FileUploadButton
        {...(type || { disabled: true })}
        field="input"
        accept="image/*"
        setState={handleSetValues}
        placeholder={type.type ? `Choose Game's Banner ${type.type}'s thumbnail` : 'Select Content Type First'}
        name="thumb"
        errorChange={errorChange}
        errorMessage={errorMessages[number]?.thumb}
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
