import { useState } from 'react';
import TextField from '../../../../../Shared/TextField/TextField';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import AddGameDescription from '../AddGameDescription/AddGameDescription';
import styles from './AddGameDescriptions.module.css';

export default function AddGameDescriptions({ gameData }) {
  const [array, setArray] = useState([{ id: 0, main: true }]);

  const handleSetSortDescription = (value, name) => {
    gameData.current.gameDescriptions[name] = value;
  };

  return (
    <section className={styles.addGameDescriptions}>
      <h3 className={styles.header}>Add Game&#39;s Descriptions</h3>
      <div className={styles.sortDescription}>
        <TextField
          field="textarea"
          empty={0}
          setState={handleSetSortDescription}
          placeholder="Add some sort description..."
          htmlFor="sort_description"
          name="sortDesc"
        />
      </div>
      <div>
        {array.map((item, index) => (
          <AddGameDescription
            key={item.id}
            item={item}
            index={index}
            gameData={gameData}
          />
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            onClick={() => {
              setArray((prev) => [...prev, { id: prev.length }]);
            }}
            text="Add more +"
          />
        </div>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            onClick={() => {
              if (array.length > 1) {
                setArray((prev) => {
                  const prevState = [...prev];
                  delete prevState[prevState.length - 1];
                  return prevState.filter((state) => state);
                });
              }
            }}
            text="Remove last one -"
          />
        </div>
        <div className={styles.mainBtn}>
          <ButtonForAddGameSection
            onClick={() => {
              if (array[array.length - 1].main !== true) {
                setArray((prev) => {
                  const prevState = [...prev];
                  prevState[prevState.length - 1].main = true;
                  return prevState;
                });
              }
            }}
            text="Add Main Header +"
          />
        </div>
        <div className={styles.mainBtn}>
          <ButtonForAddGameSection
            onClick={() => {
              if (array.length > 1 && array[array.length - 1].main !== false) {
                setArray((prev) => {
                  const prevState = [...prev];
                  delete prevState[prevState.length - 1].main;
                  return prevState;
                });
              }
            }}
            text="Remove Main Header -"
          />
        </div>
        <div className={styles.mainBtn}>
          <ButtonForAddGameSection
            onClick={() => {
              setArray((prev) => [
                ...prev,
                { id: prev.length + 1, onlySubHeader: true },
              ]);
            }}
            text="Add Only Sub Header +"
          />
        </div>
        <div className={styles.mainBtn}>
          <ButtonForAddGameSection
            onClick={() => {
              if (array.length > 1 && !!array[array.length - 1].onlySubHeader) {
                setArray((prev) => {
                  const prevState = [...prev];
                  prevState.pop();
                  return prevState;
                });
              }
            }}
            text="Remove Only Sub Header -"
          />
        </div>
      </div>
    </section>
  );
}
