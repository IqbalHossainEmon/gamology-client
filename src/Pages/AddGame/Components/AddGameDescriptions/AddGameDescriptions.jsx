import { useState } from 'react';
import TextField from '../../../../Shared/TextField/TextField';
import ButtonForAddGameSection from '../ButtonForAddGameSection/ButtonForAddGameSection';
import styles from './AddGameDescriptions.module.css';

export default function AddGameDescriptions() {
  const [array, setArray] = useState([{ id: 1, main: true }]);

  return (
    <section className={styles.addGameDescriptions}>
      <h3>Add Game&#39;s Descriptions</h3>
      <div className={styles.sortDescription}>
        <TextField
          field="textarea"
          empty={0}
          placeholder="Add some sort description..."
          htmlFor="sort_description"
        />
      </div>
      <div>
        {array.map((item, index) => (
          <div key={item.id} className={styles.description}>
            {item.main && (
              <div className={styles.mainHeader}>
                <TextField
                  field="input"
                  empty={0}
                  placeholder="Add a Main Header"
                  htmlFor={`main_header_${index}`}
                />
              </div>
            )}
            <div className={styles.subHeader}>
              <TextField
                field="input"
                empty={0}
                placeholder="Add a Sub Header"
                htmlFor={`sub_header_${index}`}
              />
            </div>
            <div className={styles.subHeader}>
              <TextField
                field="textarea"
                empty={0}
                placeholder="Add a Sub Header"
                htmlFor={`sub_header_${index}`}
              />
            </div>
          </div>
        ))}
      </div>
      <div className={styles.buttonContainer}>
        <div className={styles.btn}>
          <ButtonForAddGameSection
            onClick={() => {
              setArray((prev) => [...prev, { id: prev.length + 1 }]);
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
                  prevState[prevState.length - 1].main = false;
                  return prevState;
                });
              }
            }}
            text="Remove Main Header -"
          />
        </div>
      </div>
    </section>
  );
}
