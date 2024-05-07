import { useState } from 'react';
import styles from './CoverVideoContainer.module.css';

const CoverVideoContainer = ({ inputRef, number, onFocus, onBlur, name, errorShow, setErrorShow, mainValue }) => {
    const [value, setValue] = useState(mainValue);

    return (
        <input
            ref={inputRef}
            type="text"
            name={name}
            onFocus={onFocus}
            onChange={e => {
                setValue(e.target.value);
                if (errorShow) setErrorShow(false);
            }}
            onBlur={onBlur}
            value={value}
            id={`addGameBannerCover_${number}`}
            className={styles.field}
        />
    );
};
export default CoverVideoContainer;
