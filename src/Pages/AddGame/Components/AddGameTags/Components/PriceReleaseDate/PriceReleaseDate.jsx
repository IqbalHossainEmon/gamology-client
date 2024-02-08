import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../Shared/SelectionField/SelectionField';
import styles from './PriceReleaseDate.module.css';

const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function PriceReleaseDate({ gameInfo, errorChange, errorMessage }) {
  const [errorShow, setErrorShow] = useState(false);

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
  }, [errorChange, errorMessage]);

  const [price, setPrice] = useState('0.00');

  const handleSetValue = e => {
    gameInfo[e.target.name] = e.target.value;
  };

  const handleReleaseValue = (value, name) => {
    if (name === 'month') {
      value = months.indexOf(value) + 1;
    }
    gameInfo.releaseDate[name] = value;
    if (errorShow) {
      setErrorShow(false);
    }
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
      <div className={styles.releaseContainer}>
        <div className={styles.releaseDateWidthText}>
          <p>Release</p>
          <div className={styles.releaseDate}>
            <div className={`${styles.releaseDay} ${styles.releaseComponent}`}>
              <SelectionField
                list={Array.from(Array(31), (_, idx) => ++idx)}
                htmlFor={1}
                placeholder="Day"
                setState={handleReleaseValue}
                name="day"
              />
            </div>
            <div className={`${styles.releaseMonth} ${styles.releaseComponent}`}>
              <SelectionField
                list={months}
                htmlFor={2}
                placeholder="Month"
                setState={handleReleaseValue}
                name="month"
              />
            </div>
            <div className={`${styles.releaseYear} ${styles.releaseComponent}`}>
              <SelectionField
                list={Array.from(Array(100), (_, idx) => new Date().getFullYear() + 1 - ++idx)}
                htmlFor={3}
                placeholder="Year"
                setState={handleReleaseValue}
                name="year"
              />
            </div>
          </div>
        </div>
        <div className={styles.errorContainer}>
          <ErrorMessage enable={errorShow} errorMessage={errorMessage} />
        </div>
      </div>
    </div>
  );
}
