import { useEffect, useState } from 'react';
import styles from './RangeInputField.module.css';

export default function RangeInputField({ inputRef, disabled, val, state, handleEnter }) {
    const [value, setValue] = useState(val);

    useEffect(() => {
        setValue(state);
    }, [state]);

    const handleMouseDown = e => {
        if (e.target !== inputRef.current) {
            inputRef.current.blur();
            document.removeEventListener('mousedown', handleMouseDown);
        }
    };

    return (
        <input
            disabled={disabled}
            ref={inputRef}
            className={styles.input}
            value={value}
            onFocus={() => {
                document.addEventListener('mousedown', handleMouseDown);
                document.addEventListener('keydown', handleEnter);
            }}
            type="text"
            onChange={e => {
                if (e.target.value === '' || /^\d{1,}(\.\d{0,2})?$/.test(e.target.value)) {
                    setValue(e.target.value);
                }
            }}
        />
    );
}
