import { useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ inputRef, disabled }) {
    const [value, setValue] = useState(0);

    return (
        <input
            disabled={disabled}
            ref={inputRef}
            className={styles.input}
            value={value}
            type="text"
            onChange={e => {
                if (e.target.value === '' || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
                    setValue(e.target.value);
                }
            }}
        />
    );
}
