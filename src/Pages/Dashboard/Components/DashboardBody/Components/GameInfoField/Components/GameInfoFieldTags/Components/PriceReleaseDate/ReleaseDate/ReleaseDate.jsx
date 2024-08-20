import { useEffect, useState } from 'react';
import ErrorMessage from '../../../../../../../../../../../Shared/ErrorMessage/ErrorMessage';
import SelectionField from '../../../../../../../../../../../Shared/SelectionField/SelectionField/SelectionField';
import styles from './ReleaseDate.module.css';

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
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

function ReleaseDate({ gameInfo, errorChange, errorMessage, defaultReleaseDate, hasDefault }) {
    const [errorShow, setErrorShow] = useState(false),

     [day, setDay] = useState({ day: 0, max: 31 });

    useEffect(() => {
        if (errorChange && errorMessage) {setErrorShow(true);}
    }, [errorChange, errorMessage]);

    const handleReleaseValue = (value, name) => {
        if (name === 'month') {
            value = months.indexOf(value) + 1;
        }

        if (name !== 'day') {
            let max;
            if (name === 'month') {
                max = getDaysInMonth(gameInfo.current.gameInfo.releaseDate.year || new Date().getFullYear(), value);
            } else {
                max = getDaysInMonth(value, gameInfo.current.gameInfo.releaseDate.month || 1);
            }
            if (day.max !== max) {
                if (gameInfo.current.gameInfo.releaseDate.day > max) {
                    gameInfo.current.gameInfo.releaseDate.day = max;
                    setDay({ max, day: max });
                } else {
                    setDay(prev => ({ ...prev, max }));
                }
            }
        } else {
            setDay(prev => ({ ...prev, day: value }));
        }

        gameInfo.current.gameInfo.releaseDate[name] = value;
    };

    return (
        <div>
            <div className={styles.releaseDate}>
                <p>
                    Release
                </p>

                <div className={styles.dateContainer}>
                    <div className={`${styles.releaseDay} ${styles.releaseComponent}`}>
                        <SelectionField
                            defaultValue={hasDefault ? defaultReleaseDate.day : ''}
                            htmlFor={1}
                            list={Array.from(Array(day.max), (_, idx) => ++idx)}
                            name="day"
                            onFocusClick={() => {
                                if (errorShow) {
                                    setErrorShow(false);
                                }
                            }}
                            parentSetValue={day.day}
                            placeholder="Day"
                            setState={handleReleaseValue}
                        />
                    </div>

                    <div className={`${styles.releaseMonth} ${styles.releaseComponent}`}>
                        <SelectionField
                            defaultValue={hasDefault ? months[defaultReleaseDate.month - 1] : ''}
                            htmlFor={2}
                            list={months}
                            name="month"
                            onFocusClick={() => {
                                if (errorShow) {
                                    setErrorShow(false);
                                }
                            }}
                            placeholder="Month"
                            setState={handleReleaseValue}
                        />
                    </div>

                    <div className={`${styles.releaseYear} ${styles.releaseComponent}`}>
                        <SelectionField
                            defaultValue={hasDefault ? defaultReleaseDate.year : ''}
                            htmlFor={3}
                            list={Array.from(Array(100), (_, idx) => new Date().getFullYear() + 1 - ++idx)}
                            name="year"
                            onFocusClick={() => {
                                if (errorShow) {
                                    setErrorShow(false);
                                }
                            }}
                            placeholder="Year"
                            setState={handleReleaseValue}
                        />
                    </div>
                </div>
            </div>

            <div className={styles.errorContainer}>
                <ErrorMessage
                    enable={errorShow}
                    errorMessage={errorMessage}
                />
            </div>
        </div>
    );
}
export default ReleaseDate;
