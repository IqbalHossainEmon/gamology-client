import { useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import styles from './PriceReleaseDate.module.css';

export default function PriceReleaseDate({ gameData }) {
  const [release, setRelease] = useState({
    day: new Date().getDate(),
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const [price, setPrice] = useState('0.00');

  const handleSetValue = e => {
    gameData.current.gameInfo[e.target.name] = e.target.value;
  };
  const handleSetReleaseValue = () => {
    handleSetValue({ target: { name: 'releaseDate', value: release } });
  };

  return (
    <div className={styles.priceReleaseDateMainContainer}>
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
          <label htmlFor="release">Release</label>
          <div className={styles.inputContainer}>
            <input
              placeholder="DD"
              type="number"
              max={31}
              min={1}
              name="day"
              maxLength={2}
              value={release.day}
              id="release"
              onChange={e => setRelease(prev => ({ ...prev, day: e.target.value }))}
            />
            /
            <input
              placeholder="MM"
              type="number"
              name="month"
              max={12}
              min={1}
              value={release.month}
              onChange={e => setRelease(prev => ({ ...prev, month: e.target.value }))}
            />
            /
            <input
              placeholder="YYYY"
              type="number"
              max={new Date().getFullYear()}
              min={1960}
              name="year"
              value={release.year}
              onChange={e => setRelease(prev => ({ ...prev, year: e.target.value }))}
            />
          </div>
          <ErrorMessage errorMessage="Price and Release Date is Required" />
        </div>
      </div>
    </div>
  );
}
