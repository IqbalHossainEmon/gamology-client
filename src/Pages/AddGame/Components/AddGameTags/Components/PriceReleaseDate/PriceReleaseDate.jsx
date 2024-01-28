import { useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import styles from './PriceReleaseDate.module.css';

export default function PriceReleaseDate({ gameData }) {
  const [release, setRelease] = useState('DD/MM/YYYY');

  const [price, setPrice] = useState('0.00');

  const handleSetValue = e => {
    gameData.current.gameInfo[e.target.name] = e.target.value;
  };
  const handleSetReleaseValue = () => {
    handleSetValue({ target: { name: 'releaseDate', value: release } });
  };

  return (
    <div className={styles.priceReleaseDateContainer}>
      <div className={styles.priceContainer}>
        <label htmlFor="price">Price $</label>
        <div className={styles.inputContainer}>
          <input
            step="1"
            min={0}
            onBlur={handleSetValue}
            name="price"
            placeholder="0.00"
            value={price}
            onChange={e => setPrice(e.target.value)}
            type="number"
            id="price"
          />
        </div>
      </div>
      <div onBlur={handleSetReleaseValue} className={styles.releaseContainer}>
        <p>Release</p>
        <div className={styles.releaseDay}>
          <SelectionField
            list={Array.from(Array(31), (_, idx) => ++idx)}
            htmlFor={1}
            placeholder="Day"
            name="type"
          />
        </div>
        <ErrorMessage errorMessage="" />
      </div>
    </div>
  );
}
