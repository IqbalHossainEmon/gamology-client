import { useEffect, useRef, useState } from 'react';
import FileUploadButton from '../../../../../Shared/FileUploadButton/FileUploadButton';
import SelectionField from '../../../../../Shared/SelectionField/SelectionField';
import CoverImageVideoContainer from '../CoverImageVideoContainer/CoverImageVideoContainer';
import styles from './BannerInputFieldContainer.module.css';

export default function BannerInputFieldContainer({ number, gameBanner, errorChange, errorMessages }) {
  const [type, setType] = useState('');

  const [parentErrorShow, setParentErrorShow] = useState(!!errorMessages[number].type);

  const typeRef = useRef(type);
  typeRef.current = type;

  useEffect(() => {
    if (errorChange && errorMessages[number].type) {
      setParentErrorShow(true);
    }
  }, [errorChange, errorMessages, number, parentErrorShow]);

  const handleSetValues = (value, name) => {
    gameBanner[number][name] = value;
    if (errorMessages[number].type) {
      console.log(errorMessages[number]);
      setParentErrorShow(false);
      delete errorMessages[number].type;
    }
  };

  return (
    <div className={styles.textFieldContainer}>
      <CoverImageVideoContainer
        type={typeRef.current}
        handleSetValues={handleSetValues}
        errorChange={errorChange}
        errorMessages={errorMessages[number]?.cover}
        errorType={errorMessages[number]?.type}
        parentErrorShow={parentErrorShow}
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
        parentErrorShow={parentErrorShow}
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
