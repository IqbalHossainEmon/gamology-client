import { useState } from 'react';
import ButtonForAddGameSection from '../../ButtonForAddGameSection/ButtonForAddGameSection';
import BannerInputFieldContainer from '../BannerInputFieldContainer/BannerInputFieldContainer';
import styles from './AddGameBanner.module.css';

export default function AddGameBanner({ gameBanner, errorMessages, errorChange }) {
    const [fieldCount, setFieldCount] = useState(1);

    return (
        <section className={styles.addGameBanner}>
            <h3 className={styles.header}>Add Game&#39;s Banner Images or Videos</h3>
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
                    <ButtonForAddGameSection
                        {...(fieldCount === 15 && { disabled: true })}
                        text="Add More +"
                        onClick={() => {
                            setFieldCount(prev => ++prev);
                            gameBanner.push({ cover: '', thumb: '', type: '' });
                        }}
                    />
                </div>
                <div className={styles.btn}>
                    <ButtonForAddGameSection
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
