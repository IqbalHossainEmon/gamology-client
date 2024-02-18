import { useState } from 'react';
import ReleaseDate from '../ReleaseDate/ReleaseDate';
import styles from './PriceReleaseDate.module.css';

export default function PriceReleaseDate({ gameInfo, errorChange, errorMessage }) {
  const [price, setPrice] = useState('0.00');

  const handleSetValue = e => {
    gameInfo[e.target.name] = e.target.value;
  };

  return (
    <div className={styles.priceReleaseDateContainer}>
      <div className={styles.priceContainer}>
        <label htmlFor="price">Price $</label>
        <div className={styles.inputContainer}>
          <input
            step="1"
            min={0}
            onFocus={e => {
              if (e.target.value === '0.00') e.target.select();
            }}
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

      <ReleaseDate gameInfo={gameInfo} errorChange={errorChange} errorMessage={errorMessage} />
    </div>
  );
}
