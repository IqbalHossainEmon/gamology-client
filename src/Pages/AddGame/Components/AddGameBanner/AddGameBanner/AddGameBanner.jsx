import { useState } from 'react';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import TextFieldContainer from '../Components/TextFieldContainer/TextFieldContainer';
import styles from './AddGameBanner.module.css';

export default function AddGameBanner() {
  const [fieldCount, setFieldCount] = useState(1);

  return (
    <div className={styles.addGameBanner}>
      <h3>Add Game&#39;s Banner Images or Videos</h3>
      <div className={styles.textFieldContainer}>
        {[...Array(fieldCount).keys()].map((arr) => (
          <TextFieldContainer key={arr} number={arr} />
        ))}
      </div>
      <div className={styles.btnContainer}>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            text="Add More +"
            onClick={() => setFieldCount((prev) => prev + 1)}
          />
        </div>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            text="Remove One -"
            onClick={() => {
              if (fieldCount > 1) {
                setFieldCount((prev) => prev - 1);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
