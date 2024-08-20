import { useState } from 'react';
import ReleaseDate from '../ReleaseDate/ReleaseDate';
import styles from './PriceReleaseDate.module.css';

export default function PriceReleaseDate({ gameInfo, errorChange, errorMessage, defaultReleaseDate, hasDefault, defaultPrice }) {
    const [price, setPrice] = useState(defaultPrice || '0.00'),

     handleSetValue = e => {
        gameInfo.current.gameInfo[e.target.name] = e.target.value;
    };

    return (
        <div className={styles.priceReleaseDateContainer}>
            <div className={styles.priceContainer}>
                <label htmlFor="price">
                    Price $
                </label>

                <div className={styles.inputContainer}>
                    <input
                        id="price"
                        min={0}
                        name="price"
                        onBlur={handleSetValue}
                        onChange={e => setPrice(e.target.value)}
                        onFocus={e => {
                            if (e.target.value === '0.00') {e.target.select();}
                        }}
                        placeholder="0.00"
                        step="1"
                        type="number"
                        value={price}
                    />
                </div>
            </div>

            <ReleaseDate
                defaultReleaseDate={defaultReleaseDate}
                errorChange={errorChange}
                errorMessage={errorMessage}
                gameInfo={gameInfo}
                hasDefault={hasDefault}
            />
        </div>
    );
}
