import { useState } from 'react';
import ButtonForGameInfoFieldSection from '../../ButtonForGameInfoFieldSection/ButtonForGameInfoFieldSection';
import BannerInputFieldContainer from '../BannerInputFieldContainer/BannerInputFieldContainer';
import styles from './GameInfoFieldBanner.module.css';

export default function GameInfoFieldBanner({ gameBanner, errorMessages, errorChange, hasDefault }) {
    const [fieldCount, setFieldCount] = useState(1);

    return (
        <section className={styles.addGameBanner}>
            <h3 className={styles.header}>{hasDefault ? 'Edit' : 'Add'} Game&#39;s Banner Images or Videos</h3>
            <div className={styles.textFieldContainer}>
                {[...Array(fieldCount).keys()].map(arr => (
                    <BannerInputFieldContainer
                        key={arr}
                        number={arr}
                        gameBanner={gameBanner}
                        errorMessages={errorMessages}
                        errorChange={errorChange}
                    />
                ))}
            </div>

            <div className={styles.btnContainer}>
                <div className={styles.btn}>
                    <ButtonForGameInfoFieldSection
                        {...(fieldCount === 15 && { disabled: true })}
                        text="Add More +"
                        onClick={() => {
                            setFieldCount(prev => ++prev);
                            gameBanner.push({ cover: '', thumb: '', type: '' });
                        }}
                    />
                </div>
                <div className={styles.btn}>
                    <ButtonForGameInfoFieldSection
                        {...(fieldCount === 1 && { disabled: true })}
                        text="Remove One -"
                        onClick={() => {
                            setFieldCount(prev => --prev);
                            gameBanner.pop();
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
