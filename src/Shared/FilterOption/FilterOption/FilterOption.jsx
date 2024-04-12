import { useCallback, useRef } from 'react';
import FilterSwitch from '../FilterSwitch/FilterSwitch';
import styles from './FilterOption.module.css';

function FilterOption({ text, setState, border, state, name }) {
    const handleClick = useRef(null);
    handleClick.current = useCallback(() => {
        setState(prev => ({ ...prev, [name]: !prev[name] }), name);
    }, [name, setState]);

    return (
        <button
            type="button"
            onClick={el => {
                if (document.activeElement === el.target) {
                    el.preventDefault();
                    handleClick.current();
                }
            }}
            onMouseDownCapture={el => {
                el.preventDefault();
                el.target.addEventListener('mouseup', handleClick.current, { once: true });
            }}
            className={`${border && styles.borderBot ? `${styles.borderBot} ` : ''}${styles.filterOption} ${styles.shadow}`}
        >
            <p className={styles.text}>{text}</p>
            <div className={styles.toggleButtonContainer}>
                <FilterSwitch event={handleClick} state={state} setState={setState} name={name} />
            </div>
        </button>
    );
}

export default FilterOption;
