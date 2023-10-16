import { useState } from 'react';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import TextFieldContainer from '../TextFieldContainer/TextFieldContainer';
import styles from './AddGameBanner.module.css';

export default function AddGameBanner({ gameData }) {
  const [fieldCount, setFieldCount] = useState(1);

  return (
    <section className={styles.addGameBanner}>
      <h3 className={styles.header}>Add Game&#39;s Banner Images or Videos</h3>
      <div className={styles.textFieldContainer}>
        {[...Array(fieldCount).keys()].map(arr => (
          <TextFieldContainer key={arr} number={arr} gameData={gameData} />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            text="Add More +"
            onClick={() => setFieldCount(prev => prev + 1)}
          />
        </div>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            {...(fieldCount === 1 && { disabled: true })}
            text="Remove One -"
            onClick={() => {
              setFieldCount(prev => prev - 1);
            }}
          />
        </div>
      </div>
    </section>
  );
}
