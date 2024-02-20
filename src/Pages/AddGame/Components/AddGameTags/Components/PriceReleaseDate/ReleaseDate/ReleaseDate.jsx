import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../../Shared/SelectionField/SelectionField';
import styles from './ReleaseDate.module.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

const ReleaseDate = ({ gameInfo, errorChange, errorMessage }) => {
  const [errorShow, setErrorShow] = useState(false);

  const [day, setDay] = useState({ day: 0, max: 31 });

  useEffect(() => {
    if (gameInfo.releaseDate.day > day.max) {
      setDay(prev => ({ ...prev, day: day.max }));
      gameInfo.releaseDate.day = day.day;
    }
  }, [day.day, day.max, gameInfo.releaseDate]);

  useEffect(() => {
    if (errorChange && errorMessage) setErrorShow(true);
  }, [errorChange, errorMessage]);

  const handleReleaseValue = (value, name) => {
    if (name === 'month') {
      value = months.indexOf(value) + 1;
      setDay(prev => ({ ...prev, max: getDaysInMonth(gameInfo.releaseDate.year || new Date().getFullYear(), value) }));
    }
    if (name === 'year') {
      setDay(prev => ({ ...prev, max: getDaysInMonth(value, gameInfo.releaseDate.month || new Date().getMonth() + 1) }));
    }
    gameInfo.releaseDate[name] = value;
    if (errorShow) {
      setErrorShow(false);
    }
  };
  return (
    <div>
      <div className={styles.releaseDate}>
        <p>Release</p>
        <div className={styles.dateContainer}>
          <div className={`${styles.releaseDay} ${styles.releaseComponent}`}>
            <SelectionField
              list={Array.from(Array(day.max), (_, idx) => ++idx)}
              htmlFor={1}
              placeholder="Day"
              setState={handleReleaseValue}
              name="day"
              parentSetValue={day.day}
            />
          </div>
          <div className={`${styles.releaseMonth} ${styles.releaseComponent}`}>
            <SelectionField list={months} htmlFor={2} placeholder="Month" setState={handleReleaseValue} name="month" />
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
  );
};
export default ReleaseDate;
