import { useState } from 'react';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import TextFieldContainer from '../TextFieldContainer/TextFieldContainer';
import styles from './AddGameBanner.module.css';

export default function AddGameBanner({ gameBanner, errorChange, errorMessages }) {
  const [fieldCount, setFieldCount] = useState(1);

  return (
    <section className={styles.addGameBanner}>
      <h3 className={styles.header}>Add Game&#39;s Banner Images or Videos</h3>
      <div className={styles.textFieldContainer}>
        {[...Array(fieldCount).keys()].map(arr => (
          <TextFieldContainer
            errorChange={errorChange}
            key={arr}
            number={arr}
            gameBanner={gameBanner}
            errorMessages={errorMessages}
          />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            text="Add More +"
            onClick={() => {
              setFieldCount(prev => ++prev);
              gameBanner.push({ cover: '', thumb: '', type: '' });
            }}
          />
        </div>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            {...(fieldCount === 1 && { disabled: true })}
            text="Remove One -"
            onClick={() => {
              setFieldCount(prev => --prev);
              gameBanner.pop();
            }}
          />
        </div>
      </div>
    </section>
  );
}
